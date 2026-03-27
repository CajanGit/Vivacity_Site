// lib/parseMatch.ts
export function parseCalendarEvent(event: any) {
  const title = event.summary; // e.g. "[Vivacity] vs Enemy Team"
  const match = title.match(/\[(.+?)\]\s*vs\s*(.+)/);

  if (!match) return null;

  return {
    teamName: match[1].trim(),     // "Vivacity"
    opponentName: match[2].trim(), // "Enemy Team"
    scheduledAt: event.start.dateTime ?? event.start.date,
    eventId: event.id,
    description: event.description ?? "", // we'll use this for stream links later
  };
}