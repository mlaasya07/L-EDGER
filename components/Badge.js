// components/Badge.js

import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../styles/theme';

const tagColors = {
  Settled: '#023d21',
  Overdue: '#d32f2f',
  Trusted: '#388e3c',
  Ghost: '#000000',
  New: '#fff2c0',
  Flagged: '#ff9800',
};

export default function Badge({ label }) {
  const backgroundColor = tagColors[label] || '#ccc';
  const textColor = backgroundColor === '#fff2c0' ? '#000' : '#fff';

  return (
    <View
      style={{
        backgroundColor,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
      }}
    >
      <Text style={{ color: textColor, fontSize: 12, fontWeight: '600' }}>
        {label}
      </Text>
    </View>
  );
}
