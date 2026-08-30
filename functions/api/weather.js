export async function onRequestGet(context) {
  const request = context.request;
  const cf = request.cf || {};
  const url = new URL(request.url);
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
      headers: { "User-Agent": "nav-0000996/1.0" },
      cf: { cacheTtl: 900, cacheEverything: true }
    });
    if (!response.ok) throw new Error(`weather_${response.status}`);
    const data = await response.json();
    return Response.json({
      ok: true,
      location: cf.city || cf.region || cf.country || "当前位置",
      timezone: data.timezone,
      current: data.current,
      daily: {
        max: data.daily?.temperature_2m_max?.[0],
        min: data.daily?.temperature_2m_min?.[0]
      }
    }, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=900",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch (error) {
    return Response.json({ ok: false, error: "weather_unavailable" }, {
      status: 502,
      headers: { "Cache-Control": "no-store" }
    });
  }
}
