// Read-only promotion of our public WordPress articles. No editor/user data is sent.
export const SPIRIT_ORIGIN = "https://insightspiritmarket.com";
export const HEALTH_ORIGIN = "https://insightspirithealth.com";
export const ROTATION_MS = 7000;
export const MONEY_CATEGORY_ID = 9;
export const CHANNELS = [
  { id: "market", origin: SPIRIT_ORIGIN, url: `${SPIRIT_ORIGIN}/`, query: `categories_exclude=${MONEY_CATEGORY_ID}` },
  { id: "money", origin: SPIRIT_ORIGIN, url: `${SPIRIT_ORIGIN}/category/money-information/`, query: `categories=${MONEY_CATEGORY_ID}` },
  { id: "health", origin: HEALTH_ORIGIN, url: `${HEALTH_ORIGIN}/`, query: "" },
];
export const emptyChannels = () => CHANNELS.map(channel => ({ ...channel, articles: [], failed: false }));
export const REFRESH_MS = 5 * 60 * 1000;
export const ARTICLE_API = `${SPIRIT_ORIGIN}/wp-json/wp/v2/posts?per_page=12&status=publish&orderby=date&order=desc&_embed=wp:featuredmedia&_fields=id,date_gmt,status,link,title,excerpt,meta,_links,_embedded`;

const COPY = {
  ko: { label: "함께 읽는 경제·생활 정보", more: "전체 글", fallback: "경제·기술 소식과 돈이 되는 정보를 마켓에서 만나보세요.", read: "기사 읽기", swipe: "옆으로 넘겨 다른 글 보기 →" },
  en: { label: "Economy & practical reads · Korean", more: "All articles", fallback: "Explore economy, technology and practical money information in Korean.", read: "Read article", swipe: "Swipe for more articles →" },
  ja: { label: "経済・暮らしの読みもの（韓国語）", more: "記事一覧", fallback: "経済・テクノロジー・暮らしに役立つ情報を韓国語でお届けします。", read: "記事を読む", swipe: "横にスワイプして次の記事へ →" },
  zh: { label: "经济与生活资讯（韩语）", more: "全部文章", fallback: "阅读韩语经济、科技与实用省钱资讯。", read: "阅读文章", swipe: "左右滑动查看更多文章 →" },
};
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

export function safeSpiritUrl(value, origin = SPIRIT_ORIGIN) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return [SPIRIT_ORIGIN, HEALTH_ORIGIN].includes(origin) && url.origin === origin && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

export function articleTitle(value) {
  if (typeof value !== "string") return "";
  const entities = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " ", ndash: "–", mdash: "—", lsquo: "‘", rsquo: "’", ldquo: "“", rdquo: "”", hellip: "…" };
  return value.replace(/<[^>]*>/g, "").replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (entity, key) => {
    if (key.startsWith("#")) {
      const code = key[1].toLowerCase() === "x" ? parseInt(key.slice(2), 16) : parseInt(key.slice(1), 10);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    }
    return entities[key.toLowerCase()] ?? entity;
  }).replace(/\s+/g, " ").trim().slice(0, 220);
}

export function selectArticles(payload, now = Date.now(), origin = SPIRIT_ORIGIN) {
  if (!Array.isArray(payload)) throw new Error("Invalid article feed");
  const seen = new Set();
  return payload.filter((post) => {
    if (typeof post?.date_gmt !== "string") return false;
    const date = Date.parse(`${String(post?.date_gmt || "").replace(/Z$/, "")}Z`);
    if (post?.status !== "publish" || [true, 1, "1", "true"].includes(post?.meta?.insight_demo) || post?.excerpt?.protected === true || !Number.isSafeInteger(post?.id) || post.id < 1 || seen.has(post.id) || !safeSpiritUrl(post.link, origin) || !Number.isFinite(date) || date > now) return false;
    const title = articleTitle(post.title?.rendered);
    if (!title || /^\[임시글\]/.test(title) || /editorial-preview/.test(new URL(post.link).pathname)) return false;
    seen.add(post.id);
    return true;
  }).sort((a, b) => b.date_gmt.localeCompare(a.date_gmt)).slice(0, 3).map((post) => {
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    const sizes = media?.media_details?.sizes;
    const image = safeSpiritUrl(sizes?.medium_large?.source_url, origin) || safeSpiritUrl(sizes?.medium?.source_url, origin) || safeSpiritUrl(media?.source_url, origin);
    return { id: post.id, title: articleTitle(post.title.rendered), url: safeSpiritUrl(post.link, origin), image };
  });
}

export function trackingUrl(value, id) {
  const url = new URL(safeSpiritUrl(value) || safeSpiritUrl(value, HEALTH_ORIGIN) || SPIRIT_ORIGIN);
  url.searchParams.set("utm_source", "ko-workspace");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "spirit_latest");
  if (id) url.searchParams.set("utm_content", String(id));
  return url.href;
}

export function renderCards(articles, locale = "ko", topic = "MARKET") {
  const copy = COPY[locale] || COPY.ko;
  if (!articles.length) return `<a class="spirit-fallback" href="${trackingUrl(SPIRIT_ORIGIN)}" target="_blank" rel="noopener noreferrer">${copy.fallback} <span aria-hidden="true">↗</span></a>`;
  return articles.map((article) => `
    <a class="spirit-article" href="${escapeHtml(trackingUrl(article.url, article.id))}" target="_blank" rel="noopener noreferrer">
      <span class="spirit-article-media" aria-hidden="true">
        <span class="spirit-image-fallback">INSIGHT SPIRIT<br><b>${escapeHtml(topic)}</b></span>
        ${article.image ? `<img src="${escapeHtml(article.image)}" alt="" width="300" height="200" loading="lazy" decoding="async" referrerpolicy="no-referrer" />` : ""}
      </span>
      <span class="spirit-article-copy"><strong lang="ko">${escapeHtml(article.title)}</strong><span>${copy.read} <span aria-hidden="true">↗</span></span></span>
    </a>`).join("");
}

export async function fetchArticles(fetchImpl = fetch, channel = null) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetchImpl(channel ? channelApi(channel) : ARTICLE_API, { credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error("Article feed unavailable");
    return channel ? selectChannelArticles(await response.json(), channel) : selectArticles(await response.json());
  } finally { clearTimeout(timeout); }
}

export function channelApi(channel) {
  return `${channel.origin}/wp-json/wp/v2/posts?per_page=12&status=publish&orderby=date&order=desc&_embed=wp:featuredmedia&_fields=id,categories,date_gmt,status,link,title,excerpt,meta,_links,_embedded${channel.query ? "&" + channel.query : ""}`;
}

export function selectChannelArticles(payload, channel, now = Date.now()) {
  if (!Array.isArray(payload)) throw new Error("Invalid article feed");
  const filtered = payload.filter(post => channel.id === "health" || (Array.isArray(post?.categories) && post.categories.includes(MONEY_CATEGORY_ID) === (channel.id === "money")));
  return selectArticles(filtered, now, channel.origin);
}

export async function fetchChannels(fetchImpl = fetch) {
  return Promise.all(CHANNELS.map(async channel => {
    try { return { ...channel, articles: await fetchArticles(fetchImpl, channel), failed: false }; }
    catch { return { ...channel, articles: [], failed: true }; }
  }));
}

export function mobileSequence(channels) {
  const available = channels.filter(channel => channel.articles.length);
  return Array.from({ length: Math.max(0, ...available.map(channel => channel.articles.length)) }, (_, round) =>
    available.map(channel => ({ channel, article: channel.articles[round % channel.articles.length] }))
  ).flat();
}

export function desktopEntries(channels, round) {
  return channels.map(channel => ({ channel, article: channel.articles[round % channel.articles.length] || null }));
}

const TOPIC_COPY = {
  ko: { names: ["마켓", "돈 되는 소식", "건강"], heading: "함께 읽는 최신 소식", previous: "이전 기사", next: "다음 기사", pause: "일시정지", play: "재생", latest: "최신 글", empty: "새 공개 글이 올라오면 자동으로 표시됩니다.", failed: "연결이 복구되면 최신 글이 자동으로 표시됩니다.", visit: "분야 둘러보기" },
  en: { names: ["Market", "Money tips", "Health"], heading: "Latest reads · Korean", previous: "Previous articles", next: "Next articles", pause: "Pause", play: "Play", latest: "Latest", empty: "New public articles will appear automatically.", failed: "Articles will return when the connection recovers.", visit: "Explore topic" },
  ja: { names: ["マーケット", "お得な情報", "健康"], heading: "最新の読みもの（韓国語）", previous: "前の記事", next: "次の記事", pause: "一時停止", play: "再生", latest: "最新", empty: "新しい公開記事が自動で表示されます。", failed: "接続が回復すると記事が表示されます。", visit: "記事一覧" },
  zh: { names: ["市场", "省钱资讯", "健康"], heading: "最新资讯（韩语）", previous: "上一篇", next: "下一篇", pause: "暂停", play: "播放", latest: "最新", empty: "新发布的文章会自动显示。", failed: "连接恢复后将自动显示文章。", visit: "浏览分类" },
};

export function renderTopics(entries, locale = "ko") {
  const copy = TOPIC_COPY[locale] || TOPIC_COPY.ko;
  return entries.map(({ channel, article }) => {
    const name = copy.names[CHANNELS.findIndex(item => item.id === channel.id)];
    return `<div class="spirit-topic" data-channel="${channel.id}">
      <div class="spirit-topic-heading"><a href="${escapeHtml(trackingUrl(channel.url))}" target="_blank" rel="noopener noreferrer">${name} ↗</a><small>${article ? copy.latest : copy.visit}</small></div>
      ${article ? renderCards([article], locale, name) : `<a class="spirit-topic-fallback" href="${escapeHtml(trackingUrl(channel.url))}" target="_blank" rel="noopener noreferrer"><strong>${name}</strong><span>${channel.failed ? copy.failed : copy.empty}</span><small>${copy.visit} ↗</small></a>`}
    </div>`;
  }).join("");
}

export function mountSpiritBanners(locale = "ko") {
  const cleanups = [...document.querySelectorAll(".spirit-banner")].map(banner => mountBanner(banner, locale));
  return () => cleanups.forEach(cleanup => cleanup());
}

function mountBanner(banner, locale) {
  const copy = TOPIC_COPY[locale] || TOPIC_COPY.ko;
  banner.setAttribute("aria-label", copy.names.join(" · "));
  banner.innerHTML = `<div class="spirit-banner-heading"><span><strong>Insight Spirit</strong><span class="spirit-banner-label">${copy.heading}</span></span>
    <div class="spirit-controls"><button type="button" data-previous aria-label="${copy.previous}">‹</button><span data-position>0 / 0</span><button type="button" data-next aria-label="${copy.next}">›</button><button type="button" data-playback>${copy.pause}</button></div></div>
    <div class="spirit-articles" aria-live="off"></div>`;
  const grid = banner.querySelector(".spirit-articles");
  const previous = banner.querySelector("[data-previous]");
  const next = banner.querySelector("[data-next]");
  const playback = banner.querySelector("[data-playback]");
  const counter = banner.querySelector("[data-position]");
  const small = window.matchMedia("(max-width: 1000px)");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let channels = emptyChannels();
  let active = 0, count = 0, lastAttempt = 0;
  let paused = false, hovered = false, onScreen = false, disposed = false, busy = false;
  let lastMarkup = "", touchStart = null;
  const events = [];
  const listen = (target, event, handler) => { target.addEventListener(event, handler); events.push(() => target.removeEventListener(event, handler)); };

  const render = () => {
    const sequence = mobileSequence(channels);
    count = small.matches ? sequence.length : Math.max(0, ...channels.map(channel => channel.articles.length));
    active %= Math.max(count, 1);
    const entries = small.matches && sequence.length ? [sequence[active]] : desktopEntries(channels, active);
    const markup = renderTopics(entries, locale);
    if (markup !== lastMarkup) {
      grid.innerHTML = markup;
      lastMarkup = markup;
      grid.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => img.remove(), { once: true });
        if (img.complete && !img.naturalWidth) img.remove();
      });
    }
    previous.disabled = next.disabled = count < 2;
    counter.textContent = `${count ? active + 1 : 0} / ${count}`;
    playback.hidden = motion.matches || count < 2;
    playback.textContent = paused ? copy.play : copy.pause;
    playback.setAttribute("aria-label", paused ? copy.play : copy.pause);
  };
  const move = direction => { paused = true; active = (active + direction + Math.max(count, 1)) % Math.max(count, 1); render(); };
  const refresh = async () => {
    if (disposed || busy || document.hidden || Date.now() - lastAttempt < REFRESH_MS) return;
    busy = true;
    lastAttempt = Date.now();
    try {
      const updated = await fetchChannels();
      if (!disposed) { channels = updated; render(); }
    } finally { busy = false; }
  };
  listen(previous, "click", () => move(-1));
  listen(next, "click", () => move(1));
  listen(playback, "click", () => { paused = !paused; render(); });
  listen(banner, "pointerenter", event => { if (event.pointerType === "mouse") hovered = true; });
  listen(banner, "pointerleave", () => { hovered = false; });
  listen(banner, "focusin", event => { if (!event.target.closest("[data-playback]")) { paused = true; render(); } });
  listen(banner, "keydown", event => {
    if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1);
  });
  listen(grid, "touchstart", event => { paused = true; touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY }; render(); });
  listen(grid, "touchend", event => {
    if (small.matches && touchStart) {
      const dx = event.changedTouches[0].clientX - touchStart.x, dy = event.changedTouches[0].clientY - touchStart.y;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx > 0 ? -1 : 1);
    }
    touchStart = null;
  });
  listen(small, "change", () => { active = 0; render(); });
  listen(motion, "change", render);
  listen(document, "visibilitychange", refresh);
  listen(window, "pageshow", refresh);
  const observer = new IntersectionObserver(([entry]) => { onScreen = entry.isIntersecting; }, { threshold: 0.5 });
  observer.observe(banner);
  render();
  void refresh();
  const refreshTimer = setInterval(refresh, REFRESH_MS);
  const rotationTimer = setInterval(() => {
    if (!disposed && !paused && !hovered && onScreen && !document.hidden && !motion.matches && count > 1) { active = (active + 1) % count; render(); }
  }, ROTATION_MS);
  return () => { disposed = true; clearInterval(refreshTimer); clearInterval(rotationTimer); observer.disconnect(); events.forEach(cleanup => cleanup()); };
}
