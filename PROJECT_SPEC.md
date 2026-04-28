# 코워크스페이스 (ko-workspace) Product Spec

## Product Direction

`코워크스페이스 (ko-workspace)` is a static office utility platform for Korean users and general browser-based work. It is designed to host many small, high-frequency tools that solve day-to-day text, image, PDF, subtitle, and voice tasks without requiring account creation or server-side storage.

## Current Shipping Scope

The current deployment targets Cloudflare Pages and keeps all initial tools inside a browser-only execution model.

Core constraints:

- No backend server for core tools
- No database or persistent user storage
- No paid external API required for baseline execution
- No private API key exposed to client-side JavaScript
- Tool pages must be directly deployable as static pages

## Implemented Tools

### Voice

- `음성으로 텍스트 쓰기`
  - Real-time Korean speech recognition
  - Automatic reconnect handling
  - Transcript cleanup
  - Script generation for general, YouTube, presentation, and meeting formats
  - Copy and TXT export

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

## Frontend Structure

- `index.html`: platform home shell
- `tools/*/index.html`: static tool entry pages
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
- Deployment secrets remain in GitHub Actions Secrets or Cloudflare settings only

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
