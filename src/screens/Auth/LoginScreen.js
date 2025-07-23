import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setError('');
    // TODO: Implement real authentication logic
    navigation.replace('Onboarding');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>
      <TextInput
        mode="outlined"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        mode="outlined"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton style={styles.button} onPress={handleLogin}>
        Login
      </PrimaryButton>
      <TouchableOpacity onPress={() => navigation.navigate('PasswordResetScreen')}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={styles.signupRow}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: SIZES.h2,
    textAlign: 'center',
    marginBottom: SIZES.margin / 2,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  input: {
    width: '100%',
    marginBottom: SIZES.margin / 2,
    backgroundColor: COLORS.surface,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
  },
  button: {
    width: '100%',
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
  },
  error: {
    color: COLORS.danger,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  link: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body,
    textAlign: 'center',
    marginTop: SIZES.small,
    marginBottom: SIZES.margin,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  signupText: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
    marginRight: 4,
  },
  signupLink: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body,
  },
});
