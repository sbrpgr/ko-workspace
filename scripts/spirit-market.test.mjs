import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { SPIRIT_ORIGIN, ARTICLE_API, REFRESH_MS, safeSpiritUrl, articleTitle, selectArticles, trackingUrl, renderCards, fetchArticles, mountSpiritBanners } from "../assets/spirit-market.mjs";

const NOW = Date.parse("2026-08-31T12:00:00Z");
const post = (id, overrides = {}) => ({ id, status: "publish", date_gmt: `2026-08-31T0${id}:00:00`, link: `${SPIRIT_ORIGIN}/article-${id}/`, title: { rendered: `기사 ${id}` }, excerpt: { protected: false }, meta: { insight_demo: false }, ...overrides });

test("only three newest public articles, independent of incoming order", () => {
  assert.deepEqual(selectArticles([post(1), post(4), post(2), post(3), post(4)], NOW).map((item) => item.id), [4, 3, 2]);
});
test("exclude drafts, scheduled/private/protected/demo/preview and future-dated posts", () => {
  const bad = ["draft", "future", "private", "trash"].map((status) => post(1, { status }));
  bad.push(post(1, { excerpt: { protected: true } }), post(1, { date_gmt: "2099-01-01T00:00:00" }), post(1, { date_gmt: "bad" }), post(1, { id: -1 }), post(1, { title: { rendered: "[임시글] 샘플" } }), post(1, { link: `${SPIRIT_ORIGIN}/market-editorial-preview/` }));
  for (const insight_demo of [true, 1, "1", "true"]) bad.push(post(1, { meta: { insight_demo } }));
  assert.deepEqual(selectArticles([null, {}, ...bad], NOW), []);
  assert.throws(() => selectArticles({ message: "error" }, NOW));
});
test("reject foreign origins, HTTP, credentials and script URLs", () => {
  for (const url of ["javascript:alert(1)", "http://insightspiritmarket.com/a", "https://insightspiritmarket.com.evil.test/a", "https://user:pass@insightspiritmarket.com/a", "//insightspiritmarket.com/a", null]) assert.equal(safeSpiritUrl(url), null);
  assert.equal(selectArticles([post(1, { link: "https://evil.test" })], NOW).length, 0);
});
test("titles are plain escaped text, image is resized or falls back safely", () => {
  const data = post(1, { title: { rendered: '&lt;img src=x onerror="bad"&gt; &amp; &#xAC00; <b>뉴스</b>' }, _embedded: { "wp:featuredmedia": [{ source_url: `${SPIRIT_ORIGIN}/safe.webp`, media_details: { sizes: { medium_large: { source_url: "https://evil.test/a.webp" }, medium: { source_url: `${SPIRIT_ORIGIN}/small.webp` } } } }] } });
  const articles = selectArticles([data], NOW);
  assert.equal(articles[0].image, `${SPIRIT_ORIGIN}/small.webp`);
  const html = renderCards(articles);
  assert.ok(html.includes("&lt;img src=x onerror=&quot;bad&quot;&gt; &amp; 가 뉴스"));
  assert.ok(!html.includes('<img src=x'));
  assert.ok(html.includes('rel="noopener noreferrer"'));
  assert.equal(articleTitle("&#99999999; &nbsp; test"), "test");
});
test("missing images and an empty feed keep a useful link without empty ad slots", () => {
  assert.ok(renderCards(selectArticles([post(1)], NOW)).includes("spirit-image-fallback"));
  assert.ok(!renderCards(selectArticles([post(1)], NOW)).includes("<img"));
  assert.ok(renderCards([]).includes("spirit-fallback"));
  for (const locale of ["en", "ja", "zh"]) assert.ok(!renderCards([], locale).includes("마켓에서"));
});
test("campaign attribution contains only public source and article ID", () => {
  const url = new URL(trackingUrl(`${SPIRIT_ORIGIN}/article/`, 12));
  assert.equal(url.searchParams.get("utm_source"), "ko-workspace");
  assert.equal(url.searchParams.get("utm_medium"), "referral");
  assert.equal(url.searchParams.get("utm_content"), "12");
  assert.equal([...url.searchParams].length, 4);
});
test("read-only anonymous feed, bounded timeout and error propagation", async () => {
  await fetchArticles(async (url, options) => {
    assert.equal(url, ARTICLE_API);
    assert.equal(options.credentials, "omit");
    assert.equal(options.referrerPolicy, "no-referrer");
    assert.equal(options.cache, "no-store");
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(options.body, undefined);
    return { ok: true, json: async () => [] };
  });
  await assert.rejects(fetchArticles(async () => ({ ok: false })), /unavailable/);
  await assert.rejects(fetchArticles(async () => ({ ok: true, json: async () => ({ error: true }) })), /Invalid/);
  assert.equal(REFRESH_MS, 300000);
});
test("banner integration replaces Coupang without changing tool renderers", async () => {
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");
  const css = await readFile(new URL("../styles.css", import.meta.url), "utf8");
  assert.ok(app.includes('import("/assets/spirit-market.mjs?v='));
  assert.ok(!app.includes("mountCoupangPartnerAds"));
  assert.ok(!app.includes("data-coupang-partner-ad"));
  assert.ok(css.includes("grid-template-columns: 1fr 1fr"));
  assert.ok(css.includes("scroll-snap-type: x mandatory"));
  assert.ok(css.includes("object-fit: contain"));
});

test("refresh throttles requests, skips hidden tabs, and removes withdrawn/stale cards", async () => {
  const original = { document: globalThis.document, window: globalThis.window, fetch: globalThis.fetch, setInterval: globalThis.setInterval, clearInterval: globalThis.clearInterval, now: Date.now };
  let now = NOW;
  let requests = 0;
  let payload = [post(1)];
  let fail = false;
  let tick;
  const events = {};
  const slot = { isConnected: true, innerHTML: "", scrollLeft: 0, querySelectorAll: () => [], addEventListener() {}, closest: () => ({ classList: { toggle() {} } }) };
  const banner = { setAttribute() {}, innerHTML: "", querySelector: () => slot };
  const flush = () => new Promise(setImmediate);
  try {
    Date.now = () => now;
    globalThis.document = { hidden: false, querySelectorAll: () => [banner], addEventListener: (name, fn) => { events[name] = fn; }, removeEventListener() {} };
    globalThis.window = { addEventListener() {}, removeEventListener() {} };
    globalThis.setInterval = (fn) => { tick = fn; return 1; };
    globalThis.clearInterval = () => {};
    globalThis.fetch = async () => { requests++; if (fail) throw new Error("offline"); return { ok: true, json: async () => payload }; };
    const stop = mountSpiritBanners();
    await flush();
    assert.equal(requests, 1);
    assert.ok(slot.innerHTML.includes("기사 1"));
    await tick();
    assert.equal(requests, 1);
    globalThis.document.hidden = true;
    now += REFRESH_MS;
    await tick();
    assert.equal(requests, 1);
    globalThis.document.hidden = false;
    payload = [post(2)];
    await events.visibilitychange();
    assert.equal(requests, 2);
    assert.ok(slot.innerHTML.includes("기사 2"));
    assert.ok(!slot.innerHTML.includes("기사 1"));
    now += REFRESH_MS;
    fail = true;
    await tick();
    assert.ok(slot.innerHTML.includes("spirit-fallback"));
    assert.ok(!slot.innerHTML.includes("기사 2"));
    now += REFRESH_MS;
    fail = false;
    payload = [post(3)];
    await tick();
    assert.ok(slot.innerHTML.includes("기사 3"));
    stop();
  } finally {
    Date.now = original.now;
    for (const key of ["document", "window", "fetch", "setInterval", "clearInterval"]) {
      if (original[key] === undefined) delete globalThis[key];
      else globalThis[key] = original[key];
    }
  }
});
