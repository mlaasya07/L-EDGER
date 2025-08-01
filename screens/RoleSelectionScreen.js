// screens/RoleSelectionScreen.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function RoleSelectionScreen({ navigation }) {
  const selectRole = async (role) => {
    const { error } = await supabase.auth.updateUser({
      data: { role }
    });

    if (error) {
      Alert.alert('Error', 'Unable to save your role. Try again.');
    } else {
      if (role === 'stacker') {
        navigation.replace('StackerHome');
      } else {
        navigation.replace('SeekerHome');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Your Role</Text>
      <Text style={styles.subtitle}>You can switch roles later, but not within a single transaction.</Text>

      <TouchableOpacity
        style={[styles.roleButton, { backgroundColor: '#4CAF50' }]}
        onPress={() => selectRole('stacker')}
      >
        <Text style={styles.buttonText}>📦 I want to Stack</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roleButton, { backgroundColor: '#2196F3' }]}
        onPress={() => selectRole('seeker')}
      >
        <Text style={styles.buttonText}>🔍 I want to Seek</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 32,
    textAlign: 'center',
    color: '#555'
  },
  roleButton: {
    padding: 18,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: '#fff'
  }
});
