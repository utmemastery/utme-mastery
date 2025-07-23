import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function PermissionsScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleAllow = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('PersonalizationScreen');
    }, 1000);
  };

  const handleSkip = () => {
    navigation.navigate('PersonalizationScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stay Informed & Motivated</Text>
      <Text style={styles.subtitle}>
        Enable notifications so we can send you reminders, study tips, and important updates to help you stay on track for UTME success.
      </Text>
      {loading ? (
        <ActivityIndicator animating color={COLORS.primary} size="large" style={{ marginVertical: SIZES.margin * 2 }} />
      ) : (
        <>
          <PrimaryButton style={styles.button} onPress={handleAllow}>
            Allow Notifications
          </PrimaryButton>
          <PrimaryButton style={[styles.button, styles.secondaryButton]} mode="outlined" onPress={handleSkip}>
            Maybe Later
          </PrimaryButton>
        </>
      )}
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
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: SIZES.h3,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
    textAlign: 'center',
    marginBottom: SIZES.margin * 2,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
});
