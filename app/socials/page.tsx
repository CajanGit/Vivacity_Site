// import Navbar from "@/app/components/Navbar"
import { 
    SiX,
    SiInstagram,
    SiTwitch,
    SiYoutube
} from '@icons-pack/react-simple-icons';

import { SocialMediaCard} from '@/app/components/SocialMediaCard';

const socialLinks = [

{

    icon: SiX,
    name: 'Twitter/X',
    handle:'@VivacityOW',
    url: 'https://x.com/VivacityOW',
    color: '#1DA1F2'
},
{
    icon: SiInstagram,
    name: 'Discord',
    handle:'@Vivacity.Esports',
    url: 'https://www.instagram.com/vivacity.esports/',
    color: '#1DA1F2'
},
{
    icon: SiTwitch,
    name: 'Twitch',
    handle:'@Vivacity_Esports',
    url: 'https://www.twitch.tv/vivacity_esports',
    color: '#1DA1F2'
},
{
    icon: SiYoutube,
    name: 'Youtube',
    handle:'@Vivacity_Esports',
    url: 'https://www.youtube.com/@Vivacity_Esports',
    color: '#1DA1F2'
}
]
export default function app(){

    return (
    
    
    <div className="bg-[#111314] min-h-screen" >

      {/* Header */}
      <section className="relative flex flex-col items-center justify-center text-center px-8 py-20 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-[#00D4F5] opacity-20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#F5A800] opacity-20 blur-3xl pointer-events-none" />

        <p className="text-[10px] tracking-[0.18em] text-[#00D4F5] uppercase mb-3 relative z-10">
          Connect On Our
        </p>
        <h1 className="text-4xl font-medium text-white mb-3 relative z-10">
          Socials
        </h1>
        <p className="text-sm text-gray-500 max-w-sm leading-relaxed relative z-10">
          Follow us across every platform. Stay close to the action.
        </p>
      </section>

      <div className="h-px bg-white/5" />

      {/* Social cards */}
      <section className="px-6 py-16 max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-6 rounded-xl border border-white/10 hover:border-[#00D4F5]/40 bg-[#0a0b0c] px-8 py-6 transition-colors"
            >
              {/* Icon */}
              <social.icon className="w-6 h-6 text-gray-500 group-hover:text-[#00D4F5] transition-colors flex-shrink-0" />

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium mb-0.5">{social.name}</p>
              </div>

              {/* Handle + arrow */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-xs text-gray-600 hidden sm:block">{social.handle}</span>
                <span className="text-[#00D4F5] text-sm opacity-0 group-hover:opacity-100 transition-opacity">›</span>
              </div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
    
}