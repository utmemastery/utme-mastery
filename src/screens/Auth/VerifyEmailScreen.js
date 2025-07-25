/*import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import { authApi } from '../../services/api/authApi';
import { strings } from '../../constants/strings';

export default function VerifyEmailCodeScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyCode = async () => {
    if (code.length !== 4) {
      Alert.alert('Invalid Code', 'Please enter the 4-digit code sent to your email.');
      return;
    }

    try {
      setLoading(true);
      await authApi.verifyEmailCode(email, code);
      Alert.alert('Success', 'Email verified successfully.');
      navigation.replace('LoginScreen');
    } catch (error) {
      Alert.alert('Error', error.message || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      setLoading(true);
      await authApi.resendVerificationCode(email);
      Alert.alert('Sent', 'A new verification code has been sent to your email.');
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>
        We've sent a 4-digit code to <Text style={styles.email}>{email}</Text>
      </Text>

      <TextInput
        label="Verification Code"
        value={code}
        onChangeText={setCode}
        mode="outlined"
        keyboardType="number-pad"
        maxLength={4}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleVerifyCode}
        loading={loading}
        disabled={loading || code.length !== 4}
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Verify
      </Button>

      <Button
        mode="text"
        onPress={handleResendCode}
        disabled={loading}
        labelStyle={styles.resendText}
        style={styles.resendButton}
      >
        Resend Code
      </Button>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    padding: SIZES.padding * 1.5,
  },
  title: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  subtitle: {
    fontSize: SIZES.body,
    fontFamily: FONTS.regular,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  email: {
    fontFamily: FONTS.medium,
    color: COLORS.text,
  },
  input: {
    marginVertical: SIZES.margin,
  },
  button: {
    marginTop: SIZES.margin,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  buttonText: {
    fontSize: SIZES.body,
    color: COLORS.white,
    fontFamily: FONTS.medium,
  },
  resendButton: {
    marginTop: SIZES.margin,
  },
  resendText: {
    color: COLORS.primary,
    fontFamily: FONTS.medium,
    fontSize: SIZES.body,
  },
});*/
