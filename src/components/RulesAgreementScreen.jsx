import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function RulesAgreementScreen() {
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleAgree = async () => {
    if (!agree) {
      setError('You must agree to the rules to continue.')
      return
    }

    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({
      data: { rulesAccepted: true }
    })

    setLoading(false)

    if (error) {
      setError('Could not save agreement. Try again.')
    } else {
      navigate('/role-selection')
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '2rem',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <div className="card">
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '2rem',
          textAlign: 'center',
          color: '#023d21'
        }}>
          📜 The Pact Rules
        </h2>

        <div style={{ 
          maxHeight: '400px', 
          overflowY: 'auto', 
          marginBottom: '2rem',
          padding: '1rem',
          border: '1px solid #d6d6d6',
          borderRadius: '0.5rem'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            📋 The Pact Rules
          </h3>
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '0.5rem' }}>1. Respect the Pact - Honor all terms of the Pact: amount, Trust Fee, Payback Day, and payment method.</p>
            <p style={{ marginBottom: '0.5rem' }}>2. Cold Hard Cash is untouchable - Reserved amounts can't be loaned, even if idle.</p>
            <p style={{ marginBottom: '0.5rem' }}>3. No Chat, Just Clarity - No in-app chat. Use Ping/Pact adjustments only.</p>
            <p style={{ marginBottom: '0.5rem' }}>4. One Ping, One Pact - Reuse not allowed. New Ping for every new attempt.</p>
            <p style={{ marginBottom: '0.5rem' }}>5. Trust Fee is non-negotiable after Pact - Fixed once agreed. No edits.</p>
            <p style={{ marginBottom: '0.5rem' }}>6. Early is excellent - No penalty. Builds reputation.</p>
            <p style={{ marginBottom: '0.5rem' }}>7. Delay has consequences - Cred Meter drops, tags like Overdue or Ghost may apply.</p>
            <p style={{ marginBottom: '0.5rem' }}>8. Raise a Red if needed - Report bad behavior, but misuse is reviewed.</p>
            <p style={{ marginBottom: '0.5rem' }}>9. Verified means Verified - Real ID is mandatory. Fakes = ban.</p>
            <p style={{ marginBottom: '0.5rem' }}>10. One Account per Person - No clones or alternate profiles.</p>
            <p style={{ marginBottom: '0.5rem' }}>11. Roles can shift, not abuse - Be both Seeker/Stacker, but not in same Pact.</p>
            <p style={{ marginBottom: '0.5rem' }}>12. Reputation travels with you - Tags and Cred visible to others.</p>
            <p style={{ marginBottom: '0.5rem' }}>13. Admin decisions are final - In disputes or repeated flags, their word is law.</p>
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            🧯 The Drop Rules
          </h3>
          <div>
            <p style={{ marginBottom: '0.5rem' }}>1. A Drop is not a failure - A Ping that didn't work out. No default penalty.</p>
            <p style={{ marginBottom: '0.5rem' }}>2. Seeker cannot spam Pings - Too many in one day = cooldown.</p>
            <p style={{ marginBottom: '0.5rem' }}>3. Stackers must decline, not ghost - Ignoring = reduced Trustworthy tag.</p>
            <p style={{ marginBottom: '0.5rem' }}>4. Dropped Pings get auto-expired - After 48 hours of no reply.</p>
            <p style={{ marginBottom: '0.5rem' }}>5. Too many Drops affect visibility - Low Settled ratio = lower exposure.</p>
            <p style={{ marginBottom: '0.5rem' }}>6. Adjustments count as interaction - Attempts to adjust ≠ ghosting.</p>
            <p style={{ marginBottom: '0.5rem' }}>7. Re-Ping responsibly - Don't repost the same Ping too often.</p>
            <p style={{ marginBottom: '0.5rem' }}>8. Missed Match ≠ Burned Bridge - You can still match again later.</p>
            <p style={{ marginBottom: '0.5rem' }}>9. Flag abuse of Drops - Repeated unfair rejection? Report.</p>
            <p style={{ marginBottom: '0.5rem' }}>10. Final word = platform logs - All actions are logged as Ledger Lines.</p>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '1rem',
          gap: '0.5rem'
        }}>
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            style={{ transform: 'scale(1.2)' }}
          />
          <label htmlFor="agree" style={{ fontSize: '1rem' }}>
            I have read and agree to all the rules
          </label>
        </div>

        {error && <div className="error">{error}</div>}

        <button
          onClick={handleAgree}
          disabled={!agree || loading}
          className="btn btn-primary"
          style={{ 
            width: '100%',
            opacity: !agree ? 0.5 : 1,
            cursor: !agree ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Processing...' : 'Agree & Continue'}
        </button>
      </div>
    </div>
  )
}