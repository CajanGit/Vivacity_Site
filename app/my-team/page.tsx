import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TEAMS } from '@/lib/teamIds'
import { getSchedule, getTeam } from '@/lib/faceit'
import { parseCalendarEvent } from '@/lib/parseMatch'
import LocalTime from '@/app/components/LocalTime'
import Link from 'next/link' 

export default async function MyTeamPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/')

  const { data: profile } = await supabase
    .from('profiles')
    .select('team_id, username')
    .eq('id', user.id)
    .single()

  if (!profile?.team_id) redirect('/')

  const team = TEAMS.find(t => t.teamId === profile.team_id)
  if (!team) redirect('/')

  const scheduleData = await getSchedule()
  const now = new Date()

  const teamMatches = scheduleData.items ?.map(parseCalendarEvent).filter((m: any) => m?.teamName === team.calendarName) ?? []

  const nextMatch = teamMatches
    .filter((m: any) => new Date(m.scheduledAt) > now)
    .sort((a: any, b: any) => 
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    )[0] ?? null

  const faceitTeamUrl = `https://www.faceit.com/en/teams/${team.teamId}`

  const faceitTeam = await getTeam(team.teamId)
  
  const teamUpUrl = team.teamUpUrl ?? null  // add this field to TEAMS if you use TeamUp

 return (
    <div className="min-h-screen max-w-4xl mx-auto px-8 py-16">
      <div>
        <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">
        Team Hub
        </p>
        <img
          src={faceitTeam.avatar}
          alt={team.calendarName}
          className="w-16 h-16 rounded-full border border-white/10"
        />
      <h1 className="text-4xl font-medium text-white mb-8">
        {team.calendarName}
      </h1>
      </div>
        
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">

        {/* FACEIT link */}
        <a
          href={faceitTeamUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col gap-2 rounded-xl border border-white/10 hover:border-[#FF5500]/40 bg-white/[0.03] p-6 transition-colors"
        >
          <p className="text-[10px] tracking-[0.18em] text-[#FF5500] uppercase">FACEIT</p>
          <p className="text-white font-medium text-sm">View team page →</p>
          <p className="text-gray-500 text-xs">Standings, match history, stats</p>
        </a>

        {/* TeamUp (conditional) */}
        {teamUpUrl ? (
          <a
            href={teamUpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-2 rounded-xl border border-white/10 hover:border-[#00D4F5]/40 bg-white/[0.03] p-6 transition-colors"
          >
            <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">Availability</p>
            <p className="text-white font-medium text-sm">Open TeamUp →</p>
            <p className="text-gray-500 text-xs">Schedule and availability</p>
          </a>
        ) : (
          <div className="flex flex-col gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-6 opacity-40">
            <p className="text-[10px] tracking-[0.18em] text-gray-500 uppercase">Availability</p>
            <p className="text-gray-500 font-medium text-sm">Coming soon</p>
          </div>
        )}

        {/* Next match */}
        <div className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">Next match</p>
          {nextMatch ? (
            <>
              <p className="text-white font-medium text-sm">vs {nextMatch.opponentName}</p>
              <p className="text-gray-500 text-xs">
                <LocalTime dateString={nextMatch.scheduledAt} />
              </p>
              {nextMatch.faceitUrl && (
                <a href={nextMatch.faceitUrl} target="_blank" className="text-[#FF5500] text-xs hover:text-white transition-colors mt-1">
                  FACEIT room →
                </a>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-sm">No upcoming matches</p>
          )}
        </div>
      </div>

      {/* Link to full team page */}
      <Link
        href={`/teams/${team.teamId}`}
        className="text-sm text-[#00D4F5] hover:text-white transition-colors"
      >
        View full team page →
      </Link>
    </div>
  )
}