// screens/RulesAgreementScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert
} from 'react-native';
import CheckBox from 'react-native-check-box';
import { supabase } from '../lib/supabase';

export default function RulesAgreementScreen({ navigation }) {
  const [agree, setAgree] = useState(false);

  const handleAgree = async () => {
    if (!agree) {
      Alert.alert('Please confirm', 'You must agree to the rules to continue.');
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: { rulesAccepted: true }
    });

    if (error) {
      Alert.alert('Error', 'Could not save agreement. Try again.');
    } else {
      navigation.replace('RoleSelection');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollBox}>
        <Text style={styles.header}>📜 The Pact Rules</Text>
        <Text style={styles.rule}>1. Respect the Pact - Honor all terms of the Pact: amount, Trust Fee, Payback Day, and payment method.</Text>
        <Text style={styles.rule}>2. Cold Hard Cash is untouchable - Reserved amounts can’t be loaned, even if idle.</Text>
        <Text style={styles.rule}>3. No Chat, Just Clarity - No in-app chat. Use Ping/Pact adjustments only.</Text>
        <Text style={styles.rule}>4. One Ping, One Pact - Reuse not allowed. New Ping for every new attempt.</Text>
        <Text style={styles.rule}>5. Trust Fee is non-negotiable after Pact - Fixed once agreed. No edits.</Text>
        <Text style={styles.rule}>6. Early is excellent - No penalty. Builds reputation.</Text>
        <Text style={styles.rule}>7. Delay has consequences - Cred Meter drops, tags like Overdue or Ghost may apply.</Text>
        <Text style={styles.rule}>8. Raise a Red if needed - Report bad behavior, but misuse is reviewed.</Text>
        <Text style={styles.rule}>9. Verified means Verified - Real ID is mandatory. Fakes = ban.</Text>
        <Text style={styles.rule}>10. One Account per Person - No clones or alternate profiles.</Text>
        <Text style={styles.rule}>11. Roles can shift, not abuse - Be both Seeker/Stacker, but not in same Pact.</Text>
        <Text style={styles.rule}>12. Reputation travels with you - Tags and Cred visible to others.</Text>
        <Text style={styles.rule}>13. Admin decisions are final - In disputes or repeated flags, their word is law.</Text>

        <Text style={styles.header}>🧯 The Drop Rules</Text>
        <Text style={styles.rule}>1. A Drop is not a failure - A Ping that didn’t work out. No default penalty.</Text>
        <Text style={styles.rule}>2. Seeker cannot spam Pings - Too many in one day = cooldown.</Text>
        <Text style={styles.rule}>3. Stackers must decline, not ghost - Ignoring = reduced Trustworthy tag.</Text>
        <Text style={styles.rule}>4. Dropped Pings get auto-expired - After 48 hours of no reply.</Text>
        <Text style={styles.rule}>5. Too many Drops affect visibility - Low Settled ratio = lower exposure.</Text>
        <Text style={styles.rule}>6. Adjustments count as interaction - Attempts to adjust ≠ ghosting.</Text>
        <Text style={styles.rule}>7. Re-Ping responsibly - Don’t repost the same Ping too often.</Text>
        <Text style={styles.rule}>8. Missed Match ≠ Burned Bridge - You can still match again later.</Text>
        <Text style={styles.rule}>9. Flag abuse of Drops - Repeated unfair rejection? Report.</Text>
        <Text style={styles.rule}>10. Final word = platform logs - All actions are logged as Ledger Lines.</Text>
      </ScrollView>

      <View style={styles.agreeBox}>
        <CheckBox
          isChecked={agree}
          onClick={() => setAgree(!agree)}
          rightText="I have read and agree to all the rules"
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !agree && { backgroundColor: '#ccc' }]}
        onPress={handleAgree}
        disabled={!agree}
      >
        <Text style={styles.buttonText}>Agree & Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  scrollBox: {
    marginTop: 20
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12
  },
  rule: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333'
  },
  agreeBox: {
    marginVertical: 16
  },
  button: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
});
