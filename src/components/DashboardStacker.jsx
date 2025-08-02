import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from './Header'
import LedgerLineCard from './LedgerLineCard'

export default function DashboardStacker() {
  const [pings, setPings] = useState([])
  const [pacts, setPacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Fetch pending pings
      const { data: pingsData } = await supabase
        .from('pings')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })

      // Fetch user's pacts
      const { data: { user } } = await supabase.auth.getUser()
      const { data: pactsData } = await supabase
        .from('pacts')
        .select('*')
        .eq('stacker_id', user.id)
        .order('created_at', { ascending: false })

      setPings(pingsData || [])
      setPacts(pactsData || [])
      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <Header title="Stacker Dashboard" />
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Active Pings */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#023d21' }}>
              📬 Active Pings ({pings.length})
            </h3>
            {pings.length === 0 ? (
              <p style={{ color: '#666666' }}>No active pings right now.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pings.slice(0, 3).map((ping) => (
                  <LedgerLineCard 
                    key={ping.id} 
                    item={{
                      id: ping.id,
                      amount: ping.amount,
                      status: 'New',
                      seeker: ping.seeker_name || 'Unknown',
                      dueDate: new Date(Date.now() + ping.days_to_repay * 24 * 60 * 60 * 1000).toISOString(),
                      type: 'Ping'
                    }} 
                    role="stacker" 
                  />
                ))}
                {pings.length > 3 && (
                  <p style={{ textAlign: 'center', color: '#666666' }}>
                    +{pings.length - 3} more pings
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Your Pacts */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#023d21' }}>
              📋 Your Pacts ({pacts.length})
            </h3>
            {pacts.length === 0 ? (
              <p style={{ color: '#666666' }}>No active pacts.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pacts.slice(0, 3).map((pact) => (
                  <LedgerLineCard 
                    key={pact.id} 
                    item={{
                      id: pact.id,
                      amount: pact.amount,
                      status: pact.status,
                      seeker: pact.seeker_name || 'Unknown',
                      dueDate: pact.payback_date,
                      type: 'Pact'
                    }} 
                    role="stacker" 
                  />
                ))}
                {pacts.length > 3 && (
                  <p style={{ textAlign: 'center', color: '#666666' }}>
                    +{pacts.length - 3} more pacts
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}