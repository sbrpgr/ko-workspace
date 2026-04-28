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
