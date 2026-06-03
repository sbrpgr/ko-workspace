# 다국어 버전 및 SEO 작업 명세

이 문서는 코워크스페이스 영어(`/en/`), 일본어(`/ja/`), 중국어 간체(`/zh/`) 버전과 검색 최적화 작업을 이어서 수정하거나 점검할 때 확인해야 할 작업 명세다. 외국어 버전은 기존 한국어 플랫폼을 대체하지 않고, 같은 도메인 안에서 언어별 하위 경로로 분리된 정적 페이지로 운영한다.

## 현재 구현 기준

- 한국어판 기본 경로: `/`, `/tools/{slug}/`, `/privacy`, `/terms`
- 영어판 기본 경로: `/en/`, `/en/tools/{slug}/`, `/en/privacy/`, `/en/terms/`
- 일본어판 기본 경로: `/ja/`, `/ja/tools/{slug}/`, `/ja/privacy/`, `/ja/terms/`
- 중국어 간체판 기본 경로: `/zh/`, `/zh/tools/{slug}/`, `/zh/privacy/`, `/zh/terms/`
- 영어·일본어·중국어 정적 페이지 생성 스크립트: `scripts/generate-english-pages.js`
- 영어 도구 정의: `app.js`의 `TOOL_DEFS_EN_OVERRIDES`
- 영어 카테고리 정의: `app.js`의 `CATEGORY_PAGE_DEFS_EN`
- 일본어/중국어 도구 정의: `app.js`의 `TOOL_DEFS_LOCALE_OVERRIDES`
- 일본어/중국어 카테고리 정의: `app.js`의 `CATEGORY_PAGE_DEFS_BY_LOCALE`
- 현재 정적 리소스 캐시 버전: `20260604-03`
- 최근 영어 SEO 배포 커밋: `0385e6d Polish English SEO copy`
- 최근 외국어 도구 로컬라이징 및 운영 E2E 배포 커밋: `97baf2f Complete foreign tool localization testing fixes`

## 분리 원칙

- 한국어판 기능과 URL은 기존 상태를 유지한다.
- 외국어판 전용 변경은 가능한 한 `/en/`, `/ja/`, `/zh/` 정적 HTML, locale별 override, locale 분기 안에서 처리한다.
- 한국어 UI 문구, 한국어 도구 동작, 기존 `/tools/{slug}/` URL을 외국어판 작업 때문에 바꾸지 않는다.
- 영어판 음성 입력은 `en-US` 인식 기준이며, 한국어판 음성 입력은 기존 `ko-KR` 기준을 유지한다.
- 영어판 SEO 문구가 한국어 기능 설명을 오해시키지 않도록 `Korean speech`, `Korean Dictation` 같은 문구가 영어 음성 입력 페이지에 남지 않게 한다.
- 일본어/중국어 사용 예시와 시나리오는 한국어 문장의 단순 번역이 아니라 해당 언어권에서 자연스럽게 쓰는 업무 표현으로 작성한다.
- 동적으로 생성되는 상태 메시지, 복사/다운로드 안내, 오류 안내도 locale helper를 통해 출력하고, 외국어 페이지에 한국어 fallback이 보이지 않게 한다.

## SEO 기본 기준

- 모든 indexable 다국어 페이지는 다음을 가져야 한다.
  - 자기 자신을 가리키는 canonical
  - 한국어 대응 URL을 가리키는 `hreflang="ko"`
  - 영어 URL을 가리키는 `hreflang="en"`
  - 일본어 URL을 가리키는 `hreflang="ja"`
  - 중국어 간체 URL을 가리키는 `hreflang="zh-Hans"`
  - 기본 한국어 URL을 가리키는 `hreflang="x-default"`
  - 고유 title과 meta description
  - Open Graph URL과 Twitter description
  - 구조화 데이터의 `inLanguage`와 URL이 해당 언어 페이지에 맞는지 확인
- `sitemap.xml`에는 한국어, 영어, 일본어, 중국어 간체 URL을 모두 포함한다.
- 2026-05-17 기준 sitemap은 총 152개 URL이며 KO/EN/JA/ZH가 각각 38개씩 들어 있다.
- `robots.txt`는 `https://ko-workspace.com/sitemap.xml`을 가리켜야 한다.
- `app.js` 또는 `styles.css`를 수정하면 한국어/영어/일본어/중국어 HTML과 `site.webmanifest`, `PROJECT_SPEC.md`의 캐시 버전을 함께 올린다.

## 변경 절차

1. `git status --short`로 작업트리를 확인한다.
2. `app.js`의 locale별 override, 동적 문구 helper, 카테고리 정의를 수정한다.
3. 다국어 정적 페이지가 필요한 변경이면 `node scripts/generate-english-pages.js`를 실행한다.
4. `app.js` 또는 `styles.css`가 바뀌었으면 정적 리소스 캐시 버전을 올린다.
5. HTML을 추가하거나 바꿨으면 `npm.cmd run apply:site-tags`로 관리 태그를 맞춘다.
6. `npm.cmd run check`와 `git diff --check`를 통과시킨다.
7. 배포가 필요한 변경이면 `origin/main` 푸시, GitHub Actions 성공, 운영 URL 반영을 확인한다.

## 운영 확인 URL

- 한국어 홈: `https://ko-workspace.com/`
- 영어 홈: `https://ko-workspace.com/en/`
- 일본어 홈: `https://ko-workspace.com/ja/`
- 중국어 간체 홈: `https://ko-workspace.com/zh/`
- 영어 음성 입력: `https://ko-workspace.com/en/tools/voice-to-text/`
- 사이트맵: `https://ko-workspace.com/sitemap.xml`
- robots: `https://ko-workspace.com/robots.txt`

## 2026-05-17 외국어 기능 검증 기준

- 배포 커밋: `97baf2f Complete foreign tool localization testing fixes`
- 운영 확인 app 리소스: `https://ko-workspace.com/app.js?v=20260604-03`
- 정적 검사: `npm.cmd run check` 통과, smoke test 49 checks 통과, `npm audit --omit=dev` 취약점 0개
- 운영 E2E 대상: EN/JA/ZH 3개 언어 × 30개 도구 = 90개 시나리오
- 운영 E2E 결과: 실패 0건, 경고 0건
- 언어별 공통 결과:
  - 페이지 로드: 30/30 PASS
  - 변환/실행: 30/30 PASS
  - 파일 업로드: 17 PASS, 12 N/A, QR 생성기는 업로드 없음
  - 복사: 17 PASS, 13 N/A
  - 다운로드: 20 PASS, 10 N/A
  - 오류 상태: 29 PASS, 1 N/A
  - 한국어 문구 누수 검사: 30/30 PASS
- PDF/이미지/오디오/웹캠/음성 인식 도구는 fixture 파일과 Chromium 권한 자동화로 end-to-end 검증했다.
- 실제 물리 카메라/마이크 장치 검사는 자동화 환경상 제외하고, fake media 권한 흐름과 fake SpeechRecognition으로 대체했다.
- 성능 정량 지표(LCP, 처리 시간, 대용량 파일 처리, 메모리)는 이 검증 범위에 포함하지 않았으며 별도 성능 작업으로 진행해야 한다.

## Search Console 수동 작업

Search Console 작업은 자동 검증으로 처리할 수 없으므로 사람이 직접 확인한다.

- Sitemaps 메뉴에서 `https://ko-workspace.com/sitemap.xml` 또는 속성 유형에 맞는 `sitemap.xml`을 제출한다.
- `가져올 수 없음`이 뜨면 먼저 운영 URL에서 `sitemap.xml`이 `200 OK`와 `application/xml`로 열리는지 확인한다.
- 제출 직후 `알 수 없음` 또는 `가져올 수 없음`이 잠시 남을 수 있으므로 몇 시간에서 하루 뒤 다시 확인한다.
- 상단 URL 검사 입력창에서 핵심 URL을 검사하고, 실제 URL 테스트 후 색인 생성 요청을 진행한다.
- 우선 요청 URL:
  - `https://ko-workspace.com/en/`
  - `https://ko-workspace.com/ja/`
  - `https://ko-workspace.com/zh/`
  - `https://ko-workspace.com/en/tools/voice-to-text/`
  - `https://ko-workspace.com/en/tools/audio-editor/`
  - `https://ko-workspace.com/en/tools/audio-file-transcription/`
  - `https://ko-workspace.com/ja/tools/audio-file-transcription/`
  - `https://ko-workspace.com/zh/tools/audio-file-transcription/`
  - `https://ko-workspace.com/ja/tools/audio-editor/`
  - `https://ko-workspace.com/zh/tools/audio-editor/`
  - `https://ko-workspace.com/en/tools/pdf-merge/`
  - `https://ko-workspace.com/ja/tools/pdf-merge/`
  - `https://ko-workspace.com/zh/tools/pdf-merge/`
  - `https://ko-workspace.com/en/tools/text/`
  - `https://ko-workspace.com/en/tools/pdf/`
  - `https://ko-workspace.com/en/tools/image/`

## 남은 개선 방향

- 영어판 핵심 도구 3~5개부터 FAQ와 사용 예시를 더 자연스러운 영어로 보강한다.
- 일본어/중국어 핵심 도구는 현지 사용 맥락에 맞게 예시와 FAQ를 계속 다듬는다.
- 우선순위는 `audio-editor`, `audio-file-transcription`, `voice-to-text`, PDF 카테고리, 이미지 카테고리다.
- Search Console에서 EN/JA/ZH URL의 노출, 색인 제외 사유, hreflang 경고를 주기적으로 확인한다.
- 영어권 검색 유입이 생기면 실제 쿼리 기준으로 title, description, FAQ를 조정한다.
- 일본어권/중국어권 검색 유입이 생기면 실제 쿼리 기준으로 title, description, FAQ를 조정한다.
- 성능 작업은 기능 E2E와 분리해 언어별 도구 로딩 시간, 변환 시간, 다운로드 생성 시간, 대용량 fixture 처리 시간을 별도 지표로 측정한다.
