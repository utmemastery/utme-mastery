import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/onboarding/SplashScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import AuthScreen from '../screens/onboarding/AuthScreen';
import PersonalizationScreen from '../screens/onboarding/PersonalizationScreen';
import PermissionsScreen from '../screens/onboarding/PermissionsScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator({ onFinish }) {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Personalization" component={PersonalizationScreen} />
      <Stack.Screen 
        name="Permissions" 
        component={PermissionsScreen}
        initialParams={{ onFinish }}
      />
    </Stack.Navigator>
  );
} 