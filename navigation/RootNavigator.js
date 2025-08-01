// navigation/RootNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import RulesAgreementScreen from '../screens/RulesAgreementScreen';
import DashboardStacker from '../screens/DashboardStacker';
import DashboardSeeker from '../screens/DashboardSeeker';
import CreatePing from '../screens/CreatePing';
import PingDetail from '../screens/PingDetail';
import PactDetail from '../screens/PactDetail';
import ProfileScreen from '../screens/ProfileScreen';
import RedFlagScreen from '../screens/RedFlagScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="RulesAgreement" component={RulesAgreementScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
        <Stack.Screen name="DashboardStacker" component={DashboardStacker} />
        <Stack.Screen name="DashboardSeeker" component={DashboardSeeker} />
        <Stack.Screen name="CreatePing" component={CreatePing} />
        <Stack.Screen name="PingDetail" component={PingDetail} />
        <Stack.Screen name="PactDetail" component={PactDetail} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="RedFlag" component={RedFlagScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
