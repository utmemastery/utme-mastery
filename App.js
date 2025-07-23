import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import { THEMES } from './src/constants/theme';

export default function App() {
  // For development/testing: always show onboarding flow first
  // In production, use state/context to skip onboarding if already completed
  return (
    <PaperProvider theme={THEMES.light}>
      <NavigationContainer>
      <AppNavigator />
        {/* To test Auth flow, use: <AuthNavigator /> */}
        {/* To test main app, use: <AppNavigator /> */}
      </NavigationContainer>
    </PaperProvider>
  );
}
