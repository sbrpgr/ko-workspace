# 코워크스페이스 (ko-workspace) Product Spec

## Product Direction

`코워크스페이스 (ko-workspace)` is a static office utility platform for Korean users and general browser-based work. It is designed to host many small, high-frequency tools that solve day-to-day text, image, PDF, subtitle, and voice tasks without requiring account creation or server-side storage.

## Current Shipping Scope

The current deployment targets Cloudflare Pages and keeps all initial tools inside a browser-only execution model.

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
- `이미지 크기 조절`
- `이미지 형식 변환`
- `이미지 용량 압축`

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
- Policy pages: `/privacy`, `/terms`

Each tool page should have:

- Unique title
- Unique meta description
- Canonical URL
- Dedicated Open Graph URL
- Browser-side app shell driven by `app.js`
- Collapsed usage examples and FAQ below Quick Flow for SEO and user help

## Frontend Structure

- `index.html`: platform home shell
- `tools/*/index.html`: static tool entry pages
- `tools/{category}/index.html`: category landing pages for grouped SEO entry points
- `styles.css`: shared platform and tool styles
- `app.js`: tool registry, page rendering, and browser-side tool logic

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

## Public Contact Copy

Footer and policy pages should expose the same operator information:

- Maker: Dayway / 데이웨이
- Website: `https://dayway.web.app`
- Email: `dayway.ict@gmail.com`
- Advertising, collaboration, and partnership inquiries should be directed to the email address above.

## Remaining Work

- Run manual camera and microphone checks on real Chrome/Edge devices after each media-tool change
- Review and merge category landing pages from `feature/category-landing-pages` after visual QA
- Tune AdSense placements after approval and keep ads outside editor/upload/drop zones
- Monitor MediaPipe background-effect load failures and add a local fallback if CDN reliability becomes a problem
- Request indexing for new or materially changed tool pages in Search Console

## Open Source Fallback Rule

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
