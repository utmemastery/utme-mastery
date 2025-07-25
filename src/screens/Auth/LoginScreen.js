import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { Text, TextInput, ActivityIndicator } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

import PrimaryButton from '../../components/PrimaryButton';
import {
  COLORS,
  TYPOGRAPHY,
  SIZES,
  SHADOWS,
} from '../../constants/theme';

import { AuthContext } from '../../context/AuthContext';
import { strings } from '../../constants/strings';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const shake = useSharedValue(0);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      setError(strings.errors.emptyFields);
      triggerShake();
      return;
    }

    if (!validateEmail(email)) {
      setError(strings.errors.invalidEmail);
      triggerShake();
      return;
    }

    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigation.replace('Onboarding'); // or Home depending on flow
    } catch (err) {
      setError(err.message || strings.errors.loginFailed);
      triggerShake();
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    shake.value = withSequence(
      withSpring(-10),
      withSpring(10),
      withSpring(-5),
      withSpring(0)
    );
  };

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
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        style={styles.flex}
      >
        <Animated.View style={[styles.content, shakeStyle]}>
          <Text style={[styles.title, TYPOGRAPHY.heading2]}>
            {strings.login.title}
          </Text>
          <Text style={[styles.subtitle, TYPOGRAPHY.body]}>
            {strings.login.subtitle}
          </Text>
          <Text style={[styles.quote, TYPOGRAPHY.bodySmall]}>
            {motivationalQuote}
          </Text>

          <TextInput
            mode="outlined"
            placeholder={strings.login.emailPlaceholder}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(validateEmail(text) || !text ? '' : strings.errors.invalidEmail);
            }}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            error={!!error && email.length > 0}
            accessibilityLabel="Email input"
            accessibilityHint="Enter your email address"
          />
          <TextInput
            mode="outlined"
            placeholder={strings.login.passwordPlaceholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            error={!!error && password.length > 0}
            accessibilityLabel="Password input"
            accessibilityHint="Enter your password"
          />

          {!!error && (
            <Text style={[styles.error, TYPOGRAPHY.body]}>
              {error}
            </Text>
          )}

          <PrimaryButton
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
            accessibilityLabel="Login button"
            accessibilityHint="Press to log in"
          >
            {loading ? (
              <ActivityIndicator color={COLORS.white} />
            ) : (
              strings.login.button
            )}
          </PrimaryButton>

          <TouchableOpacity
            onPress={() => navigation.navigate('PasswordResetScreen')}
            accessibilityLabel="Forgot password"
            accessibilityHint="Navigate to reset screen"
          >
            <Text style={styles.link}>
              {strings.login.forgotPassword}
            </Text>
          </TouchableOpacity>

          <View style={styles.signupRow}>
            <Text style={[styles.signupText, TYPOGRAPHY.body]}>
              {strings.login.signupPrompt}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignupScreen')}
              accessibilityLabel="Sign up"
              accessibilityHint="Create a new account"
            >
              <Text style={styles.signupLink}>
                {strings.login.signupLink}
              </Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: SIZES.margin,
    opacity: 0.9,
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
  button: {
    width: '100%',
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  error: {
    color: COLORS.danger,
    textAlign: 'center',
    marginBottom: SIZES.small,
  },
  link: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.label.fontFamily,
    fontSize: TYPOGRAPHY.label.fontSize,
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
    color: COLORS.white,
    marginRight: 4,
    opacity: 0.9,
  },
  signupLink: {
    color: COLORS.primary,
    fontFamily: TYPOGRAPHY.label.fontFamily,
    fontSize: TYPOGRAPHY.label.fontSize,
  },
});
