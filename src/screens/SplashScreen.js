import React, { useEffect, useRef, useContext } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

import {
  COLORS,
  TYPOGRAPHY,
  SIZES,
  SHADOWS,
  MOTIONS,
} from '../constants/theme';

import { strings } from '../constants/strings';
import { AuthContext } from '../context/AuthContext';

export default function SplashScreen({ navigation }) {
  const { user, loading } = useContext(AuthContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  const mainTimeoutRef = useRef(null);
  const fallbackTimeoutRef = useRef(null);

  const fadeOutSplash = () =>
    new Promise((resolve) => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: MOTIONS.duration.normal,
        useNativeDriver: true,
      }).start(resolve);
    });

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: MOTIONS.duration.normal,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        ...MOTIONS.easing.spring,
        useNativeDriver: true,
      }),
    ]).start();

    const prepare = async () => {
      mainTimeoutRef.current = setTimeout(async () => {
        await fadeOutSplash();
        navigation.replace('Auth');
      }, 3000);
    
      fallbackTimeoutRef.current = setTimeout(() => {
        clearTimeout(mainTimeoutRef.current);
        navigation.replace('Auth');
      }, 3000);
    };
    

    prepare();

    return () => {
      clearTimeout(mainTimeoutRef.current);
      clearTimeout(fallbackTimeoutRef.current);
    };
  }, [user, loading, navigation]);

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.primaryLight]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
            accessible
            accessibilityLabel="UTME Mastery Logo"
            testID="splash-logo"
          />
        </View>

        <Text style={[styles.title, TYPOGRAPHY.heading1]}>UTME Mastery</Text>

        <Text style={[styles.tagline, TYPOGRAPHY.body]}>
          {strings.splashTagline}
        </Text>

        <Text
          style={[styles.testimonial, TYPOGRAPHY.bodySmall]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {
            strings.testimonials[
              Math.floor(Math.random() * strings.testimonials.length)
            ]
          }
        </Text>

        {loading && (
          <ActivityIndicator
            color={COLORS.primary}
            size="large"
            style={styles.loader}
            accessibilityLabel="Loading indicator"
            accessible
          />
        )}
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    ...SHADOWS.glowPrimary,
    marginBottom: SIZES.margin * 2,
  },
  logo: {
    width: 180,
    height: 180,
  },
  title: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  tagline: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.margin,
    opacity: 0.9,
  },
  testimonial: {
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
    paddingHorizontal: SIZES.padding,
    opacity: 0.8,
  },
  loader: {
    marginTop: SIZES.margin,
  },
});
