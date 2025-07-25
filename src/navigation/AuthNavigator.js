import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import PasswordResetScreen from '../screens/Auth/PasswordResetScreen';
import ResetPasswordConfirmScreen from '../screens/Auth/ResetPasswordConfirmScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
      <Stack.Screen name="ResetPasswordConfirmScreen" component={ResetPasswordConfirmScreen} />
    </Stack.Navigator>
  );
}
