// src/screens/auth/PasswordResetScreen.js

import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  AccessibilityInfo,
} from 'react-native';
import { Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import PrimaryButton from '../../components/PrimaryButton';
import CustomModal from '../../components/CustomModal';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { strings } from '../../constants/strings';

export default function PasswordResetScreen({ navigation }) {
  const { resetPassword } = useContext(AuthContext);
  const { COLORS, FONTS, SIZES } = useContext(ThemeContext);

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const shake = useSharedValue(0);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleReset = async () => {
    if (!email.trim()) {
      setError(strings.errors.emptyFields);
      return;
    }
    if (!validateEmail(email)) {
      setError(strings.errors.invalidEmail);
      return;
    }

    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setModalVisible(true);
    } catch (err) {
      setError(err.message || strings.errors.resetPasswordFailed);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    navigation.navigate('LoginScreen');
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
    <LinearGradient
    colors={[COLORS.primaryDark, COLORS.success]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.flex}
      >
        <Animated.View style={[styles.content, shakeStyle]}>
          <Text style={[styles.title, { color: COLORS.white, fontFamily: FONTS.bold, fontSize: SIZES.h2 }]}>
            {strings.passwordReset.title}
          </Text>
          <Text style={[styles.subtitle, { color: COLORS.white, fontFamily: FONTS.regular }]}>
            {strings.passwordReset.subtitle}
          </Text>
          <Text style={[styles.quote, { color: COLORS.white, fontFamily: FONTS.italic }]}>
            {motivationalQuote}
          </Text>

          <TextInput
            mode="outlined"
            placeholder={strings.passwordReset.emailPlaceholder}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(validateEmail(text) || !text ? '' : strings.errors.invalidEmail);
            }}
            style={[styles.input, { backgroundColor: COLORS.surface }]}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!error && email.length > 0}
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address to receive a password reset link"
          />

          {error ? (
            <Text style={[styles.error, { color: COLORS.danger, fontFamily: FONTS.medium }]}>
              {error}
            </Text>
          ) : null}

          <PrimaryButton
            style={styles.button}
            onPress={handleReset}
            disabled={loading}
            accessibilityLabel="Send reset link button"
            accessibilityHint="Press to send a password reset link to your email"
          >
            {loading ? <ActivityIndicator color={COLORS.white} /> : strings.passwordReset.button}
          </PrimaryButton>

          <TouchableOpacity
            onPress={() => navigation.navigate('LoginScreen')}
            accessibilityLabel="Back to login link"
            accessibilityHint="Press to return to the login screen"
          >
            <Text style={[styles.link, { color: COLORS.primary, fontFamily: FONTS.medium }]}>
              {strings.passwordReset.backToLogin}
            </Text>
          </TouchableOpacity>

          <CustomModal
            visible={modalVisible}
            onClose={handleModalClose}
            title="📬 Reset Link Sent"
            message={strings.passwordReset.success}
            buttonText="Back to Login"
            accessibilityLabel="Reset link confirmation modal"
            accessibilityHint="Confirms that a password reset link was sent to your email"
          />
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
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
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
    paddingHorizontal: 8,
    opacity: 0.8,
  },
  input: {
    width: '100%',
    marginBottom: 12,
    fontSize: 14,
    borderRadius: 10,
    elevation: 2,
  },
  button: {
    marginTop: 12,
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
  },
  error: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 8,
  },
  link: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 20,
  },
});
