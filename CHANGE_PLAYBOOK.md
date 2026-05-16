# 코워크스페이스 변경 플레이북

이 문서는 기능 추가, 기능 삭제, 광고/분석/SEO 변경, 외부 라이브러리 추가처럼 사이트에 영향을 주는 작업을 빠뜨리지 않기 위한 기준이다.

## 공통 원칙

- 사용자가 입력한 텍스트, 파일, 이미지, 녹화 데이터는 자체 서버로 보내지 않는다.
- 외부 라이브러리를 추가할 때는 브라우저 처리에 필요한 정적 스크립트만 사용하고, `_headers`의 CSP 허용 여부를 확인한다.
- `app.js` 또는 `styles.css`가 바뀌면 모든 HTML과 `site.webmanifest`의 정적 리소스 버전을 올린다.
- 변경 후에는 `npm.cmd run check`를 통과시킨다. 이 명령은 사이트 태그와 프로젝트 구조 감사까지 함께 수행한다.
- 배포 후에는 GitHub Actions 성공, 주요 라이브 URL 200 응답, 새 캐시 버전 반영을 확인한다.

## 새 도구 추가

- `app.js`의 `TOOL_DEFS`에 도구 정의를 추가한다.
- `TOOL_RENDERERS`, `TOOL_VISUALS`, `TOOL_USE_EXAMPLES`, `TOOL_EXTRA_FAQS`를 함께 추가한다.
- `tools/{slug}/index.html`을 만들고 필수 DOM ID를 포함한다.
- 홈 구조화 데이터와 `sitemap.xml`에 새 URL을 추가한다.
- 관련 카테고리 페이지의 설명과 키워드를 필요하면 업데이트한다.
- 파일 업로드형 도구는 직접 파일 선택과 `.upload-box` 드래그 앤 드롭이 모두 동작하는지 확인한다.
- 외부 라이브러리를 쓰면 CDN 접근성, CSP, 개인정보 영향을 확인한다.
- Search Console에서 새 URL 색인 요청이 필요한지 기록한다.

## 영어 버전 또는 다국어 SEO 변경

- 영어판은 `/en/`, 일본어판은 `/ja/`, 중국어 간체판은 `/zh/` 하위 정적 페이지로 유지하고, 기존 한국어 URL과 기능을 대체하지 않는다.
- `app.js`의 locale별 override를 바꿨으면 `node scripts/generate-english-pages.js`로 다국어 정적 페이지를 다시 생성한다.
- 한국어/영어/일본어/중국어 대응 URL의 canonical, `hreflang="ko"`, `hreflang="en"`, `hreflang="ja"`, `hreflang="zh-Hans"`, `hreflang="x-default"`를 확인한다.
- `sitemap.xml`에 새 다국어 URL과 대응 한국어 URL이 모두 남아 있는지 확인한다.
- locale별 title, description, 구조화 데이터가 실제 해당 언어판 기능과 언어를 설명하는지 확인한다.
- Search Console에서 sitemap 제출 상태, URL 검사, 색인 생성 요청 대상 URL을 완료 보고에 남긴다.

## 도구 삭제 또는 경로 변경

- `TOOL_DEFS`, 렌더러, 시각 요소, 활용 예시, FAQ에서 제거한다.
- `tools/{slug}/index.html`, `sitemap.xml`, 홈 구조화 데이터, 카테고리 설명을 정리한다.
- 기존 URL이 검색엔진에 노출된 적이 있으면 `_redirects` 또는 적절한 대체 URL을 검토한다.
- 블로그 홍보 자료, 내부 문서, Search Console 색인 요청 목록에 남은 링크가 없는지 확인한다.

## 애널리틱스

- Google 태그는 `<head>` 바로 아래에 유지한다.
- 측정 ID가 바뀌면 `scripts/site-tags.js`, `_headers`의 CSP 해시, 모든 HTML 반영 여부를 확인한다.
- 사용자 입력값, 파일명, 추출 결과, QR 결과 같은 민감할 수 있는 데이터는 이벤트 파라미터로 보내지 않는다.
- 배포 후 실시간 보고서와 라이브 HTML 태그를 확인한다.

## 광고

- 광고 슬롯은 작업 영역, 업로드 박스, 텍스트 영역, 결과 미리보기 안에 넣지 않는다.
- 광고 스크립트나 동의/개인정보 문구 변경 시 `privacy.html`, `_headers`, AdSense 정책 문구를 함께 확인한다.
- 빈 광고 슬롯이 사용자 작업 UI를 밀어내지 않는지 모바일과 데스크톱에서 본다.

## 보안과 개인정보

- 자동으로 외부 링크를 열지 않는다. QR, URL 추출, 링크 분석 기능은 사용자가 직접 열게 한다.
- 새 권한이 필요한 기능은 권한 목적을 UI에 명확히 드러내고, 권한 없이도 실패 상태가 부드럽게 보여야 한다.
- 카메라/마이크/클립보드/파일 API를 쓸 때는 브라우저 호환성과 거부 상태를 확인한다.
- 사용자가 해결하기 어려운 오류, 실패, 권한 차단, 브라우저 미지원 안내에는 `dayway.ict@gmail.com` 연락 문구를 함께 제공한다.

## 자동 감사

`npm.cmd run check`는 다음을 자동 확인한다.

- Google 태그와 CSP 관리 상태
- HTML과 `site.webmanifest`의 캐시 버전 일치
- 새 도구 페이지, 필수 DOM ID, canonical URL, sitemap, 홈 구조화 데이터 반영
- 도구별 렌더러, 카드 정보, 활용 예시, FAQ 누락
- 카테고리 페이지와 sitemap 반영
- 외부 라이브러리 CDN origin의 CSP 허용 여부

자동 감사가 잡지 못하는 실제 UX, 모바일 카메라, QR 실물 인식, AdSense 정책 판단, Search Console 작업은 사람이 직접 확인한다.
