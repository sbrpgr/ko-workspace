# 코워크스페이스 (ko-workspace)

`코워크스페이스 (ko-workspace)` is a browser-first office utility platform deployed on Cloudflare Pages.

The current product ships as a static multi-tool site focused on tasks that can run fully in the browser without a backend server, database, or private API key.

## Current Tool Categories

- Voice: `음성으로 텍스트 쓰기`
- Text: `AI 복붙 서식 정리`, `글자수 세기`, `줄바꿈·공백 정리`, `이메일·URL·전화번호 추출기`, `중복 줄 제거`, `찾기 및 바꾸기`, `대소문자 변환`, `텍스트 비교기`
- Image: `QR 코드 생성기`, `이미지 크기 조절`, `이미지 형식 변환`, `이미지 용량 압축`
- PDF: `PDF 합치기`, `PDF 분할`, `PDF 페이지 추출`, `이미지 PDF 변환`, `PDF 이미지 변환`
- Subtitle: `SRT 자막 정리`, `SRT ↔ VTT 변환`, `자막 시간 보정`

## Product Rules

- No login required
- Browser-side processing first
- No backend server for core tools
- No private API keys in client code
- Ad slots are separated from the work surface

## URL Structure

- Home: `https://ko-workspace.com/`
- Tool pages: `https://ko-workspace.com/tools/{slug}/`
- Policy pages: `/privacy`, `/terms`

## Deployment

The site is deployed with GitHub Actions to Cloudflare Pages.

- Branch: `main`
- Pages project: `mic-script-generator`
- Production domain: `https://ko-workspace.com/`

The workflow copies root assets plus the `tools/` directory into `.cloudflare-dist/` and deploys that directory.

## Security Notes

- Tokens are stored only in GitHub Actions Secrets and Cloudflare settings.
- Client-side scripts do not contain Cloudflare, GitHub, Google, or AI API secrets.
- CSP is configured in `_headers`.
- Initial tools do not upload text or files to an application server.

## Related Docs

- `ROADMAP.md`
- `PROJECT_SPEC.md`
- `DEPLOYMENT.md`
- `SECURITY.md`
- `WORK_LOG.md`
