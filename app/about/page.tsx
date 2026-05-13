import { createClient } from '@/lib/supabase/server'
import { STAFF_ROSTER } from '@/lib/staff'


export default async function AboutPage() {
    const supabase = await createClient()
    const staffIds = Object.keys(STAFF_ROSTER)

    const { data, error } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .in ('id', staffIds)

    if (error || !data) return <p>Failed to load staff.</p>

    const staff = data.map(member => ({
        ...member,
        title: STAFF_ROSTER[member.id].title
    }))

  return (
    <div className="min-h-screen">
        <section className="relative flex flex-col items-center justify-center px-8 py-20 overflow-hidden">

    
        <div className="relative z-10 max-w-xl text-center mb-16">
            
            <p className="font-aquire text-[#00D4F5] text-4xl font-bold tracking-wide mb-4">
            Vivacity Esports
            </p>

            <p className="text-white text-lg font-medium mb-4">
            Helping players thrive as competitors and individuals.
            </p>

            <p className="text-gray-500 text-sm leading-relaxed">
            We're a community-first org built by players, for players. 
            We believe esports is about more than winning — it's about 
            growth, teamwork, and finding a place you can belong.
            </p>
        </div>
    </section>

    <div className="h-px w-full bg-white/5" />

    <section className="relative flex flex-col items-center justify-center px-8 py-20 overflow-hidden">

        <h2 className="text-3xl font-bold text-white mb-10">The Team</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
                {staff.map((member) => (
                <div
                    key={member.id}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-white/10 bg-white/[0.03]"
                >
                <img
                    src={member.avatar_url}
                    alt={member.username}
                    className="w-20 h-20 rounded-full object-cover border border-[#00D4F5]/20"
                />
                <div className="text-center">
                    <p className="text-white font-semibold text-sm">{member.username}</p>
                    <p className="text-[#00D4F5]/70 text-xs mt-0.5">{member.title}</p>
                </div>
                </div>
          ))}
            </div>
        </section>
    </div>
    
    
  )
}