import { getCoaches } from '@/lib/coaches'
import CoachCard from '@/app/components/CoachCard'

export default async function CoachingPage() {
  const coaches = await getCoaches()
  const featured = coaches.find(c => c.featured)
  const rest = coaches.filter(c => !c.featured)

  return (
    <main className="max-w-6xl min-h-screen mx-auto px-4 py-12 overflow-hidden">
      <h1 className="text-4xl font-bold text-white mb-2">Coaching Hub</h1>
      <p className="text-gray-400 mb-10">
        Work with Vivacity-verified coaches to level up your game.
      </p>

      <p className="font-aquire text-8xl flex items-center">
        COMING SOON
      </p>
      {/* Featured Coach */}
      {/* {featured && (
        <div className="mb-12">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-wider mb-4">
            Featured Coach
          </p>
          <CoachCard coach={featured} featured />
        </div>
      )} */}

      {/* All Other Coaches */}
      {/* {rest.length > 0 && (
        <div>
          <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
            All Coaches
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(coach => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </div>
      )}

      {coaches.length === 0 && (
        <p className="text-gray-500">No coaches available yet. Check back soon.</p>
      )} */}
    </main>
  )
}