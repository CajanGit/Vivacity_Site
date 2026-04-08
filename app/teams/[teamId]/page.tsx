import {TEAM_ROSTER} from "@/lib/roster";
import { TEAMS } from "@/lib/teamIds";
import { parseCalendarEvent } from "@/lib/parseMatch"
import LocalTime from "@/app/components/LocalTime";
import { getTeam, getSchedule } from "@/lib/faceit";

// app/teams/[teamId]/page.tsx
type Member = {
  user_id: string;
  nickname: string;
  avatar: string;
};

type Team = {
  team_id: string;
  name: string;
  avatar: string;
  members: Member[];
};

export default async function TeamPage({ params }: { params: Promise<{ teamId: string }> }) {
  const { teamId } = await params;
  
  const team: Team = await getTeam(teamId);
  const scheduleData = await getSchedule();

  const now = new Date();

  const filteredMembers = team.members.filter(
  (member) => TEAM_ROSTER[member.user_id]
);

const players = filteredMembers.filter(
  (member) => TEAM_ROSTER[member.user_id].role === "player"
);

const coaches = filteredMembers.filter(
  (member) => TEAM_ROSTER[member.user_id].role === "coach"
);

const teamMatches = scheduleData.items
  ?.map(parseCalendarEvent)
  .filter((match: any) => match?.teamName === TEAMS.find(t => t.teamId === teamId)?.calendarName)
  ?? [];

const upcomingMatches = teamMatches
  .filter((match: any) => new Date(match.scheduledAt) > now)
  .sort ((a: any, b: any) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

const pastMatches = teamMatches
  .filter((match: any) => new Date(match.scheduledAt) <= now)
  .sort((a: any, b: any) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime())

  console.log("url", teamMatches.map((m: any) => m.faceitUrl));
  console.log("teamMatches:", teamMatches);
  // return (

  //   <div className="bg-[#111314] min-h-screen grid grid-cols-2 overflow-hidden">
  //     <div className="p-8">
  //     <img src={team.avatar} alt={team.name} className="w-24 h-24 rounded-full" />
  //     <h1 className="text-4xl font-bold mt-2">{team.name}</h1>

  //     <h2 className="text-lg font-semibold mt-6 mb-2">Players</h2>
  //     <ul>
  //       {players.map((player) => (
  //         <li key={player.user_id} className="flex items-center gap-3 mb-2">
  //           <img src={player.avatar} alt={player.nickname} className="w-8 h-8 rounded-full" />
  //           <span>{player.nickname}</span>
  //         </li>
  //       ))}
  //     </ul>

  //     <h2 className="text-lg font-semibold mt-6 mb-2">Coaches</h2>
  //     <ul>
  //       {coaches.map((coach) =>
  //         <li key={coach.user_id} className="flex items-center gap-3 mb-2">
  //           <img src={coach.avatar} alt={coach.nickname} className="w-8 h-8 rounded-full" />
  //           <span>{coach.nickname}</span>
  //         </li>
  //       )}
  //     </ul>
  //   </div>
  //       <div className="p-8">
  //         <h2 className="text-lg font-semibold mb-2"> Upcoming Matches </h2>
  //         {upcomingMatches.length === 0 && <p> No Upcoming Matches </p>}
  //         <ul>
  //           {upcomingMatches.map((match: any) => (
  //             <li key={match.eventId} className="mb-4">
  //               <p className="font-semibold">
  //                 vs {" "}
  //                 {match.faceitUrl ? (
  //                   <a href={match.faceitUrl} target="_blank" className="underline hover:text-purple-400">
  //                     {match.opponentName}
  //                   </a>
  //                 ) : (
  //                   match.opponentName
  //                 )}
  //               </p>
  //               <LocalTime dateString={match.scheduledAt} />
  //               {match.score && (
  //                 <p>{match.score.us} - {match.score.them}</p>
  //               )}
  //               {match.isStreamed && match.streamUrl && (
  //                 <a href={match.streamUrl} target="_blank" className="text-purple-400 underline ml-2">
  //                   Watch Live
  //                 </a>
  //               )}
  //             </li>
  //           ))}
  //         </ul>

  //       <h2 className="text-lg font-semibold mt-8 mb-4">Past Matches</h2>
  //       {pastMatches.length === 0 && <p>No past matches</p>}
  //       <ul>
  //         {pastMatches.map((match: any) => (
  //           <li key={match.eventId} className="mb-4">
  //             <p className="font-semibold">
  //               vs {" "}
  //               {match.faceitUrl ? (
  //                 <a href={match.faceitUrl} target="_blank" className="underline hover:text-purple-400">
  //                   {match.opponentName}
  //                 </a>
  //               ) : (
  //                 match.opponentName
  //               )}
  //             </p>
  //             <LocalTime dateString={match.scheduledAt} />
  //             {match.score && (
  //               <p>{match.score.us} - {match.score.them}</p>
  //             )}
  //             {match.isStreamed && match.streamUrl && (
  //                 <a href={match.streamUrl} target="_blank" className="text-purple-400 underline ml-2">
  //                   Watch Live
  //                 </a>
  //               )}
  //             {/* {match.result && (
  //               <p>{match.result.us} - {match.result.them}</p>
  //             )} */}
  //           </li>
  //         ))}
  //       </ul>
  //       </div>
  //   </div>
    
  // );

    return (
  <div className="bg-[#111314] min-h-screen text-white" style={{ fontFamily: "'Barlow', sans-serif" }}>

    {/* Hero / Team Header */}
    <div className="border-b border-white/5 py-9">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex items-center gap-5">
          <img src={team.avatar} alt={team.name} className="w-16 h-16 rounded-full border-2 border-white/10" />
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-wide leading-none">{team.name}</h1>
            <p className="text-xs text-white/40 uppercase tracking-widest mt-1">FACEIT · OW</p>
          </div>
        </div>

        {/* Players */}
        <p className="text-[11px] font-semibold uppercase tracking-widest text-white/30 mt-7 mb-3">Roster</p>
        <div className="flex flex-wrap gap-2">
          {players.map((player) => (
            <a
              href={`https://www.faceit.com/en/players/${player.nickname}`}
              target="_blank"
              key={player.user_id} 
              className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-full px-3 py-1 hover:border-[#00D4F5] hover:bg-[#00D4F5]/10"
            >
              <img src={player.avatar} alt={player.nickname} className="w-7 h-7 rounded-full" />
              <span className="text-sm font-medium text-white/80">{player.nickname}</span>
            </a>
          ))}
          {coaches.map((coach) => (
            <a
              href={`https://www.faceit.com/en/players/${coach.nickname}`} 
              target="_blank"
              key={coach.user_id} 
              className="flex items-center gap-2 bg-white/5 border border-white/8 rounded-full px-3 py-1 hover:border-[#00D4F5] hover:bg-[#00D4F5]/10"
            >
              <img src={coach.avatar} alt={coach.nickname} className="w-7 h-7 rounded-full" />
              <span className="text-sm font-medium text-white/80">{coach.nickname}</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-purple-400 bg-purple-950/50 rounded px-1.5 py-0.5">Coach</span>
            </a>
          ))}
        </div>
      </div>
    </div>

    {/* Matches */}
    <div className="max-w-4xl mx-auto px-8 pb-20">

      {/* Upcoming */}
      <h2 className="text-xl font-bold uppercase tracking-widest mt-9 mb-4">Upcoming Matches</h2>
      {upcomingMatches.length === 0
        ? <p className="text-white/30 text-sm">No upcoming matches</p>
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingMatches.map((match: any) => (
              <div key={match.eventId} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 hover:border-[#00D4F5]/15 transition-colors">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/50 rounded px-2 py-0.5 mb-2 inline-block">Upcoming</span>
                <p className="text-lg font-bold"> vs {match.opponentName}
                </p>
                <LocalTime dateString={match.scheduledAt} />
                <div className="flex gap-2 mt-3 flex-wrap">
                  {match.faceitUrl && (
                    <a href={match.faceitUrl} target="_blank" className="text-[11px] uppercase tracking-wider text-red-400 bg-red-950/40 border border-red-800/30 rounded px-2 py-1 hover:bg-red-900/40 transition-colors">
                      FACEIT Room
                    </a>
                  )}
                  {match.isStreamed && match.streamUrl && (
                    <a href={match.streamUrl} target="_blank" className="text-[11px] uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/30 rounded px-2 py-1 hover:bg-purple-900/40 transition-colors">
                      Watch Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      {/* Divider */}
      <hr className="border-white/5 mt-8" />

      {/* Past */}
      <h2 className="text-xl font-bold uppercase tracking-widest mt-8 mb-4">Past Matches</h2>
      {pastMatches.length === 0
        ? <p className="text-white/30 text-sm">No past matches</p>
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pastMatches.map((match: any) => (
              <div key={match.eventId} className="bg-white/[0.03] border border-white/8 rounded-xl p-4 hover:border-[#00D4F5]/15 hover:bg-[#00D4F5]/5 transition-colors">
                <p className="text-lg font-bold"> vs {match.opponentName} </p>
                <LocalTime dateString={match.scheduledAt} />
                {match.score && (
                  <p className="text-2xl font-bold mt-2">
                    <span className={match.score.us > match.score.them ? "text-green-400" : "text-red-400"}>{match.score.us}</span>
                    <span className="text-white/30 mx-1">–</span>
                    <span className={match.score.them > match.score.us ? "text-green-400" : "text-red-400"}>{match.score.them}</span>
                  </p>
                )}
                <div className="flex gap-2 mt-3 flex-wrap">
                  {match.faceitUrl && (
                    <a href={match.faceitUrl} target="_blank" className="text-[11px] uppercase tracking-wider text-red-400 bg-red-950/40 border border-red-800/30 rounded px-2 py-1 hover:bg-red-900/40 transition-colors">
                      FACEIT Room
                    </a>
                  )}
                  {match.isStreamed && match.streamUrl && (
                    <a href={match.streamUrl} target="_blank" className="text-[11px] uppercase tracking-wider text-purple-400 bg-purple-950/40 border border-purple-800/30 rounded px-2 py-1 hover:bg-purple-900/40 transition-colors">
                      Watch Live
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  </div>
);

}