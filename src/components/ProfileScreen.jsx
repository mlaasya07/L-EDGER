import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from './Header'

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (!error) setProfile(data)
      setLoading(false)
    }

    fetchProfile()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <Header title="Your Profile" />
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#023d21' }}>
            Profile Information
          </h2>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Name:</p>
            <p>{user?.user_metadata?.name || profile?.full_name || 'Not provided'}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Email:</p>
            <p>{user?.email}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Role:</p>
            <p style={{ textTransform: 'capitalize' }}>
              {user?.user_metadata?.role || 'Not selected'}
            </p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Cred Meter:</p>
            <p>{profile?.cred_meter || 100}</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Tags:</p>
            <p>{(profile?.tags || []).join(', ') || 'None'}</p>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-danger"
            style={{ width: '100%' }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}