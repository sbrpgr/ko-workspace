// Read-only promotion of our public WordPress articles. No editor/user data is sent.
export const SPIRIT_ORIGIN = "https://insightspiritmarket.com";
export const REFRESH_MS = 5 * 60 * 1000;
export const ARTICLE_API = `${SPIRIT_ORIGIN}/wp-json/wp/v2/posts?per_page=12&status=publish&orderby=date&order=desc&_embed=wp:featuredmedia&_fields=id,date_gmt,status,link,title,excerpt,meta,_links,_embedded`;

const COPY = {
  ko: { label: "함께 읽는 경제·생활 정보", more: "전체 글", fallback: "경제·기술 소식과 돈이 되는 정보를 마켓에서 만나보세요.", read: "기사 읽기", swipe: "옆으로 넘겨 다른 글 보기 →" },
  en: { label: "Economy & practical reads · Korean", more: "All articles", fallback: "Explore economy, technology and practical money information in Korean.", read: "Read article", swipe: "Swipe for more articles →" },
  ja: { label: "経済・暮らしの読みもの（韓国語）", more: "記事一覧", fallback: "経済・テクノロジー・暮らしに役立つ情報を韓国語でお届けします。", read: "記事を読む", swipe: "横にスワイプして次の記事へ →" },
  zh: { label: "经济与生活资讯（韩语）", more: "全部文章", fallback: "阅读韩语经济、科技与实用省钱资讯。", read: "阅读文章", swipe: "左右滑动查看更多文章 →" },
};
const escapeHtml = (text) => String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

export function safeSpiritUrl(value) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    return url.origin === SPIRIT_ORIGIN && !url.username && !url.password ? url.href : null;
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

export function selectArticles(payload, now = Date.now()) {
  if (!Array.isArray(payload)) throw new Error("Invalid article feed");
  const seen = new Set();
  return payload.filter((post) => {
    if (typeof post?.date_gmt !== "string") return false;
    const date = Date.parse(`${String(post?.date_gmt || "").replace(/Z$/, "")}Z`);
    if (post?.status !== "publish" || [true, 1, "1", "true"].includes(post?.meta?.insight_demo) || post?.excerpt?.protected === true || !Number.isSafeInteger(post?.id) || post.id < 1 || seen.has(post.id) || !safeSpiritUrl(post.link) || !Number.isFinite(date) || date > now) return false;
    const title = articleTitle(post.title?.rendered);
    if (!title || /^\[임시글\]/.test(title) || /editorial-preview/.test(new URL(post.link).pathname)) return false;
    seen.add(post.id);
    return true;
  }).sort((a, b) => b.date_gmt.localeCompare(a.date_gmt)).slice(0, 3).map((post) => {
    const media = post._embedded?.["wp:featuredmedia"]?.[0];
    const sizes = media?.media_details?.sizes;
    const image = safeSpiritUrl(sizes?.medium_large?.source_url) || safeSpiritUrl(sizes?.medium?.source_url) || safeSpiritUrl(media?.source_url);
    return { id: post.id, title: articleTitle(post.title.rendered), url: safeSpiritUrl(post.link), image };
  });
}

export function trackingUrl(value, id) {
  const url = new URL(safeSpiritUrl(value) || SPIRIT_ORIGIN);
  url.searchParams.set("utm_source", "ko-workspace");
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", "spirit_latest");
  if (id) url.searchParams.set("utm_content", String(id));
  return url.href;
}

export function renderCards(articles, locale = "ko") {
  const copy = COPY[locale] || COPY.ko;
  if (!articles.length) return `<a class="spirit-fallback" href="${trackingUrl(SPIRIT_ORIGIN)}" target="_blank" rel="noopener noreferrer">${copy.fallback} <span aria-hidden="true">↗</span></a>`;
  return articles.map((article) => `
    <a class="spirit-article" href="${escapeHtml(trackingUrl(article.url, article.id))}" target="_blank" rel="noopener noreferrer">
      <span class="spirit-article-media" aria-hidden="true">
        <span class="spirit-image-fallback">INSIGHT SPIRIT<br><b>MARKET</b></span>
        ${article.image ? `<img src="${escapeHtml(article.image)}" alt="" width="300" height="200" loading="lazy" decoding="async" referrerpolicy="no-referrer" />` : ""}
      </span>
      <span class="spirit-article-copy"><strong lang="ko">${escapeHtml(article.title)}</strong><span>${copy.read} <span aria-hidden="true">↗</span></span></span>
    </a>`).join("");
}

export async function fetchArticles(fetchImpl = fetch) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetchImpl(ARTICLE_API, { credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error("Article feed unavailable");
    return selectArticles(await response.json());
  } finally { clearTimeout(timeout); }
}

export function mountSpiritBanners(locale = "ko") {
  const banners = [...document.querySelectorAll(".spirit-banner")];
  if (!banners.length) return;
  const copy = COPY[locale] || COPY.ko;
  const slots = banners.map((banner) => {
    banner.setAttribute("aria-label", copy.label);
    banner.innerHTML = `
      <div class="spirit-banner-heading">
        <span><strong>Insight Spirit <b>Market</b></strong><span class="spirit-banner-label">${copy.label}</span></span>
        <a href="${trackingUrl(SPIRIT_ORIGIN)}" target="_blank" rel="noopener noreferrer">${copy.more} <span aria-hidden="true">↗</span></a>
      </div>
      <div class="spirit-articles" aria-label="${copy.label}" tabindex="0">${renderCards([], locale)}</div>
      <p class="spirit-swipe-hint">${copy.swipe}</p>`;
    return banner.querySelector(".spirit-articles");
  });
  let pending = false;
  let lastAttempt = 0;
  let previousMarkup = "";
  const refresh = async () => {
    if (pending || document.hidden || !slots.some((slot) => slot.isConnected) || Date.now() - lastAttempt < REFRESH_MS) return;
    pending = true;
    lastAttempt = Date.now();
    let articles = [];
    try { articles = await fetchArticles(); }
    catch { /* A compact Market link replaces unavailable or stale articles. */ }
    finally { pending = false; }
    const markup = renderCards(articles, locale);
    // Keep keyboard focus and swipe position when the public article set is unchanged.
    if (previousMarkup === markup) return;
    previousMarkup = markup;
    slots.forEach((slot) => {
      if (!slot.isConnected) return;
      slot.innerHTML = markup;
      slot.scrollLeft = 0;
      slot.querySelectorAll("img").forEach((img) => {
        const removeBrokenImage = () => img.remove();
        img.addEventListener("error", removeBrokenImage, { once: true });
        if (img.complete && !img.naturalWidth) removeBrokenImage();
      });
      slot.closest(".spirit-banner").classList.toggle("has-multiple-articles", articles.length > 1);
    });
  };
  slots.forEach((slot) => slot.addEventListener("keydown", (event) => {
    if (event.target !== slot || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    slot.scrollBy({ left: slot.clientWidth * (event.key === "ArrowRight" ? 1 : -1), behavior: "auto" });
  }));
  void refresh();
  // No cookies or persistent cache; hidden tabs stop requests and recheck on return.
  const timer = setInterval(refresh, REFRESH_MS);
  document.addEventListener("visibilitychange", refresh);
  window.addEventListener("pageshow", refresh);
  return () => {
    clearInterval(timer);
    document.removeEventListener("visibilitychange", refresh);
    window.removeEventListener("pageshow", refresh);
  };
}
