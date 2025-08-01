// screens/PactDetail.js

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import Header from '../components/Header';
import formatDate from '../utils/formatDate';
import { tagMapper } from '../utils/tagMapper';
import { Badge } from '../components/Badge';
import { useUserStore } from '../state/userStore';
import { theme } from '../styles/theme';

export default function PactDetail() {
  const route = useRoute();
  const { pactId } = route.params;
  const [pact, setPact] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useUserStore(state => state.user);

  useEffect(() => {
    const fetchPact = async () => {
      const { data, error } = await supabase
        .from('pacts')
        .select('*')
        .eq('id', pactId)
        .single();

      if (!error) setPact(data);
      setLoading(false);
    };

    fetchPact();
  }, [pactId]);

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;

  if (!pact) return <Text style={{ textAlign: 'center' }}>Pact not found.</Text>;

  const isStacker = user.id === pact.stacker_id;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Header title="Pact Details" />
      <View style={{ marginVertical: 16 }}>
        <Text style={theme.text.label}>Amount</Text>
        <Text style={theme.text.value}>₹{pact.amount}</Text>

        <Text style={theme.text.label}>Trust Fee</Text>
        <Text style={theme.text.value}>{pact.trust_fee}%</Text>

        <Text style={theme.text.label}>Payback Date</Text>
        <Text style={theme.text.value}>{formatDate(pact.payback_date)}</Text>

        <Text style={theme.text.label}>Status</Text>
        <Badge label={tagMapper(pact.status)} />

        <Text style={theme.text.label}>Your Role</Text>
        <Text style={theme.text.value}>{isStacker ? 'Stacker' : 'Seeker'}</Text>

        <Text style={theme.text.label}>Notes</Text>
        <Text style={theme.text.value}>{pact.notes || 'No notes provided.'}</Text>
      </View>
    </ScrollView>
  );
}
