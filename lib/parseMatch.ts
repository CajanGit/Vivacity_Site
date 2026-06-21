// lib/parseMatch.ts
export function parseCalendarEvent(event: any) {
  const title = event.summary;   // e.g. "[Vivacity] vs Enemy Team"
  
  if (!title) return null;

  const match = title.match(/\[(.+?)\]\s*vs\s*(.+)/);

  if (!match) return null;

  const description = (event.description ?? "")
  .split(/<br\s*\/?>|\n|\r\n/)           // split on <br> AND real newlines
  .map((l: string) => l.replace(/<[^>]*>/g, '').trim())  // strip remaining HTML tags
  .filter(Boolean)
  .join("\n");                            // rejoin as clean newline-separated string

  const lines = description.split("\n").filter(Boolean);

  // console.log("raw lines:", lines);

  //parse score
  const scoreLine = lines.find((l: string) => /^\d+-\d+$/.test(l));
  const score = scoreLine ? {
    us: parseInt(scoreLine.split("-")[0]),
    them: parseInt(scoreLine.split("-")[1])
  } : null;

  const streamRawLine = lines.find((l: string) => l.includes("twitch.tv")) ?? null;

  const streamUrl = streamRawLine
  ? (streamRawLine.match(/q=(https:\/\/(?:www\.)?twitch\.tv[^\s&"<]*)/))?.[1]  // Google-wrapped
    ?? (streamRawLine.match(/(https:\/\/(?:www\.)?twitch\.tv[^\s<"]*)/)?.[1])   // plain URL
    ?? null
  : null;

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