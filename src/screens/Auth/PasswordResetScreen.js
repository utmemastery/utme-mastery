import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReset = () => {
    if (!email.trim()) {
      setError('Please enter your email.');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('If an account exists for this email, a reset link has been sent.');
    // TODO: Implement real password reset logic
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a password reset link</Text>
      <TextInput
        mode="outlined"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <PrimaryButton style={styles.button} onPress={handleReset}>
        Send Reset Link
      </PrimaryButton>
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
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
  success: {
    color: COLORS.success,
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
    marginTop: SIZES.margin,
  },
});
