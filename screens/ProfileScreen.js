// screens/ProfileScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../state/userStore';
import Header from '../components/Header';
import { theme } from '../styles/theme';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const user = useUserStore(state => state.user);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error) setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    useUserStore.getState().clearUser();
    navigation.replace('Welcome');
  };

  if (loading) return <ActivityIndicator size="large" color={theme.colors.primary} />;

  if (!profile) return <Text style={{ textAlign: 'center' }}>Profile not found.</Text>;

  return (
    <ScrollView style={{ padding: 16 }}>
      <Header title="Your Profile" />
      <View style={{ marginTop: 20 }}>
        <Text style={theme.text.label}>Name</Text>
        <Text style={theme.text.value}>{profile.full_name}</Text>

        <Text style={theme.text.label}>Email</Text>
        <Text style={theme.text.value}>{profile.email}</Text>

        <Text style={theme.text.label}>Role</Text>
        <Text style={theme.text.value}>{profile.role}</Text>

        <Text style={theme.text.label}>Cred Meter</Text>
        <Text style={theme.text.value}>{profile.cred_meter || 0}</Text>

        <Text style={theme.text.label}>Tags</Text>
        <Text style={theme.text.value}>{(profile.tags || []).join(', ') || 'None'}</Text>

        <TouchableOpacity
          onPress={handleLogout}
          style={{
            backgroundColor: theme.colors.danger,
            padding: 12,
            borderRadius: 10,
            marginTop: 30,
          }}
        >
          <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
