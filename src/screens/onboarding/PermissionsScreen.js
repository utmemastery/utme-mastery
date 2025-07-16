import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import PrimaryButton from '../../components/PrimaryButton';

export default function PermissionsScreen({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [granted, setGranted] = useState(null);
  const { onFinish } = route.params || {};

  const requestPermission = async () => {
    setLoading(true);
    try {
      let status;
      if (Platform.OS === 'web') {
        status = 'granted'; // Web fallback
      } else {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        status = existingStatus;
        if (existingStatus !== 'granted') {
          const { status: newStatus } = await Notifications.requestPermissionsAsync();
          status = newStatus;
        }
      }
      setGranted(status === 'granted');
    } catch (e) {
      setGranted(false);
    }
    setLoading(false);
  };

  const handleFinish = () => {
    // In a real app, save onboarding completion and user preferences
    console.log('Onboarding completed!');
    
    // Trigger the onboarding completion callback
    if (onFinish) {
      onFinish();
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Enable Notifications</Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Stay on track with reminders and updates. You can change this later in settings.
      </Text>
      <PrimaryButton
        style={styles.button}
        onPress={requestPermission}
        disabled={loading || granted === true}
      >
        {loading ? 'Requesting...' : granted === true ? 'Permission Granted' : 'Enable Notifications'}
      </PrimaryButton>
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      {granted === false && (
        <Text style={styles.errorText}>
          Permission denied. You can enable notifications later in settings.
        </Text>
      )}
      <Button
        mode="text"
        style={styles.skipButton}
        onPress={handleFinish}
      >
        {granted === true ? 'Finish' : 'Skip for now'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F9FC',
    padding: 24,
  },
  title: {
    marginBottom: 12,
    textAlign: 'center',
    color: '#1A1A1A',
  },
  subtitle: {
    marginBottom: 32,
    textAlign: 'center',
    color: '#757575',
  },
  button: {
    borderRadius: 8,
    width: '100%',
    maxWidth: 300,
  },
  skipButton: {
    marginTop: 24,
  },
  errorText: {
    color: '#D32F2F',
    marginTop: 16,
    textAlign: 'center',
  },
}); 