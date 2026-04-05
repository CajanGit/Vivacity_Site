// import Navbar from "@/app/components/Navbar"
import {
    Twitter
} from 'lucide-react';


const socialLinks = {

    icon: Twiter,
    name: 
}
export default function socialsPage(){

    return (

        <div className="min-h-screen bg-black">
      {/* <Navbar /> */}
      
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
        <div className="absolute inset-0 opacity-20">
          {/* <ImageWithFallback
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&q=80"
            alt="Esports background"
            className="w-full h-full object-cover"
          /> */}
        </div>
        
        <div className="relative z-20 container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              JOIN THE WAVE
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 mb-2">
              Connect with us across all platforms
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Live and ready to compete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Cards */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* {socialLinks.map((social) => (
            <SocialMediaCard
              key={social.name}
              icon={social.icon}
              name={social.name}
              handle={social.handle}
              url={social.url}
              color={social.color}
            />
          ))} */}
        </div>
      </div>
    </div>
    );
    
}