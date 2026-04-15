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

  return (
    <div className="bg-[#111314] min-h-screen">

      <section className="relative flex flex-col items-center justify-center text-center px-8 py-20 overflow-hidden">

        <div className="absolute -bottom-20 -left-20 w-95 h-95 rounded-full bg-[#00D4F5] opacity-30 blur-3xl pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-[#F5A800] opacity-30 blur-3xl pointer-events-none" />
      {/* Page Header */}

        <p className="font-aquire text-[#00D4F5] text-4xl font-bold tracking-[0.15em] uppercase mb-2">
        Vivacity Esports
        </p>
        <h1 className="text-3xl font-bold text-white mb-3 relative z-10">Our Teams</h1>
        {/* <div className="w-10 h-0.5 bg-[#00D4F5] opacity-70 mx-auto mt-4 rounded-full" />     */}
      </section>
      
      <div className="h-px bg-white/5" />

      {/* Teams Grid */}
      <section className="px-6 py-16 max-w-2xl mx-auto">
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
