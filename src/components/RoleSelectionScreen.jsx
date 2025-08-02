import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function RoleSelectionScreen({ setRole }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const selectRole = async (role) => {
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.updateUser({
      data: { role }
    })

    setLoading(false)

    if (error) {
      setError('Unable to save your role. Try again.')
    } else {
      setRole(role)
      navigate('/dashboard')
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '2rem'
    }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#023d21'
        }}>
          Choose Your Role
        </h2>
        <p style={{ 
          marginBottom: '2rem',
          color: '#666666'
        }}>
          You can switch roles later, but not within a single transaction.
        </p>

        {error && <div className="error" style={{ marginBottom: '1rem' }}>{error}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={() => selectRole('stacker')}
            disabled={loading}
            className="btn btn-primary"
            style={{ 
              padding: '1.5rem',
              fontSize: '1.125rem',
              backgroundColor: '#4CAF50'
            }}
          >
            📦 I want to Stack (Lend Money)
          </button>

          <button
            onClick={() => selectRole('seeker')}
            disabled={loading}
            className="btn btn-primary"
            style={{ 
              padding: '1.5rem',
              fontSize: '1.125rem',
              backgroundColor: '#2196F3'
            }}
          >
            🔍 I want to Seek (Borrow Money)
          </button>
        </div>

        {loading && (
          <div style={{ marginTop: '1rem' }}>
            <div className="spinner" style={{ margin: '0 auto' }}></div>
          </div>
        )}
      </div>
    </div>
  )
}