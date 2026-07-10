import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabaseInstance = null

const isValidUrl = (url) => {
  try {
    if (!url || url.includes('your_supabase_project_url_here')) return false
    new URL(url)
    return true
  } catch {
    return false
  }
}

if (supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  } catch (err) {
    console.error('Failed to initialize Supabase:', err)
  }
}

// Fail-safe mock to prevent null-pointer crashes in the UI
const mockSupabase = {
  auth: {
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    getSession: async () => ({ data: { session: null } }),
    signInWithPassword: async () => { throw new Error('Supabase not configured') },
    signUp: async () => { throw new Error('Supabase not configured') },
    signOut: async () => {},
  }
}

export const supabase = supabaseInstance || mockSupabase
export const isSupabaseConfigured = !!supabaseInstance
