import { getTeam } from "@/lib/faceit";

// export async function GET(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
//     const { teamId } = await params;
//     const res = await fetch(`https://open.faceit.com/data/v4/teams/${teamId}`, {
//         headers: { Authorization: `Bearer ${process.env.FACEIT_API_KEY}` },
//         next: { revalidate: 300 } 
//     });

//     const data = await res.json();
//     // console.log(data);
//     return Response.json(data);
// }

export async function GET(_req: Request, { params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  const data = await getTeam(teamId);
  return Response.json(data);
}