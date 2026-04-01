export async function GET() {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

    const now = new Date().toISOString();

    const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&orderBy=startTime&singleEvents=true`,
        { next: {revalidate:10 } } // change to 300 on deployment
    );

    const data = await res.json();
    return Response.json(data);
}
