import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    // TODO: Implement real authentication
    console.log('Auth:', { isLogin, email, password, name });
    navigation.navigate('Personalization');
  };

  const handleGuestMode = () => {
    // TODO: Handle guest mode
    navigation.navigate('Personalization');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>UTME</Text>
        <Text style={styles.tagline}>Mastery</Text>
      </View>

      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {isLogin ? 'Welcome Back!' : 'Create Account'}
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {isLogin 
            ? 'Sign in to continue your learning journey'
            : 'Join thousands of students mastering UTME'
          }
        </Text>

        <View style={styles.form}>
          {!isLogin && (
            <TextInput
              label="Full Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
              autoCapitalize="words"
            />
          )}
          
          <TextInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            style={styles.input}
            secureTextEntry
          />

          <PrimaryButton 
            style={styles.submitButton} 
            onPress={handleSubmit}
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </PrimaryButton>
        </View>

        <View style={styles.dividerContainer}>
          <Divider style={styles.divider} />
          <Text style={styles.dividerText}>or</Text>
          <Divider style={styles.divider} />
        </View>

        <View style={styles.socialButtons}>
          <Button 
            mode="outlined" 
            style={styles.socialButton}
            onPress={handleSubmit}
          >
            Continue with Google
          </Button>
          
          <Button 
            mode="outlined" 
            style={styles.socialButton}
            onPress={handleSubmit}
          >
            Continue with Apple
          </Button>
        </View>

        <Button 
          mode="text" 
          style={styles.guestButton}
          onPress={handleGuestMode}
        >
          Continue as Guest
        </Button>
      </View>

      <View style={styles.footer}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
        </Text>
        <Button 
          mode="text" 
          onPress={() => setIsLogin(!isLogin)}
          style={styles.switchButton}
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0057FF',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFB300',
    marginTop: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#757575',
    marginBottom: 32,
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 12,
    height: 56,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  divider: {
    flex: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#757575',
  },
  socialButtons: {
    marginBottom: 16,
  },
  socialButton: {
    marginBottom: 12,
    borderRadius: 12,
    height: 48,
  },
  guestButton: {
    marginBottom: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  switchText: {
    color: '#757575',
  },
  switchButton: {
    marginLeft: 4,
  },
}); 