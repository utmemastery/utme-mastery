import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export default function AnalyticsScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Analytics</Text>
      <Text variant="bodyLarge">Track your progress and performance here.</Text>
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