# Open Source Fallback Policy

Last updated: 2026-04-28

This project should avoid repeated trial and error when a tool fails tests. If a browser-only feature is unstable, prefer a proven open-source library over expanding custom code.

## Selection Rules

Use an external library only when all conditions are met:

- It works in the browser without a backend server.
- It does not require private API keys, accounts, paid APIs, or uploaded files.
- It has a public repository or package page with a clear license.
- It can be pinned to an exact version.
- It can be loaded under the current CSP with the smallest possible domain allowance.
- It can be covered by a local smoke test before deployment.

Avoid a library when:

- It requires Node-only APIs for normal browser use.
- It sends user text or files to a remote server.
- It has unclear licensing, abandoned security issues, or heavy transitive dependencies.
- It solves a legally risky workflow such as PDF password removal.

## Failure Policy

When a feature fails functional testing:

1. Reproduce the failure with a small input fixture.
2. Add or update a smoke test that catches the failure.
3. Check whether the failure belongs to parsing, rendering, binary file handling, or browser compatibility.
4. Prefer a proven browser-side open-source library for that category.
5. Pin the version, update CSP if needed, and rerun local and deployed checks.
6. Document the reason for choosing the library in this file or `PROJECT_SPEC.md`.

## Candidate Libraries

| Area | Preferred Direction | Candidate |
| --- | --- | --- |
| PDF page rendering | Use a mature renderer instead of custom parsing. | Mozilla PDF.js: https://github.com/mozilla/pdf.js |
| PDF creation/editing | Use a browser-compatible PDF manipulation library. | pdf-lib: https://github.com/Hopding/pdf-lib |
| Text diff | Replace custom diff if accuracy or edge cases fail. | jsdiff: https://github.com/kpdecker/jsdiff |
| QR generation | Keep a small browser QR library; replace only if SVG/download/customization fails. | qrcode-generator or EasyQRCodeJS: https://github.com/ushelp/EasyQRCodeJS |
| Subtitle parsing | Keep custom parser while tests pass; replace if SRT/VTT edge cases fail. | `subtitle` package: https://www.npmjs.com/package/subtitle |
| Image resize/compress | Prefer browser APIs first. Use a library only if EXIF/orientation/quality handling fails. | Canvas/File API first; evaluate browser-side libraries case by case. |
| Browser speech recognition models | Use only on-demand browser-side models, with clear performance and privacy limits. | Transformers.js: https://huggingface.co/docs/transformers.js |

## Current Baseline

Current browser-side dependencies:

- `pdf-lib` for PDF merge, split, page extraction, and image-to-PDF workflows.
- `PDF.js` for PDF-to-image rendering.
- `qrcode-generator` for QR output.
- `Transformers.js` for the browser-only recording-file transcription beta.

Current custom code that should be replaced if tests fail repeatedly:

- Text diff implementation.
- SRT/VTT parser and timestamp conversion.
- Markdown-style AI text cleanup.
- Contact extraction regular expressions.
- Image conversion/compression quality handling.

## Test Expectations

Every tool must have at least a smoke test path for:

- Empty input.
- Normal input.
- One malformed or edge-case input.
- Copy/download output generation when the feature supports it.

Binary tools should also test:

- Invalid file type handling.
- Large file warning or graceful failure.
- Browser memory-safe behavior where practical.
