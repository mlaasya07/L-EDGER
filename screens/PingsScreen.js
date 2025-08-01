// screens/PingsScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import { supabase } from '../lib/supabase';
import { useNavigation } from '@react-navigation/native';

export default function PingsScreen() {
  const [pings, setPings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPings = async () => {
      setLoading(true);
      const {
        data: { user }
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('pings')
        .select('*')
        .eq('status', 'pending')
        .neq('seeker_id', user.id)
        .order('created_at', { ascending: false });

      if (!error) setPings(data || []);
      setLoading(false);
    };

    fetchPings();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('PingDetail', { pingId: item.id })}
    >
      <Text style={styles.amount}>₹{item.amount}</Text>
      <Text style={styles.fee}>Trust Fee: ₹{item.trust_fee}</Text>
      <Text style={styles.reason}>{item.reason}</Text>
      <Text style={styles.time}>{new Date(item.created_at).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : pings.length === 0 ? (
        <Text style={styles.empty}>No active Pings right now.</Text>
      ) : (
        <FlatList
          data={pings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  list: {
    paddingBottom: 40
  },
  card: {
    backgroundColor: '#f3f3f3',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  fee: {
    marginTop: 4,
    fontSize: 14,
    color: '#333'
  },
  reason: {
    marginTop: 8,
    fontSize: 14,
    color: '#666'
  },
  time: {
    marginTop: 6,
    fontSize: 12,
    color: '#aaa'
  },
  empty: {
    marginTop: 40,
    textAlign: 'center',
    color: '#888'
  }
});