// screens/RedFlagScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import { useUserStore } from '../state/userStore';
import { theme } from '../styles/theme';

export default function RedFlagScreen({ route, navigation }) {
  const { reportedUserId } = route.params;
  const reporter = useUserStore(state => state.user);
  const [reason, setReason] = useState('');

  const handleReport = async () => {
    if (!reason.trim()) {
      return Alert.alert('Please enter a reason for reporting.');
    }

    const { error } = await supabase.from('red_flags').insert([
      {
        reporter_id: reporter.id,
        reported_user_id: reportedUserId,
        reason,
      },
    ]);

    if (error) {
      Alert.alert('Error', 'Could not submit report. Try again later.');
    } else {
      Alert.alert('Success', 'User has been flagged.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Header title="Red Flag a User" />
      <View style={{ marginTop: 20 }}>
        <Text style={theme.text.label}>Why are you reporting this user?</Text>
        <TextInput
          placeholder="Describe the issue clearly..."
          value={reason}
          onChangeText={setReason}
          multiline
          numberOfLines={5}
          style={{
            borderColor: theme.colors.border,
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
            textAlignVertical: 'top',
            marginTop: 8,
            backgroundColor: '#fff',
          }}
        />
        <TouchableOpacity
          onPress={handleReport}
          style={{
            backgroundColor: theme.colors.danger,
            padding: 12,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Submit Report</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
