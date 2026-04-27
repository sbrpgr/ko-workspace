# 배포 및 운영 메모

## 결론

이 앱은 정적 HTML/CSS/JS만 사용하는 브라우저 도구이므로 Firebase Hosting보다 GitHub + Cloudflare Pages 조합이 더 적합합니다.

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

- Framework preset: None
- Build command: 비워둠
- Build output directory: `/`
- Root directory: 비워둠
- Production branch: `main`

## 배포 전 교체해야 할 값

- `ads.txt`: AdSense 승인 후 실제 Publisher ID로 교체
- `robots.txt`: 커스텀 도메인 연결 시 Sitemap 주소 교체
- `sitemap.xml`: 커스텀 도메인 연결 시 URL 교체
- `privacy.html`: 운영자 문의처 추가

## 보안 파일

- `_headers`: Cloudflare Pages 보안 헤더
- `_redirects`: 짧은 정책 페이지 URL 리다이렉트
- `.gitignore`: 로컬 브라우저 프로필과 임시 파일 제외
