# ko-workspace Roadmap

Last updated: 2026-04-28

## 1. Platform Direction

`ko-workspace` is planned as a Korean office utility platform. The current tool, `음성으로 텍스트 쓰기`, is the first tool in a larger collection of browser-first utilities for text, PDF, image, subtitle, and lightweight document workflows.

Core principles:

- Each tool should have its own searchable URL, title, description, FAQ, and related-tool links.
- Prefer browser-side processing where practical, especially for text, images, PDF page operations, and simple media utilities.
- Keep privacy and security explicit: do not upload user files or text unless a future feature clearly requires server processing.
- Design every tool page with ad slots separated from the work surface, so AdSense can be added without breaking the UI.
- Build in small, indexable tools first, then expand into heavier PDF/OCR/AI workflows after the platform structure is stable.

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

- `https://ko-workspace.com/` currently serves `음성으로 텍스트 쓰기`.
- When at least 4-6 tools exist, consider changing `/` into the platform home.
- At that point, move the current tool to `/tools/voice-to-text/`.
- Preserve existing search value with either a clear canonical strategy or a 301 redirect plan.

## 3. Priority Roadmap

### P0. Current Tool Stabilization

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| 음성으로 텍스트 쓰기 | `/tools/voice-to-text/` | 음성으로 텍스트 쓰기, 음성 텍스트 변환, 한국어 받아쓰기, 마이크 텍스트 입력, 회의록 받아쓰기 | M | Current tool. Improve reliability, add FAQ, preserve root URL strategy. |
| 음성 텍스트 대본 정리 | `/tools/voice-script-maker/` | 유튜브 대본 만들기, 회의록 정리, 발표문 초안, 음성 대본 변환 | M | Could become a mode inside voice-to-text first, then separate if search demand grows. |

### P1. Lightweight SEO Tools

These should be built early because they are fast to implement, safe for browser-side processing, and useful for search traffic.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| 글자수 세기 | `/tools/character-counter/` | 글자수 세기, 공백 제외 글자수, 바이트 수 계산, 원고지 분량 계산 | S | Very low risk. Strong evergreen search demand. |
| 줄바꿈 정리 | `/tools/line-break-cleaner/` | 줄바꿈 제거, 문단 정리, 공백 제거, 텍스트 정리 | S | Good companion to voice-to-text output cleanup. |
| 텍스트 중복 줄 제거 | `/tools/duplicate-line-remover/` | 중복 줄 제거, 중복 텍스트 제거, 리스트 정리 | S | Simple utility, good internal link from text tools. |
| QR 코드 생성기 | `/tools/qr-code-generator/` | QR 코드 만들기, 무료 QR 생성기, URL QR 코드 | S | Use client-side QR library. No server storage. |
| 이미지 크기 조절 | `/tools/image-resizer/` | 이미지 크기 줄이기, 사진 사이즈 변경, 이미지 리사이즈 | M | Canvas-based browser processing. |
| 이미지 형식 변환 | `/tools/image-converter/` | WEBP JPG 변환, PNG JPG 변환, 이미지 변환 | M | Browser support varies by format. Clearly state supported formats. |

### P2. Core PDF Tools

PDF tools are central to the long-term office utility platform. Start with page-level operations before high-fidelity document conversion.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| PDF 합치기 | `/tools/pdf-merge/` | PDF 합치기, PDF 병합, 무료 PDF 합치기 | M | High demand. Use client-side PDF library if file size is manageable. |
| PDF 분할 | `/tools/pdf-split/` | PDF 분할, PDF 나누기, PDF 페이지 추출 | M | Pair with page preview if possible. |
| PDF 페이지 추출 | `/tools/pdf-extract-pages/` | PDF 페이지 추출, PDF 특정 페이지만 저장 | M | Can share code with split tool. |
| 이미지 PDF 변환 | `/tools/image-to-pdf/` | JPG PDF 변환, 이미지 PDF 만들기, 사진 PDF 변환 | M | Strong search demand. |
| PDF 이미지 변환 | `/tools/pdf-to-image/` | PDF JPG 변환, PDF 이미지 변환, PDF PNG 변환 | L | Use PDF rendering. Performance and memory need testing. |
| PDF 회전 | `/tools/pdf-rotate/` | PDF 회전, PDF 페이지 회전 | M | Lower complexity than conversion tools. |
| PDF 압축 | `/tools/pdf-compress/` | PDF 용량 줄이기, PDF 압축, PDF 파일 크기 줄이기 | L | Hard to guarantee quality in browser. Do after basic PDF tools. |

### P3. Creator And Subtitle Tools

These connect naturally with the voice-to-text tool and can attract creators, educators, and marketers.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| SRT 자막 정리 | `/tools/srt-cleaner/` | SRT 자막 정리, 자막 줄바꿈 제거, SRT 수정 | M | Text-only, safe, useful for creators. |
| SRT/VTT 변환 | `/tools/subtitle-converter/` | SRT VTT 변환, VTT SRT 변환, 자막 변환 | M | Good paired tool. |
| 자막 시간 보정 | `/tools/subtitle-timing/` | SRT 싱크 조절, 자막 시간 조정, 자막 밀기 | M | Needs careful UI, but still browser-side. |
| 영상 오디오 추출 | `/tools/audio-extractor/` | 영상에서 오디오 추출, MP4 MP3 변환 | L | Browser FFmpeg can be heavy. Evaluate performance first. |

### P4. Advanced And Monetizable Tools

These should come after the site has traffic, trust, and a clearer cost model.

| Tool | URL | SEO Keywords | Difficulty | Notes |
| --- | --- | --- | --- | --- |
| OCR 이미지 텍스트 추출 | `/tools/ocr/` | 이미지 텍스트 추출, OCR 변환, 사진 글자 인식 | L | Browser OCR is heavy; server OCR has privacy/cost implications. |
| PDF OCR | `/tools/pdf-ocr/` | PDF OCR, 스캔 PDF 텍스트 추출 | XL | Do after PDF rendering and OCR policy are stable. |
| PDF 요약 | `/tools/pdf-summary/` | PDF 요약, 문서 요약, 논문 요약 | XL | Requires AI cost controls, upload policy, and rate limiting. |
| PDF 번역 | `/tools/pdf-translate/` | PDF 번역, 문서 번역, 영어 PDF 번역 | XL | High expectation and high cost. Later-stage feature. |
| 문서 자동 작성 | `/tools/document-writer/` | 보고서 작성, 제안서 작성, 업무 문서 작성 | XL | Could become paid or login-based. |

## 4. SEO Template For Each Tool

Each tool page should include:

- One clear `h1` matching the tool name.
- Search-focused but natural title.
- Meta description that says what the tool does, whether it is free, and whether it works in the browser.
- Visible usage guide with 3-5 short steps.
- FAQ section with real user questions.
- Related tools section.
- Tool-specific structured data where appropriate.
- Canonical URL.
- Sitemap entry.

Recommended title pattern:

```text
{기능명} | 무료 온라인 도구 - ko-workspace
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

## 6. Security And Privacy Rules

Default processing model:

- Text tools: browser-side only.
- Image tools: browser-side first.
- PDF page tools: browser-side first, with clear file size guidance.
- OCR/AI tools: later, after server policy, cost control, abuse prevention, and privacy notices are ready.

Security requirements:

- Do not commit Cloudflare, GitHub, Google, AdSense, or AI API tokens.
- Keep secrets in GitHub Actions Secrets or Cloudflare dashboard secrets.
- Keep `.gitignore` updated for local credentials and build output.
- Avoid third-party CDN scripts when an npm/local bundled option is practical.
- If a third-party library is used, document the reason and run dependency checks.
- Do not weaken CSP with `unsafe-inline` for scripts.

## 7. Suggested Build Order

Recommended next 10 tools:

1. 글자수 세기
2. 줄바꿈 정리
3. QR 코드 생성기
4. 이미지 크기 조절
5. 이미지 형식 변환
6. PDF 합치기
7. PDF 분할
8. 이미지 PDF 변환
9. PDF 이미지 변환
10. SRT 자막 정리

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
- Whether PDF tools should be fully browser-side or offer optional server-side processing for large files in a later paid tier.
- Whether AI/OCR tools require login, usage limits, or paid credits before launch.
