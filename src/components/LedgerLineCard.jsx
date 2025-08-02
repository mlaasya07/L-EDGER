import React from 'react'
import { useNavigate } from 'react-router-dom'
import Badge from './Badge'
import { formatDate } from '../utils/formatDate'

export default function LedgerLineCard({ item, role }) {
  const navigate = useNavigate()

  const handlePress = () => {
    const route = item.type === 'Pact' ? `/pact/${item.id}` : `/ping/${item.id}`
    navigate(route)
  }

  return (
    <div
      onClick={handlePress}
      className="card"
      style={{
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        marginBottom: '1rem'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#023d21' }}>
          ₹{item.amount}
        </span>
        <Badge label={item.status} />
      </div>

      <p style={{ fontSize: '0.875rem', color: '#000', marginBottom: '0.5rem' }}>
        {role === 'stacker' ? `To: ${item.seeker}` : `From: ${item.stacker}`}
      </p>

      <p style={{ fontSize: '0.75rem', color: '#666666' }}>
        {item.type} | Due: {formatDate(item.dueDate)}
      </p>
    </div>
  )
}