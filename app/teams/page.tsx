// 'use client';

// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '@/lib/firebase';
// import { useState, useEffect } from 'react';

// export default function Teams(){
//     const [teamsData, setTeamsData] = useState([]);

//     useEffect(() => {
//     const fetchTeams = async () => {
//       const teamsSnapshot = await getDocs(collection(db, 'teams'));
//       const data = teamsSnapshot.docs.map(doc => {
//         const teamData = doc.data();
//         return {
//             id:doc.id,
//             name: teamData.name, 
//             players: teamData.players,
//             coach: teamData.coach
//       };
//     });
//       setTeamsData(data);
//     };
//     fetchTeams();
//   }, []);

//     return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-8">Teams</h1>
//       {teamsData.length > 0 ? (
//         <ul className="space-y-4">
//           {teamsData.map((team, index) => (
//             <li key={index} className="border p-4 rounded text-black bg-gray-50">
//               <h2 className="font-black font-semibold text-lg">{team.name}</h2>
//               <p>Coach: {team.coach}</p>
//               <p>Players: {team.players}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No teams found</p>
//       )}
//     </div>
//   );
// }

import Link from "next/link";
import { TEAMS } from "@/lib/teamIDs";

type Team = {
  team_id: string
  name: string
  avatar: string;
};

export default async function TeamsPage() {
  console.log(TEAMS.map(({ teamId }) => teamId));
  const teams: Team[] = await Promise.all(
    TEAMS.map(( { teamId }) =>
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/team/${teamId}`).then((r) => r.json())
    )
  );

  return (
    <div className="grid grid-cols-3 gap-6 p-8">
      {teams.map((team) => (
        <Link
          key = {team.team_id}
          href={`/teams/${team.team_id}`}
          className="flex flex-col items-center gap-3 p-6 rounded-lg bg-gray-800 transition-transform duration-200 hover:scale-105 hover:bg-gray-700"
        >
          <img 
            src={team.avatar}
            alt={team.name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <span className="text-white font-semibold text-lg">{team.name}</span>
        </Link>
      ))}
    </div>
  );
  //   <div> 
  //     {teams.map((team) => (
  //       <Link key={team.team_id} href={`/teams/${team.team_id}`}>
  //         <img src={team.avatar} alt={team.name} />
  //         <span>{team.name}</span>
  //       </Link>
  //     ))}
  //   </div>
  // )
}
