import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  AccessibilityInfo,
} from 'react-native';
import {
  Text,
  TextInput,
  ActivityIndicator,
  ProgressBar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import PrimaryButton from '../../components/PrimaryButton';
import {
  COLORS,
  TYPOGRAPHY,
  SIZES,
  SHADOWS,
} from '../../constants/theme';
import { AuthContext } from '../../context/AuthContext';
import { strings } from '../../constants/strings';

export default function SignupScreen({ navigation }) {
  const { signup } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const shake = useSharedValue(0);

  // Validators
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) =>
    /^\+?\d{10,14}$/.test(phone);
  const validatePassword = (password) => {
    const length = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);
    const score =
      (length ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSpecial ? 1 : 0);
    return {
      isValid: score >= 2,
      strength:
        score === 3 ? 'Strong' : score === 2 ? 'Medium' : 'Weak',
    };
  };

  // Step Logic
  const handleNextStep = () => {
    if (!firstName || !lastName || !phoneNumber) {
      triggerError(strings.errors.emptyFields);
      return;
    }
    if (!validatePhone(phoneNumber)) {
      triggerError(strings.errors.invalidPhone);
      return;
    }
    setError('');
    setStep(2);
  };

  const handleSignup = async () => {
    if (!email || !password || !confirm) {
      triggerError(strings.errors.emptyFields);
      return;
    }
    if (!validateEmail(email)) {
      triggerError(strings.errors.invalidEmail);
      return;
    }
    const { isValid } = validatePassword(password);
    if (!isValid) {
      triggerError(strings.errors.weakPassword);
      return;
    }
    if (password !== confirm) {
      triggerError(strings.errors.passwordsMismatch);
      return;
    }

    setError('');
    setLoading(true);
    try {
      await signup(firstName, lastName, phoneNumber, email, password);
      navigation.replace('Onboarding');
    } catch (err) {
      triggerError(err.message || strings.errors.signupFailed);
    } finally {
      setLoading(false);
    }
  };

  // Feedback & Animation
  const triggerError = (msg) => {
    setError(msg);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    AccessibilityInfo.announceForAccessibility(msg);
    shake.value = withSequence(
      withTiming(10, { duration: 50 }),
      withTiming(-10, { duration: 50 }),
      withTiming(0, { duration: 50 })
    );
  };

  const shakeStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  const { strength } = validatePassword(password);
  const motivationalQuote =
    strings.motivationalQuotes[
      Math.floor(Math.random() * strings.motivationalQuotes.length)
    ];

  return (
    <LinearGradient
      colors={[COLORS.primaryDark, COLORS.success]}
      style={styles.container}
    >
      <StatusBar translucent barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.flex}
      >
        <Animated.View style={[styles.content, shakeStyle]}>
          <Text style={[styles.title, TYPOGRAPHY.heading2]}>
            {strings.signup.title}
          </Text>
          <Text style={[styles.subtitle, TYPOGRAPHY.body]}>
            {strings.signup.subtitle}
          </Text>

          <ProgressBar
            progress={step === 1 ? 0.5 : 1}
            color={COLORS.primary}
            style={styles.progress}
          />

          <Text style={[styles.quote, TYPOGRAPHY.bodySmall]}>
            {motivationalQuote}
          </Text>

          {step === 1 ? (
            <>
              <TextInput
                mode="outlined"
                placeholder={strings.signup.firstNamePlaceholder}
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                style={styles.input}
                accessibilityLabel="First name"
              />
              <TextInput
                mode="outlined"
                placeholder={strings.signup.lastNamePlaceholder}
                value={lastName}
                onChangeText={setLastName}
                autoCapitalize="words"
                style={styles.input}
                accessibilityLabel="Last name"
              />
              <TextInput
                mode="outlined"
                placeholder={strings.signup.phoneNumberPlaceholder}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoCapitalize="none"
                error={!!error && phoneNumber.length > 0}
                style={styles.input}
                accessibilityLabel="Phone number"
              />
              {!!error && <Text style={styles.error}>{error}</Text>}
              <PrimaryButton
                style={styles.button}
                onPress={handleNextStep}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  'Next'
                )}
              </PrimaryButton>
            </>
          ) : (
            <>
              <TextInput
                mode="outlined"
                placeholder={strings.signup.emailPlaceholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!error && email.length > 0}
                style={styles.input}
                accessibilityLabel="Email"
              />
              <TextInput
                mode="outlined"
                placeholder={strings.signup.passwordPlaceholder}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                error={!!error && password.length > 0}
                accessibilityLabel="Password"
              />
              <Text style={styles.strength}>
                Password Strength: {strength}
              </Text>
              <TextInput
                mode="outlined"
                placeholder={strings.signup.confirmPasswordPlaceholder}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry
                style={styles.input}
                error={!!error && confirm.length > 0}
                accessibilityLabel="Confirm Password"
              />
              {!!error && <Text style={styles.error}>{error}</Text>}
              <PrimaryButton
                style={styles.button}
                onPress={handleSignup}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color={COLORS.white} />
                ) : (
                  strings.signup.button
                )}
              </PrimaryButton>
            </>
          )}

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>
              {strings.signup.loginPrompt}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('LoginScreen')}
              accessibilityLabel="Navigate to login"
            >
              <Text style={styles.loginLink}>
                {strings.signup.loginLink}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flex: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  title: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.margin / 2,
  },
  subtitle: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.margin / 2,
    opacity: 0.9,
  },
  progress: {
    marginBottom: SIZES.margin,
    height: 4,
    borderRadius: SIZES.radius,
  },
  quote: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.margin,
    paddingHorizontal: SIZES.padding,
  },
  input: {
    marginBottom: SIZES.margin / 2,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
    ...SHADOWS.card,
  },
  strength: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.margin / 2,
    fontSize: TYPOGRAPHY.bodySmall.fontSize,
    fontFamily: TYPOGRAPHY.bodySmall.fontFamily,
    opacity: 0.9,
  },
  error: {
    color: COLORS.danger,
    fontFamily: TYPOGRAPHY.body.fontFamily,
    fontSize: TYPOGRAPHY.body.fontSize,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  button: {
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.margin,
  },
  loginText: {
    color: COLORS.white,
    marginRight: 4,
    opacity: 0.9,
  },
  loginLink: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.label.fontFamily,
    fontSize: TYPOGRAPHY.label.fontSize,
  },
});
