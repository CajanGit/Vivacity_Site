// lib/parseMatch.ts
export function parseCalendarEvent(event: any) {
  const title = event.summary; // e.g. "[Vivacity] vs Enemy Team"
  const match = title.match(/\[(.+?)\]\s*vs\s*(.+)/);

  if (!match) return null;

  const description = event.description ?? "";
  const lines = description.split("\n").map((l: string) => l.trim()).filter(Boolean);

  // console.log("raw lines:", lines);

  //parse score
  const scoreLine = lines.find((l: string) => /^\d+-\d+$/.test(l));
  const score = scoreLine ? {
    us: parseInt(scoreLine.split("-")[0]),
    them: parseInt(scoreLine.split("-")[1])
  } : null;

  const streamRawLine = lines.find((l: string) => l.includes("twitch.tv")) ?? null;
  // handle both plain URLs and Google-wrapped URLs
  const streamUrlMatch = streamRawLine?.match(/q=(https:\/\/(?:www\.)?twitch\.tv[^&"]*)/) ?? null;
  const streamUrl = streamUrlMatch ? streamUrlMatch[1] : streamRawLine;

  // console.log("streamRawLine:", streamRawLine);

  // console.log("streamUrl:", streamUrl);
  // parse faceit match link
  const faceitRawLine = lines.find((l: string) => l.includes("faceit.com")) ?? null;

  
  const faceitUrlMatch = faceitRawLine?.match(/href="([^"]*faceit\.com[^"]*)"/) ?? null;
  const faceitUrl = faceitUrlMatch ? faceitUrlMatch[1] : faceitRawLine;

  return {
    teamName: match[1].trim(),     // "Vivacity"
    opponentName: match[2].trim(), // "Enemy Team"
    scheduledAt: event.start.dateTime ?? event.start.date,
    eventId: event.id,
    isStreamed: !!streamUrl,
    streamUrl,
    faceitUrl,
    score,
  };
}