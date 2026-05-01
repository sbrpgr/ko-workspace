# 보안 운영 메모

## 비밀값 관리

- Cloudflare API Token, Account ID, GitHub Token, AdSense 계정 정보는 소스 파일에 직접 저장하지 않습니다.
- 배포 자동화에 필요한 값은 GitHub 저장소의 `Settings > Secrets and variables > Actions`에 Repository Secret으로만 등록합니다.
- 로컬 테스트용 값은 `.env`, `.dev.vars`처럼 Git에서 제외된 파일에만 둡니다.

## 배포 권한

- Cloudflare API Token은 가능한 한 Pages 배포에 필요한 최소 권한으로 생성합니다.
- 토큰을 채팅, 문서, 커밋 메시지, 이슈, README에 붙여넣지 않습니다.
- 토큰이 노출됐다고 의심되면 즉시 Cloudflare/GitHub에서 폐기하고 새로 발급합니다.

## 광고 코드

- AdSense Publisher ID는 공개 식별자이지만, Google 계정 로그인 정보와 API Token은 비밀값으로 취급합니다.
- 광고 삽입 시 inline script를 추가하지 않고, 외부 AdSense 스크립트와 `app.js` 초기화 흐름을 사용합니다.
- CSP를 약화시키기 위해 `script-src`에 `unsafe-inline`을 추가하지 않습니다.
- 새 광고 스크립트 도메인을 추가해야 할 때는 `_headers`의 CSP를 최소 범위로만 수정합니다.
- HSTS는 현재 루트 도메인 기준으로만 적용하며, `www` DNS가 활성화되기 전에는 `includeSubDomains`를 사용하지 않습니다.

## 브라우저 라이브러리

- 현재 PDF 렌더링, QR 생성, 녹음 파일 텍스트 변환은 브라우저에서 로드되는 외부 라이브러리를 사용합니다.
- 허용 도메인은 `_headers`의 CSP에 최소 범위로만 추가합니다.
- Transformers.js 기반 브라우저 음성 인식은 백엔드 모듈과 워커를 `blob:` URL로 준비하므로 `script-src blob:`, `worker-src blob:`, `'wasm-unsafe-eval'`을 유지합니다.
- 새 라이브러리를 넣을 때는 서버/API 의존성이 없는지 먼저 확인합니다.
- 클라이언트 코드에 유료 서비스 키나 비밀 토큰을 넣지 않습니다.

## 구조화 데이터

- JSON-LD 구조화 데이터는 `app.js`가 현재 페이지 기준으로 동적으로 주입합니다.
- inline JSON-LD hash 유지 작업은 더 이상 필요하지 않습니다.

## 커밋 전 점검

커밋 전에는 아래처럼 민감정보 패턴을 검색합니다.

```powershell
rg -n --hidden --glob '!.git/**' --glob '!node_modules/**' --glob '!.browser-profile/**' --glob '!.cloudflare-dist/**' --glob '!.wrangler/**' "(api[_-]?key|secret|token|password|private[_-]?key|BEGIN .*PRIVATE KEY|ghp_|github_pat_)"
```
