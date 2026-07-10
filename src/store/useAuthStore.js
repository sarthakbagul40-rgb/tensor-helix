import { create } from 'zustand'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

// Fallback for different Zustand versions if named import fails
const createStore = typeof create === 'function' ? create : (create?.default || create);

const useAuthStore = createStore((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isConfigured: isSupabaseConfigured,
  
  setUser: (session) => set({ 
    user: session?.user ?? null, 
    session: session ?? null,
    isLoading: false 
  }),

  // Creates a virtual email from the phone number to bypass SMS provider requirements
  getShadowEmail: (phone) => {
    const cleanPhone = phone.replace(/\D/g, '').slice(-10);
    return `${cleanPhone}@biryani.com`;
  },

  signIn: async (phone, password) => {
    const shadowEmail = `${phone.replace(/\D/g, '').slice(-10)}@biryani.com`;
    
    // We use signInWithPassword with the shadow email
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: shadowEmail, 
      password 
    })
    if (error) throw error
    return data
  },

  signUp: async (phone, password, fullName) => {
    const shadowEmail = `${phone.replace(/\D/g, '').slice(-10)}@biryani.com`;
    
    const { data, error } = await supabase.auth.signUp({
      email: shadowEmail,
      password,
      options: {
        data: { full_name: fullName }
      }
    })
    if (error) throw error
    return data
  },

  signOut: async () => {
    try {
        await supabase.auth.signOut()
    } catch (err) {
        console.error('Sign out error:', err)
    } finally {
        set({ user: null, session: null })
    }
  },

  checkSession: async () => {
    set({ isLoading: true })
    try {
        const { data: { session } } = await supabase.auth.getSession()
        set({ user: session?.user ?? null, session: session ?? null, isLoading: false })
    } catch (err) {
        set({ user: null, session: null, isLoading: false })
    }
  }
}))

export default useAuthStore;
