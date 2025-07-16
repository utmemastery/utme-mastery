import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Settings</Text>
      <Text variant="bodyLarge">Manage your preferences and app settings here.</Text>
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
    marginBottom: 16,
    textAlign: 'center',
    color: '#1A1A1A',
  },
}); 