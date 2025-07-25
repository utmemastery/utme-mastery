import React, { useContext } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider, ThemeContext } from './src/context/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { navigationRef } from './src/navigation/NavigationService';
import * as Linking from 'expo-linking';

const linking = {
  prefixes: ['utme-mastery://'],
  config: {
    screens: {
      ResetPasswordConfirmScreen: {
        path: 'reset-password',
      },
    },
  },
};

function RootApp() {
  const { theme } = useContext(ThemeContext);

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <NavigationContainer linking={linking} ref={navigationRef}>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RootApp />
    </ThemeProvider>
  );
}
