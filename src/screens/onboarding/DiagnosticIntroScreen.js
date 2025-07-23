import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function DiagnosticIntroScreen({ navigation }) {
  const handleStart = () => {
    navigation.navigate('DiagnosticQuizScreen');
  };

  const handleSkip = () => {
    navigation.navigate('ResultFeedbackScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personalize Your Learning</Text>
      <Text style={styles.subtitle}>
        Take a short diagnostic quiz so we can assess your strengths and weaknesses. This helps us tailor your study plan and recommendations for maximum UTME success.
      </Text>
      <PrimaryButton style={styles.button} onPress={handleStart}>
        Start Diagnostic
      </PrimaryButton>
      <PrimaryButton style={[styles.button, styles.secondaryButton]} mode="outlined" onPress={handleSkip}>
        Skip for Now
      </PrimaryButton>
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
