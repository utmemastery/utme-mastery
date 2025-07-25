import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  AccessibilityInfo,
} from 'react-native';
import { Text, TextInput, ActivityIndicator, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useRoute } from '@react-navigation/native';

import PrimaryButton from '../../components/PrimaryButton';
import { AuthContext } from '../../context/AuthContext';
import { authApi } from '../../services/api/authApi';
import { strings } from '../../constants/strings';

export default function ResetPasswordConfirmScreen({ navigation }) {
  const theme = useTheme();
  const { colors } = theme;
  const { fonts } = theme;

  const route = useRoute();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('input'); // input | loading | success | error
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const shake = useSharedValue(0);

  const validatePassword = (password) => {
    const length = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const score = (length ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0);
    return {
      isValid: score >= 2,
      strength: score === 3 ? 'Strong' : score === 2 ? 'Medium' : 'Weak',
    };
  };

  const { strength } = validatePassword(newPassword);

  const handleReset = async () => {
    if (!newPassword || !confirmPassword) {
      setError(strings.errors.emptyFields);
      return;
    }

    const { isValid } = validatePassword(newPassword);
    if (!isValid) {
      setError(strings.errors.weakPassword);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(strings.errors.passwordsMismatch);
      return;
    }

    setError('');
    setStatus('loading');

    try {
      const { token } = route.params || {};
      if (!token) {
        throw new Error(strings.errors.invalidToken);
      }

      await authApi.resetPasswordConfirm(token, newPassword);
      setStatus('success');
      setMessage(strings.resetPassword.success);
    } catch (err) {
      setStatus('error');
      setError(err.message || strings.errors.resetPasswordFailed);
    }
  };

  useEffect(() => {
    if (error) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      AccessibilityInfo.announceForAccessibility(error);
      shake.value = withSequence(
        withTiming(10, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error]);

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const motivationalQuote =
    strings.motivationalQuotes[
      Math.floor(Math.random() * strings.motivationalQuotes.length)
    ];

  return (
    <LinearGradient colors={[colors.background, colors.primary]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.flex}
      >
        <Animated.View style={[styles.content, shakeStyle]}>
          <Text style={[styles.title, { color: colors.white, fontFamily: fonts.medium.fontFamily }]}>
            {strings.resetPassword.title}
          </Text>
          <Text style={[styles.subtitle, { color: colors.white, fontFamily: fonts.regular.fontFamily }]}>
            {strings.resetPassword.subtitle}
          </Text>
          <Text style={[styles.quote, { color: colors.white, fontFamily: fonts.italic.fontFamily }]}>
            {motivationalQuote}
          </Text>

          {(status === 'input' || status === 'error') && (
            <>
              <TextInput
                mode="outlined"
                placeholder={strings.signup.passwordPlaceholder}
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  const { isValid } = validatePassword(text);
                  setError(isValid || !text ? '' : strings.errors.weakPassword);
                }}
                style={styles.input}
                secureTextEntry
                error={!!error && newPassword.length > 0}
                accessibilityLabel="New password input"
              />
              <Text style={[styles.strength, { color: colors.white }]}>
                Password Strength: {strength}
              </Text>

              <TextInput
                mode="outlined"
                placeholder={strings.signup.confirmPasswordPlaceholder}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setError(newPassword === text || !text ? '' : strings.errors.passwordsMismatch);
                }}
                style={styles.input}
                secureTextEntry
                error={!!error && confirmPassword.length > 0}
                accessibilityLabel="Confirm password input"
              />

              {error ? (
                <Text style={[styles.error, { color: colors.error, fontFamily: fonts.medium.fontFamily }]}>
                  {error}
                </Text>
              ) : null}

              <PrimaryButton
                style={styles.button}
                onPress={handleReset}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  strings.resetPassword.button
                )}
              </PrimaryButton>
            </>
          )}

          {status === 'success' && (
            <>
              <Text style={[styles.message, { color: colors.white, fontFamily: fonts.regular.fontFamily }]}>
                {message}
              </Text>
              <PrimaryButton
                style={styles.button}
                onPress={() => navigation.replace('LoginScreen')}
              >
                {strings.verifyEmail.button}
              </PrimaryButton>
            </>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.9,
  },
  quote: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
    opacity: 0.8,
    paddingHorizontal: 12,
  },
  input: {
    width: '100%',
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  strength: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 8,
    opacity: 0.9,
  },
  error: {
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
  },
  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 8,
  },
});
