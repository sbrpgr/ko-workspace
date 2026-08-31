import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { SPIRIT_ORIGIN, ARTICLE_API, REFRESH_MS, safeSpiritUrl, articleTitle, selectArticles, trackingUrl, renderCards, fetchArticles, mountSpiritBanners } from "../assets/spirit-market.mjs";
import { HEALTH_ORIGIN, CHANNELS, ROTATION_MS, selectChannelArticles, channelApi, fetchChannels, mobileSequence, desktopEntries, emptyChannels, renderTopics } from "../assets/spirit-market.mjs";

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
  assert.ok(css.includes("touch-action: pan-y"));
  assert.ok(css.includes("object-fit: contain"));
  assert.ok(css.includes(".spirit-controls [data-playback] { width: 68px;"));
});

test("topic classification, strict origins, balanced rotation and empty states", () => {
  const posts = [post(1, {categories:[5]}), post(2, {categories:[5,9]})];
  assert.deepEqual(selectChannelArticles(posts, CHANNELS[0], NOW).map(x=>x.id), [1]);
  assert.deepEqual(selectChannelArticles(posts, CHANNELS[1], NOW).map(x=>x.id), [2]);
  assert.equal(selectChannelArticles([post(1)], CHANNELS[1], NOW).length, 0);
  const health = post(1, {link:HEALTH_ORIGIN + "/a/"});
  assert.equal(selectChannelArticles([health], CHANNELS[2], NOW).length, 1);
  assert.equal(selectChannelArticles([health], CHANNELS[0], NOW).length, 0);
  assert.equal(selectChannelArticles(posts, CHANNELS[2], NOW).length, 0);
  assert.ok(trackingUrl(health.link, 1).startsWith(HEALTH_ORIGIN));
  assert.ok(channelApi(CHANNELS[0]).includes("categories_exclude=9"));
  assert.ok(channelApi(CHANNELS[1]).includes("&categories=9"));
  const channels = emptyChannels();
  channels[0].articles = selectArticles([post(1), post(2), post(3)], NOW);
  channels[2].articles = selectChannelArticles([health], CHANNELS[2], NOW);
  assert.deepEqual(desktopEntries(channels, 1).map(x=>x.channel.id), ["market","money","health"]);
  assert.equal(desktopEntries(channels, 1)[1].article, null);
  assert.deepEqual(mobileSequence(channels).map(x=>x.channel.id), ["market","health","market","health","market","health"]);
  channels[1].articles = selectArticles([post(4)], NOW);
  assert.deepEqual(mobileSequence(channels).map(x=>x.channel.id), ["market","money","health","market","money","health","market","money","health"]);
  assert.deepEqual(mobileSequence(emptyChannels()), []);
  assert.ok(renderTopics(desktopEntries(emptyChannels(),0)).includes("money-information"));
  assert.ok(renderTopics(desktopEntries(emptyChannels(),0), "en").includes("Money tips"));
});

test("feed failure stays isolated to one topic", async () => {
  const result = await fetchChannels(async (url, options) => {
    assert.equal(options.credentials,"omit");
    if (url.includes("&categories=9")) throw new Error("offline");
    return {ok:true,json:async()=>[post(1,{categories:[5],link:(url.startsWith(HEALTH_ORIGIN)?HEALTH_ORIGIN:SPIRIT_ORIGIN)+"/a/"})]};
  });
  assert.deepEqual(result.map(x=>x.articles.length), [1,0,1]);
  assert.deepEqual(result.map(x=>x.failed), [false,true,false]);
});

test("seven-second rotation, pause, reduced motion, hidden tabs and feed refresh lifecycle", async () => {
  const original = Object.fromEntries(["document","window","fetch","setInterval","clearInterval","IntersectionObserver"].map(key=>[key,globalThis[key]]));
  const oldNow = Date.now;
  const node = () => ({ innerHTML:"",textContent:"",disabled:false,hidden:false,listeners:{}, setAttribute(){}, querySelectorAll:()=>[], addEventListener(name,fn){this.listeners[name]=fn;},removeEventListener(){} });
  const grid=node(), previous=node(),next=node(),playback=node(),counter=node(),banner=node();
  banner.querySelector = selector => ({".spirit-articles":grid,"[data-previous]":previous,"[data-next]":next,"[data-playback]":playback,"[data-position]":counter}[selector]);
  const small={...node(),matches:false}, motion={...node(),matches:false};
  const doc={...node(),hidden:false,querySelectorAll:()=>[banner]};
  const ticks=new Map();
  let now=NOW,requests=0,offline=false,observerCallback;
  let marketPosts=[1,2,3].map(id=>post(id,{categories:[5]}));
  let moneyPosts=[];
  const flush=()=>new Promise(setImmediate);
  try {
    Date.now=()=>now;
    globalThis.document=doc;
    globalThis.window={...node(),matchMedia:query=>query.includes("reduced-motion")?motion:small};
    globalThis.IntersectionObserver=class { constructor(fn){observerCallback=fn;} observe(){observerCallback([{isIntersecting:true}]);} disconnect(){} };
    globalThis.setInterval=(fn,ms)=>{ticks.set(ms,fn);return ms;};
    globalThis.clearInterval=id=>ticks.delete(id);
    globalThis.fetch=async url=>{requests++;if(offline&&url.includes("categories_exclude"))throw new Error("offline");return {ok:true,json:async()=>url.startsWith(HEALTH_ORIGIN)?[post(1,{link:HEALTH_ORIGIN+"/a/"})]:url.includes("&categories=9")?moneyPosts:marketPosts};};
    const stop=mountSpiritBanners();
    await flush();
    assert.equal(requests,3);
    assert.equal(counter.textContent,"1 / 3");
    assert.ok(grid.innerHTML.includes("기사 3"));
    await ticks.get(REFRESH_MS)(); assert.equal(requests,3);
    ticks.get(ROTATION_MS)(); assert.equal(counter.textContent,"2 / 3");
    banner.listeners.pointerenter({pointerType:"mouse"});
    ticks.get(ROTATION_MS)(); assert.equal(counter.textContent,"2 / 3");
    banner.listeners.pointerleave();
    next.listeners.click(); assert.equal(counter.textContent,"3 / 3");
    ticks.get(ROTATION_MS)(); assert.equal(counter.textContent,"3 / 3");
    playback.listeners.click();
    motion.matches=true; motion.listeners.change();
    ticks.get(ROTATION_MS)(); assert.equal(counter.textContent,"3 / 3");
    motion.matches=false; motion.listeners.change();
    doc.hidden=true; now+=REFRESH_MS;
    await ticks.get(REFRESH_MS)(); assert.equal(requests,3);
    ticks.get(ROTATION_MS)(); assert.equal(counter.textContent,"3 / 3");
    doc.hidden=false; marketPosts=[post(4,{categories:[5]})];
    await doc.listeners.visibilitychange();
    assert.equal(requests,6); assert.ok(grid.innerHTML.includes("기사 4"));
    assert.ok(!grid.innerHTML.includes("기사 3"));
    small.matches=true; small.listeners.change();
    assert.equal(counter.textContent,"1 / 2");
    ticks.get(ROTATION_MS)(); assert.equal(counter.textContent,"2 / 2");
    assert.ok(grid.innerHTML.includes('data-channel="health"'));
    moneyPosts=[post(2,{categories:[9]})]; now+=REFRESH_MS;
    await ticks.get(REFRESH_MS)();
    assert.equal(counter.textContent,"2 / 3");
    assert.ok(grid.innerHTML.includes('data-channel="money"'));
    offline=true; now+=REFRESH_MS; await ticks.get(REFRESH_MS)();
    assert.equal(counter.textContent,"2 / 2"); // Healthy topics survive Market outage.
    stop(); assert.equal(ticks.size,0);
  } finally {
    Date.now=oldNow;
    for(const [key,value] of Object.entries(original)){if(value===undefined)delete globalThis[key];else globalThis[key]=value;}
  }
});
