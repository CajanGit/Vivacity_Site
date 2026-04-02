import { createClient } from '@/lib/supabase/server'

export type Coach = {
    id:string
    user_id: string
    game:string
    rank:string
    bio:string
    price:number
    availability:string
    featured:boolean
    profiles: {
        username: string
        avatar_url: string
    }
}

export async function getCoaches(): Promise<Coach[]> {
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
        .order('featured', { ascending:false })
    
    if (error) {
        console.error(error)
        return[]
    }

    return data as Coach[]
}