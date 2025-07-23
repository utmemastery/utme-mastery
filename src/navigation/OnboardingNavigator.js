import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import PermissionsScreen from '../screens/Onboarding/PermissionsScreen';
import PersonalizationScreen from '../screens/Onboarding/PersonalizationScreen';
import GoalSelectionScreen from '../screens/Onboarding/GoalSelectionScreen';
import SubjectSelectionScreen from '../screens/Onboarding/SubjectSelectionScreen';
import DiagnosticIntroScreen from '../screens/Onboarding/DiagnosticIntroScreen';
import DiagnosticQuizScreen from '../screens/Onboarding/DiagnosticQuizScreen.js';
import ResultFeedbackScreen from '../screens/Onboarding/ResultFeedbackScreen';
import HomeScreen from '../screens/Home/HomeScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      <Stack.Screen name="PersonalizationScreen" component={PersonalizationScreen} />
      <Stack.Screen name="GoalSelectionScreen" component={GoalSelectionScreen} />
      <Stack.Screen name="SubjectSelectionScreen" component={SubjectSelectionScreen} />
      <Stack.Screen name="DiagnosticIntroScreen" component={DiagnosticIntroScreen} />
      <Stack.Screen name="DiagnosticQuizScreen" component={DiagnosticQuizScreen} />
      <Stack.Screen name="ResultFeedbackScreen" component={ResultFeedbackScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}
