# 코워크스페이스 (ko-workspace) Roadmap

Last updated: 2026-04-29

## 1. Platform Direction

`코워크스페이스 (ko-workspace)` is planned as a Korean office utility platform. The current tool, `음성으로 텍스트 쓰기`, is the first tool in a larger collection of browser-first utilities for text, PDF, image, subtitle, and lightweight document workflows.

Core principles:

- Each tool should have its own searchable URL, title, description, FAQ, and related-tool links.
- Prefer browser-side processing where practical, especially for text, images, PDF page operations, and simple media utilities.
- Initial production scope must run on Cloudflare Pages as static browser-side tools. Do not require a backend server, database, queue, storage bucket, paid API, or private API key for core tool execution.
- Keep privacy and security explicit: do not upload user files or text for initial tools.
- Current public tools should not require membership or first-party personal-data collection.
- Design every tool page with ad slots separated from the work surface, so AdSense can be added without breaking the UI.
- Build in small, indexable tools first, then expand into heavier PDF/OCR/AI workflows after the platform structure is stable.

## 1A. Browser-Only Scope Rules

Accepted for initial development:

- Text parsing and cleanup using plain JavaScript.
- Image resizing, conversion, and compression using browser APIs such as `canvas`.
- QR generation using a local client-side library.
- PDF page operations that can run in the browser with a bundled client-side library.
- Subtitle text parsing and timestamp adjustment in the browser.
- Webcam recording and optional browser-side background effects when models are loaded only on demand.

Excluded from initial development:

- Features requiring a server process, database, persistent user storage, queues, or background jobs.
- Features requiring private API keys in the browser.
- Features that need third-party paid APIs to work.
- Heavy AI/OCR/background-removal models unless a future build proves they are fast enough locally.
- Transparent-background export and standalone background-removal tools remain excluded for now.
- PDF operations that require unreliable or legally sensitive behavior, such as password removal from protected documents.

## 2. URL Structure

Recommended long-term structure:

| Area | URL Pattern | Purpose |
| --- | --- | --- |
| Platform home | `/` | Tool directory, categories, latest tools, popular tools |
| Tool pages | `/tools/{tool-slug}/` | Individual utility pages with app UI, guide, FAQ, related tools |
| Category pages | `/tools/pdf/`, `/tools/text/`, `/tools/image/` | SEO landing pages and internal navigation |
| Blog/guide pages | `/blog/{article-slug}/` | Search-focused usage guides and comparison articles |
| Legal pages | `/privacy`, `/terms`, `/ads.txt` | Policy and ad platform requirements |

Current migration note:

- `https://ko-workspace.com/` now serves the platform home.
- Individual tools are served under `/tools/{tool-slug}/`.
- Category landing pages are now live at `/tools/text/`, `/tools/pdf/`, `/tools/image/`, `/tools/subtitle/`, and `/tools/voice-video/`.
- Category pages reuse the shared app shell and are rendered from `CATEGORY_PAGE_DEFS` in `app.js`; do not fork tool logic into category HTML files.
- Preserve canonical URLs and sitemap entries whenever tool pages are updated.
- Current static asset cache version is `20260501-11`; bump this version whenever `app.js` or `styles.css` changes.

## 2A. Current SEO And AdSense Baseline

Completed for AdSense/SEO readiness:

- Google AdSense script and account meta are present on public pages.
- `ads.txt`, `sitemap.xml`, `robots.txt`, `/privacy`, and `/terms` are present.
- `/privacy` includes Google advertising, analytics, cookies, personalized ads, and non-content analytics-event language.
- Tool pages include unique titles, meta descriptions, canonical URLs, Open Graph data, usage flows, collapsed FAQ/examples, and dynamic FAQ structured data.
- Category landing pages include static metadata, sitemap entries, and dynamic `CollectionPage`/`ItemList`/`BreadcrumbList` structured data.
- The home page includes compact category links to strengthen internal navigation.

Operational reminders:

- After adding or changing HTML, run `npm.cmd run apply:site-tags` and then `npm.cmd run check`.
- Keep ad slots outside the primary editor/upload/result areas.
- Never track user-entered text, file names, extracted contacts, or recording contents in analytics.
- Request Search Console indexing for materially changed pages after deployment.

## 3. Priority Roadmap

### P0. Current Tool Stabilization

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| 음성으로 텍스트 쓰기 | `/tools/voice-to-text/` | 음성으로 텍스트 쓰기, 음성 텍스트 변환, 한국어 받아쓰기, 마이크 텍스트 입력, 회의록 받아쓰기 | M | Current tool. Improve reliability, add FAQ, preserve root URL strategy. |
| 녹음 파일 텍스트 변환 | `/tools/audio-file-transcription/` | 녹음 파일 텍스트 변환, 휴대폰 녹음 텍스트 추출, 음성 파일 STT, m4a 텍스트 변환 | L | Browser-only beta. Defaults to the tested `whisper-tiny` stable profile, hides unstable model/device choices from the UI, and must keep file length limits, non-storage quality warnings, in-progress feedback, repetition cleanup, and sentence-ending line break option visible. |
| 웹캠 녹화기 | `/tools/webcam-recorder/` | 웹캠 녹화기, 카메라 녹화, 배경 흐림, 배경 바꾸기, WebM 녹화 | L | Shipped. Keep testing camera permission, background effects, and browser compatibility on real devices. |
| 음성 텍스트 대본 정리 | `/tools/voice-script-maker/` | 유튜브 대본 만들기, 회의록 정리, 발표문 초안, 음성 대본 변환 | M | Could become a mode inside voice-to-text first, then separate if search demand grows. |

### P1. Lightweight SEO Tools

These should be built early because they are fast to implement, safe for browser-side processing, and useful for search traffic.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| 글자수 세기 | `/tools/character-counter/` | 글자수 세기, 공백 제외 글자수, 바이트 수 계산, 원고지 분량 계산 | S | Very low risk. Strong evergreen search demand. |
| AI 복붙 서식 정리 | `/tools/ai-text-cleaner/` | AI 글 서식 제거, ChatGPT 복사 붙여넣기 정리, 마크다운 제거, 별표 제거, 글 정리 | S | Removes common AI/Markdown artifacts such as `**`, `###`, code fences, excessive bullets, and awkward spacing. Browser-side only. |
| 줄바꿈 정리 | `/tools/line-break-cleaner/` | 줄바꿈 제거, 문단 정리, 공백 제거, 텍스트 정리 | S | Good companion to voice-to-text output cleanup. |
| 텍스트 중복 줄 제거 | `/tools/duplicate-line-remover/` | 중복 줄 제거, 중복 텍스트 제거, 리스트 정리 | S | Simple utility, good internal link from text tools. |
| 이메일/URL/전화번호 추출기 | `/tools/text-extractor/` | 이메일 추출, URL 추출, 전화번호 추출, 텍스트에서 링크 추출 | S | Useful for messy documents, CRM prep, and personal contact cleanup. |
| 찾기 및 바꾸기 | `/tools/find-replace/` | 찾기 바꾸기, 텍스트 일괄 변경, 문자열 치환 | S | Simple bulk replacement with case-sensitive and whole-word options. |
| 대소문자 변환 | `/tools/case-converter/` | 대소문자 변환, camelCase 변환, snake_case 변환, 케이스 변환 | S | Useful for English text, filenames, labels, and development-adjacent office work. |
| 텍스트 비교기 | `/tools/text-diff/` | 텍스트 비교, 문서 비교, 변경사항 비교, 두 글 비교 | M | Browser-side line/word diff. Useful, but lower priority than cleanup/extraction tools. |
| QR 코드 생성기 | `/tools/qr-code-generator/` | QR 코드 만들기, 무료 QR 생성기, URL QR 코드, QR PNG 저장, QR JPG 저장 | S | Shipped. Client-side QR generation with SVG/PNG/JPG export, simple styling, filename input, contrast fallback, and no server storage. |
| 이미지 크기 조절 | `/tools/image-resizer/` | 이미지 크기 줄이기, 사진 사이즈 변경, 이미지 리사이즈 | M | Canvas-based browser processing. |
| 이미지 형식 변환 | `/tools/image-converter/` | WEBP JPG 변환, PNG JPG 변환, 이미지 변환 | M | Browser support varies by format. Clearly state supported formats. |
| 이미지 용량 압축 | `/tools/image-compressor/` | 이미지 압축, 사진 용량 줄이기, JPG 용량 줄이기, WEBP 압축 | M | Browser-side canvas compression. Avoid server uploads. |

### P1A. AI Copy Cleanup Tool Feasibility

`AI 복붙 서식 정리` should be treated as a near-term tool because it solves a current, frequent workflow problem: AI-generated text often carries Markdown formatting into email, blogs, office documents, messengers, and CMS editors.

Target problem examples:

- `**강조 문구**` appears literally after copy and paste.
- `### 제목` remains as text instead of becoming a normal heading.
- Markdown tables are difficult to paste into spreadsheets.
- Code fences such as three backticks followed by `text` remain around non-code content.
- AI answers contain too many bullets, blank lines, separators, and nested list markers.
- Links appear as `[링크명](https://example.com)` instead of a clean label or URL.

Recommended first version:

| Mode | Output Behavior |
| --- | --- |
| Plain text cleanup | Remove Markdown emphasis markers, heading markers, blockquote markers, horizontal rules, and code fences. |
| Document cleanup | Convert headings into plain section titles and normalize list spacing for Word, Hangul, Google Docs, and email. |
| Blog draft cleanup | Keep readable headings and bullets but remove raw Markdown symbols. |
| Table cleanup | Convert Markdown tables into TSV or CSV for spreadsheet paste. |
| Link cleanup | Choose between link text only, URL only, or `텍스트 - URL`. |

Implementation feasibility:

- Can be built fully browser-side with no upload and no AI API.
- First version can use deterministic text transforms for common AI Markdown patterns.
- A later version can add a local Markdown parser if full Markdown-to-HTML/plain-text conversion becomes necessary.
- Output should be written to `textarea` or `textContent`; avoid rendering unsanitized pasted content as HTML.
- Options should be toggles, not hidden magic: remove bold markers, remove headings, normalize bullets, remove code fences, convert links, trim blank lines.

Initial SEO page angle:

- Title: `AI 복붙 서식 정리 | ChatGPT 글 마크다운 제거 - 코워크스페이스`
- Primary keywords: `AI 글 서식 제거`, `ChatGPT 복사 붙여넣기 정리`, `마크다운 제거`, `별표 제거`, `AI 답변 정리`
- Related tools: `글자수 세기`, `줄바꿈 정리`, `텍스트 중복 줄 제거`, `음성으로 텍스트 쓰기`

Risks and safeguards:

- Do not remove symbols inside code blocks when the user chooses "keep code".
- Avoid destructive cleanup by showing before/after text and offering one-click restore.
- Keep all processing local to the browser.
- Do not add external AI calls in the first version.

### P1B. Selected Everyday Work Utility

The only everyday work/personal utility kept in the near-term roadmap is the extractor. Other generic utilities such as date calculators, percent calculators, checklist makers, password generators, and URL encoders are excluded for now to keep the platform focused.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| 이메일/URL/전화번호 추출기 | `/tools/text-extractor/` | 이메일 추출, URL 추출, 전화번호 추출, 텍스트에서 링크 추출 | S | Extracts contacts and links from pasted text, supports copy by type, and stays browser-side only. |

Parked utility ideas:

- 비밀번호 생성기, JSON 포맷터, 단위 변환기, 로렘 입숨 생성기는 browser-side implementation is possible, but they are not core implementation targets right now.
- Keep them out of the near-term build order unless search data or user demand clearly justifies adding them.

### P2. Core PDF Tools

PDF tools are central to the long-term office utility platform. Start with page-level operations before high-fidelity document conversion.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| PDF 합치기 | `/tools/pdf-merge/` | PDF 합치기, PDF 병합, 무료 PDF 합치기 | M | High demand. Use client-side PDF library if file size is manageable. |
| PDF 분할 | `/tools/pdf-split/` | PDF 분할, PDF 나누기, PDF 페이지 추출 | M | Pair with page preview if possible. |
| PDF 페이지 추출 | `/tools/pdf-extract-pages/` | PDF 페이지 추출, PDF 특정 페이지만 저장 | M | Can share code with split tool. |
| 이미지 PDF 변환 | `/tools/image-to-pdf/` | JPG PDF 변환, 이미지 PDF 만들기, 사진 PDF 변환 | M | Strong search demand. |
| PDF 이미지 변환 | `/tools/pdf-to-image/` | PDF JPG 변환, PDF 이미지 변환, PDF PNG 변환 | L | Use PDF rendering. Performance and memory need testing. |

Excluded from initial PDF scope:

- PDF 회전: low standalone value because browser PDF viewers already provide rotation for viewing.
- PDF 비밀번호 해제: legally and technically sensitive, and support is unreliable in lightweight browser PDF libraries.
- PDF 용량 압축: high search demand, but quality and file-size reduction are hard to guarantee with simple browser-only processing. Reconsider only after core PDF tools are stable.

### P3. Creator And Subtitle Tools

These connect naturally with the voice-to-text tool and can attract creators, educators, and marketers.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| SRT 자막 정리 | `/tools/srt-cleaner/` | SRT 자막 정리, 자막 줄바꿈 제거, SRT 수정 | M | Text-only, safe, useful for creators. |
| SRT/VTT 변환 | `/tools/subtitle-converter/` | SRT VTT 변환, VTT SRT 변환, 자막 변환 | M | Good paired tool. |
| 자막 시간 보정 | `/tools/subtitle-timing/` | SRT 싱크 조절, 자막 시간 조정, 자막 밀기 | M | Needs careful UI, but still browser-side. |

Excluded from initial media scope:

- 영상 오디오 추출: browser FFmpeg can be heavy and is not a simple static-tool first target.

### P4. Deferred Or Excluded Advanced Tools

These are not implementation targets for the initial Cloudflare Pages static phase. Reconsider only if a future architecture intentionally adds serverless processing, paid APIs, login, usage limits, or local models that are proven fast enough.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| 배경 제거 | `/tools/background-remover/` | 배경 제거, 누끼 따기, 이미지 배경 투명 | XL | Excluded for now because API use requires keys/cost and local models are heavy. |
| OCR 이미지 텍스트 추출 | `/tools/ocr/` | 이미지 텍스트 추출, OCR 변환, 사진 글자 인식 | L | Deferred. Browser OCR is heavy; server OCR is outside current scope. |
| PDF OCR | `/tools/pdf-ocr/` | PDF OCR, 스캔 PDF 텍스트 추출 | XL | Deferred. Needs OCR pipeline and careful privacy policy. |
| PDF 요약 | `/tools/pdf-summary/` | PDF 요약, 문서 요약, 논문 요약 | XL | Excluded for now. Requires AI cost controls and server-side processing or API keys. |
| PDF 번역 | `/tools/pdf-translate/` | PDF 번역, 문서 번역, 영어 PDF 번역 | XL | Excluded for now. High quality expectations and AI/API cost. |
| 문서 자동 작성 | `/tools/document-writer/` | 보고서 작성, 제안서 작성, 업무 문서 작성 | XL | Excluded for now. Requires AI model dependency and product policy. |

## 4. SEO Template For Each Tool

Each tool page should include:

- One clear `h1` matching the tool name.
- Search-focused but natural title.
- Meta description that says what the tool does, whether it is free, and whether it works in the browser.
- Visible usage guide with 3-5 short steps.
- Collapsed FAQ and usage-example section below Quick Flow, with real user questions.
- Related tools section.
- Tool-specific structured data where appropriate.
- Canonical URL.
- Sitemap entry.

Recommended title pattern:

```text
{기능명} | 무료 온라인 도구 - 코워크스페이스
```

Recommended description pattern:

```text
{기능명}를 브라우저에서 바로 사용할 수 있는 무료 도구입니다. 파일이나 텍스트를 빠르게 정리하고, 필요한 결과를 다운로드하거나 복사할 수 있습니다.
```

Recommended structured data:

- `WebApplication` or `SoftwareApplication` for each tool page.
- `FAQPage` only when matching FAQ content is visible on the page.
- `BreadcrumbList` for category and tool hierarchy.
- `ItemList` for the platform home and category pages.

## 5. AdSense Layout Rules

Every tool page should reserve logical ad positions without mixing ads into the work surface.

Recommended ad placements:

- `top-banner`: above the tool shell, below the primary title area.
- `bottom-banner`: below the tool and before related content.
- `left-rail`: desktop-only left rail.
- `right-rail`: desktop-only right rail.
- Optional `content-mid`: between guide/FAQ sections, not inside the primary editor or file drop zone.

Rules:

- Empty ad slots must be hidden.
- Ads must not cover buttons, file inputs, textareas, modals, or copy controls.
- Do not place ads inside drag-and-drop zones.
- Do not add inline AdSense scripts.
- Keep CSP strict and add only the minimum required ad domains.

## 5A. Analytics Rules

GA/GTM events should measure tool usage without collecting user content.

- Use the event contract in `ANALYTICS.md`.
- Track only tool id, category, action, control id, output format, and help section names.
- Never send entered text, uploaded file names, extracted email/URL/phone data, or recording contents.
- Treat analytics changes as product-policy changes, not incidental UI work.

## 5B. Monetization And Membership Direction

Near-term monetization should stay simple:

- AdSense display ads on tool pages, with ads kept outside the work surface.
- Sponsored guide posts or comparison articles only when they match the tool category.
- Direct advertising, collaboration, and partnership inquiries through `dayway.ict@gmail.com`.

Membership should not be introduced until there is a clear reason:

- Keep the default service anonymous and free while the platform earns search traffic.
- Consider membership later for saved presets, batch queues, usage history, cloud sync, or team workspaces.
- If membership is added, separate it from the current browser-only tools and update the privacy policy before launch.

Revenue ideas that do not break the current privacy model:

- Optional downloadable templates and document packs.
- Sponsored placement on blog/category pages, not inside editors.
- B2B custom tool requests handled through email.
- Lightweight premium desktop-style bundles only after core tools have traffic and repeated use.

## 6. Security And Privacy Rules

Default processing model:

- Text tools: browser-side only.
- Image tools: browser-side first.
- PDF page tools: browser-side first, with clear file size guidance.
- OCR/AI/server tools: excluded from the initial static Cloudflare Pages phase.

Security requirements:

- Do not commit Cloudflare, GitHub, Google, AdSense, or AI API tokens.
- Keep secrets in GitHub Actions Secrets or Cloudflare dashboard secrets.
- Keep `.gitignore` updated for local credentials and build output.
- Avoid third-party CDN scripts when an npm/local bundled option is practical.
- If a third-party library is used, document the reason and run dependency checks.
- Do not weaken CSP with `unsafe-inline` for scripts.
- Do not place API keys or paid service credentials in client-side JavaScript.

## 7. Suggested Build Order

Recommended next 10 tools:

1. AI 복붙 서식 정리
2. 글자수 세기
3. 줄바꿈 정리
4. 이메일/URL/전화번호 추출기
5. 텍스트 중복 줄 제거
6. 찾기 및 바꾸기
7. 대소문자 변환
8. QR 코드 생성기
9. 이미지 크기 조절
10. 이미지 형식 변환

Next PDF/image expansion after the first 10:

1. 이미지 용량 압축
2. PDF 합치기
3. PDF 분할
4. PDF 페이지 추출
5. 이미지 PDF 변환
6. PDF 이미지 변환
7. SRT 자막 정리
8. SRT/VTT 변환
9. 자막 시간 보정
10. 텍스트 비교기

Recommended platform work before tool count grows beyond 3:

- Create a shared page layout for tool pages.
- Create a shared SEO metadata template.
- Create a shared ad slot component/markup pattern.
- Create a tool registry file that stores name, slug, category, description, keywords, and related tools.
- Generate or maintain `sitemap.xml` from the tool registry.
- Add Google Search Console and Naver Search Advisor verification.

## 8. Open Decisions

- Whether `/` remains the voice-to-text tool until search traffic stabilizes, or becomes the platform home earlier.
- Whether to keep the project as static HTML/CSS/JS or introduce a small build system once shared templates become repetitive.
- Which browser-side PDF library gives the best balance of bundle size, privacy, and feature coverage.
- Whether text tools should be built as separate pages immediately or as a shared text-tool shell with separate SEO routes.
