import { unstable_cache } from 'next/cache'
import { createClient } from '@supabase/supabase-js'

// Simple unauthenticated client solely for fetching public data
// By not passing cookies, this is safe to cache
const getPublicSupabase = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const getResourceCounts = unstable_cache(async () => {
    const supabase = getPublicSupabase();
    
    // We execute these in parallel too
    const [pdf, audio, video] = await Promise.all([
        supabase.from('resources').select('*', { count: 'exact', head: true }).eq('type', 'pdf').eq('is_published', true),
        supabase.from('resources').select('*', { count: 'exact', head: true }).eq('type', 'audio').eq('is_published', true),
        supabase.from('resources').select('*', { count: 'exact', head: true }).eq('type', 'video').eq('is_published', true)
    ])
    
    return {
        pdfCount: pdf.count || 0,
        audioCount: audio.count || 0,
        videoCount: video.count || 0
    }
}, ['dashboard-resource-counts'], { revalidate: 600 }) // revalidate every 10 mins

export const getRecentResources = unstable_cache(async () => {
    const supabase = getPublicSupabase();
    
    const { data } = await supabase
        .from('resources')
        .select('*, category:categories(*)')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(6)
        
    return data
}, ['dashboard-recent-resources'], { revalidate: 600 })
