export async function getTeam(teamId: string) {
  const res = await fetch(`https://open.faceit.com/data/v4/teams/${teamId}`, {
    headers: { Authorization: `Bearer ${process.env.FACEIT_API_KEY}` },
    next: { revalidate: 300 }
  });
  return res.json();
}

export async function getSchedule() {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${process.env.GOOGLE_CALENDAR_ID}/events?key=${process.env.GOOGLE_CALENDAR_API_KEY}&orderBy=startTime&singleEvents=true`,
    { next: { revalidate: 300 } }
  );
  return res.json();
}