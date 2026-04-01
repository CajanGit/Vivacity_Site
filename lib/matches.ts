// lib/matches.ts

export type Match = {
  matchId: string;
  opponentName: string;
  opponentTeamId: string;
  scheduledAt: string; // ISO date string e.g. "2026-03-25T18:00:00Z"
  isStreamed: boolean;
  streamUrl?: string; // optional, only needed if isStreamed is true
  result?: {         // optional, only fill in for past matches
    us: number;
    them: number;
  };
};

// export const MATCHES: Record<string, Match[]> = {
//   "81d8c9ef-d771-4c9f-8d93-ffb23f70c1d5": [
//     {
//       matchId: "1",
//       opponentName: "Enemy Team",
//       opponentTeamId: "their-uuid-here",
//       scheduledAt: "2026-03-25T18:00:00Z",
//       isStreamed: true,
//       streamUrl: "https://twitch.tv/vivacity_esports",
//     },
//     {
//       matchId: "2",
//       opponentName: "Another Team",
//       opponentTeamId: "their-uuid-here",
//       scheduledAt: "2026-03-10T18:00:00Z",
//       isStreamed: false,
//       result: { us: 3, them: 1 },
//     },
//   ],
// };