async function getAccessToken(): Promise<string> {
  const res = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: 'POST' }
  )
  const data = await res.json()
  return data.access_token
}

export async function isStreamLive(channel: string): Promise<boolean> {
  const token = await getAccessToken()
  const res = await fetch(
    `https://api.twitch.tv/helix/streams?user_login=${channel}`,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${token}`,
      },
      next: { revalidate: 60 }, // re-check every 60 seconds
    }
  )
  const data = await res.json()
  return data.data?.length > 0
}