// components/Header.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

export default function Header({ title, showBack = true }) {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
      }}
    >
      {showBack && (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <Text
        style={{
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
          marginLeft: showBack ? 12 : 0,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
