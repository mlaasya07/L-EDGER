import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Header from './Header'

export default function CreatePing() {
  const [amount, setAmount] = useState('')
  const [trustFee, setTrustFee] = useState('')
  const [daysToRepay, setDaysToRepay] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [available, setAvailable] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCashLimits = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      const { data, error } = await supabase
        .from('profiles')
        .select('total_cash, cold_hard_cash')
        .eq('id', user.id)
        .single()

      if (!error && data) {
        const usable = (data.total_cash || 0) - (data.cold_hard_cash || 0)
        setAvailable(usable)
      }
    }

    fetchCashLimits()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!amount || !trustFee || !daysToRepay || !reason) {
      setError('Please fill all fields.')
      setLoading(false)
      return
    }

    const numericAmount = parseInt(amount)
    const numericFee = parseInt(trustFee)
    const numericDays = parseInt(daysToRepay)

    if (isNaN(numericAmount) || isNaN(numericFee) || isNaN(numericDays)) {
      setError('Amount, Trust Fee, and Days must be numbers.')
      setLoading(false)
      return
    }

    if (available !== null && numericAmount > available) {
      setError('You do not have enough available cash to request this.')
      setLoading(false)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('pings').insert([
      {
        seeker_id: user.id,
        seeker_name: user.user_metadata.name || 'Unknown',
        amount: numericAmount,
        trust_fee: numericFee,
        days_to_repay: numericDays,
        reason: reason.trim(),
        status: 'pending'
      }
    ])

    setLoading(false)

    if (error) {
      setError('Failed to send ping. Try again.')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div>
      <Header title="Create Ping" showBack={true} />
      <div className="container" style={{ padding: '2rem 1rem', maxWidth: '600px' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '2rem', color: '#023d21' }}>
            📡 Create a New Ping
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                How much do you need?
              </label>
              <input
                className="input"
                type="number"
                placeholder="₹"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                What Trust Fee are you offering?
              </label>
              <input
                className="input"
                type="number"
                placeholder="₹"
                value={trustFee}
                onChange={(e) => setTrustFee(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Days to repay
              </label>
              <input
                className="input"
                type="number"
                placeholder="Number of days"
                value={daysToRepay}
                onChange={(e) => setDaysToRepay(e.target.value)}
                required
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                Why do you need this amount?
              </label>
              <textarea
                className="input"
                placeholder="Explain briefly"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                required
              />
            </div>

            {available !== null && (
              <p style={{ fontSize: '0.875rem', color: '#666666', marginBottom: '1rem' }}>
                Your available amount (after Cold Hard Cash): ₹{available}
              </p>
            )}

            {error && <div className="error">{error}</div>}

            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading}
              style={{ width: '100%' }}
            >
              {loading ? 'Sending Ping...' : 'Send Ping'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}