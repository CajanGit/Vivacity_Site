import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import type { Coach } from '@/lib/coaches'

type Props = {
  params: Promise<{ id: string }>
}

export default async function CoachProfilePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('coach_profiles')
    .select(`
      *,
      profiles (
        username,
        avatar_url
      )
    `)
    .eq('id', id)
    .single()

  if (error || !data) notFound()

  const coach = data as Coach

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">

      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        {coach.profiles?.avatar_url ? (
          <img
            src={coach.profiles.avatar_url}
            alt={coach.profiles.username}
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-700" />
        )}
        <div>
          <h1 className="text-3xl font-bold text-white">{coach.profiles?.username}</h1>
          <p className="text-indigo-400">{coach.rank} · {coach.game}</p>
        </div>
      </div>

      {/* Details */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">About</h2>
        <p className="text-gray-400">{coach.bio}</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Availability</h2>
        <p className="text-gray-400">{coach.availability}</p>
      </div>

      {/* Booking */}
      <div className="bg-gray-900 border border-indigo-500 rounded-xl p-6 mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white text-2xl font-bold">
              ${coach.price}
              <span className="text-gray-400 font-normal text-base"> / session</span>
            </p>
          </div>
        </div>
        <button
          disabled
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Book a Session — Coming Soon
        </button>
        <p className="text-gray-500 text-xs text-center mt-2">
          Payment coming soon. Contact us on Discord to book manually.
        </p>
      </div>

      {/* Reviews placeholder */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Reviews</h2>
        <p className="text-gray-500">No reviews yet.</p>
      </div>

    </main>
  )
}