// screens/SendPingScreen.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function SendPingScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [trustFee, setTrustFee] = useState('');
  const [reason, setReason] = useState('');
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    const fetchCashLimits = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('profiles')
        .select('total_cash, cold_hard_cash')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        const usable = (data.total_cash || 0) - (data.cold_hard_cash || 0);
        setAvailable(usable);
      }
    };

    fetchCashLimits();
  }, []);

  const handleSendPing = async () => {
    if (!amount || !trustFee || !reason) {
      Alert.alert('Missing Info', 'Please fill all fields.');
      return;
    }

    const numericAmount = parseInt(amount);
    const numericFee = parseInt(trustFee);

    if (isNaN(numericAmount) || isNaN(numericFee)) {
      Alert.alert('Invalid Input', 'Amount and Trust Fee must be numbers.');
      return;
    }

    if (numericAmount > available) {
      Alert.alert('Exceeds Limit', 'You do not have enough available cash to request this.');
      return;
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    const { error } = await supabase.from('pings').insert([
      {
        seeker_id: user.id,
        amount: numericAmount,
        trust_fee: numericFee,
        reason: reason.trim(),
        status: 'pending'
      }
    ]);

    if (error) {
      Alert.alert('Error', 'Failed to send ping. Try again.');
    } else {
      Alert.alert('Sent!', 'Your Ping has been posted.');
      navigation.navigate('SeekerHome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.inner}
      >
        <Text style={styles.label}>How much do you need?</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="₹"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>What Trust Fee are you offering?</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          placeholder="₹"
          value={trustFee}
          onChangeText={setTrustFee}
        />

        <Text style={styles.label}>Why do you need this amount?</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Explain briefly"
          value={reason}
          onChangeText={setReason}
        />

        <Text style={styles.note}>
          Your available amount (after Cold Hard Cash): ₹{available !== null ? available : '...'}
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleSendPing}>
          <Text style={styles.buttonText}>Send Ping</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inner: {
    padding: 20,
    flex: 1
  },
  label: {
    fontSize: 16,
    marginTop: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginTop: 8
  },
  note: {
    marginTop: 10,
    fontSize: 12,
    color: '#666'
  },
  button: {
    marginTop: 30,
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
