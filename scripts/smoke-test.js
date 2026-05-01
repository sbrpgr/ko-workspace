const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const APP_FILE = path.join(ROOT, "app.js");
const ORIGIN = "https://ko-workspace.com";

const API_NAMES = [
  "TOOL_DEFS",
  "CATEGORY_PAGE_DEFS",
  "cleanAiText",
  "countTextStats",
  "cleanLineBreaks",
  "extractContacts",
  "removeDuplicateLines",
  "replaceInText",
  "convertCase",
  "diffLines",
  "extractHttpUrlFromQrText",
  "cleanSrt",
  "detectSubtitleFormat",
  "convertSubtitle",
  "shiftSubtitleTimings",
  "parsePageRanges",
  "AUDIO_TRANSCRIPTION_MODEL_PROFILES",
  "AUDIO_TRANSCRIPTION_DEFAULT_PROFILE",
  "renderToolTitle",
  "getAudioModelProfile",
  "getAudioTranscriberCandidates",
  "formatAudioTranscriptionError",
  "preprocessAudioPcm",
  "encodePcm16Wav",
  "formatAudioPreprocessSummary",
  "cleanAudioTranscriptDraft",
  "breakAudioTranscriptSentences",
  "stripJpegMetadata",
  "stripPngMetadata",
  "stripWebpMetadata",
  "escapeHtml",
  "sanitizeFilename",
];

function main() {
  const app = fs.readFileSync(APP_FILE, "utf8");
  const api = loadAppApi(app);
  const tests = [
    ...buildStructureTests(api),
    ...buildLogicTests(api),
    ...buildMetadataTests(api),
    ...buildSecurityTests(api, app),
    ...buildUploadUxTests(app),
  ];

  const failures = [];
  for (const { name, run } of tests) {
    try {
      run();
    } catch (error) {
      failures.push(`${name}: ${error.message}`);
    }
  }

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }

  console.log(`smoke test passed (${tests.length} checks)`);
}

function loadAppApi(app) {
  const exportBlock = `\nglobalThis.__smokeApi = { ${API_NAMES.join(", ")} };\n`;
  const source = app.replace(/\r?\ninit\(\);\s*$/, exportBlock);
  if (source === app) {
    throw new Error("Could not remove init() from app.js for smoke testing.");
  }

  const context = {
    __smokeApi: {},
    console: {
      log() {},
      warn() {},
      error() {},
    },
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
      addEventListener() {},
      removeEventListener() {},
      open() {},
    },
    navigator: {
      clipboard: null,
      mediaDevices: null,
      permissions: null,
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
  vm.runInContext(source, context, { filename: APP_FILE });
  return context.__smokeApi;
}

function makeDocumentStub() {
  return {
    body: makeNodeStub(),
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
    classList: {
      add() {},
      remove() {},
      toggle() {},
      contains() {
        return false;
      },
    },
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

function buildStructureTests(api) {
  return [
    test("tool registry is populated", () => {
      assert(Array.isArray(api.TOOL_DEFS) && api.TOOL_DEFS.length >= 20, "TOOL_DEFS is unexpectedly small");
    }),
    test("tool pages exist and reference the app shell", () => {
      for (const tool of api.TOOL_DEFS) {
        const file = path.join(ROOT, tool.path, "index.html");
        assert(fs.existsSync(file), `missing page for ${tool.id}`);
        const html = read(file);
        assert(html.includes(`data-tool="${tool.id}"`), `${tool.id} page is missing data-tool`);
        assert(html.includes(`<link rel="canonical" href="${ORIGIN}${tool.path}"`), `${tool.id} page is missing canonical`);
        assert(/\/app\.js\?v=\d{8}-\d+/.test(html), `${tool.id} page is missing versioned app.js`);
      }
    }),
    test("sitemap includes all tool and category pages", () => {
      const sitemap = read(path.join(ROOT, "sitemap.xml"));
      for (const item of [...api.TOOL_DEFS, ...api.CATEGORY_PAGE_DEFS]) {
        assert(sitemap.includes(`<loc>${ORIGIN}${item.path}</loc>`), `sitemap missing ${item.path}`);
      }
    }),
  ];
}

function buildLogicTests(api) {
  const srt = "1\n00:00:01,000 --> 00:00:02,000\nHello\n\n2\n00:00:03,000 --> 00:00:04,000\nWorld";
  return [
    test("case converter handles camel and snake case", () => {
      assert(api.convertCase("hello world", "camel") === "helloWorld", "camelCase conversion failed");
      assert(api.convertCase("Hello World", "snake") === "hello_world", "snake_case conversion failed");
    }),
    test("find and replace returns count and text", () => {
      const result = api.replaceInText("alpha beta alpha", "alpha", "x", {
        caseSensitive: true,
        wholeWord: false,
        useRegex: false,
      });
      assert(result.text === "x beta x" && result.count === 2, "replaceInText result mismatch");
    }),
    test("duplicate line remover removes repeated values", () => {
      const result = api.removeDuplicateLines("A\nB\na\n\n", {
        trimLines: true,
        caseSensitive: false,
        ignoreEmpty: true,
        sortLines: false,
      });
      assert(result.lines.join("\n") === "A\nB" && result.removedCount === 1, "duplicate removal failed");
    }),
    test("text extractor finds email, url, and phone", () => {
      const result = api.extractContacts("mail test@example.com https://example.com call 02-1234-5678");
      assert(result.emails[0] === "test@example.com", "email extraction failed");
      assert(result.urls[0] === "https://example.com", "url extraction failed");
      assert(result.phones[0] === "02-1234-5678", "phone extraction failed");
    }),
    test("line break cleaner joins paragraph lines", () => {
      const result = api.cleanLineBreaks("A\nB\n\nC", {
        trimLines: true,
        joinLines: true,
        collapseBlank: true,
        collapseSpaces: true,
        sentenceBreak: false,
      });
      assert(result === "A B\n\nC", "line break cleanup failed");
    }),
    test("line break cleaner joins Korean particle line wraps without extra spaces", () => {
      const result = api.cleanLineBreaks("소상공인이기업으\n로성장할수있도록", {
        trimLines: true,
        joinLines: true,
        collapseBlank: true,
        collapseSpaces: true,
        sentenceBreak: false,
      });
      assert(result === "소상공인이기업으로성장할수있도록", "Korean particle wrap cleanup failed");
    }),
    test("line break cleaner breaks sentences before Korean opening quotes", () => {
      const result = api.cleanLineBreaks("육성하고있습니다.「2026년\n소상공인도약지원사업」", {
        trimLines: true,
        joinLines: true,
        collapseBlank: true,
        collapseSpaces: true,
        sentenceBreak: true,
      });
      assert(result.includes("육성하고있습니다.\n「2026년"), "opening quote sentence break failed");
      assert(!result.includes("육성하고있습니다.「2026년"), "opening quote remained on same line");
    }),
    test("AI text cleaner removes markdown markers", () => {
      const result = api.cleanAiText("## Title\n\n**Bold** [Link](https://example.com)", {
        stripHtml: true,
        mode: "plain",
        removeCodeFences: true,
        removeHeadings: true,
        linkMode: "text",
        removeEmphasis: true,
        normalizeBullets: true,
        trimBlankLines: true,
      });
      assert(!result.includes("##") && !result.includes("**") && result.includes("Title"), "AI cleanup failed");
    }),
    test("subtitle conversion and timing shift work", () => {
      const vtt = api.convertSubtitle(srt, "srt", "vtt");
      assert(vtt.startsWith("WEBVTT"), "SRT to VTT conversion failed");
      assert(api.detectSubtitleFormat(vtt) === "vtt", "VTT detection failed");
      assert(api.shiftSubtitleTimings(srt, "srt", 500).includes("00:00:01,500"), "subtitle timing shift failed");
    }),
    test("PDF page range parser removes duplicates and out-of-range pages", () => {
      assert(api.parsePageRanges("1-3,2,5,99", 5).join(",") === "0,1,2,4", "page range parsing failed");
    }),
    test("audio transcript sentence breaker splits sentence endings", () => {
      const result = api.breakAudioTranscriptSentences("첫 문장입니다. 다음 문장인가요?마지막 문장입니다. 버전 1.2입니다");
      assert(
        result === "첫 문장입니다.\n다음 문장인가요?\n마지막 문장입니다.\n버전 1.2입니다",
        "audio sentence line breaks failed"
      );
    }),
    test("audio transcription keeps browser-compatible backend candidates", () => {
      const autoCandidates = api.getAudioTranscriberCandidates("auto");
      const webGpuCandidates = api.getAudioTranscriberCandidates("webgpu", true);
      const unavailableWebGpuCandidates = api.getAudioTranscriberCandidates("webgpu", false);
      const cpuQualityCandidates = api.getAudioTranscriberCandidates("wasm");
      const lightweightCandidates = api.getAudioTranscriberCandidates("lightweight");
      assert(autoCandidates[0].device === "wasm", "auto mode should try wasm first");
      assert(autoCandidates[0].dtype.decoder_model_merged === "fp16", "auto mode without WebGPU should use stable mixed precision");
      assert(webGpuCandidates[0].device === "webgpu", "webgpu mode should honor explicit choice");
      assert(webGpuCandidates[0].dtype.decoder_model_merged === "fp32", "webgpu mode should use fp32 decoder first");
      assert(unavailableWebGpuCandidates[0].device === "wasm", "webgpu mode should fall back when no adapter is available");
      assert(cpuQualityCandidates[0].dtype === "fp32", "CPU quality mode should opt into fp32 first");
      assert(lightweightCandidates[0].dtype.decoder_model_merged === "fp16", "lightweight mode should keep mixed precision first");
      assert(lightweightCandidates.length === 1, "lightweight mode should not try heavier fp32 by default");
    }),
    test("audio transcription defaults to quality profile and keeps fast fallback", () => {
      assert(api.AUDIO_TRANSCRIPTION_DEFAULT_PROFILE === "quality", "quality model should be the default profile");
      assert(api.AUDIO_TRANSCRIPTION_MODEL_PROFILES.quality.model === "onnx-community/whisper-base", "quality profile should use whisper-base");
      assert(api.AUDIO_TRANSCRIPTION_MODEL_PROFILES.quality.runtimeMode === "lightweight", "quality profile should use the compatible wasm path");
      assert(api.AUDIO_TRANSCRIPTION_MODEL_PROFILES.stable.model === "onnx-community/whisper-tiny", "fast fallback should use whisper-tiny");
      assert(api.getAudioModelProfile("fast").id === "stable", "fast profile alias should use the stable fallback");
      assert(api.getAudioModelProfile("missing").id === "quality", "missing model profile should fall back to the default quality profile");
    }),
    test("beta tool title attaches beta label without a whitespace break", () => {
      const title = api.renderToolTitle({ title: "녹음 파일 텍스트 변환", beta: true });
      assert(
        title === '<span class="tool-title-with-beta">녹음 파일 텍스트 변환<span class="tool-beta-label">(베타)</span></span>',
        "beta label should be attached without leading whitespace"
      );
    }),
    test("audio transcript cleaner removes consecutive repeated hallucination sentences", () => {
      const result = api.cleanAudioTranscriptDraft("너 말고 누굴 밀었다는거에요? 정중국은? 정중국은? 정중국은? 일단 알았다.");
      assert(result === "너 말고 누굴 밀었다는거에요? 일단 알았다.", "audio repeated sentence cleanup failed");
    }),
    test("audio transcript cleaner removes comma-separated repeated hallucination phrases", () => {
      const result = api.cleanAudioTranscriptDraft(
        "너 안 밀었다는 건 뭔 소리야? 너 말고 누구를 밀었다는 거야? 정승호의 인상, 정승호의 인상, 정승호의 인상, 정승호의 인상, 정승호의 그 틈에 됐어?"
      );
      assert(
        result === "너 안 밀었다는 건 뭔 소리야? 너 말고 누구를 밀었다는 거야? 정승호의 그 틈에 됐어?",
        "audio comma-separated repeated phrase cleanup failed"
      );
    }),
    test("audio transcript cleaner removes space-separated dominant hallucination fragments", () => {
      const result = api.cleanAudioTranscriptDraft(
        "너 안 밀었다는 건 뭔 소리야? 너 말고 누굴 밀었다는 거야? 정승호의 인상 정승호의 인상의 인상의 인상의 인상의 인상의 인상의 인상의 인 네. 네 쪽에서 이야기했다."
      );
      assert(!result.includes("정승호의 인상"), "audio dominant repeated fragment cleanup failed");
      assert(result.includes("네 쪽에서 이야기했다."), "audio cleanup should keep the next non-repeated sentence");
    }),
    test("audio preprocessing trims edge silence and normalizes quiet speech", () => {
      const sampleRate = 16000;
      const samples = new Float32Array(sampleRate * 3);
      for (let index = sampleRate; index < sampleRate * 2; index += 1) {
        samples[index] = Math.sin((index / sampleRate) * Math.PI * 2 * 440) * 0.08;
      }
      const result = api.preprocessAudioPcm(samples, sampleRate);
      assert(result.sampleRate === 16000, "audio preprocessing should output 16kHz PCM");
      assert(result.samples.length < samples.length, "audio preprocessing should trim edge silence");
      assert(result.stats.removedSeconds > 0.5, "audio preprocessing should report trimmed edge silence");
      assert(result.stats.gain > 1, "audio preprocessing should amplify quiet speech");
      const wav = api.encodePcm16Wav(result.samples, result.sampleRate);
      assert(wav.byteLength === 44 + result.samples.length * 2, "wav encoding size is invalid");
      assert(api.formatAudioPreprocessSummary(result.stats).includes("전처리 완료"), "preprocess summary missing");
    }),
    test("audio preprocessing preserves internal pauses around quiet speech", () => {
      const sampleRate = 16000;
      const samples = new Float32Array(sampleRate * 4);
      for (let index = Math.floor(sampleRate * 0.2); index < Math.floor(sampleRate * 0.6); index += 1) {
        samples[index] = Math.sin((index / sampleRate) * Math.PI * 2 * 330) * 0.012;
      }
      for (let index = Math.floor(sampleRate * 2.2); index < Math.floor(sampleRate * 2.6); index += 1) {
        samples[index] = Math.sin((index / sampleRate) * Math.PI * 2 * 330) * 0.012;
      }
      const result = api.preprocessAudioPcm(samples, sampleRate);
      assert(result.stats.processedSeconds > 3, "audio preprocessing should preserve internal low-volume pauses");
      assert(result.stats.gain > 4, "audio preprocessing should lift quiet conversational speech");
    }),
    test("audio transcription fetch failures explain network and model loading", () => {
      const result = api.formatAudioTranscriptionError(new Error("Failed to fetch"));
      assert(result.includes("cdn.jsdelivr.net") && result.includes("huggingface.co"), "fetch error guidance is too vague");
    }),
    test("audio transcription session failures explain dtype compatibility", () => {
      const result = api.formatAudioTranscriptionError(new Error("Missing required scale"));
      assert(result.includes("정밀도") && result.includes("CPU 경량/호환"), "session error guidance is too vague");
    }),
    test("text diff counts add and remove rows", () => {
      const result = api.diffLines("A\nB", "A\nC");
      assert(result.kept === 1 && result.removed === 1 && result.added === 1, "diff counts failed");
    }),
    test("QR URL extractor normalizes safe http urls", () => {
      assert(api.extractHttpUrlFromQrText("www.example.com/path") === "https://www.example.com/path", "QR URL extraction failed");
    }),
    test("HTML and filename helpers are safe", () => {
      assert(api.escapeHtml("<script>") === "&lt;script&gt;", "escapeHtml failed");
      assert(api.sanitizeFilename("a/b:c*.txt") === "a_b_c_.txt", "sanitizeFilename failed");
    }),
    test("text stats count characters and bytes", () => {
      const result = api.countTextStats("abc def");
      assert(result.characters === 7 && result.words === 2 && result.bytes === 7, "text stats failed");
    }),
  ];
}

function buildMetadataTests(api) {
  return [
    test("JPEG metadata stripping removes EXIF", () => {
      const result = api.stripJpegMetadata(makeJpegWithExif());
      assert(result.removedLabels.includes("EXIF"), "JPEG EXIF was not detected");
      assert(!result.bytes.includes(0x45) || result.bytes.length < makeJpegWithExif().length, "JPEG output was not reduced");
    }),
    test("PNG metadata stripping removes text chunks", () => {
      const result = api.stripPngMetadata(makePngWithText());
      assert(result.removedLabels.includes("Text"), "PNG text metadata was not detected");
      assert(result.bytes.length < makePngWithText().length, "PNG output was not reduced");
    }),
    test("WebP metadata stripping removes EXIF and XMP", () => {
      const result = api.stripWebpMetadata(makeWebpWithMetadata());
      assert(result.removedLabels.includes("EXIF") && result.removedLabels.includes("XMP"), "WebP metadata was not detected");
      assert(result.bytes.length < makeWebpWithMetadata().length, "WebP output was not reduced");
    }),
  ];
}

function buildSecurityTests(api, app) {
  return [
    test("security headers keep defensive defaults", () => {
      const headers = read(path.join(ROOT, "_headers"));
      assert(headers.includes("X-Content-Type-Options: nosniff"), "missing nosniff");
      assert(headers.includes("X-Frame-Options: DENY"), "missing frame deny");
      assert(headers.includes("Strict-Transport-Security:"), "missing HSTS");
      assert(headers.includes("object-src 'none'"), "CSP missing object-src none");
      assert(headers.includes("base-uri 'self'"), "CSP missing base-uri self");
      assert(headers.includes("frame-ancestors 'none'"), "CSP missing frame-ancestors none");
      const scriptSrc = getCspDirective(headers, "script-src");
      const connectSrc = getCspDirective(headers, "connect-src");
      const mediaSrc = getCspDirective(headers, "media-src");
      const workerSrc = getCspDirective(headers, "worker-src");
      assert(!scriptSrc.includes("'unsafe-inline'"), "script-src allows unsafe-inline");
      assert(scriptSrc.includes("blob:"), "script-src must allow blob: for browser STT backend modules");
      assert(scriptSrc.includes("'wasm-unsafe-eval'"), "script-src must allow wasm-unsafe-eval for browser STT backends");
      assert(connectSrc.includes("blob:"), "connect-src must allow blob: for selected browser audio files");
      assert(mediaSrc.includes("blob:"), "media-src must allow blob: for selected browser audio playback");
      assert(workerSrc.includes("blob:"), "worker-src must allow blob: for browser STT backend workers");
    }),
    test("client code avoids dangerous dynamic execution", () => {
      assert(!/\beval\s*\(/.test(app), "eval is present");
      assert(!/\bFunction\s*\(/.test(app), "Function constructor is present");
      assert(!/document\.write\s*\(/.test(app), "document.write is present");
      assert(app.includes('window.open(state.safeUrl, "_blank", "noopener,noreferrer")'), "external open lacks noopener");
    }),
    test("rendered user-facing helpers escape generated HTML", () => {
      assert(api.escapeHtml("\"'&<>") === "&quot;&#39;&amp;&lt;&gt;", "escape helper regression");
    }),
  ];
}

function buildUploadUxTests(app) {
  return [
    test("all file inputs have drag-and-drop coverage", () => {
      const ids = new Set([...app.matchAll(/<input id="([^"]+)"[^>]*type="file"/g)].map((match) => match[1]));
      const supportedIds = new Set([
        "backgroundImageFile",
        "audioFile",
        "qrImageFile",
        "imageFile",
        "exifImageFile",
        "pdfFiles",
        "pdfFile",
        "imageFiles",
        "subtitleFile",
      ]);
      for (const id of ids) {
        assert(supportedIds.has(id), `file input ${id} does not have declared drag support`);
      }
      assert(app.includes("background-drop-zone"), "webcam background drop zone missing");
      assert(app.includes("subtitle-drop-zone"), "subtitle drop zone missing");
      assert(app.includes("function bindFileDropZone"), "shared drop binding missing");
      assert(app.includes("function setFileInputFiles"), "drop file setter missing");
    }),
  ];
}

function test(name, run) {
  return { name, run };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function getCspDirective(headers, name) {
  const cspLine = headers
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find((line) => line.startsWith("Content-Security-Policy:"));
  assert(cspLine, "missing CSP");
  const directive = cspLine
    .replace(/^Content-Security-Policy:\s*/, "")
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name} `));
  return directive || "";
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function makeJpegWithExif() {
  return bytes([0xff, 0xd8, 0xff, 0xe1, 0x00, 0x08], ascii("Exif\0\0"), [0xff, 0xda, 0x00, 0x00, 0xff, 0xd9]);
}

function makePngWithText() {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  return bytes(signature, pngChunk("tEXt", ascii("Title\0demo")), pngChunk("IEND", []));
}

function makeWebpWithMetadata() {
  const chunks = [
    riffChunk("VP8X", [0x0c, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
    riffChunk("EXIF", ascii("demo")),
    riffChunk("XMP ", ascii("abc")),
    riffChunk("VP8 ", ascii("data")),
  ];
  const body = bytes(ascii("WEBP"), ...chunks);
  return bytes(ascii("RIFF"), writeUint32le(body.length), body);
}

function pngChunk(type, data) {
  return bytes(writeUint32be(data.length), ascii(type), data, [0, 0, 0, 0]);
}

function riffChunk(type, data) {
  const padding = data.length % 2 ? [0] : [];
  return bytes(ascii(type), writeUint32le(data.length), data, padding);
}

function ascii(text) {
  return [...text].map((char) => char.charCodeAt(0));
}

function writeUint32be(value) {
  return [(value >>> 24) & 0xff, (value >>> 16) & 0xff, (value >>> 8) & 0xff, value & 0xff];
}

function writeUint32le(value) {
  return [value & 0xff, (value >>> 8) & 0xff, (value >>> 16) & 0xff, (value >>> 24) & 0xff];
}

function bytes(...parts) {
  const flat = parts.flatMap((part) => Array.from(part));
  return Uint8Array.from(flat);
}

main();
