import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';



export default function ResultFeedbackScreen({ navigation }) {

  const handleContinue = async () => {
    await AsyncStorage.setItem('onboardingComplete', 'true');
    navigation.replace('Home');
  };
  

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/onboarding-bg.png')} style={styles.illustration} resizeMode="contain" />
      <Text style={styles.title}>You're All Set!</Text>
      <Text style={styles.subtitle}>
        Great job completing the onboarding! We'll use your answers to personalize your study plan, recommend the best resources, and keep you motivated on your UTME journey.
      </Text>
      <PrimaryButton style={styles.button} onPress={handleContinue}>
        Continue to Home
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
  illustration: {
    width: 200,
    height: 140,
    marginBottom: SIZES.margin * 2,
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
});
