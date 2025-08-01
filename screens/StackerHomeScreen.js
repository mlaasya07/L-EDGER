// screens/StackerHomeScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function StackerHomeScreen({ navigation }) {
  const [pings, setPings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pings')
      .select('*')
      .eq('status', 'pending');

    if (error) {
      console.log('Error fetching pings:', error);
    } else {
      setPings(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPings();
  }, []);

  const renderPing = ({ item }) => (
    <TouchableOpacity
      style={styles.pingCard}
      onPress={() => navigation.navigate('PingDetail', { ping: item })}
    >
      <Text style={styles.pingAmount}>₹{item.amount}</Text>
      <Text style={styles.pingMeta}>
        From: {item.seeker_name} | Fee: ₹{item.trust_fee} | Payback in {item.days_to_repay} days
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📬 Active Pings</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <FlatList
          data={pings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPing}
          contentContainerStyle={styles.pingList}
        />
      )}
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
  pingList: {
    paddingBottom: 40
  },
  pingCard: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  pingAmount: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  pingMeta: {
    marginTop: 8,
    fontSize: 14,
    color: '#555'
  }
});
