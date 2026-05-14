import Image from 'next/image'
import Link from 'next/link'
import { isStreamLive } from '@/lib/twitch'
import TwitchEmbed from '@/app/components/TwitchEmbed'

export default async function Home() {

  const live = await isStreamLive(process.env.TWITCH_CHANNEL!)
  return (

    <div className="min-h-screen">
      
      {/* Hero */}

      <section className="relative flex flex-col items-center justify-center text-center min-h-[50vh] px-8 py-20 overflow-hidden">

        <img src="/images/logo_filled.png" alt="Vivacity logo" className="w-32 h-32 object-contain mb-6 relative z-10" />

        <h1 className="text-4xl font-medium text-white mb-3 relative z-10">
          Welcome to <span className="font-aquire text-[#00D4F5]">Vivacity</span>
        </h1>
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed mb-8 relative z-10">
          An aspiring Esports organization aiming to help players thrive as competitors and individuals.
        </p>

        <a
          href="#sections"
          className="relative z-10 border border-white/40 hover:border-white hover:bg-white/5 text-white px-7 py-2.5 rounded-md text-sm font-medium transition-colors duration-200"
        >
          Explore
        </a>
      </section>

      {live && (
        <section className="px-6 py-8 max-w-4xl mx-auto">
          <p className="text-[10px] tracking-[0.18em] text-red-400 uppercase mb-3">🔴 Live Now</p>
          <TwitchEmbed channel={process.env.TWITCH_CHANNEL!} />
        </section>
)}

      {/* Sections Grid */}

      <div id="sections" className="grid grid-cols-1 gap-px bg-neutral-800">

      {/* Teams */}
        <section className="relative w-full flex items-end overflow-hidden group" 
          style={{aspectRatio: '3 / 1', minHeight: '300px'}}
        >
          <Image
            src="/images/Teams_Section.png"
            alt="Teams"
            fill
            priority
            sizes="100vw"
            quality={90} 
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
          /> 
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-300 group-hover:opacity-80" />

          <div className="relative z-10 p-10 flex flex-col gap-3">

            <div className="flex items-center gap-3">
              <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">
                Support Our
              </p>
              <span className="text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border border-[#00D4F5]/30 bg-[#00D4F5]/10 text-[#00D4F5]">
                Active
              </span>
            </div>

            <h2 className="md:text-8xl text-4xl font-aquire text-white">Teams</h2>

            <p className="text-sm text-white/50 max-w-md leading-relaxed">
              Browse our active rosters, live match schedules, and results from our teams.
            </p>

            <Link
              href="/teams"
              className="flex items-center gap-2 text-xs text-[#00D4F5] hover:text-white hover:gap-4 transition-all duration-200 w-fit tracking-wide"
            >
              View teams
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            </Link>

          </div>
        </section>

        {/* Socials */}
        <section className="relative w-full flex items-end overflow-hidden group" 
          style={{aspectRatio: '3 / 1', minHeight: '300px'}}
        >
          <Image
            src="/images/SocialBG2.png"
            alt="Socials"
            fill
            priority
            sizes="100vw"
            quality={90} 
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-300 group-hover:opacity-80" />

          <div className="relative z-10 p-10 flex flex-col gap-3">

            <div className="flex items-center gap-3">
              <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">
                Follow Our
              </p>
            </div>

            <h2 className="md:text-8xl text-4xl font-aquire text-white">Socials</h2>

            <p className="text-sm text-white/50 max-w-md leading-relaxed">
              Check out Vivacity's social media accounts.
            </p>

            <Link
              href="/socials"
              className="flex items-center gap-2 text-xs text-[#00D4F5] hover:text-white hover:gap-4 transition-all duration-200 w-fit tracking-wide"
            >
              Follow us
              <svg 
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="transition-transform duration-200 group-hover/link:translate-x-1.5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            </Link>

          </div>

        </section>

        {/* Store */}
        <section className="relative w-full flex items-end overflow-hidden group" 
          style={{aspectRatio: '3 / 1', minHeight: '300px'}}
        >
          <Image
            src="/images/Store_Section.png"
            alt="Store"
            fill
            priority
            sizes="100vw"
            quality={90} 
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-300 group-hover:opacity-80" />

          <div className="relative z-10 p-10 flex flex-col gap-3">

            <div className="flex items-center gap-3">
              <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">
                Visit Our
              </p>
            </div>

            <h2 className="md:text-8xl text-4xl font-aquire text-white">Store</h2>

            <p className="text-sm text-white/50 max-w-md leading-relaxed">
              Browse our merch and rep Vivacity!
            </p>

            <Link
              href="/store"
              className="flex items-center gap-2 text-xs text-[#00D4F5] hover:text-white hover:gap-4 transition-all duration-200 w-fit tracking-wide"
            >
              Browse store
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            </Link>

          </div>
          
        </section>


        {/* Coaching */}
        <section className="relative w-full flex items-end overflow-hidden group" 
          style={{aspectRatio: '3 / 1', minHeight: '300px'}}
        >
          <Image 
            src="/images/Coaching_Section.png" 
            alt="Coaching" 
            fill 
            priority
            sizes="100vw"
            quality={90} 
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.04]" 
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition-opacity duration-300 group-hover:opacity-80" />
          <div className="relative z-10 p-10 flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase">
              Get Yourself
            </p>
            <h2 className="md:text-8xl text-4xl font-aquire text-white">Coaching</h2>
            <p className="text-sm text-white/50 max-w-md leading-relaxed">
              Book a session with a verified coach and get personalised feedback to sharpen your gameplay.
            </p>
            <Link href="/coaching" className="flex items-center gap-2 text-xs text-[#00D4F5] hover:text-white hover:gap-4 transition-all duration-200 w-fit tracking-wide">
              Find a coach
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </section>
      </div>


    </div>
    
  )
}