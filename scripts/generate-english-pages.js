const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://ko-workspace.com";
const TODAY = "2026-05-09";
const GA4_ID = "G-8S4R46L9Q0";
const ADSENSE_ID = "ca-pub-5869520985295558";

const GTAG_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA4_ID}');`;

function main() {
  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const api = loadEnglishApi(app);
  const version = readAssetVersion();

  writePage("en/index.html", renderAppPage({
    kind: "home",
    title: "ko-workspace | Browser-based Office Tools",
    description:
      "ko-workspace is a collection of browser-based text, image, PDF, subtitle, audio, and video tools that run without sign-up.",
    canonicalPath: "/en/",
    koPath: "/",
    bodyAttrs: 'data-locale="en" data-page="home"',
    heroEyebrow: "Browser-side Office Utilities",
    heroTitle: "ko-workspace",
    heroDescription:
      "Run practical text, image, PDF, subtitle, audio, and video tools directly in your browser.",
    schema: siteSchema(api.tools),
    staticContent: renderStaticContent({
      id: "home-en",
      eyebrow: "Practical Workflows",
      title: "ko-workspace scenarios",
      intro:
        "ko-workspace is built for the small browser tasks that sit between larger pieces of work.",
      subject: "the workspace",
      result:
        "finished text, image, PDF, subtitle, audio, or video output",
    }),
  }, version), version);

  for (const tool of api.tools) {
    writePage(`${tool.path.slice(1)}index.html`, renderAppPage({
      kind: "tool",
      title: `${tool.seoTitle} | ko-workspace`,
      description: tool.seoDescription || tool.summary,
      canonicalPath: tool.path,
      koPath: tool.path.replace(/^\/en/, ""),
      bodyAttrs: `data-locale="en" data-tool="${escapeAttr(tool.id)}"`,
      heroEyebrow: "Free Online Tool",
      heroTitle: tool.title,
      heroDescription: tool.summary,
      schema: toolSchema(tool),
      staticContent: renderStaticContent({
        id: `${tool.id}-en`,
        eyebrow: "Use Case",
        title: `${tool.title} workflow`,
        intro: tool.summary,
        subject: tool.title,
        result: "the browser-generated result",
      }),
    }, version), version);
  }

  for (const page of api.categories) {
    writePage(`${page.path.slice(1)}index.html`, renderAppPage({
      kind: "category",
      title: `${page.title} | Free Online Tools - ko-workspace`,
      description: page.metaDescription,
      canonicalPath: page.path,
      koPath: page.path.replace(/^\/en/, ""),
      bodyAttrs: `data-locale="en" data-category-page="${escapeAttr(page.id)}"`,
      heroEyebrow: page.eyebrow,
      heroTitle: page.title,
      heroDescription: page.description,
      schema: categorySchema(page, api.tools),
      staticContent: renderStaticContent({
        id: `${page.id}-category-en`,
        eyebrow: "Category Guide",
        title: `${page.title} scenarios`,
        intro: page.description,
        subject: page.title,
        result: "the output files or copied text from the selected tools",
      }),
    }, version), version);
  }

  writePage("en/privacy/index.html", renderDocumentPage({
    title: "Privacy Policy | ko-workspace",
    description:
      "The ko-workspace privacy policy explains browser-side processing, analytics, ads, cookies, and contact handling.",
    canonicalPath: "/en/privacy/",
    koPath: "/privacy",
    eyebrow: "Privacy Policy",
    heading: "Privacy Policy",
    body: privacyBody(),
  }, version), version);

  writePage("en/terms/index.html", renderDocumentPage({
    title: "Terms of Use | ko-workspace",
    description:
      "The ko-workspace terms explain browser-based tools, user responsibility, service changes, ads, and contact information.",
    canonicalPath: "/en/terms/",
    koPath: "/terms",
    eyebrow: "Terms",
    heading: "Terms of Use",
    body: termsBody(),
  }, version), version);

  ensureKoreanAlternates(api);
  ensureSitemap(api);
  console.log(`generated English pages for ${api.tools.length} tools and ${api.categories.length} categories`);
}

function loadEnglishApi(app) {
  const exportBlock = `
globalThis.__enPageApi = {
  tools: TOOL_DEFS_ACTIVE,
  categories: CATEGORY_PAGE_DEFS_ACTIVE
};
`;
  const source = app.replace(/\r?\ninit\(\);\s*$/, exportBlock);
  if (source === app) throw new Error("Could not replace init() in app.js.");

  const context = {
    __enPageApi: null,
    console: { log() {}, warn() {}, error() {} },
    TextEncoder,
    TextDecoder,
    URL,
    Blob,
    setTimeout,
    clearTimeout,
    window: {
      SpeechRecognition: null,
      webkitSpeechRecognition: null,
      innerWidth: 1280,
      innerHeight: 720,
      isSecureContext: true,
      location: { pathname: "/en/" },
      addEventListener() {},
      removeEventListener() {},
      open() {},
    },
    navigator: {
      clipboard: null,
      mediaDevices: null,
      permissions: null,
      platform: "Win32",
    },
    document: makeDocumentStub(),
    DataTransfer: function DataTransferStub() {
      this.items = { add() {} };
      this.files = [];
    },
    Event: function EventStub(type) {
      this.type = type;
    },
    Image: function ImageStub() {},
  };
  context.window.document = context.document;
  context.window.navigator = context.navigator;

  vm.createContext(context);
  vm.runInContext(source, context, { filename: path.join(ROOT, "app.js") });
  return context.__enPageApi;
}

function makeDocumentStub() {
  return {
    body: { dataset: { locale: "en" }, classList: makeClassList(), style: {} },
    documentElement: { lang: "en" },
    head: makeNodeStub(),
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    createElement() {
      return makeNodeStub();
    },
    addEventListener() {},
    removeEventListener() {},
    execCommand() {
      return true;
    },
  };
}

function makeNodeStub() {
  return {
    dataset: {},
    style: {},
    classList: makeClassList(),
    appendChild() {},
    remove() {},
    setAttribute() {},
    getAttribute() {
      return "";
    },
    addEventListener() {},
    removeEventListener() {},
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getContext() {
      return {};
    },
    click() {},
    select() {},
    value: "",
    textContent: "",
    innerHTML: "",
    hidden: false,
    disabled: false,
    checked: false,
  };
}

function makeClassList() {
  return {
    add() {},
    remove() {},
    toggle() {},
    contains() {
      return false;
    },
  };
}

function readAssetVersion() {
  const spec = fs.readFileSync(path.join(ROOT, "PROJECT_SPEC.md"), "utf8");
  return spec.match(/Current static asset cache version: `([^`]+)`/)?.[1] || "20260509-04";
}

function renderAppPage(config, version) {
  return `<!doctype html>
<html lang="en">
  <head>
${managedGoogleTag()}
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeAttr(config.description)}" />
    <meta name="robots" content="index,follow" />
    <meta name="theme-color" content="#e5322d" />
    <meta name="google-adsense-account" content="${ADSENSE_ID}" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}"
     crossorigin="anonymous"></script>
    <meta name="application-name" content="ko-workspace" />
    <meta name="apple-mobile-web-app-title" content="ko-workspace" />
    <link rel="canonical" href="${ORIGIN}${config.canonicalPath}" />
    <link rel="alternate" hreflang="ko" href="${ORIGIN}${config.koPath}" />
    <link rel="alternate" hreflang="en" href="${ORIGIN}${config.canonicalPath}" />
    <link rel="alternate" hreflang="x-default" href="${ORIGIN}${config.koPath}" />
    <link rel="icon" href="/favicon.svg?v=${version}" type="image/svg+xml" />
    <link rel="manifest" href="/site.webmanifest?v=${version}" />
    <meta property="og:site_name" content="ko-workspace" />
    <meta property="og:locale" content="en_US" />
    <meta property="og:title" content="${escapeAttr(config.title)}" />
    <meta property="og:description" content="${escapeAttr(config.description)}" />
    <meta property="og:type" content="${config.kind === "home" ? "website" : "article"}" />
    <meta property="og:url" content="${ORIGIN}${config.canonicalPath}" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeAttr(config.title)}" />
    <meta name="twitter:description" content="${escapeAttr(config.description)}" />
    <title>${escapeHtml(config.title)}</title>
    <link rel="stylesheet" href="/styles.css?v=${version}" />
    <script type="application/ld+json" data-schema="${config.kind === "tool" ? "static-tool" : config.kind === "home" ? "static-site" : "static-category"}">
${JSON.stringify(config.schema, null, 2)}
    </script>
  </head>
  <body ${config.bodyAttrs}>
    <div class="site-layout">
      <aside class="ad-slot ad-rail ad-rail-left" data-ad-placement="left-rail" aria-label="Advertising area"></aside>
      <div class="content-column">
        <nav class="site-topbar" aria-label="Primary navigation">
          <a class="brand-home" href="/en/" aria-label="Go to ko-workspace English home">
            <span class="brand-mark" aria-hidden="true">ko</span>
            <span class="brand-name">ko-workspace</span>
            <span class="brand-subname">Browser tools</span>
          </a>
          <div class="topbar-links">
            <label class="topbar-search" for="toolSearch"><input id="toolSearch" type="search" placeholder="Search tools" aria-label="Search tools" autocomplete="off" /></label>
            <div class="topbar-policy-links">
              <a href="/en/privacy/" data-i18n="privacy">Privacy</a>
              <a href="/en/terms/" data-i18n="terms">Terms</a>
            </div>
          </div>
        </nav>
        <aside class="ad-slot ad-band ad-band-top" data-ad-placement="top-banner" aria-label="Advertising area"></aside>
        <main class="app-shell">
          <header class="platform-hero">
            <div class="hero-copy">
              <p class="eyebrow" id="heroEyebrow">${escapeHtml(config.heroEyebrow)}</p>
              <h1 id="pageTitle">${escapeHtml(config.heroTitle)}</h1>
              <p id="pageDescription">${escapeHtml(config.heroDescription)}</p>
            </div>
            <div class="hero-meta">
              <div class="status-group">
                <span class="status-pill">No sign-up</span>
                <span class="status-pill">Browser processing</span>
                <span class="status-pill">No app-server storage</span>
                <span class="status-pill">No input database</span>
              </div>
              <button id="helpBtn" class="secondary-action" type="button" aria-label="View service principles">?</button>
            </div>
          </header>

          <section class="platform-grid">
            <aside class="tool-sidebar">
              <div id="categoryFilters" class="chip-row" aria-label="Tool categories"></div>
              <div id="toolList" class="tool-list" aria-live="polite"></div>
            </aside>

            <section class="workspace-stack">
              <section id="toolOverview" class="panel overview-panel" aria-live="polite"></section>
              <section id="tools" class="panel workspace-panel">
                <div id="toolWorkspace" class="tool-workspace"></div>
              </section>
              <section class="info-grid">
                <article class="panel guide-panel">
                  <div class="section-heading">
                    <div>
                      <p class="eyebrow">Quick Flow</p>
                      <h2>Workflow</h2>
                    </div>
                  </div>
                  <ol id="toolGuideList" class="guide-list"></ol>
                </article>
              </section>
            </section>
          </section>
          ${config.staticContent}

          <footer class="site-footer">
            <span class="footer-brand">Dayway</span>
            <a href="https://dayway.web.app" target="_blank" rel="noopener noreferrer">dayway.web.app</a>
            <span class="footer-contact">For ads, partnership, and collaboration inquiries, contact us by email.</span>
            <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>
            <a href="/en/privacy/">Privacy Policy</a>
            <a href="/en/terms/">Terms</a>
          </footer>
        </main>
        <aside class="ad-slot ad-band ad-band-bottom" data-ad-placement="bottom-banner" aria-label="Advertising area"></aside>
      </div>
      <aside class="ad-slot ad-rail ad-rail-right" data-ad-placement="right-rail" aria-label="Advertising area"></aside>
    </div>

    <button id="selectionCopyBtn" class="selection-copy" type="button" hidden>Copy selected text</button>

    <dialog id="helpDialog" class="help-dialog" aria-labelledby="helpTitle">
      <article class="help-card">
        <header class="help-header">
          <div>
            <p class="eyebrow">Service Principles</p>
            <h2 id="helpTitle">Service Principles</h2>
          </div>
          <button id="helpCloseBtn" class="help-close" type="button" aria-label="Close" title="Close">
            x
          </button>
        </header>
        <ol class="help-steps">
          <li>
            <strong>Open immediately</strong>
            <span>Use tools without creating an account or signing in.</span>
          </li>
          <li>
            <strong>Browser processing</strong>
            <span>Whenever practical, text and files are processed in the browser instead of through an application server API.</span>
          </li>
          <li>
            <strong>Privacy by default</strong>
            <span>Input text, selected files, recordings, and generated results are not stored in a ko-workspace account database.</span>
          </li>
          <li>
            <strong>Separated ads</strong>
            <span>Advertising areas stay outside the upload, input, conversion, and result controls.</span>
          </li>
        </ol>
      </article>
    </dialog>

    <script src="/app.js?v=${version}"></script>
  </body>
</html>
`;
}

function renderDocumentPage(config, version) {
  return `<!doctype html>
<html lang="en">
  <head>
${managedGoogleTag()}
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="${escapeAttr(config.description)}" />
    <meta name="robots" content="index,follow" />
    <meta name="theme-color" content="#e5322d" />
    <meta name="google-adsense-account" content="${ADSENSE_ID}" />
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}"
     crossorigin="anonymous"></script>
    <link rel="canonical" href="${ORIGIN}${config.canonicalPath}" />
    <link rel="alternate" hreflang="ko" href="${ORIGIN}${config.koPath}" />
    <link rel="alternate" hreflang="en" href="${ORIGIN}${config.canonicalPath}" />
    <link rel="alternate" hreflang="x-default" href="${ORIGIN}${config.koPath}" />
    <link rel="icon" href="/favicon.svg?v=${version}" type="image/svg+xml" />
    <title>${escapeHtml(config.title)}</title>
    <link rel="stylesheet" href="/styles.css?v=${version}" />
  </head>
  <body data-locale="en">
    <main class="document-page">
      <article class="document-panel">
        <p class="eyebrow">${escapeHtml(config.eyebrow)}</p>
        <h1>${escapeHtml(config.heading)}</h1>
${config.body}
        <p class="document-updated">Effective date: May 9, 2026</p>
        <p><a href="/en/">Back to the English app</a></p>
      </article>
      <footer class="site-footer document-footer">
        <span class="footer-brand">Dayway</span>
        <a href="https://dayway.web.app" target="_blank" rel="noopener noreferrer">dayway.web.app</a>
        <span class="footer-contact">For ads, partnership, and collaboration inquiries, contact us by email.</span>
        <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>
        <a href="/en/privacy/">Privacy Policy</a>
        <a href="/en/terms/">Terms</a>
      </footer>
    </main>
  </body>
</html>
`;
}

function renderStaticContent({ id, eyebrow, title, intro, subject, result }) {
  return `<!-- static-content:start -->
          <section class="panel static-content-panel" aria-labelledby="staticContentTitle-${escapeAttr(id)}">
            <details class="static-content-details">
              <summary>
                <div>
                  <p class="eyebrow">${escapeHtml(eyebrow)}</p>
                  <h2 id="staticContentTitle-${escapeAttr(id)}">${escapeHtml(title)}</h2>
                </div>
                <span class="static-content-toggle">Read more</span>
              </summary>
              <article class="static-content-article">
                <div class="static-content-body">
                  <p>
                    <span>${escapeHtml(intro)}</span>
                    <span>The goal is to remove the small steps that interrupt real work: opening heavy software, signing in, uploading a file, waiting for a queue, and then downloading a result just to continue a simple task.</span>
                    <span>ko-workspace keeps that flow compact so the user can finish the immediate job and return to the document, message, recording, or publishing task they were already doing.</span>
                  </p>
                  <p>
                    <span>For ${escapeHtml(subject)}, the useful path is intentionally direct.</span>
                    <span>Choose the input, check the available options, run the browser-side operation, review the output, and then copy or download ${escapeHtml(result)}.</span>
                    <span>This keeps the interface focused on the working surface instead of turning a small utility into a project management screen.</span>
                  </p>
                  <p>
                    <span>Files and text used in these tools may contain real work material, so the platform avoids building a storage workflow around them.</span>
                    <span>Where a task can be handled in the browser, the selected data stays in the local session and the user decides what to save.</span>
                    <span>External libraries may be loaded for specialized processing, but tool input, filenames, extracted content, recording data, and generated output are not intentionally sent as analytics event parameters.</span>
                  </p>
                  <p>
                    <span>Advertising and measurement are kept separate from the tool controls.</span>
                    <span>The upload areas, text boxes, conversion buttons, and result panes are treated as the working area, while ad placements are outside that flow.</span>
                    <span>This matters because a utility page should stay predictable when someone is finishing a deadline-sensitive document, checking a subtitle file, or preparing a recording for review.</span>
                  </p>
                  <p>
                    <span>The tools are practical helpers, not replacements for professional review.</span>
                    <span>Important transcripts, legal documents, public files, and client-facing material should still be checked by a person before use.</span>
                    <span>The platform is designed to make the repetitive middle steps faster while leaving the final judgment with the user.</span>
                  </p>
                </div>
                <aside class="static-content-notes" aria-label="Key points">
                  <h3>What this page emphasizes</h3>
                  <ul>
                    <li>Tool work data is handled with a browser-first workflow where practical.</li>
                    <li>Upload, input, conversion, and result controls stay separate from ad placements.</li>
                    <li>Each page explains realistic use cases so the result can be reviewed before it is trusted.</li>
                  </ul>
                </aside>
              </article>
            </details>
          </section>
          <!-- static-content:end -->`;
}

function privacyBody() {
  return `
        <section>
          <h2>1. Information processed by tools</h2>
          <p>Core ko-workspace tools run in the browser. Text entered by the user, selected files, recording output, uploaded background images, and generated results are not stored on the ko-workspace application server.</p>
          <p class="privacy-assurance">The service does not operate a member account database for these tools. If a user contacts us by email, the email address and message may be reviewed only to respond to that inquiry.</p>
        </section>
        <section>
          <h2>2. Browser permissions</h2>
          <p>Speech tools may request microphone permission, and webcam tools may request camera and optional microphone permission. Users can allow, block, or remove those permissions in their own browser settings.</p>
        </section>
        <section>
          <h2>3. Ads, analytics, and cookies</h2>
          <p>Google Tag Manager, Google Analytics, and Google AdSense may be used for measurement and advertising. Those providers may use cookies, advertising identifiers, or similar technologies under their own policies.</p>
          <p>ko-workspace is operated so that input text, file contents, recording data, generated outputs, extracted contacts, and filenames are not sent as custom analytics parameters.</p>
          <p>Google's use of advertising cookies is explained in <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google advertising technologies</a>. Users can manage personalized advertising in <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> or use browser and device settings. Some advertising choices may also be available through <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">digital advertising choice tools</a>.</p>
        </section>
        <section>
          <h2>4. Contact</h2>
          <p>Privacy, advertising, partnership, and collaboration inquiries can be sent to <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>.</p>
        </section>`;
}

function termsBody() {
  return `
        <section>
          <h2>1. Service scope</h2>
          <p>ko-workspace provides browser-based utilities for text, image, PDF, subtitle, audio, and video work. The tools are provided to help with practical office workflows and may change as browsers, libraries, and platform requirements change.</p>
        </section>
        <section>
          <h2>2. User responsibility</h2>
          <p>Users are responsible for checking whether generated results are accurate and appropriate for their own purpose. Transcripts, converted files, edited recordings, images, PDF output, and subtitle results should be reviewed before important use.</p>
        </section>
        <section>
          <h2>3. Browser environment</h2>
          <p>Some functions depend on modern browser APIs, local device performance, permissions, and supported file formats. A tool may not work on every browser, device, or unusual legacy format.</p>
        </section>
        <section>
          <h2>4. Ads and external services</h2>
          <p>The site may use Google Analytics, Google AdSense, CDN-hosted libraries, and other third-party resources needed to operate or measure the service. Advertising areas are separated from tool input and result controls.</p>
        </section>
        <section>
          <h2>5. Contact</h2>
          <p>Questions about the service can be sent to <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>.</p>
        </section>`;
}

function siteSchema(tools) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${ORIGIN}/en/#organization`,
        name: "ko-workspace",
        url: `${ORIGIN}/en/`,
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}/en/#website`,
        name: "ko-workspace",
        url: `${ORIGIN}/en/`,
        inLanguage: "en-US",
        description:
          "ko-workspace is a collection of browser-based text, image, PDF, subtitle, audio, and video tools that run without sign-up.",
        hasPart: {
          "@type": "ItemList",
          itemListElement: tools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.title,
            url: `${ORIGIN}${tool.path}`,
          })),
        },
      },
    ],
  };
}

function toolSchema(tool) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${tool.title} - ko-workspace`,
    url: `${ORIGIN}${tool.path}`,
    applicationCategory: "BusinessApplication",
    browserRequirements: "Requires a modern browser with JavaScript enabled",
    inLanguage: "en-US",
    description: tool.seoDescription || tool.summary,
    keywords: tool.keywords.join(", "),
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

function categorySchema(page, tools) {
  const categorySet = new Set(page.categories);
  const pageTools = tools.filter((tool) => categorySet.has(tool.category));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${page.title} - ko-workspace`,
    url: `${ORIGIN}${page.path}`,
    inLanguage: "en-US",
    description: page.metaDescription,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: pageTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: tool.title,
        url: `${ORIGIN}${tool.path}`,
      })),
    },
  };
}

function ensureKoreanAlternates(api) {
  const pairs = [
    ["index.html", "/", "/en/"],
    ["privacy.html", "/privacy", "/en/privacy/"],
    ["terms.html", "/terms", "/en/terms/"],
    ...api.tools.map((tool) => [`${tool.path.replace(/^\/en\//, "")}index.html`, tool.path.replace(/^\/en/, ""), tool.path]),
    ...api.categories.map((page) => [`${page.path.replace(/^\/en\//, "")}index.html`, page.path.replace(/^\/en/, ""), page.path]),
  ];

  for (const [relativeFile, koPath, enPath] of pairs) {
    const file = path.join(ROOT, relativeFile);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    const enHref = `${ORIGIN}${enPath}`;
    if (html.includes(`hreflang="en" href="${enHref}"`)) continue;
    const line = `    <link rel="alternate" hreflang="en" href="${enHref}" />`;
    const next = html.replace(
      /(\s*<link rel="alternate" hreflang="ko" href="[^"]+" \/>\r?\n)/,
      `$1${line}\n`
    );
    if (next === html) {
      throw new Error(`Could not insert English alternate in ${relativeFile} for ${koPath}`);
    }
    fs.writeFileSync(file, next);
  }
}

function ensureSitemap(api) {
  const file = path.join(ROOT, "sitemap.xml");
  let xml = fs.readFileSync(file, "utf8");
  const urls = [
    "/en/",
    "/en/privacy/",
    "/en/terms/",
    ...api.categories.map((page) => page.path),
    ...api.tools.map((tool) => tool.path),
  ];
  const blocks = [];
  for (const pathname of urls) {
    const loc = `${ORIGIN}${pathname}`;
    if (xml.includes(`<loc>${loc}</loc>`)) continue;
    blocks.push(`  <url>\n    <loc>${loc}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </url>`);
  }
  if (blocks.length) {
    xml = xml.replace("</urlset>", `${blocks.join("\n")}\n</urlset>`);
    fs.writeFileSync(file, xml);
  }
}

function writePage(relative, html, version) {
  const output = html.replaceAll("__ASSET_VERSION__", version);
  const file = path.join(ROOT, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, output);
}

function managedGoogleTag() {
  return `    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA4_ID}"></script>
    <script>${GTAG_SCRIPT}</script>
    <!-- End Google tag (gtag.js) -->`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

main();
