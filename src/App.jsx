import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'

// Components
import WelcomeScreen from './components/WelcomeScreen'
import LoginScreen from './components/LoginScreen'
import SignupScreen from './components/SignupScreen'
import RulesAgreementScreen from './components/RulesAgreementScreen'
import RoleSelectionScreen from './components/RoleSelectionScreen'
import DashboardStacker from './components/DashboardStacker'
import DashboardSeeker from './components/DashboardSeeker'
import CreatePing from './components/CreatePing'
import PingDetail from './components/PingDetail'
import PactDetail from './components/PactDetail'
import ProfileScreen from './components/ProfileScreen'

export default function App() {
  const [session, setSession] = useState(null)
  const [userMetadata, setUserMetadata] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const fetchUserMetadata = async () => {
      if (session?.user) {
        const { data, error } = await supabase.auth.getUser()
        if (data?.user) {
          setUserMetadata(data.user.user_metadata)
          setRole(data.user.user_metadata.role)
        }
      }
    }

    if (session) fetchUserMetadata()
  }, [session])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        {!session ? (
          <>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        ) : userMetadata?.rulesAccepted !== true ? (
          <>
            <Route path="/rules" element={<RulesAgreementScreen />} />
            <Route path="*" element={<Navigate to="/rules" replace />} />
          </>
        ) : !role ? (
          <>
            <Route path="/role-selection" element={<RoleSelectionScreen setRole={setRole} />} />
            <Route path="*" element={<Navigate to="/role-selection" replace />} />
          </>
        ) : role === 'stacker' ? (
          <>
            <Route path="/dashboard" element={<DashboardStacker />} />
            <Route path="/ping/:id" element={<PingDetail />} />
            <Route path="/pact/:id" element={<PactDetail />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<DashboardSeeker />} />
            <Route path="/create-ping" element={<CreatePing />} />
            <Route path="/ping/:id" element={<PingDetail />} />
            <Route path="/pact/:id" element={<PactDetail />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </>
        )}
      </Routes>
    </Router>
  )
}