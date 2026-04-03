export async function getTeam(teamId: string) {
  const res = await fetch(`https://open.faceit.com/data/v4/teams/${teamId}`, {
    headers: { Authorization: `Bearer ${process.env.FACEIT_API_KEY}` },
    next: { revalidate: 300 }
  });
  return res.json();
}