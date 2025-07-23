import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { COLORS, SIZES, FONTS } from '../constants/theme';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    // Simulate loading, then navigate to Auth
    const timeout = setTimeout(() => {
      navigation.replace('Auth');
    }, 1500);
    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>UTME Mastery</Text>
      <ActivityIndicator color={COLORS.primary} size="large" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: SIZES.margin * 2,
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: SIZES.h2,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
  },
  loader: {
    marginTop: SIZES.margin * 2,
  },
}); 