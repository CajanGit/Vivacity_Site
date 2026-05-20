'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { TEAMS } from '@/lib/teamIds'

export default function JoinPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function handleJoin() {
      const teamId = searchParams.get('team')

      // allowlist validation — only IDs in your TEAMS array are valid
      const validTeam = TEAMS.find(t => t.teamId === teamId)
      if (!teamId || !validTeam) {
        setStatus('error')
        setMessage('Invalid team link.')
        return
      }

      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        // not logged in — send them to sign in, then back here
        router.push(`/api/auth/login?next=/join?team=${teamId}`)
        return
      }

      const { error } = await supabase
        .from('profiles')
        .update({ team_id: teamId })
        .eq('id', user.id)

      if (error) {
        setStatus('error')
        setMessage('Something went wrong. Try again.')
        return
      }

      setStatus('success')
      setTimeout(() => router.push('/my-team'), 1500)
    }

    handleJoin()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-8">
      {status === 'loading' && <p className="text-gray-400">Joining team...</p>}
      {status === 'success' && <p className="text-[#00D4F5]">Joined! Redirecting to your team hub...</p>}
      {status === 'error' && <p className="text-red-400">{message}</p>}
    </div>
  )
}