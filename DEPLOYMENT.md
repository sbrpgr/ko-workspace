# 배포 및 운영 메모

## 결론

이 앱은 정적 HTML/CSS/JS만 사용하는 브라우저 도구이므로 Firebase Hosting보다 GitHub + Cloudflare Pages 조합이 더 적합합니다.

현재 Cloudflare Pages 프로젝트는 Direct Upload 방식으로 먼저 생성되어 있습니다. Cloudflare 공식 제약상 Direct Upload 프로젝트는 나중에 Git integration 프로젝트로 전환할 수 없으므로, 기존 레거시 내부 프로젝트인 `mic-script-generator.pages.dev`를 유지하려면 GitHub Actions가 Wrangler로 배포하는 방식이 가장 현실적입니다. 공개 서비스명과 GitHub 저장소명은 `ko-workspace`를 기준으로 관리합니다.

## Cloudflare Pages를 권장하는 이유

- 정적 파일 배포에 충분합니다.
- GitHub push와 자동 배포를 연결하기 쉽습니다.
- HTTPS가 기본 제공되어 마이크 권한이 `file://`보다 안정적으로 동작합니다.
- `_headers`, `_redirects`, `robots.txt`, `ads.txt` 같은 루트 파일 운영이 간단합니다.
- Cloudflare의 보안 헤더, CDN, DNS, 추후 커스텀 도메인 연결을 한곳에서 관리할 수 있습니다.

## Firebase Hosting이 필요한 경우

- 이미 Firebase Auth, Firestore, Functions를 함께 쓸 계획이 있을 때
- Google Cloud/Firebase 생태계 안에서 운영, 로그, 인증을 통합해야 할 때
- 장기적으로 사용자 계정, 저장 기능, 서버 API가 Firebase에 묶일 때

현재 앱 범위에서는 Firebase가 필수는 아닙니다.

## Cloudflare Pages 설정값

기존 프로젝트 유지 시:

- Public project/repository name: `ko-workspace`
- Cloudflare Pages internal project name: `mic-script-generator`
- Production domain: `https://ko-workspace.com/`
- Deployment method: GitHub Actions + Wrangler Direct Upload
- Workflow: `.github/workflows/cloudflare-pages.yml`
- Production branch: `main`

새 Git integration 프로젝트를 따로 만들 때:

- Framework preset: None
- Build command: 비워둠
- Build output directory: `/`
- Root directory: 비워둠
- Production branch: `main`

## GitHub Actions Secrets

GitHub 저장소의 `Settings > Secrets and variables > Actions > Repository secrets`에 아래 값을 추가해야 합니다.

- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID
- `CLOUDFLARE_API_TOKEN`: Cloudflare Pages Edit 권한이 있는 API Token

## 배포 전 교체해야 할 값

- `ads.txt`: AdSense 승인 후 실제 Publisher ID로 교체
- `robots.txt`: 현재 `https://ko-workspace.com/sitemap.xml` 기준
- `sitemap.xml`: 홈과 `/tools/{slug}/` 공개 URL 기준
- `privacy.html`: 운영자 문의처 추가

## 공통 태그 자동 적용

- Google Tag Manager container: `GTM-W3MF6BSN`
- 로컬에서 새 HTML 페이지를 추가한 뒤 `npm run apply:site-tags`를 실행하면 `<head>` GTM 스크립트, `<body>` noscript iframe, `_headers` CSP 허용 항목이 자동으로 정리됩니다.
- GitHub Actions는 배포 패키징 전에 `npm run apply:site-tags`를 실행하므로, `tools/{slug}/index.html` 형태의 새 도구 페이지도 배포 시 공통 태그가 자동 반영됩니다.
- `npm run check`는 JavaScript 문법과 공통 태그 누락 여부를 함께 검증합니다.

## 검색 최적화 파일

- `index.html`: 플랫폼 홈 title, meta description, canonical, Open Graph
- `tools/*/index.html`: 도구별 title, meta description, canonical, Open Graph
- `app.js`: 현재 페이지 기준 JSON-LD 주입
- `sitemap.xml`: 홈, 정책 페이지, 도구 페이지 URL과 `lastmod`
- `robots.txt`: sitemap 위치 고지
- `favicon.svg`, `site.webmanifest`: 브라우저와 검색 결과 보조 메타데이터

## 보안 파일

- `_headers`: Cloudflare Pages 보안 헤더
- `.gitignore`: 로컬 브라우저 프로필과 임시 파일 제외

## 현재 정적 자산 복사 범위

GitHub Actions workflow는 아래 자산을 `.cloudflare-dist/`로 복사합니다.

- 루트 정적 파일: `index.html`, `styles.css`, `app.js`, `privacy.html`, `terms.html`, `robots.txt`, `sitemap.xml`, `ads.txt`, `_headers`, `favicon.svg`, `site.webmanifest`
- 도구 페이지 디렉터리: `tools/`
