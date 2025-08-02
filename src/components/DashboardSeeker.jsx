import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from './Header'
import LedgerLineCard from './LedgerLineCard'

export default function DashboardSeeker() {
  const [pings, setPings] = useState([])
  const [pacts, setPacts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      const { data: { user } } = await supabase.auth.getUser()
      
      // Fetch user's pings
      const { data: pingsData } = await supabase
        .from('pings')
        .select('*')
        .eq('seeker_id', user.id)
        .order('created_at', { ascending: false })

      // Fetch user's pacts
      const { data: pactsData } = await supabase
        .from('pacts')
        .select('*')
        .eq('seeker_id', user.id)
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
      <Header title="Seeker Dashboard" />
      <div className="container" style={{ padding: '2rem 1rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/create-ping" className="btn btn-primary">
            📡 Create New Ping
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Your Pings */}
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#023d21' }}>
              📡 Your Pings ({pings.length})
            </h3>
            {pings.length === 0 ? (
              <p style={{ color: '#666666' }}>No pings created yet.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {pings.slice(0, 3).map((ping) => (
                  <LedgerLineCard 
                    key={ping.id} 
                    item={{
                      id: ping.id,
                      amount: ping.amount,
                      status: ping.status,
                      stacker: ping.stacker_name || 'Pending',
                      dueDate: new Date(Date.now() + ping.days_to_repay * 24 * 60 * 60 * 1000).toISOString(),
                      type: 'Ping'
                    }} 
                    role="seeker" 
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
                      stacker: pact.stacker_name || 'Unknown',
                      dueDate: pact.payback_date,
                      type: 'Pact'
                    }} 
                    role="seeker" 
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