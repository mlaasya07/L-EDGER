const tagMap = {
  emergency: {
    label: 'Emergency',
    color: '#ff4d4d',
    icon: 'alert-circle',
  },
  hospital: {
    label: 'Hospital',
    color: '#cc99ff',
    icon: 'stethoscope',
  },
  misc: {
    label: 'Misc',
    color: '#cccccc',
    icon: 'more-horizontal',
  },
  books: {
    label: 'Books',
    color: '#3399ff',
    icon: 'book-open',
  },
  travel: {
    label: 'Travel',
    color: '#00b894',
    icon: 'navigation',
  },
  food: {
    label: 'Food',
    color: '#ffb347',
    icon: 'utensils',
  },
  other: {
    label: 'Other',
    color: '#999999',
    icon: 'circle',
  },
}

export const mapTag = (tagKey) => {
  return tagMap[tagKey] || {
    label: 'Unknown',
    color: '#aaaaaa',
    icon: 'help-circle',
  }
}

export const getAllTagOptions = () => {
  return Object.entries(tagMap).map(([key, { label, color, icon }]) => ({
    key,
    label,
    color,
    icon,
  }))
}