import React from 'react'
import { Link } from 'react-router-dom'

export default function WelcomeScreen() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <div className="card" style={{ maxWidth: '500px', width: '100%' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#023d21'
        }}>
          L-EDGER
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          marginBottom: '2rem',
          color: '#666666'
        }}>
          Peer-to-peer micro-lending for college students
        </p>
        <p style={{ 
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Connect with verified students to lend or borrow small amounts with full transparency and accountability.
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '1rem',
          flexDirection: 'column'
        }}>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  )
}