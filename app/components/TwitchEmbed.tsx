'use client'

export default function TwitchEmbed({ channel }: { channel: string }) {
  const parent = process.env.NEXT_PUBLIC_SITE_DOMAIN ?? 'localhost'
  
  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10">
      <iframe
        src={`https://player.twitch.tv/?channel=${channel}&parent=${parent}&autoplay=true&muted=true`}
        height="100%"
        width="100%"
        allowFullScreen
      />
    </div>
  )
}