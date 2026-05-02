# Work Log

## 2026-04-28

### Platform Shift

- Reworked the product from a single voice tool into a multi-tool `ko-workspace` platform
- Added a shared static app shell for home and tool pages
- Added dedicated static tool pages under `tools/{slug}/`
- Updated titles, descriptions, canonical URLs, and OG URLs per tool page

### Implemented Tools

- Voice: speech-to-text and script builder
- Text: AI markdown cleanup, character counter, line-break cleaner, extractor, duplicate-line remover, find-replace, case converter, text diff
- Image: QR generator, image resizer, image converter, image compressor
- PDF: merge, split, extract pages, image-to-pdf, pdf-to-image
- Subtitle: SRT cleaner, SRT/VTT converter, subtitle timing shift

### Security And Deployment

- Kept the initial scope browser-only for Cloudflare Pages static deployment
- Updated `_headers` CSP to allow the minimum required browser-side tool libraries
- Added `worker-src` for PDF rendering worker usage
- Updated GitHub Actions deploy flow to copy the `tools/` directory into `.cloudflare-dist/`
- Updated `site.webmanifest` for the `ko-workspace` platform
- Expanded `sitemap.xml` to include tool pages

### Notes

- Initial advanced features such as OCR, background removal, PDF password removal, PDF compression, and AI summary/translation remain excluded from the static-only launch scope
- Ad slots remain separated from the work surface and hidden when unused

### Webcam Recorder Update

- Added optional webcam background effects: blur, solid color, and user-uploaded image background
- Kept background removal/transparency out of scope
- Loaded MediaPipe segmentation only when a background effect is enabled
- Kept uploaded background images local to the browser; files are not sent to an application server
- Updated CSP to allow the pinned MediaPipe CDN and WASM execution needed for browser-side segmentation

### Trust And Contact Copy

- Added public copy that work data is processed in the browser and not stored by our own server
- Clarified that the current public tools do not require membership or first-party personal-data collection
- Added advertising, collaboration, and partnership inquiry guidance to use `dayway.ict@gmail.com`
- Updated the product specification with remaining operational, SEO, analytics, and monetization tasks

### SEO FAQ And Analytics

- Added collapsed usage examples and FAQ content below Quick Flow for every tool page
- Added dynamic FAQPage structured data from the same visible FAQ content
- Added privacy-safe GTM `dataLayer` events for tool open, run, copy, download, permission request, and FAQ opening
- Documented analytics allowlists in `ANALYTICS.md` so no input text, file names, extracted data, or recording contents are sent

## 2026-04-29

### QR Code Generator Update

- Improved the QR generator UI with a cleaner preview frame and simpler options
- Added optional download filename input
- Kept user-facing options limited to color, background, shape, size, and save format
- Added SVG, PNG, and JPG download support
- Implemented PNG/JPG downloads through browser-side SVG-to-Canvas conversion
- Set QR generation to high error correction and preserved quiet-zone margins for scan stability
- Added automatic contrast fallback to dark foreground on light background when the selected colors may reduce recognition reliability
- Bumped static asset cache version to `20260429-12`
- Deployed commit `18b5f47 Improve QR generator exports` through GitHub Actions / Cloudflare Pages

### AdSense And SEO Readiness

- Expanded the privacy policy with Google advertising, analytics, cookies, personalized ads, and non-content analytics-event guidance
- Added five category landing pages: text, PDF, image, subtitle, and voice/video
- Linked category landing pages from the home screen with a compact category navigation strip
- Added category page structured data and sitemap entries
- Improved usage flow and FAQ copy for core tools: AI text cleaner, character counter, QR generator, image compressor, and PDF merge
- Bumped shared asset cache version to `20260429-13`
- Deployed commit `580c060 Improve AdSense SEO readiness` through GitHub Actions / Cloudflare Pages
- Verified production category URLs returned `200`, used `app.js?v=20260429-13`, and included `data-category-page`
- Verified production `/privacy` contained the Google advertising/cookie copy
- Verified production `sitemap.xml` contained category landing page URLs

### Handoff Notes

- `PROJECT_SPEC.md` is the primary product/spec handoff document.
- `ROADMAP.md` records SEO, URL, and future feature direction.
- `ANALYTICS.md` is the event privacy contract; do not add analytics fields outside its allowlist without updating it.
- Category landing pages are controlled by `CATEGORY_PAGE_DEFS`, `renderCategoryPage()`, and `injectCategoryStructuredData()` in `app.js`.
- The home category strip is controlled by `renderHomeCategoryLinks()` in `app.js` and `.home-category-links` in `styles.css`.
- Category page layout is controlled by `.category-mode` styles.
- New HTML pages must run through `npm.cmd run apply:site-tags`.
- Broad JS/CSS changes should bump the shared cache version across all HTML pages and `site.webmanifest`.

### Policy Page Layout Update

- Added centered document-page/document-panel styling for `/privacy` and `/terms`
- Improved policy page readability with constrained width, card surface, section spacing, and mobile padding
- Bumped shared asset cache version to `20260429-14`

## 2026-05-02

### AI Table Paste Converter

- Added `AI 표 복붙 변환기` at `/tools/ai-table-converter/`
- Parses Markdown, pipe, TSV, and CSV tables from AI answers even when surrounding explanation text is included
- Supports optional cell-format cleanup for Markdown emphasis, links, inline code, list markers, HTML, empty rows, and empty columns
- Added document-copy HTML, spreadsheet TSV copy, CSV copy, and CSV download outputs
- Kept all pasted AI answer and table data browser-side with no application-server upload or content analytics parameters
- Updated text category copy, sitemap, home structured data, `PROJECT_SPEC.md`, `ROADMAP.md`, and `README.md`
- Bumped shared asset cache version to `20260502-07`
- Validated with `npm.cmd run check` and `git diff --check`
- Deployed commit `c0b3691 Add AI table paste converter` through GitHub Actions / Cloudflare Pages
- Verified production `https://ko-workspace.com/tools/ai-table-converter/` returned `200` and contained `app.js?v=20260502-07`
