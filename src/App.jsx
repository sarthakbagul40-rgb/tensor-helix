import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import Checkout from './pages/Checkout'
import Success from './pages/Success'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import Search from './pages/Search'
import Layout from './components/Layout'
import useAuthStore from './store/useAuthStore'
import { supabase } from './lib/supabase'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuthStore()
  const location = useLocation()

  if (isLoading) return null
  
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children
}

function App() {
  const { setUser, checkSession } = useAuthStore()

  useEffect(() => {
    // Initial session check
    checkSession()

    // Listen for auth changes only if supabase is configured
    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session)
      })
      return () => subscription.unsubscribe()
    }
  }, [])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  )
}

export default App
