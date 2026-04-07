// import TeamCard from './components/TeamCard'
// export default function Home() {
//   return (

//     // flex = best for one direction at a time
//     // grid = best for two dimesnions at once, rows + columns, etc
    
//     <div className="flex items-center pt-50">
//       <main className="flex gap-30 justify-center flex-wrap">
//         <TeamCard image="/images/ow_team_placeholder.png" label="Teams" />
//         <TeamCard image="/images/socials_placeholder.png" label="Socials" />
//         <TeamCard image="/images/ow_coaching_placeholder.jpg" label="Coaching" />
//       </main>
//     </div>
  

//   );
// }

import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="bg-[#111314] min-h-screen">

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center min-h-[50vh] px-8 py-20 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#00D4F5] opacity-30 pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#F5A800] opacity-30 pointer-events-none" />

        <img src="/images/logo_transparent.png" alt="Vivacity logo" className="w-32 h-32 object-contain mb-6 relative z-10" />

        <h1 className="text-4xl font-medium text-white mb-3 relative z-10">
          Welcome to <span className="text-[#00D4F5]">Vivacity</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-8 relative z-10">
          An aspiring Esports organization aiming to help players thrive as competitors and individuals.
        </p>
        
        <a href="#sections"
          className="relative z-10 border border-white/40 hover:border-white hover:bg-white/5 text-white px-7 py-2.5 rounded-md text-sm font-medium transition-colors"
        >
          Explore
        </a>
      </section>

      {/* Sections */}
      <div id="sections">

        {/* Teams */}
        <section className="relative min-h-[300px] flex items-end overflow-hidden">
          <Image
            src="/images/ow_team_placeholder.png"
            alt="Teams"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/95 via-[#0a0b0c]/50 to-[#0a0b0c]/15" />
          <div className="relative z-10 p-12">
            <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">Support Our</p>
            <h2 className="text-2xl font-medium text-white mb-2">Teams</h2>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-5">
              Browse our active rosters, live match schedules, and FACEIT stats for every Vivacity team.
            </p>
            <Link href="/teams" className="text-xs text-[#00D4F5] hover:text-white transition-colors tracking-wide">
              View teams &nbsp;›
            </Link>
          </div>
        </section>

        <div className="h-px bg-white/5" />

        {/* Socials */}
        <section className="relative min-h-[300px] flex items-end overflow-hidden">
          <Image
            src="/images/socials_placeholder.png"
            alt="Socials"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/95 via-[#0a0b0c]/50 to-[#0a0b0c]/15" />
          <div className="relative z-10 p-12">
            <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">Connect On Our </p>
            <h2 className="text-2xl font-medium text-white mb-2">Socials</h2>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-5">
              Follow us on Discord, Twitter, and Twitch. Stay in the loop on events, announcements, and community highlights.
            </p>
            <Link href="/socials" className="text-xs text-[#00D4F5] hover:text-white transition-colors tracking-wide">
              Follow us &nbsp;›
            </Link>
          </div>
        </section>

        <div className="h-px bg-white/5" />

        {/* Coaching */}
        <section className="relative min-h-[300px] flex items-end overflow-hidden">
          <Image
            src="/images/ow_coaching_placeholder.jpg"
            alt="Coaching"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0c]/95 via-[#0a0b0c]/50 to-[#0a0b0c]/15" />
          <div className="relative z-10 p-12">
            <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-2">Get Yourself</p>
            <h2 className="text-2xl font-medium text-white mb-2">Coaching</h2>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed mb-5">
              Book a session with a verified coach and get personalised feedback to sharpen your gameplay.
            </p>
            <Link href="/coaching" className="text-xs text-[#00D4F5] hover:text-white transition-colors tracking-wide">
              Find a coach &nbsp;›
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}