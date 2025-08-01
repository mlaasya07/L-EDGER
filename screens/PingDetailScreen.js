// screens/PingDetailScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function PingDetailScreen({ route, navigation }) {
  const { ping } = route.params;

  const handleResponse = async (response) => {
    const { error } = await supabase
      .from('pings')
      .update({ status: response })
      .eq('id', ping.id);

    if (error) {
      Alert.alert('Error', 'Could not update status. Try again.');
    } else {
      Alert.alert(
        'Success',
        response === 'accepted' ? 'Ping accepted. Pact formed.' : 'Ping declined.'
      );
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Ping Details</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Seeker:</Text>
        <Text style={styles.value}>{ping.seeker_name}</Text>

        <Text style={styles.label}>Amount:</Text>
        <Text style={styles.value}>₹{ping.amount}</Text>

        <Text style={styles.label}>Trust Fee:</Text>
        <Text style={styles.value}>₹{ping.trust_fee}</Text>

        <Text style={styles.label}>Days to Repay:</Text>
        <Text style={styles.value}>{ping.days_to_repay} days</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#2ecc71' }]}
        onPress={() => handleResponse('accepted')}
      >
        <Text style={styles.buttonText}>Accept Ping</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#e74c3c' }]}
        onPress={() => handleResponse('declined')}
      >
        <Text style={styles.buttonText}>Decline Ping</Text>
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
  card: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 30
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    color: '#333'
  },
  value: {
    fontSize: 16,
    marginBottom: 12
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
