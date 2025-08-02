import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from './Header'
import Badge from './Badge'
import { formatDate } from '../utils/formatDate'

export default function PactDetail() {
  const { id } = useParams()
  const [pact, setPact] = useState(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      // Fetch pact details
      const { data, error } = await supabase
        .from('pacts')
        .select('*')
        .eq('id', id)
        .single()

      if (!error) setPact(data)
      setLoading(false)
    }

    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!pact) {
    return (
      <div>
        <Header title="Pact Details" showBack={true} />
        <div className="container" style={{ padding: '2rem 1rem' }}>
          <p style={{ textAlign: 'center' }}>Pact not found.</p>
        </div>
      </div>
    )
  }

  const isStacker = user?.id === pact.stacker_id

  return (
    <div>
      <Header title="Pact Details" showBack={true} />
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#023d21' }}>
              ₹{pact.amount}
            </h2>
            <Badge label={pact.status} />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Seeker:</p>
            <p>{pact.seeker_name}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Stacker:</p>
            <p>{pact.stacker_name}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Trust Fee:</p>
            <p>₹{pact.trust_fee}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Payback Date:</p>
            <p>{formatDate(pact.payback_date)}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Your Role:</p>
            <p>{isStacker ? 'Stacker (Lender)' : 'Seeker (Borrower)'}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Created:</p>
            <p>{new Date(pact.created_at).toLocaleString()}</p>
          </div>

          {pact.notes && (
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Notes:</p>
              <p>{pact.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}