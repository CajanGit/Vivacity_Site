import Link from 'next/link'
import type { Coach } from '@/lib/coaches'

type Props = {
  coach: Coach
  featured?: boolean
}

export default function CoachCard({ coach, featured = false }: Props) {
  return (
    <Link href={`/coaching/${coach.id}`}>
      <div className={`
        bg-gray-900 border rounded-xl p-6 hover:border-indigo-500 transition-colors cursor-pointer
        ${featured ? 'border-indigo-500 sm:flex sm:gap-6' : 'border-gray-800'}
      `}>
        {/* Avatar */}
        <div className={`${featured ? 'shrink-0' : 'mb-4'}`}>
          {coach.profiles?.avatar_url ? (
            <img
              src={coach.profiles.avatar_url}
              alt={coach.profiles.username}
              className={`rounded-full object-cover
                ${featured ? 'w-24 h-24' : 'w-14 h-14 mb-3'}
              `}
            />
          ) : (
            <div className={`rounded-full bg-gray-700 flex items-center justify-center
              ${featured ? 'w-24 h-24' : 'w-14 h-14 mb-3'}
            `}>
              <span className="text-gray-400 text-xl">?</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <h2 className={`font-bold text-white ${featured ? 'text-2xl' : 'text-lg'}`}>
            {coach.profiles?.username}
          </h2>
          <p className="text-indigo-400 text-sm mb-1">{coach.rank} · {coach.game}</p>
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">{coach.bio}</p>
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">${coach.price}<span className="text-gray-400 font-normal text-sm"> / session</span></span>
            <span className="text-xs text-gray-500">{coach.availability}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}