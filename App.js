import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingNavigator from './src/navigation/OnboardingNavigator';
import theme from './src/constants/theme';

export default function App() {
  // Simulate onboarding completion (replace with real logic later)
  const [onboarded, setOnboarded] = useState(false);

  // Listen for onboarding finish (simulate with PermissionsScreen's navigation.replace('Main'))
  // In a real app, use context or global state
  const handleOnboardingFinish = () => {
    console.log('Onboarding finished, switching to main app');
    setOnboarded(true);
  };

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        {onboarded ? (
          <AppNavigator />
        ) : (
          <OnboardingNavigator onFinish={handleOnboardingFinish} />
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}
