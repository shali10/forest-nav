const HALO_FEED = "https://blog.0000996.xyz/rss.xml";

function json(data, init = {}) {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json; charset=utf-8");
  headers.set("X-Content-Type-Options", "nosniff");
  return new Response(JSON.stringify(data), { ...init, headers });
}

async function posts() {
  try {
    const response = await fetch(HALO_FEED, {
      headers: { "User-Agent": "forest-nav/1.1" },
      cf: { cacheTtl: 300, cacheEverything: true }
    });
    if (!response.ok) throw new Error(`feed_${response.status}`);
    const xml = await response.text();
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 4) {
      const item = match[1];
      const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      const title = (titleMatch?.[1] || titleMatch?.[2] || "").trim();
      const url = (linkMatch?.[1] || "").trim();
      const parsed = new Date((dateMatch?.[1] || "").trim());
      const date = Number.isNaN(parsed.getTime())
        ? ""
        : `${String(parsed.getMonth() + 1).padStart(2, "0")}/${String(parsed.getDate()).padStart(2, "0")}`;
      if (title && url) items.push({ title, url, source: "Halo 博客", date });
    }

    return json(items, { headers: { "Cache-Control": "public, max-age=300" } });
  } catch {
    return json([], { headers: { "Cache-Control": "no-store" } });
  }
}

async function weather(request) {
  const url = new URL(request.url);
  const cf = request.cf || {};
  const latitude = Number(url.searchParams.get("latitude") || cf.latitude || 31.2304);
  const longitude = Number(url.searchParams.get("longitude") || cf.longitude || 121.4737);
  const params = new URLSearchParams({
    latitude: latitude.toFixed(4),
    longitude: longitude.toFixed(4),
    current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
    daily: "temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "1"
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`, {
      headers: { "User-Agent": "forest-nav/1.1" },
      cf: { cacheTtl: 900, cacheEverything: true }
    });
    if (!response.ok) throw new Error(`weather_${response.status}`);
    const data = await response.json();
    return json({
      ok: true,
      location: cf.city || cf.region || cf.country || "当前位置",
      timezone: data.timezone,
      current: data.current,
      daily: {
        max: data.daily?.temperature_2m_max?.[0],
        min: data.daily?.temperature_2m_min?.[0]
      }
    }, { headers: { "Cache-Control": "public, max-age=300, s-maxage=900" } });
  } catch {
    return json({ ok: false, error: "weather_unavailable" }, {
      status: 502,
      headers: { "Cache-Control": "no-store" }
    });
  }
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api/posts") return posts();
    if (pathname === "/api/weather") return weather(request);
    return env.ASSETS.fetch(request);
  }
};
