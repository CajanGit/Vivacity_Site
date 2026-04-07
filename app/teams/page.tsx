import Link from "next/link";
import { TEAMS } from "@/lib/teamIds";
import { getTeam } from "@/lib/faceit";

type Team = {
  team_id: string
  name: string
  avatar: string;
};

export default async function TeamsPage() {
  const teams:Team[] = await Promise.all(
    TEAMS.map(({ teamId }) => getTeam(teamId))
  );


// export default async function TeamsPage() {
//   console.log(TEAMS.map(({ teamId }) => teamId));
//   const teams: Team[] = await Promise.all(
//     TEAMS.map(( { teamId }) =>
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${teamId}`).then((r) => r.json())
//     )
//   );

  // return (
  //   <div className="flex gap-10 p-10">
  //     {teams.map((team) => (
  //       <Link
  //         key = {team.team_id}
  //         href={`/teams/${team.team_id}`}
  //         className="flex flex-col border border-white/40 items-center gap-3 p-10 min-h-[20vh] rounded-lg bg-transparent transition-transform duration-300 hover:scale-105 hover:bg-[#00D4F5]/30 hover:border-[#00D4F5]"
  //       >
  //         <img 
  //           src={team.avatar}
  //           alt={team.name}
  //           className="w-24 h-24 rounded-full object-cover"
  //         />
  //         <span className="text-white font-semibold text-lg">{team.name}</span>
  //       </Link>
  //     ))}
  //   </div>
  // );
  //   <div> 
  //     {teams.map((team) => (
  //       <Link key={team.team_id} href={`/teams/${team.team_id}`}>
  //         <img src={team.avatar} alt={team.name} />
  //         <span>{team.name}</span>
  //       </Link>
  //     ))}
  //   </div>
  // )

  return (
    <div className="bg-[#111314] min-h-screen overflow-hidden">
      <section className="relative flex flex-col items-center justify-center text-center min-h-screen px-8 py-20">
        <div className="absolute -bottom-20 -left-20 w-95 h-95 rounded-full bg-[#00D4F5] opacity-30 pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#F5A800] opacity-30 pointer-events-none" />
      {/* Page Header */}
        <div className="text-center mb-12">
        <p className="text-[#00D4F5] text-lg font-bold tracking-[0.15em] uppercase mb-2">
          Vivacity Esports
        </p>
        <h1 className="text-3xl font-bold text-white tracking-tight">Our Teams</h1>
        <div className="w-10 h-0.5 bg-[#00D4F5] opacity-70 mx-auto mt-4 rounded-full" />    
      </div>
      

      {/* Teams Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
        {teams.map((team) => (
          <Link
            key={team.team_id}
            href={`/teams/${team.team_id}`}
            className="group relative flex flex-col items-center gap-3 p-7 rounded-2xl border border-white/30 bg-white/[0.03]
                       transition-all duration-500
                       hover:-translate-y-3 hover:border-[#00D4F5]/100
                       hover:bg-[#00D4F5]/[0.1] hover:shadow-[0_0_24px_rgba(0,212,245,0.12)]"
          >
            {/* Corner Accent */}
            <span className="absolute top-2.5 right-3 w-1.5 h-1.5 border-t-[1.5px] border-r-[1.5px] border-[#00D4F5]/40 rounded-tr
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Avatar */}
            <div className="relative">
              <div className="absolute -inset-[3px] rounded-full border-2 border-[#00D4f5]/0 group-hover:border-[#00D4F5]/50 transition-all duration-300"/>
              <img
                src={team.avatar}
                alt={team.name}
                className="w-20 h-20 rounded-full object-cover border border-[#00D4f5]/20 bg-[#00D4f5]/10"/>
            </div>
            {/* Info */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-white font-semibold text-sm text-center leading-snug">
                {team.name}
              </span>
              <span className="text-[#00D4F5]/60 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              View team →
              </span>
            </div>
          </Link>
        ))}
        </div>
      </section>
    </div>    
  );
}
