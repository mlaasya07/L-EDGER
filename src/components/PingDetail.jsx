import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from './Header'
import Badge from './Badge'

export default function PingDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ping, setPing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      // Fetch ping details
      const { data, error } = await supabase
        .from('pings')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setPing(data)
      setLoading(false)
    }

    fetchData()
  }, [id])

  const handleResponse = async (response) => {
    setActionLoading(true)
    setError(null)

    if (response === 'accepted') {
      // Create a pact
      const { error: pactError } = await supabase.from('pacts').insert([
        {
          ping_id: ping.id,
          seeker_id: ping.seeker_id,
          stacker_id: user.id,
          seeker_name: ping.seeker_name,
          stacker_name: user.user_metadata.name || 'Unknown',
          amount: ping.amount,
          trust_fee: ping.trust_fee,
          payback_date: new Date(Date.now() + ping.days_to_repay * 24 * 60 * 60 * 1000).toISOString(),
          status: 'active'
        }
      ])

      if (pactError) {
        setError('Could not create pact. Try again.')
        setActionLoading(false)
        return
      }
    }

    // Update ping status
    const { error } = await supabase
      .from('pings')
      .update({ status: response })
      .eq('id', ping.id)

    setActionLoading(false)

    if (error) {
      setError('Could not update status. Try again.')
    } else {
      navigate('/dashboard')
    }
  }

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!ping) {
    return (
      <div>
        <Header title="Ping Details" showBack={true} />
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <p style={{ textAlign: 'center' }}>Ping not found.</p>
        </div>
      </div>
    )
  }

  const isStacker = user?.user_metadata?.role === 'stacker'
  const canRespond = isStacker && ping.status === 'pending' && ping.seeker_id !== user.id

  return (
    <div>
      <Header title="Ping Details" showBack={true} />
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#023d21' }}>
              ₹{ping.amount}
            </h2>
            <Badge label={ping.status} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Seeker:</p>
            <p>{ping.seeker_name}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Trust Fee:</p>
            <p>₹{ping.trust_fee}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Days to Repay:</p>
            <p>{ping.days_to_repay} days</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Reason:</p>
            <p>{ping.reason}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Created:</p>
            <p>{new Date(ping.created_at).toLocaleString()}</p>
          </div>

          {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}

          {canRespond && (
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button
                onClick={() => handleResponse('accepted')}
                disabled={actionLoading}
                className="btn btn-primary"
                style={{ 
                  flex: 1,
                  backgroundColor: '#2ecc71'
                }}
              >
                {actionLoading ? 'Processing...' : 'Accept Ping'}
              </button>

              <button
                onClick={() => handleResponse('declined')}
                disabled={actionLoading}
                className="btn btn-danger"
                style={{ flex: 1 }}
              >
                {actionLoading ? 'Processing...' : 'Decline Ping'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}