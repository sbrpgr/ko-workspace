# 코워크스페이스 (ko-workspace) Product Spec

## Product Direction

`코워크스페이스 (ko-workspace)` is a static office utility platform for Korean users and general browser-based work. It is designed to host many small, high-frequency tools that solve day-to-day text, image, PDF, subtitle, and voice tasks without requiring account creation or server-side storage.

## Current Shipping Scope

The current deployment targets Cloudflare Pages and keeps all initial tools inside a browser-only execution model.

Current production baseline:

- Production branch: `main`
- Production domain: `https://ko-workspace.com/`
- Cloudflare Pages project: `mic-script-generator`
- Latest AdSense/SEO readiness commit: `580c060 Improve AdSense SEO readiness`
- Current static asset cache version: `20260430-01`
- Category landing pages, privacy policy updates, sitemap updates, and core FAQ copy were deployed on 2026-04-29

Core constraints:

- No backend server for core tools
- No database or persistent user storage
- No account system for the current public tool set
- No collection of user-entered work data by the application itself
- No paid external API required for baseline execution
- No private API key exposed to client-side JavaScript
- Tool pages must be directly deployable as static pages
- User work data should be handled as 100% browser-side processing unless a future spec explicitly changes the architecture
- Analytics must be event-only and privacy-safe; do not send input text, file names, extracted data, or recording contents

## Implemented Tools

### Voice

- `음성으로 텍스트 쓰기`
  - Real-time Korean speech recognition
  - Automatic reconnect handling
  - Transcript cleanup
  - Script generation for general, YouTube, presentation, and meeting formats
  - Copy and TXT export

### Video

- `웹캠 녹화기`
  - Camera and optional microphone recording
  - WebM default output with browser-dependent MP4 options
  - Mirror, filters, brightness, contrast, and saturation controls
  - Optional background blur, solid color background, and user-uploaded image background
  - Background images remain local to the browser and are not uploaded

### Text

- `AI 복붙 서식 정리`
- `글자수 세기`
- `줄바꿈·공백 정리`
- `이메일·URL·전화번호 추출기`
- `중복 줄 제거`
- `찾기 및 바꾸기`
- `대소문자 변환`
- `텍스트 비교기`

### Image

- `QR 코드 생성기`
  - Text, URL, and Wi-Fi QR payload generation
  - Optional download filename input
  - Simple styling controls: foreground color, background color, module shape, size, and output format
  - SVG, PNG, and JPG download support
  - PNG/JPG export is handled by browser-side SVG-to-Canvas conversion
  - QR scan stability must be preserved with a quiet-zone margin, high error correction, and automatic contrast fallback to dark foreground on light background
- `이미지 크기 조절`
- `이미지 형식 변환`
- `이미지 용량 압축`
- `EXIF 메타데이터 제거`
  - Browser-side removal for privacy-sensitive EXIF, XMP, IPTC, comment, and text metadata
  - Supported formats: JPG/JPEG, PNG, and WEBP
  - Files remain local and are not uploaded to an application server

### PDF

- `PDF 합치기`
- `PDF 분할`
- `PDF 페이지 추출`
- `이미지 PDF 변환`
- `PDF 이미지 변환`

### Subtitle

- `SRT 자막 정리`
- `SRT ↔ VTT 변환`
- `자막 시간 보정`

## URL Strategy

- Home: `/`
- Tool pages: `/tools/{slug}/`
- Category landing pages: `/tools/text/`, `/tools/pdf/`, `/tools/image/`, `/tools/subtitle/`, `/tools/voice-video/`
- Policy pages: `/privacy`, `/terms`

Each tool page should have:

- Unique title
- Unique meta description
- Canonical URL
- Dedicated Open Graph URL
- Browser-side app shell driven by `app.js`
- Collapsed usage examples and FAQ below Quick Flow for SEO and user help

Current category pages:

| Category | URL | Source file | `data-category-page` |
| --- | --- | --- | --- |
| Text | `/tools/text/` | `tools/text/index.html` | `text` |
| PDF | `/tools/pdf/` | `tools/pdf/index.html` | `pdf` |
| Image | `/tools/image/` | `tools/image/index.html` | `image` |
| Subtitle | `/tools/subtitle/` | `tools/subtitle/index.html` | `subtitle` |
| Voice/Video | `/tools/voice-video/` | `tools/voice-video/index.html` | `voice-video` |

Category pages are static HTML shells that reuse `app.js`. They should not duplicate individual tool logic. The category content is rendered from `CATEGORY_PAGE_DEFS` in `app.js`.

## Frontend Structure

- `index.html`: platform home shell
- `tools/*/index.html`: static tool entry pages
- `styles.css`: shared platform and tool styles
- `app.js`: tool registry, page rendering, and browser-side tool logic

Important frontend implementation notes:

- `TOOL_DEFS` in `app.js` is the source of truth for individual tools.
- `CATEGORY_PAGE_DEFS` in `app.js` is the source of truth for category landing pages.
- `renderCategoryPage()` renders category landing pages.
- `renderHomeCategoryLinks()` adds the compact category links on the home screen.
- `injectCategoryStructuredData()` injects `CollectionPage`, `ItemList`, and `BreadcrumbList` schema for category pages.
- `.category-mode` and `.home-category-links` in `styles.css` control category landing layout and home category navigation.
- The current category pages intentionally hide the left tool sidebar and show a wider category tool grid.
- When `app.js` or `styles.css` changes, bump the query-string cache version in every HTML entry and `site.webmanifest`.
- Run `npm.cmd run apply:site-tags` after adding or changing HTML pages so GTM tags and CSP hashes remain managed.
- File upload tools should support both direct file selection and drag-and-drop on `.upload-box` where browser APIs allow it.

## Deployment Model

- GitHub Actions prepares `.cloudflare-dist/`
- Root files are copied into `.cloudflare-dist/`
- The `tools/` directory is copied recursively into `.cloudflare-dist/`
- Cloudflare Pages deploys `.cloudflare-dist/`

## Security Rules

- CSP is managed in `_headers`
- External runtime libraries are limited to browser-side tool libraries loaded from CDN
- Tool inputs and uploaded files are processed in the browser and not sent to an application server
- The service copy should communicate clearly that work data is not stored by our server and is processed in the user's browser
- The current product does not operate login, membership, or first-party personal-data collection
- Deployment secrets remain in GitHub Actions Secrets or Cloudflare settings only
- GA/GTM events must follow `ANALYTICS.md` and use only allowlisted, non-content parameters

## AdSense And Privacy Readiness

Current readiness state:

- AdSense script and `google-adsense-account` meta tag are present on public HTML pages.
- `ads.txt` exists at the site root.
- `privacy.html` explains Google advertising, Google Analytics/Tag Manager, cookies, personalized ads, browser/ad settings, and non-content analytics events.
- The privacy policy states that user-entered text, file contents, extracted data, recording contents, and generated outputs are not sent as analytics or advertising event parameters.
- Footer contact information is present for advertising, collaboration, and partnership inquiries.
- Empty ad slots remain hidden; ad areas are separated from editor/upload/result surfaces.

Do not:

- Add copy that asks users to click ads.
- Place ads inside textareas, file upload boxes, download controls, modals, or QR/image/PDF result previews.
- Send user content, file names, extracted email/URL/phone data, or recording contents through GTM/GA.
- Add new third-party ad or analytics scripts without updating `_headers`, `privacy.html`, and this spec.

Core tool FAQ/usage copy was expanded for AdSense/SEO readiness on these tools:

- `AI 복붙 서식 정리`
- `글자수 세기`
- `QR 코드 생성기`
- `이미지 용량 압축`
- `PDF 합치기`

## Public Contact Copy

Footer and policy pages should expose the same operator information:

- Maker: Dayway / 데이웨이
- Website: `https://dayway.web.app`
- Email: `dayway.ict@gmail.com`
- Advertising, collaboration, and partnership inquiries should be directed to the email address above.

## Remaining Work

- Run manual camera and microphone checks on real Chrome/Edge devices after each media-tool change
- Manually scan generated QR samples on real mobile devices after QR design changes, especially colored or rounded styles
- Monitor category landing pages in Search Console and expand category copy if pages are indexed with weak impressions
- Request indexing for the five category landing pages after deployment:
  - `https://ko-workspace.com/tools/text/`
  - `https://ko-workspace.com/tools/pdf/`
  - `https://ko-workspace.com/tools/image/`
  - `https://ko-workspace.com/tools/subtitle/`
  - `https://ko-workspace.com/tools/voice-video/`
- Tune AdSense placements after approval and keep ads outside editor/upload/drop zones
- Monitor MediaPipe background-effect load failures and add a local fallback if CDN reliability becomes a problem
- Request indexing for new or materially changed tool pages in Search Console

## Verification Checklist

Before committing or deploying broad platform changes:

- Run `npm.cmd run check`
- Run `git diff --check`
- Confirm all HTML pages use the latest cache version for `/app.js`, `/styles.css`, `/favicon.svg`, and `/site.webmanifest`
- For new HTML pages, confirm these IDs exist: `heroEyebrow`, `pageTitle`, `pageDescription`, `toolSearch`, `categoryFilters`, `toolList`, `toolOverview`, `toolWorkspace`, `toolGuideList`, `helpBtn`, `helpDialog`, `helpCloseBtn`, `selectionCopyBtn`
- Confirm `sitemap.xml` includes new indexable URLs
- After push, verify GitHub Actions / Cloudflare Pages success
- For category pages, verify each production URL returns `200` and contains `data-category-page`
- For privacy changes, verify production `/privacy` contains the updated Google advertising/cookie language

## Open Source Fallback Rule

For feature additions, removals, analytics, ads, SEO, privacy, and deployment hygiene, follow `CHANGE_PLAYBOOK.md`. Keep `npm.cmd run check` green before committing because it runs the automated project audit.

When a browser-side feature fails functional testing, do not keep expanding fragile custom code by default. First check whether a mature open-source browser library can solve the failing area with less risk.

Selection and fallback details are maintained in `OPEN_SOURCE_FALLBACKS.md`.

## Ad Layout Principle

Ad slots are pre-separated from the work surface.

Prepared slot positions:

- `top-banner`
- `bottom-banner`
- `left-rail`
- `right-rail`

When ad slots are empty, they remain hidden.
