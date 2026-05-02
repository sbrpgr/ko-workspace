# 코워크스페이스 (ko-workspace)

`코워크스페이스 (ko-workspace)` is a browser-first office utility platform deployed on Cloudflare Pages.

The current product ships as a static multi-tool site focused on tasks that can run fully in the browser without a backend server, database, or private API key.

## Current Tool Categories

- Voice/Video: `음성으로 텍스트 쓰기`, `녹음 파일 텍스트 변환`, `웹캠 녹화기`
- Text: `AI 복붙 서식 정리`, `AI 표 복붙 변환기`, `글자수 세기`, `줄바꿈·공백 정리`, `이메일·URL·전화번호 추출기`, `중복 줄 제거`, `찾기 및 바꾸기`, `대소문자 변환`, `텍스트 비교기`
- Image: `QR 코드 생성기`, `이미지 크기 조절`, `이미지 형식 변환`, `이미지 용량 압축`
- PDF: `PDF 합치기`, `PDF 분할`, `PDF 페이지 추출`, `이미지 PDF 변환`, `PDF 이미지 변환`
- Subtitle: `SRT 자막 정리`, `SRT ↔ VTT 변환`, `자막 시간 보정`

## Product Rules

- No login required
- Browser-side processing first
- No backend server for core tools
- No first-party personal-data collection for the current public tools
- No private API keys in client code
- Ad slots are separated from the work surface
- Advertising, collaboration, and partnership inquiries go to `dayway.ict@gmail.com`
- Analytics events are privacy-safe and must not include user-entered content, file names, extracted data, or recording contents

## URL Structure

- Home: `https://ko-workspace.com/`
- Tool pages: `https://ko-workspace.com/tools/{slug}/`
- Policy pages: `/privacy`, `/terms`

## Deployment

The site is deployed with GitHub Actions to Cloudflare Pages.

- Branch: `main`
- GitHub repository: `ko-workspace`
- Cloudflare Pages internal project: `mic-script-generator` (legacy direct-upload project name)
- Production domain: `https://ko-workspace.com/`

The workflow copies root assets plus the `tools/` directory into `.cloudflare-dist/` and deploys that directory.

## Managed Site Tags

Google Tag Manager uses container `GTM-W3MF6BSN`.

- `npm run apply:site-tags`: inserts or refreshes the GTM `<head>` snippet, `<body>` noscript iframe, and CSP allowlist entries.
- `npm run smoke`: runs deterministic smoke checks for core tool logic, metadata removal, security headers, and file upload UX coverage.
- `npm run audit:deps`: runs `npm audit --omit=dev` against the lockfile.
- `npm run check`: validates JavaScript, managed page tags, project structure, smoke checks, and dependency audit status.
- GitHub Actions runs `npm run apply:site-tags` before packaging, so newly added HTML pages under `tools/` are automatically tagged during deployment.
- Event names and allowed parameters are defined in `ANALYTICS.md`.

## Security Notes

- Tokens are stored only in GitHub Actions Secrets and Cloudflare settings.
- Client-side scripts do not contain Cloudflare, GitHub, Google, or AI API secrets.
- CSP is configured in `_headers`.
- Initial tools do not upload text or files to an application server.
- Webcam background blur and custom background images are processed locally in the browser; user-selected background files are not uploaded.
- Work data is intended to stay 100% inside the user's browser for the current static-tool scope.
- The recording-file transcription beta loads Transformers.js and a Whisper model only on demand; the selected recording file remains local to the browser. It now uses a `whisper-base` quality profile for Korean ARS and formal announcement audio, removes the underperforming `whisper-tiny` fallback from the UI, decodes recordings to 16 kHz waveform data before running heavier transcription in a Web Worker, preserves the conversation flow while trimming only edge silence and lifting quiet speech, and keeps repetition cleanup plus optional sentence-ending line breaks for draft review.

## Related Docs

- `AGENT_OPERATING_SPEC.md`
- `AGENTS.md`
- `AUDIO_TRANSCRIPTION_WORK_SPEC.md`
- `ROADMAP.md`
- `PROJECT_SPEC.md`
- `DEPLOYMENT.md`
- `SECURITY.md`
- `WORK_LOG.md`
- `ANALYTICS.md`
