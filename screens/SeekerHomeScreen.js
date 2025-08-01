// screens/SeekerHomeScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function SeekerHomeScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [fee, setFee] = useState('');
  const [days, setDays] = useState('');

  const handlePing = async () => {
    if (!amount || !fee || !days) {
      Alert.alert('Incomplete', 'Fill all fields before submitting a Ping.');
      return;
    }

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError || !user.user) {
      Alert.alert('Error', 'Could not fetch user. Try again.');
      return;
    }

    const { error } = await supabase.from('pings').insert([
      {
        seeker_id: user.user.id,
        seeker_name: user.user.user_metadata.full_name || 'Unknown',
        amount: parseInt(amount),
        trust_fee: parseInt(fee),
        days_to_repay: parseInt(days),
        status: 'pending'
      }
    ]);

    if (error) {
      Alert.alert('Error', 'Ping could not be submitted.');
    } else {
      Alert.alert('Success', 'Ping submitted successfully.');
      setAmount('');
      setFee('');
      setDays('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📡 Create a Ping</Text>

      <TextInput
        style={styles.input}
        placeholder="Loan Amount (₹)"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Trust Fee (₹)"
        keyboardType="numeric"
        value={fee}
        onChangeText={setFee}
      />
      <TextInput
        style={styles.input}
        placeholder="Days to Repay"
        keyboardType="numeric"
        value={days}
        onChangeText={setDays}
      />

      <TouchableOpacity style={styles.button} onPress={handlePing}>
        <Text style={styles.buttonText}>Submit Ping</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16
  },
  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
