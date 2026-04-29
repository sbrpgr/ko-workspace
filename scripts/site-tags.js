const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");
const childProcess = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const GTM_ID = "GTM-W3MF6BSN";
const GA4_ID = "G-NME2NL44SS";
const CHECK_ONLY = process.argv.includes("--check");

const GTM_SCRIPT = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`;

const GTM_HEAD = `    <!-- Google Tag Manager -->
    <script>${GTM_SCRIPT}</script>
    <!-- End Google Tag Manager -->
`;

const GTAG_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA4_ID}');`;

const GTAG_HEAD = `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
    <script>${GTAG_SCRIPT}</script>
    <!-- End Google tag (gtag.js) -->
`;

const MANAGED_HEAD = `${GTM_HEAD}${GTAG_HEAD}`;

const GTM_BODY = `    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
`;

const HEAD_BLOCK_RE = /[ \t]*<!-- Google Tag Manager -->\r?\n[ \t]*<script>[\s\S]*?<\/script>\r?\n[ \t]*<!-- End Google Tag Manager -->\r?\n/;
const GTAG_BLOCK_RE = /[ \t]*<!-- Google tag \(gtag\.js\) -->\r?\n[ \t]*<script async src="https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=[^"]+"><\/script>\r?\n[ \t]*<script>[\s\S]*?<\/script>\r?\n[ \t]*<!-- End Google tag \(gtag\.js\) -->\r?\n/;
const BODY_BLOCK_RE = /[ \t]*<!-- Google Tag Manager \(noscript\) -->\r?\n[ \t]*<noscript>[\s\S]*?<\/noscript>\r?\n[ \t]*<!-- End Google Tag Manager \(noscript\) -->\r?\n/;
const HEAD_POSITION_RE = /<head>\s*<!-- Google Tag Manager -->[\s\S]*?<!-- Google tag \(gtag\.js\) -->/;
const BODY_POSITION_RE = /<body[^>]*>\s*<!-- Google Tag Manager \(noscript\) -->/;

const GTM_HASH = `sha256-${crypto.createHash("sha256").update(GTM_SCRIPT).digest("base64")}`;
const GTAG_HASH = `sha256-${crypto.createHash("sha256").update(GTAG_SCRIPT).digest("base64")}`;
const REQUIRED_SCRIPT_SOURCES = [
  `'${GTM_HASH}'`,
  `'${GTAG_HASH}'`,
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://ssl.google-analytics.com",
  "https://analytics.google.com",
];

function main() {
  const changes = [];
  const problems = [];

  for (const file of collectHtmlFiles()) {
    const result = ensureHtmlTags(file);
    changes.push(...result.changes);
    problems.push(...result.problems);
  }

  const cspResult = ensureHeadersCsp(path.join(ROOT, "_headers"));
  changes.push(...cspResult.changes);
  problems.push(...cspResult.problems);

  if (problems.length) {
    console.error(problems.join("\n"));
    console.error("Run `npm run apply:site-tags` to update managed page tags.");
    process.exit(1);
  }

  const verb = CHECK_ONLY ? "validated" : "updated";
  console.log(`site tags ${verb}: ${changes.length ? changes.join(", ") : "no changes"}`);
}

function collectHtmlFiles() {
  const files = new Set();

  for (const file of gitTrackedHtmlFiles()) {
    files.add(path.join(ROOT, file));
  }

  for (const file of ["index.html", "privacy.html", "terms.html"]) {
    files.add(path.join(ROOT, file));
  }

  const toolsDir = path.join(ROOT, "tools");
  if (fs.existsSync(toolsDir)) {
    walk(toolsDir, (file) => {
      if (file.endsWith(".html")) files.add(file);
    });
  }

  return [...files]
    .filter((file) => fs.existsSync(file))
    .filter((file) => !isIgnoredHtmlCopy(file))
    .sort();
}

function gitTrackedHtmlFiles() {
  try {
    const output = childProcess.execFileSync("git", ["ls-files", "*.html"], {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return output.trim().split(/\r?\n/).filter(Boolean);
  } catch {
    return [];
  }
}

function walk(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if ([".git", ".browser-profile", ".cloudflare-dist", ".cloudflare-dist-smoke", ".wrangler", "node_modules"].includes(entry.name)) {
        continue;
      }
      walk(fullPath, onFile);
    } else {
      onFile(fullPath);
    }
  }
}

function isIgnoredHtmlCopy(file) {
  return /\s\(\d+\)\.html$/i.test(path.basename(file));
}

function ensureHtmlTags(file) {
  const relative = path.relative(ROOT, file).replace(/\\/g, "/");
  const original = fs.readFileSync(file, "utf8");
  let next = original;

  next = next.replace(HEAD_BLOCK_RE, "");
  next = next.replace(GTAG_BLOCK_RE, "");
  next = next.replace(/<head>\r?\n/, (match) => `${match}${MANAGED_HEAD}`);

  if (BODY_BLOCK_RE.test(next)) {
    next = next.replace(BODY_BLOCK_RE, GTM_BODY);
  } else {
    next = next.replace(/<body[^>]*>\r?\n/, (match) => `${match}${GTM_BODY}`);
  }

  const problems = [];
  if (!next.includes(GTM_ID)) problems.push(`${relative}: missing ${GTM_ID}`);
  if (!next.includes(GA4_ID)) problems.push(`${relative}: missing ${GA4_ID}`);
  if (!HEAD_POSITION_RE.test(next)) problems.push(`${relative}: managed head tags are not directly after <head>`);
  if (!BODY_POSITION_RE.test(next)) problems.push(`${relative}: GTM noscript is not directly after <body>`);

  const changes = [];
  if (next !== original) {
    if (CHECK_ONLY) {
      problems.push(`${relative}: managed GTM tags are out of date`);
    } else {
      fs.writeFileSync(file, next);
      changes.push(relative);
    }
  }

  return { changes, problems };
}

function ensureHeadersCsp(file) {
  if (!fs.existsSync(file)) {
    return { changes: [], problems: ["_headers: file not found"] };
  }

  const original = fs.readFileSync(file, "utf8");
  const lines = original.split(/\r?\n/);
  const index = lines.findIndex((line) => line.trim().startsWith("Content-Security-Policy:"));
  if (index === -1) {
    return { changes: [], problems: ["_headers: Content-Security-Policy not found"] };
  }

  const prefix = lines[index].match(/^\s*/)[0];
  const value = lines[index].trim().replace(/^Content-Security-Policy:\s*/, "");
  const directives = value.split(";").map((part) => part.trim()).filter(Boolean);
  let scriptDirectiveIndex = directives.findIndex((part) => part.startsWith("script-src "));
  if (scriptDirectiveIndex === -1) {
    directives.push("script-src 'self'");
    scriptDirectiveIndex = directives.length - 1;
  }

  const scriptParts = directives[scriptDirectiveIndex].split(/\s+/);
  const sourceSet = new Set(scriptParts.slice(1));
  for (const source of REQUIRED_SCRIPT_SOURCES) {
    sourceSet.add(source);
  }
  directives[scriptDirectiveIndex] = ["script-src", ...sourceSet].join(" ");

  const nextLine = `${prefix}Content-Security-Policy: ${directives.join("; ")}`;
  const next = [...lines.slice(0, index), nextLine, ...lines.slice(index + 1)].join("\n");

  const problems = [];
  for (const source of REQUIRED_SCRIPT_SOURCES) {
    if (!nextLine.includes(source)) {
      problems.push(`_headers: CSP missing ${source}`);
    }
  }

  const changes = [];
  if (next !== original) {
    if (CHECK_ONLY) {
      problems.push("_headers: managed GTM CSP entries are out of date");
    } else {
      fs.writeFileSync(file, next);
      changes.push("_headers");
    }
  }

  return { changes, problems };
}

main();
