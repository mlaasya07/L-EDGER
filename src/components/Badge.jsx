import React from 'react'

const tagColors = {
  Settled: '#023d21',
  Overdue: '#d32f2f',
  Trusted: '#388e3c',
  Ghost: '#000000',
  New: '#fff2c0',
  Flagged: '#ff9800',
  pending: '#fff2c0',
  accepted: '#388e3c',
  declined: '#d32f2f'
}

export default function Badge({ label }) {
  const backgroundColor = tagColors[label] || '#cccccc'
  const textColor = backgroundColor === '#fff2c0' ? '#000' : '#fff'

  return (
    <span
      className="badge"
      style={{
        backgroundColor,
        color: textColor,
        border: backgroundColor === '#fff2c0' ? '1px solid #023d21' : 'none'
      }}
    >
      {label}
    </span>
  )
}