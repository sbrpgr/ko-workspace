const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const ROOT = path.resolve(__dirname, "..");
const ORIGIN = "https://ko-workspace.com";
const TODAY = "2026-05-16";
const GA4_ID = "G-8S4R46L9Q0";
const ADSENSE_ID = "ca-pub-5869520985295558";
const KOFI_SUPPORT_URL = "https://ko-fi.com/sbgkp";

const GTAG_SCRIPT = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', '${GA4_ID}');`;

const LOCALES = [
  {
    id: "en",
    hreflang: "en",
    htmlLang: "en",
    languageCode: "en-US",
    ogLocale: "en_US",
    homePath: "/en/",
    privacyPath: "/en/privacy/",
    termsPath: "/en/terms/",
    nav: {
      brandSubname: "Browser tools",
      brandHomeAria: "Go to ko-workspace English home",
      search: "Search tools",
      privacy: "Privacy",
      terms: "Terms",
      footerContact: "For ads, partnership, and collaboration inquiries, contact us by email.",
      backHome: "Back to the English app",
    },
    home: {
      title: "ko-workspace | Browser-based Office Tools",
      description:
        "ko-workspace is a collection of browser-based text, image, PDF, subtitle, audio, and video tools that run without sign-up.",
      eyebrow: "Browser-side Office Utilities",
      heading: "ko-workspace",
      hero:
        "Run practical text, image, PDF, subtitle, audio, and video tools directly in your browser.",
      staticEyebrow: "Practical Workflows",
      staticTitle: "ko-workspace scenarios",
      staticIntro:
        "ko-workspace is built for the small browser tasks that sit between larger pieces of work.",
    },
    toolEyebrow: "Free Online Tool",
    guideEyebrow: "Quick Flow",
    guideTitle: "Workflow",
    categoryTitleSuffix: "Free Online Tools",
    static: {
      useCase: "Use Case",
      categoryGuide: "Category Guide",
      result: "the browser-generated result",
      categoryResult: "the output files or copied text from the selected tools",
      readMore: "Read more",
      notesTitle: "What this page emphasizes",
      notes: [
        "Tool work data is handled with a browser-first workflow where practical.",
        "Upload, input, conversion, and result controls stay separate from ad placements.",
        "Each page explains realistic use cases so the result can be reviewed before it is trusted.",
      ],
      paragraphs: ({ intro, subject, result }) => [
        `${intro} The goal is to remove the small steps that interrupt real work: opening heavy software, signing in, uploading a file, waiting for a queue, and then downloading a result just to continue a simple task.`,
        `For ${subject}, the useful path is intentionally direct. Choose the input, check the available options, run the browser-side operation, review the output, and then copy or download ${result}.`,
        "Files and text used in these tools may contain real work material, so the platform avoids building a storage workflow around them. Where a task can be handled in the browser, the selected data stays in the local session and the user decides what to save.",
        "Advertising and measurement are kept separate from the tool controls. Upload areas, text boxes, conversion buttons, and result panes are treated as the working area, while ad placements are outside that flow.",
        "The tools are practical helpers, not replacements for professional review. Important transcripts, legal documents, public files, and client-facing material should still be checked by a person before use.",
      ],
    },
    document: {
      privacyTitle: "Privacy Policy | ko-workspace",
      privacyDescription:
        "The ko-workspace privacy policy explains browser-side processing, analytics, ads, cookies, and contact handling.",
      privacyHeading: "Privacy Policy",
      termsTitle: "Terms of Use | ko-workspace",
      termsDescription:
        "The ko-workspace terms explain browser-based tools, user responsibility, service changes, ads, and contact information.",
      termsHeading: "Terms of Use",
      effective: "Effective date: May 9, 2026",
    },
    statusPills: ["No sign-up", "Browser processing", "No app-server storage", "No input database"],
    help: {
      button: "View service principles",
      eyebrow: "Service Principles",
      title: "Service Principles",
      close: "Close",
      steps: [
        ["Open immediately", "Use tools without creating an account or signing in."],
        ["Browser processing", "Whenever practical, text and files are processed in the browser instead of through an application server API."],
        ["Privacy by default", "Input text, selected files, recordings, and generated results are not stored in a ko-workspace account database."],
        ["Separated ads", "Advertising areas stay outside the upload, input, conversion, and result controls."],
      ],
    },
  },
  {
    id: "ja",
    hreflang: "ja",
    htmlLang: "ja",
    languageCode: "ja-JP",
    ogLocale: "ja_JP",
    homePath: "/ja/",
    privacyPath: "/ja/privacy/",
    termsPath: "/ja/terms/",
    nav: {
      brandSubname: "ブラウザツール",
      brandHomeAria: "ko-workspace日本語ホームへ移動",
      search: "ツールを検索",
      privacy: "プライバシー",
      terms: "利用規約",
      footerContact: "広告、提携、コラボレーションに関するお問い合わせはメールでご連絡ください。",
      backHome: "日本語版アプリへ戻る",
    },
    home: {
      title: "ko-workspace | ブラウザで使える業務ツール",
      description:
        "ko-workspaceは、登録なしで使えるブラウザ処理中心のテキスト、画像、PDF、字幕、音声、動画ツール集です。",
      eyebrow: "ブラウザ型業務ツール",
      heading: "ko-workspace",
      hero: "テキスト、画像、PDF、字幕、音声、動画の小さな作業をブラウザ内で処理します。",
      staticEyebrow: "実用ワークフロー",
      staticTitle: "ko-workspaceの使いどころ",
      staticIntro:
        "ko-workspaceは、大きな作業の間に挟まる小さなブラウザ作業をすばやく片付けるためのツール集です。",
    },
    toolEyebrow: "無料オンラインツール",
    guideEyebrow: "使い方",
    guideTitle: "操作の流れ",
    categoryTitleSuffix: "無料オンラインツール",
    static: {
      useCase: "利用シーン",
      categoryGuide: "カテゴリガイド",
      result: "ブラウザで生成された結果",
      categoryResult: "選択したツールの出力ファイルやコピー用テキスト",
      readMore: "詳しく見る",
      scenarioListTitle: "よくある使い方",
      toolScenarioTitle: (title) => `${title}の利用シーン`,
      categoryScenarioTitle: (title) => `${title}の活用シーン`,
      notesTitle: "このページの要点",
      notes: [
        "会議、提出、共有、公開前チェックなど、日本の実務で起こりやすい小さな作業を想定しています。",
        "アップロード、入力、変換、結果表示の操作面と広告枠を分けています。",
        "結果をそのまま使い切らず、共有前に人が確認しやすい流れを前提にしています。",
      ],
      categoryScenarios: {
        text: [
          "社内メール、チャット、報告書、採用書類など、短い文章を提出前に整えます。",
          "AI回答、PDFからのコピー、名簿データなど、貼り付けると崩れやすいテキストを扱います。",
          "文字数、差分、重複、連絡先抽出など、手作業だと見落としやすい確認を軽くします。",
        ],
        pdf: [
          "見積書、請求書、契約書、申請資料など、相手に渡すPDFを提出順に整えます。",
          "長い資料から必要ページだけを取り出し、会議や確認依頼に使いやすくします。",
          "スキャン画像や写真資料をPDF化し、メールや業務システムに添付しやすくします。",
        ],
        image: [
          "応募フォーム、学校提出、自治体手続きなどの容量やサイズ制限に合わせます。",
          "ブログ、EC、社内資料に使う画像を、見た目を確認しながら軽く整えます。",
          "写真を共有する前に位置情報などのメタデータを外し、安心して渡せる状態にします。",
        ],
        subtitle: [
          "YouTube、社内研修、講義動画の字幕を公開前に整えます。",
          "SRTとVTTを使い分け、動画編集ソフトやWebプレイヤーの指定形式に合わせます。",
          "字幕の時間が少しずれたとき、全体をまとめて補正します。",
        ],
        "voice-video": [
          "打ち合わせ録音、研修動画、自己紹介動画などを共有前の下準備に使います。",
          "スマートフォン録音やブラウザ録画を、サーバー保存なしの流れで確認・整理します。",
          "文字起こしや録画結果は、公開前に必ず人が確認する前提で扱います。",
        ],
      },
      paragraphs: ({ intro, subject, result }) => [
        `${intro} 日本語の実務では、稟議書、提出資料、社内共有、学校や自治体への提出など、少し整えるだけで次の確認が楽になる場面が多くあります。`,
        `${subject}は、その場で大きなアプリを開くほどではない作業を、入力、確認、処理、${result}のコピーまたは保存まで短く済ませるための補助として使えます。`,
        "扱うファイルやテキストには、取引先名、個人名、録音内容、写真の位置情報などが含まれることがあります。ブラウザで処理できる作業はローカルセッション内にとどめ、保存や共有の判断は利用者側で行う設計にしています。",
        "広告と計測は作業操作から分離しています。アップロード領域、入力欄、変換ボタン、結果プレビューの中に広告を入れないことで、急ぎの提出前でも操作を見失いにくくしています。",
        "各ツールは下準備を速くするための補助であり、最終確認を置き換えるものではありません。重要な文書、字幕、録音、公開資料は、共有や提出の前に人が内容を確認してください。",
      ],
    },
    document: {
      privacyTitle: "プライバシーポリシー | ko-workspace",
      privacyDescription:
        "ko-workspaceのブラウザ内処理、分析、広告、Cookie、お問い合わせの扱いを説明します。",
      privacyHeading: "プライバシーポリシー",
      termsTitle: "利用規約 | ko-workspace",
      termsDescription:
        "ko-workspaceのブラウザベースツール、利用者の確認責任、サービス変更、広告、連絡先について説明します。",
      termsHeading: "利用規約",
      effective: "施行日: 2026年5月16日",
    },
    statusPills: ["登録不要", "ブラウザ処理", "アプリサーバー保存なし", "入力DBなし"],
    help: {
      button: "サービス方針を見る",
      eyebrow: "サービス方針",
      title: "サービス方針",
      close: "閉じる",
      steps: [
        ["すぐに使える", "アカウント作成やログインなしでツールを開けます。"],
        ["ブラウザ処理", "可能な作業はアプリケーションサーバーAPIではなくブラウザ内で処理します。"],
        ["プライバシー優先", "入力テキスト、選択ファイル、録音、生成結果はko-workspaceの会員DBに保存しません。"],
        ["広告を分離", "広告領域はアップロード、入力、変換、結果操作の外側に配置します。"],
      ],
    },
  },
  {
    id: "zh",
    hreflang: "zh-Hans",
    htmlLang: "zh-Hans",
    languageCode: "zh-CN",
    ogLocale: "zh_CN",
    homePath: "/zh/",
    privacyPath: "/zh/privacy/",
    termsPath: "/zh/terms/",
    nav: {
      brandSubname: "浏览器工具",
      brandHomeAria: "前往 ko-workspace 中文首页",
      search: "搜索工具",
      privacy: "隐私",
      terms: "条款",
      footerContact: "广告、合作和伙伴咨询请通过电子邮件联系。",
      backHome: "返回中文应用",
    },
    home: {
      title: "ko-workspace | 浏览器办公工具",
      description:
        "ko-workspace 是一组无需注册、以浏览器本地处理为中心的文本、图片、PDF、字幕、音频和视频工具。",
      eyebrow: "浏览器办公工具",
      heading: "ko-workspace",
      hero: "直接在浏览器中处理文本、图片、PDF、字幕、音频和视频的日常小任务。",
      staticEyebrow: "实用工作流",
      staticTitle: "ko-workspace 使用场景",
      staticIntro:
        "ko-workspace 面向夹在大型工作之间的小型浏览器任务，让这些步骤更快完成。",
    },
    toolEyebrow: "免费在线工具",
    guideEyebrow: "使用流程",
    guideTitle: "操作步骤",
    categoryTitleSuffix: "免费在线工具",
    static: {
      useCase: "使用场景",
      categoryGuide: "类别指南",
      result: "浏览器生成的结果",
      categoryResult: "所选工具输出的文件或可复制文本",
      readMore: "阅读更多",
      scenarioListTitle: "常见使用场景",
      toolScenarioTitle: (title) => `${title}使用场景`,
      categoryScenarioTitle: (title) => `${title}适用场景`,
      notesTitle: "本页重点",
      notes: [
        "围绕会议纪要、材料提交、群内协作、内容发布前检查等常见中文办公场景编写。",
        "上传、输入、转换和结果控件与广告位置保持分离。",
        "工具负责减少重复步骤，最终内容仍建议在转发、提交或公开前人工确认。",
      ],
      categoryScenarios: {
        text: [
          "整理飞书、企业微信、邮件、报告、客服话术中的文本，让复制和转发更顺畅。",
          "处理AI回答、PDF复制内容、名单、链接和关键词列表，减少手动清理时间。",
          "在提交简历、公告、方案或运营文案前，快速检查字数、差异和重复内容。",
        ],
        pdf: [
          "合并合同、报价单、报销材料、投标附件或学校申请资料，按提交顺序整理。",
          "从长PDF中提取关键页，发给同事、客户或老师确认。",
          "把收据、截图、扫描图合成PDF，方便归档、发送和系统上传。",
        ],
        image: [
          "按照报名系统、政务表单、学校或公司后台的尺寸和容量要求处理图片。",
          "为电商、公众号、官网或群公告准备更轻、更合适的图片文件。",
          "分享照片前去掉位置和设备信息，降低不必要的隐私暴露。",
        ],
        subtitle: [
          "为课程视频、访谈、短视频或内部培训整理SRT/VTT字幕。",
          "根据视频平台、播放器或剪辑软件要求切换字幕格式。",
          "字幕整体快慢不一致时，按秒调整全片时间轴。",
        ],
        "voice-video": [
          "把会议录音、培训录屏、产品演示或自我介绍视频整理成便于复核的材料。",
          "在浏览器中处理手机录音、摄像头录制和文字草稿，减少临时安装软件的麻烦。",
          "转写、剪辑和录制结果都建议在发给同事、客户或公开发布前人工确认。",
        ],
      },
      paragraphs: ({ intro, subject, result }) => [
        `${intro} 在中文办公环境里，很多任务并不需要打开大型软件：可能只是整理一段群消息、压缩几张图片、拆出几页PDF，或把录音先变成可校对的文字。`,
        `${subject}适合放在这些中间步骤里使用。选择输入，确认必要选项，在浏览器端完成处理，再复制或下载${result}，就可以回到原来的文档、群聊、表格或提交流程。`,
        "这些文本和文件可能包含客户信息、联系方式、合同页、录音内容或照片位置等敏感资料。因此，能在浏览器中完成的处理会尽量留在本地会话中，由用户自行决定是否保存和分享。",
        "广告和统计与工具操作保持分离。上传区、文本框、转换按钮和结果预览都被视为工作区域，避免在赶材料、发通知或提交文件时干扰操作。",
        "这些工具用于减少重复劳动，并不替代人工审核。合同、公开材料、客户文件、字幕和转写稿在正式发送或发布前，仍应由人确认内容是否准确。",
      ],
    },
    document: {
      privacyTitle: "隐私政策 | ko-workspace",
      privacyDescription:
        "ko-workspace 隐私政策说明浏览器内处理、分析、广告、Cookie 和联系信息的处理方式。",
      privacyHeading: "隐私政策",
      termsTitle: "使用条款 | ko-workspace",
      termsDescription:
        "ko-workspace 条款说明浏览器工具、用户责任、服务变更、广告和联系信息。",
      termsHeading: "使用条款",
      effective: "生效日期：2026年5月16日",
    },
    statusPills: ["无需注册", "浏览器处理", "应用服务器不保存", "无输入数据库"],
    help: {
      button: "查看服务原则",
      eyebrow: "服务原则",
      title: "服务原则",
      close: "关闭",
      steps: [
        ["立即打开", "无需创建账户或登录即可使用工具。"],
        ["浏览器处理", "在可行范围内，文本和文件通过浏览器处理，而不是发送到应用服务器API。"],
        ["默认重视隐私", "输入文本、所选文件、录音和生成结果不会保存到ko-workspace账户数据库。"],
        ["广告分离", "广告区域位于上传、输入、转换和结果控件之外。"],
      ],
    },
  },
];

function getKofiSupportLabel(localeId) {
  if (localeId === "ja") {
    return "コーヒーを奢る ☕";
  }
  return "Support Me on Ko-fi";
}

function main() {
  const app = fs.readFileSync(path.join(ROOT, "app.js"), "utf8");
  const version = readAssetVersion();
  const apis = new Map(LOCALES.map((locale) => [locale.id, loadLocalizedApi(app, locale)]));

  for (const locale of LOCALES) {
    const api = apis.get(locale.id);
    renderLocale(locale, api, version);
  }

  ensureBaseAlternates(apis);
  ensureSitemap(apis);
  console.log(`generated localized pages for ${LOCALES.map((locale) => locale.id).join(", ")}`);
}

function renderLocale(locale, api, version) {
  writePage(`${locale.id}/index.html`, renderAppPage({
    kind: "home",
    locale,
    title: locale.home.title,
    description: locale.home.description,
    canonicalPath: locale.homePath,
    koPath: "/",
    bodyAttrs: `data-locale="${locale.id}" data-page="home"`,
    heroEyebrow: locale.home.eyebrow,
    heroTitle: locale.home.heading,
    heroDescription: locale.home.hero,
    schema: siteSchema(api.tools, locale),
    staticContent: renderStaticContent(locale, {
      id: `home-${locale.id}`,
      eyebrow: locale.home.staticEyebrow,
      title: locale.home.staticTitle,
      intro: locale.home.staticIntro,
      subject: "ko-workspace",
      result: locale.static.categoryResult,
    }),
  }, version), version);

  for (const tool of api.tools) {
    writePage(`${tool.path.slice(1)}index.html`, renderAppPage({
      kind: "tool",
      locale,
      title: `${tool.seoTitle} | ko-workspace`,
      description: tool.seoDescription || tool.summary,
      canonicalPath: tool.path,
      koPath: tool.path.replace(new RegExp(`^/${locale.id}`), ""),
      bodyAttrs: `data-locale="${locale.id}" data-tool="${escapeAttr(tool.id)}"`,
      heroEyebrow: locale.toolEyebrow,
      heroTitle: tool.title,
      heroDescription: tool.summary,
      schema: toolSchema(tool, locale),
      staticContent: "",
    }, version), version);
  }

  for (const page of api.categories) {
    writePage(`${page.path.slice(1)}index.html`, renderAppPage({
      kind: "category",
      locale,
      title: `${page.title} | ${locale.categoryTitleSuffix} - ko-workspace`,
      description: page.metaDescription,
      canonicalPath: page.path,
      koPath: page.path.replace(new RegExp(`^/${locale.id}`), ""),
      bodyAttrs: `data-locale="${locale.id}" data-category-page="${escapeAttr(page.id)}"`,
      heroEyebrow: page.eyebrow,
      heroTitle: page.title,
      heroDescription: page.description,
      schema: categorySchema(page, api.tools, locale),
      staticContent: "",
    }, version), version);
  }

  writePage(`${locale.id}/privacy/index.html`, renderDocumentPage({
    locale,
    title: locale.document.privacyTitle,
    description: locale.document.privacyDescription,
    canonicalPath: locale.privacyPath,
    koPath: "/privacy",
    eyebrow: locale.document.privacyHeading,
    heading: locale.document.privacyHeading,
    body: privacyBody(locale),
  }, version), version);

  writePage(`${locale.id}/terms/index.html`, renderDocumentPage({
    locale,
    title: locale.document.termsTitle,
    description: locale.document.termsDescription,
    canonicalPath: locale.termsPath,
    koPath: "/terms",
    eyebrow: locale.document.termsHeading,
    heading: locale.document.termsHeading,
    body: termsBody(locale),
  }, version), version);
}

function loadLocalizedApi(app, locale) {
  const exportBlock = `
globalThis.__localizedPageApi = {
  tools: TOOL_DEFS_ACTIVE,
  categories: CATEGORY_PAGE_DEFS_ACTIVE
};
`;
  const source = app.replace(/\r?\ninit\(\);\s*$/, exportBlock);
  if (source === app) throw new Error("Could not replace init() in app.js.");

  const context = {
    __localizedPageApi: null,
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
      location: { pathname: locale.homePath },
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
    document: makeDocumentStub(locale),
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
  return context.__localizedPageApi;
}

function makeDocumentStub(locale) {
  return {
    body: { dataset: { locale: locale.id }, classList: makeClassList(), style: {} },
    documentElement: { lang: locale.htmlLang },
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
  return spec.match(/Current static asset cache version: `([^`]+)`/)?.[1] || "20260511-10";
}

function renderAppPage(config, version) {
  const { locale } = config;
  return `<!doctype html>
<html lang="${locale.htmlLang}">
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
${renderAlternateLinks(config.koPath)}
    <link rel="icon" href="/favicon.svg?v=${version}" type="image/svg+xml" />
    <link rel="manifest" href="/site.webmanifest?v=${version}" />
    <meta property="og:site_name" content="ko-workspace" />
    <meta property="og:locale" content="${locale.ogLocale}" />
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
          <div class="topbar-brand-group">
            <a class="brand-home" href="${locale.homePath}" aria-label="${escapeAttr(locale.nav.brandHomeAria)}">
              <span class="brand-mark" aria-hidden="true">ko</span>
              <span class="brand-name">ko-workspace</span>
              <span class="brand-subname">${escapeHtml(locale.nav.brandSubname)}</span>
            </a>
          </div>
          <div class="topbar-links">
            <label class="topbar-search" for="toolSearch"><input id="toolSearch" type="search" placeholder="${escapeAttr(locale.nav.search)}" aria-label="${escapeAttr(locale.nav.search)}" autocomplete="off" /></label>
            <div class="topbar-policy-links">
              <a href="${locale.privacyPath}" data-i18n="privacy">${escapeHtml(locale.nav.privacy)}</a>
              <a href="${locale.termsPath}" data-i18n="terms">${escapeHtml(locale.nav.terms)}</a>
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
                ${locale.statusPills.map((item) => `<span class="status-pill">${escapeHtml(item)}</span>`).join("\n                ")}
              </div>
              <a class="support-action hero-support-link" href="${KOFI_SUPPORT_URL}" target="_blank" rel="noopener noreferrer">${escapeHtml(getKofiSupportLabel(locale.id))}</a>
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
                      <p class="eyebrow">${escapeHtml(locale.guideEyebrow)}</p>
                      <h2>${escapeHtml(locale.guideTitle)}</h2>
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
            <span class="footer-contact">${escapeHtml(locale.nav.footerContact)}</span>
            <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>
            <a href="${locale.privacyPath}">${escapeHtml(locale.document.privacyHeading)}</a>
            <a href="${locale.termsPath}">${escapeHtml(locale.nav.terms)}</a>
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
            <p class="eyebrow">${escapeHtml(locale.help.eyebrow)}</p>
            <h2 id="helpTitle">${escapeHtml(locale.help.title)}</h2>
          </div>
          <button id="helpCloseBtn" class="help-close" type="button" aria-label="${escapeAttr(locale.help.close)}" title="${escapeAttr(locale.help.close)}">
            x
          </button>
        </header>
        <ol class="help-steps">
          ${locale.help.steps.map(([title, text]) => `<li>
            <strong>${escapeHtml(title)}</strong>
            <span>${escapeHtml(text)}</span>
          </li>`).join("\n          ")}
        </ol>
      </article>
    </dialog>

    <script src="/app.js?v=${version}"></script>
  </body>
</html>
`;
}

function renderDocumentPage(config, version) {
  const { locale } = config;
  return `<!doctype html>
<html lang="${locale.htmlLang}">
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
${renderAlternateLinks(config.koPath)}
    <link rel="icon" href="/favicon.svg?v=${version}" type="image/svg+xml" />
    <title>${escapeHtml(config.title)}</title>
    <link rel="stylesheet" href="/styles.css?v=${version}" />
  </head>
  <body data-locale="${locale.id}">
    <main class="document-page">
      <article class="document-panel">
        <p class="eyebrow">${escapeHtml(config.eyebrow)}</p>
        <h1>${escapeHtml(config.heading)}</h1>
${config.body}
        <p class="document-updated">${escapeHtml(locale.document.effective)}</p>
        <p><a href="${locale.homePath}">${escapeHtml(locale.nav.backHome)}</a></p>
      </article>
      <footer class="site-footer document-footer">
        <span class="footer-brand">Dayway</span>
        <a href="https://dayway.web.app" target="_blank" rel="noopener noreferrer">dayway.web.app</a>
        <a class="footer-support-link" href="${KOFI_SUPPORT_URL}" target="_blank" rel="noopener noreferrer">${escapeHtml(getKofiSupportLabel(locale.id))}</a>
        <span class="footer-contact">${escapeHtml(locale.nav.footerContact)}</span>
        <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>
        <a href="${locale.privacyPath}">${escapeHtml(locale.document.privacyHeading)}</a>
        <a href="${locale.termsPath}">${escapeHtml(locale.document.termsHeading)}</a>
      </footer>
    </main>
  </body>
</html>
`;
}

function renderStaticContent(locale, { id, eyebrow, title, intro, subject, result, scenarioItems = [] }) {
  if (locale.id === "en") {
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

  return `<!-- static-content:start -->
          <section class="panel static-content-panel" aria-labelledby="staticContentTitle-${escapeAttr(id)}">
            <details class="static-content-details">
              <summary>
                <div>
                  <p class="eyebrow">${escapeHtml(eyebrow)}</p>
                  <h2 id="staticContentTitle-${escapeAttr(id)}">${escapeHtml(title)}</h2>
                </div>
                <span class="static-content-toggle">${escapeHtml(locale.static.readMore)}</span>
              </summary>
              <article class="static-content-article">
                <div class="static-content-body">
                  ${renderStaticBody(locale, { intro, subject, result, scenarioItems })}
                </div>
                <aside class="static-content-notes" aria-label="Key points">
                  <h3>${escapeHtml(locale.static.notesTitle)}</h3>
                  <ul>
                    ${locale.static.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("\n                    ")}
                  </ul>
                </aside>
              </article>
            </details>
          </section>
          <!-- static-content:end -->`;
}

function renderStaticBody(locale, { intro, subject, result, scenarioItems }) {
  const blocks = [];
  const scenarioList = renderScenarioList(locale, scenarioItems);
  if (scenarioList) blocks.push(scenarioList);
  blocks.push(...locale.static.paragraphs({ intro, subject, result }).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`));
  return blocks.join("\n                  ");
}

function renderScenarioList(locale, scenarioItems) {
  const items = Array.isArray(scenarioItems) ? scenarioItems.filter(Boolean) : [];
  if (!items.length) return "";
  const title = locale.static.scenarioListTitle || locale.static.useCase || "Scenarios";
  return `<section class="static-content-scenarios">
                    <h3>${escapeHtml(title)}</h3>
                    <ul class="tool-example-list">
                      ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("\n                      ")}
                    </ul>
                  </section>`;
}

function privacyBody(locale) {
  const bodies = {
    en: `
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
          <p>Google's use of advertising cookies is explained in <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google advertising technologies</a>. Users can manage personalized advertising in <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
        </section>
        <section>
          <h2>4. Contact</h2>
          <p>Privacy, advertising, partnership, and collaboration inquiries can be sent to <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>.</p>
        </section>`,
    ja: `
        <section>
          <h2>1. ツールで処理する情報</h2>
          <p>ko-workspaceの主要ツールはブラウザで動作します。利用者が入力したテキスト、選択したファイル、録音データ、アップロードした背景画像、生成結果はko-workspaceのアプリケーションサーバーに保存しません。</p>
          <p class="privacy-assurance">現在の公開ツールでは会員アカウント用データベースを運用していません。メールでお問い合わせを受けた場合、返信のためにメールアドレスと本文を確認することがあります。</p>
        </section>
        <section>
          <h2>2. ブラウザ権限</h2>
          <p>音声ツールはマイク権限を、Webカメラツールはカメラと必要に応じてマイク権限を求めることがあります。権限はブラウザ設定で許可、拒否、削除できます。</p>
        </section>
        <section>
          <h2>3. 広告、分析、Cookie</h2>
          <p>Google Tag Manager、Google Analytics、Google AdSenseを計測と広告のために使用する場合があります。これらの提供者は各ポリシーに基づきCookieや広告識別子を使うことがあります。</p>
          <p>ko-workspaceでは、入力テキスト、ファイル内容、録音データ、生成結果、抽出された連絡先、ファイル名をカスタム分析パラメータとして送らない方針で運用します。</p>
        </section>
        <section>
          <h2>4. お問い合わせ</h2>
          <p>プライバシー、広告、提携、コラボレーションに関するお問い合わせは <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a> までご連絡ください。</p>
        </section>`,
    zh: `
        <section>
          <h2>1. 工具处理的信息</h2>
          <p>ko-workspace 的核心工具在浏览器中运行。用户输入的文本、选择的文件、录音输出、上传的背景图片和生成结果不会保存到 ko-workspace 应用服务器。</p>
          <p class="privacy-assurance">当前公开工具不运营会员账户数据库。如果用户通过电子邮件联系我们，邮箱地址和消息内容可能仅用于回复该咨询。</p>
        </section>
        <section>
          <h2>2. 浏览器权限</h2>
          <p>语音工具可能请求麦克风权限，摄像头工具可能请求摄像头和可选麦克风权限。用户可以在自己的浏览器设置中允许、阻止或移除这些权限。</p>
        </section>
        <section>
          <h2>3. 广告、分析和 Cookie</h2>
          <p>Google Tag Manager、Google Analytics 和 Google AdSense 可能用于统计和广告。这些服务提供方可能会按照自己的政策使用 Cookie、广告标识符或类似技术。</p>
          <p>ko-workspace 的运营原则是不将输入文本、文件内容、录音数据、生成结果、提取的联系方式和文件名作为自定义分析参数发送。</p>
        </section>
        <section>
          <h2>4. 联系方式</h2>
          <p>隐私、广告、合作和伙伴咨询可发送至 <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>。</p>
        </section>`,
  };
  return bodies[locale.id] || bodies.en;
}

function termsBody(locale) {
  const bodies = {
    en: `
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
        </section>`,
    ja: `
        <section>
          <h2>1. サービス範囲</h2>
          <p>ko-workspaceは、テキスト、画像、PDF、字幕、音声、動画作業のためのブラウザベースのユーティリティを提供します。ブラウザ、ライブラリ、プラットフォーム要件の変化により、内容は変更されることがあります。</p>
        </section>
        <section>
          <h2>2. 利用者の確認責任</h2>
          <p>生成された結果が正確で目的に合っているかどうかは、利用者が確認する必要があります。文字起こし、変換ファイル、編集録音、画像、PDF、字幕結果は重要な利用前に確認してください。</p>
        </section>
        <section>
          <h2>3. ブラウザ環境</h2>
          <p>一部の機能は、最新ブラウザAPI、端末性能、権限、対応ファイル形式に依存します。すべてのブラウザ、端末、特殊な旧形式で動作するとは限りません。</p>
        </section>
        <section>
          <h2>4. 広告と外部サービス</h2>
          <p>サイト運営や計測のためにGoogle Analytics、Google AdSense、CDN上のライブラリ、その他の外部リソースを使う場合があります。広告領域は入力や結果操作から分離します。</p>
        </section>
        <section>
          <h2>5. お問い合わせ</h2>
          <p>サービスに関する質問は <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a> までお送りください。</p>
        </section>`,
    zh: `
        <section>
          <h2>1. 服务范围</h2>
          <p>ko-workspace 提供用于文本、图片、PDF、字幕、音频和视频工作的浏览器工具。随着浏览器、库和平台要求变化，工具内容可能会调整。</p>
        </section>
        <section>
          <h2>2. 用户责任</h2>
          <p>用户需要自行确认生成结果是否准确并适合自己的用途。转写、转换文件、编辑后的录音、图片、PDF输出和字幕结果在重要使用前都应人工检查。</p>
        </section>
        <section>
          <h2>3. 浏览器环境</h2>
          <p>部分功能依赖现代浏览器API、本地设备性能、权限和支持的文件格式。工具可能无法在所有浏览器、设备或特殊旧格式上运行。</p>
        </section>
        <section>
          <h2>4. 广告和外部服务</h2>
          <p>本站可能使用 Google Analytics、Google AdSense、CDN 托管库和其他运行或统计服务所需的第三方资源。广告区域与工具输入和结果控件分离。</p>
        </section>
        <section>
          <h2>5. 联系方式</h2>
          <p>服务相关问题可发送至 <a href="mailto:dayway.ict@gmail.com">dayway.ict@gmail.com</a>。</p>
        </section>`,
  };
  return bodies[locale.id] || bodies.en;
}

function siteSchema(tools, locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${ORIGIN}${locale.homePath}#organization`,
        name: "ko-workspace",
        url: `${ORIGIN}${locale.homePath}`,
      },
      {
        "@type": "WebSite",
        "@id": `${ORIGIN}${locale.homePath}#website`,
        name: "ko-workspace",
        url: `${ORIGIN}${locale.homePath}`,
        inLanguage: locale.languageCode,
        description: locale.home.description,
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

function toolSchema(tool, locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: `${tool.title} - ko-workspace`,
    url: `${ORIGIN}${tool.path}`,
    applicationCategory: "BusinessApplication",
    browserRequirements: "Requires a modern browser with JavaScript enabled",
    inLanguage: locale.languageCode,
    description: tool.seoDescription || tool.summary,
    keywords: tool.keywords.join(", "),
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: locale.id === "ja" ? "JPY" : locale.id === "zh" ? "CNY" : "USD",
    },
  };
}

function categorySchema(page, tools, locale) {
  const categorySet = new Set(page.categories);
  const pageTools = tools.filter((tool) => categorySet.has(tool.category));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${page.title} - ko-workspace`,
    url: `${ORIGIN}${page.path}`,
    inLanguage: locale.languageCode,
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

function ensureBaseAlternates(apis) {
  const firstApi = apis.get(LOCALES[0].id);
  const pairs = [
    ["index.html", "/"],
    ["privacy.html", "/privacy"],
    ["terms.html", "/terms"],
    ...firstApi.tools.map((tool) => [`${tool.path.replace(/^\/en\//, "")}index.html`, tool.path.replace(/^\/en/, "")]),
    ...firstApi.categories.map((page) => [`${page.path.replace(/^\/en\//, "")}index.html`, page.path.replace(/^\/en/, "")]),
  ];

  for (const [relativeFile, koPath] of pairs) {
    const file = path.join(ROOT, relativeFile);
    if (!fs.existsSync(file)) continue;
    updateAlternateBlock(file, koPath);
  }
}

function updateAlternateBlock(file, koPath) {
  const html = fs.readFileSync(file, "utf8");
  const links = renderAlternateLinks(koPath);
  const alternatePattern = /(?:\s*<link rel="alternate" hreflang="(?:ko|en|ja|zh-Hans|x-default)" href="[^"]+" \/>\r?\n)+/;
  let next = alternatePattern.test(html)
    ? html.replace(alternatePattern, `\n${links}\n`)
    : html.replace(/(\s*<link rel="canonical" href="[^"]+" \/>\r?\n)/, `$1${links}\n`);
  if (next !== html) fs.writeFileSync(file, next);
}

function ensureSitemap(apis) {
  const file = path.join(ROOT, "sitemap.xml");
  let xml = fs.readFileSync(file, "utf8");
  const urls = [];

  for (const locale of LOCALES) {
    const api = apis.get(locale.id);
    urls.push(locale.homePath, locale.privacyPath, locale.termsPath);
    urls.push(...api.categories.map((page) => page.path));
    urls.push(...api.tools.map((tool) => tool.path));
  }

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

function renderAlternateLinks(koPath) {
  const links = [
    ["ko", koPath],
    ...LOCALES.map((locale) => [locale.hreflang, localizedPath(locale, koPath)]),
    ["x-default", koPath],
  ];
  return links.map(([hreflang, pathname]) => `    <link rel="alternate" hreflang="${hreflang}" href="${ORIGIN}${pathname}" />`).join("\n");
}

function localizedPath(locale, koPath) {
  if (koPath === "/") return locale.homePath;
  if (koPath === "/privacy") return locale.privacyPath;
  if (koPath === "/terms") return locale.termsPath;
  return `/${locale.id}${koPath}`;
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
