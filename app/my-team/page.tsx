import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TEAMS } from '@/lib/teamIds'

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

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-8 py-16">
      <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">
        Team Hub
      </p>
      <h1 className="text-4xl font-medium text-white mb-8">
        {team.calendarName}
      </h1>
      {/* availability checker goes here next */}
    </div>
  )
}