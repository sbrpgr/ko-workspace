# 2026-09-17 public-site repair

- Root `404.html` disables Cloudflare Pages' implicit SPA fallback. Unknown paths must return 404, not the homepage with 200. The page is noindex, has no homepage canonical, and offers four locale home links.
- Deployment packaging and project audit now require the 404 document. It stays out of the sitemap.
- Preserve all existing routes, redirects, app code, banner rotation, data privacy, security directives and cache version.
- CSP adds only the already-injected Cloudflare analytics host and the two existing Google ad traffic-quality hosts observed blocked by the browser. No unsafe-inline or wildcard script allowance is added.
- `npm run check`: required before deployment. Production checks must verify missing root/nested paths return 404 and existing locale/tool pages remain 200.
- Search Console indexing/validation is a separate Google-side process; this change does not imply indexing has completed.
- Baseline is deployed GitHub commit dca0b96. Local-only dacbd97 (QR/analytics changes) was deliberately not included in this focused deployment.

References: https://developers.cloudflare.com/pages/configuration/serving-pages/ and https://developers.cloudflare.com/web-analytics/faq/
