// App.js

import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import RoleSelectionScreen from './screens/RoleSelectionScreen';
import DashboardStacker from './screens/DashboardStacker';
import DashboardSeeker from './screens/DashboardSeeker';
import CreatePing from './screens/CreatePing';
import PingDetail from './screens/PingDetail';
import PactDetail from './screens/PactDetail';
import ProfileScreen from './screens/ProfileScreen';
import RulesAgreementScreen from './screens/RulesAgreementScreen'; // NEW

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [userMetadata, setUserMetadata] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const fetchUserMetadata = async () => {
      if (session?.user) {
        const { data, error } = await supabase.auth.getUser();
        if (data?.user) {
          setUserMetadata(data.user.user_metadata);
        }
      }
    };

    if (session) fetchUserMetadata();
  }, [session]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        ) : userMetadata?.rulesAccepted !== true ? (
          <Stack.Screen name="RulesAgreement">
            {(props) => <RulesAgreementScreen {...props} />}
          </Stack.Screen>
        ) : !role ? (
          <Stack.Screen name="RoleSelection">
            {(props) => <RoleSelectionScreen {...props} setRole={setRole} />}
          </Stack.Screen>
        ) : role === 'stacker' ? (
          <>
            <Stack.Screen name="DashboardStacker" component={DashboardStacker} />
            <Stack.Screen name="PingDetail" component={PingDetail} />
            <Stack.Screen name="PactDetail" component={PactDetail} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="DashboardSeeker" component={DashboardSeeker} />
            <Stack.Screen name="CreatePing" component={CreatePing} />
            <Stack.Screen name="PingDetail" component={PingDetail} />
            <Stack.Screen name="PactDetail" component={PactDetail} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
