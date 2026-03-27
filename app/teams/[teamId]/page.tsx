import {TEAM_ROSTER} from "@/lib/roster";
import { TEAMS } from "@/lib/teamIDs";
// import { MATCHES } from "@/lib/matches";
import { parseCalendarEvent } from "@/lib/parseMatch"
import LocalTime from "@/app/components/LocalTime";
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${teamId}`);

    // CHANGED - fetch from Google Calendar instead of hardcoded matches
  const scheduleRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/schedule`);
  const scheduleData = await scheduleRes.json();
  console.log(scheduleData);
  const now = new Date();
  // const teamMatches = MATCHES[teamId] ?? [];
  const team: Team = await res.json();
  console.log(team);

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
  .sort((a: any, b: any) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())



  return (
    // <div className="p-8">
    //   <img src={team.avatar} alt={team.name} className="w-24 h-24 rounded-full" />
    //   <h1 className="text-2xl font-bold mt-4">{team.name}</h1>
    //   <h2 className="text-lg font-semibold mt-6 mb-2">Roster</h2>
    //   <ul>
    //     {team.members.map((player) => (
    //       <li key={player.user_id} className="flex items-center gap-3 mb-2">
    //         <img src={player.avatar} alt={player.nickname} className="w-8 h-8 rounded-full" />
    //         <span>{player.nickname}</span>
    //       </li>
    //     ))}
    //   </ul>
    // </div>

    <div className="grid grid-cols-2">
      <div className="p-8">
      <img src={team.avatar} alt={team.name} className="w-24 h-24 rounded-full" />
      <h1 className="text-2xl font-bold mt-4">{team.name}</h1>

      <h2 className="text-lg font-semibold mt-6 mb-2">Players</h2>
      <ul>
        {players.map((player) => (
          <li key={player.user_id} className="flex items-center gap-3 mb-2">
            <img src={player.avatar} alt={player.nickname} className="w-8 h-8 rounded-full" />
            <span>{player.nickname}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-6 mb-2">Coaches</h2>
      <ul>
        {coaches.map((coach) =>
          <li key={coach.user_id} className="flex items-center gap-3 mb-2">
            <img src={coach.avatar} alt={coach.nickname} className="w-8 h-8 rounded-full" />
            <span>{coach.nickname}</span>
          </li>
        )}
      </ul>
    </div>
        <div className="p-8">
          <h2 className="text-lg font-semibold mb-2"> Upcoming Matches </h2>
          {upcomingMatches.length === 0 && <p> No Upcoming Matches </p>}
          <ul>
            {upcomingMatches.map((match: any) => (
              <li key={match.eventId} className="mb-4">
                <p className="font-semibold">vs {match.opponentName}</p>
                <LocalTime dateString={match.scheduledAt} />
                {match.isStreamed && match.streamUrl && (
                  <a href={match.streamUrl} target="_blank" className="text-purple-400 underline ml-2">
                    Watch Live
                  </a>
                )}
              </li>
            ))}
          </ul>

        <h2 className="text-lg font-semibold mt-8 mb-4">Past Matches</h2>
        {pastMatches.length === 0 && <p>No past matches</p>}
        <ul>
          {pastMatches.map((match: any) => (
            <li key={match.eventId} className="mb-4">
              <p className="font-semibold">vs {match.opponentName}</p>
              <LocalTime dateString={match.scheduledAt} />
              {/* {match.result && (
                <p>{match.result.us} - {match.result.them}</p>
              )} */}
            </li>
          ))}
        </ul>
          

        </div>
    </div>
    
  );
}