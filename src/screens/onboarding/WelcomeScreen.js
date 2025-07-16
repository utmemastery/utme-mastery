import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>UTME</Text>
        <Text style={styles.tagline}>Mastery</Text>
      </View>
      
      <View style={styles.content}>
        <Text variant="headlineLarge" style={styles.title}>
          Welcome to UTME Mastery!
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Your journey to exam excellence starts here. 
          Master the UTME with evidence-based learning and smart practice.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          style={styles.button} 
          onPress={() => navigation.navigate('Auth')}
        >
          Get Started
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#0057FF',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFB300',
    marginTop: 4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#757575',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  button: {
    borderRadius: 12,
    height: 56,
  },
}); 