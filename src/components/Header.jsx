import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Header({ title, showBack = false }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header style={{
      backgroundColor: '#023d21',
      color: 'white',
      padding: '1rem 0',
      borderBottom: '1px solid #034d29'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {showBack && (
            <button 
              onClick={() => navigate(-1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ←
            </button>
          )}
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {title || 'L-EDGER'}
          </h1>
        </div>
        
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link 
            to="/dashboard" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#034d29'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Dashboard
          </Link>
          <Link 
            to="/profile" 
            style={{ 
              color: 'white', 
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#034d29'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: '1px solid white',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'white'
              e.target.style.color = '#023d21'
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = 'white'
            }}
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  )
}