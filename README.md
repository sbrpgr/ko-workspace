# 마이크 대본생성기

마이크로 말하면 한국어 음성을 텍스트로 받아 적고, 입력된 내용을 대본 형식으로 정리하는 로컬 웹앱입니다.

## 실행

폴더 안의 `대본생성기_실행.bat` 또는 `start.bat`을 더블클릭하면 됩니다.

브라우저가 열리면 마이크 권한을 허용하고 `녹음 시작`을 누르면 됩니다. Chrome 또는 Edge 권장입니다.

## 기능

- 한국어 음성 실시간 텍스트 변환
- 일반 대본, 유튜브 영상, 발표문, 회의 요약 형식 지원
- 군더더기 말 정리
- 복사 및 TXT 저장

## 배포

이 프로젝트는 빌드 과정이 없는 정적 웹앱입니다. 현재는 Cloudflare Pages의 기존 Direct Upload 프로젝트(`mic-script-generator`)로 배포되어 있고, GitHub에 올린 뒤 GitHub Actions가 Wrangler로 자동 배포하도록 준비되어 있습니다.

- GitHub branch: `main`
- Cloudflare Pages project: `mic-script-generator`
- Production domain: `https://ko-workspace.com/`
- GitHub Secrets 필요: `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`

새 Cloudflare Pages 프로젝트를 만들 때는 Git integration을 선택해도 됩니다. 단, 이미 Direct Upload로 만든 Pages 프로젝트는 나중에 Git integration 프로젝트로 전환할 수 없으므로 기존 프로젝트를 유지하려면 현재 GitHub Actions 방식이 적합합니다.

## 참고

브라우저의 음성 인식 기능을 사용하므로 일부 환경에서는 인터넷 연결이 필요할 수 있습니다. 마이크 권한 요청이 뜨면 허용해 주세요.
