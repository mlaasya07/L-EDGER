// components/LedgerLineCard.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Badge from './Badge';
import { formatDate } from '../utils/formatDate';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../styles/theme';

export default function LedgerLineCard({ item, role }) {
  const navigation = useNavigation();

  const handlePress = () => {
    const screen = item.type === 'Pact' ? 'PactDetail' : 'PingDetail';
    navigation.navigate(screen, { id: item.id });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        backgroundColor: '#fff2c0',
        borderColor: '#023d21',
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#023d21' }}>
          ₹{item.amount}
        </Text>
        <Badge label={item.status} />
      </View>

      <Text style={{ fontSize: 14, color: '#000', marginBottom: 4 }}>
        {role === 'stacker' ? `To: ${item.seeker}` : `From: ${item.stacker}`}
      </Text>

      <Text style={{ fontSize: 12, color: '#555' }}>
        {item.type} | Due: {formatDate(item.dueDate)}
      </Text>
    </TouchableOpacity>
  );
}
