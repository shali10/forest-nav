const FEEDS = [
  { url: "https://note.0000996.xyz/rss.xml", source: "林间随笔" },
  { url: "https://blog.0000996.xyz/rss.xml", source: "Halo 博客" }
];

function parseRss(xml, source) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    const titleM = itemXml.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/);
    const linkM = itemXml.match(/<link>(.*?)<\/link>/);
    const dateM = itemXml.match(/<pubDate>(.*?)<\/pubDate>/);

    const title = (titleM ? (titleM[1] || titleM[2]) : "").trim();
    const link = (linkM ? linkM[1] : "").trim();
    const rawDate = (dateM ? dateM[1] : "").trim();

    let dateStr = "";
    let ts = 0;
    if (rawDate) {
      try {
        const d = new Date(rawDate);
        ts = Number.isNaN(d.getTime()) ? 0 : d.getTime();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        dateStr = `${mm}/${dd}`;
      } catch {
        dateStr = "";
      }
    }

    if (title && link) {
      items.push({ title, url: link, source, date: dateStr, ts });
    }
  }
  return items;
}

export async function onRequestGet() {
  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (f) => {
        const resp = await fetch(f.url, {
          headers: { "User-Agent": "forest-nav/1.2" },
          cf: { cacheTtl: 300 }
        });
        if (!resp.ok) throw new Error("feed_fetch_failed");
        const xml = await resp.text();
        return parseRss(xml, f.source);
      })
    );

    const all = results.flatMap((r) => (r.status === "fulfilled" ? r.value : []));
    all.sort((a, b) => b.ts - a.ts);

    const seenTitles = new Set();
    const deduped = [];
    for (const item of all) {
      const norm = item.title.replace(/\s+/g, "");
      if (!seenTitles.has(norm)) {
        seenTitles.add(norm);
        deduped.push({ title: item.title, url: item.url, source: item.source, date: item.date });
      }
    }

    return Response.json(deduped.slice(0, 4), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300",
        "X-Content-Type-Options": "nosniff"
      }
    });
  } catch {
    return Response.json([], {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
  }
}
