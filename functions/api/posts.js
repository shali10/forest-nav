export async function onRequestGet({ request }) {
  const haloFeed = "https://blog.0000996.xyz/rss.xml";
  
  try {
    const resp = await fetch(haloFeed, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      cf: { cacheTtl: 300 }
    });
    if (!resp.ok) throw new Error("feed_fetch_failed");
    const xml = await resp.text();
    
    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;
    
    while ((match = itemRegex.exec(xml)) !== null && items.length < 4) {
      const itemXml = match[1];
      const titleM = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
      const linkM = itemXml.match(/<link>(.*?)<\/link>/);
      const dateM = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);
      
      const title = (titleM ? (titleM[1] || titleM[2]) : "").trim();
      const link = (linkM ? linkM[1] : "").trim();
      const rawDate = (dateM ? dateM[1] : "").trim();
      
      let dateStr = "";
      if (rawDate) {
        try {
          const d = new Date(rawDate);
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          dateStr = `${mm}/${dd}`;
        } catch (e) {
          dateStr = "";
        }
      }
      
      if (title && link) {
        items.push({ title, url: link, source: "Halo 博客", date: dateStr });
      }
    }
    
    return Response.json(items, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch (e) {
    return Response.json([], {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
  }
}
