import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function GoalSelectionScreen({ navigation }) {
  const [score, setScore] = useState(200);
  const [course, setCourse] = useState('');

  const handleContinue = () => {
    navigation.navigate('SubjectSelectionScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your UTME Goal</Text>
      <Text style={styles.subtitle}>What is your target UTME score?</Text>
      <Text style={styles.scoreLabel}>{score}</Text>
      <Slider
        style={styles.slider}
        minimumValue={100}
        maximumValue={400}
        step={1}
        value={score}
        onValueChange={setScore}
        minimumTrackTintColor={COLORS.primary}
        maximumTrackTintColor={COLORS.textMuted}
        thumbTintColor={COLORS.primary}
      />
      <Text style={[styles.subtitle, { marginTop: SIZES.margin }]}>Aspiring Course/University (optional)</Text>
      <TextInput
        mode="outlined"
        placeholder="e.g. Medicine, University of Lagos"
        value={course}
        onChangeText={setCourse}
        style={styles.input}
      />
      <PrimaryButton
        style={styles.button}
        onPress={handleContinue}
        disabled={!score}
      >
        Continue
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
    marginBottom: SIZES.margin,
    lineHeight: 24,
  },
  scoreLabel: {
    fontSize: SIZES.h2,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: SIZES.margin,
  },
  input: {
    width: '100%',
    marginBottom: SIZES.margin,
    backgroundColor: COLORS.surface,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
  },
  button: {
    width: '100%',
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
  },
});
