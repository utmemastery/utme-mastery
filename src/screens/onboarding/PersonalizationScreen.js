import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Chip } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

const learningStyles = [
  { key: 'visual', label: 'Visual' },
  { key: 'auditory', label: 'Auditory' },
  { key: 'reading', label: 'Reading/Writing' },
  { key: 'kinesthetic', label: 'Kinesthetic' },
];

export default function PersonalizationScreen({ navigation }) {
  const [name, setName] = useState('');
  const [style, setStyle] = useState('');

  const handleContinue = () => {
    navigation.navigate('GoalSelectionScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Personalize Your Experience</Text>
      <Text style={styles.subtitle}>What should we call you?</Text>
      <TextInput
        mode="outlined"
        placeholder="First Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        autoCapitalize="words"
      />
      <Text style={[styles.subtitle, { marginTop: SIZES.margin }]}>How do you learn best?</Text>
      <View style={styles.chipRow}>
        {learningStyles.map((ls) => (
          <Chip
            key={ls.key}
            selected={style === ls.key}
            onPress={() => setStyle(ls.key)}
            style={[styles.chip, style === ls.key && styles.chipSelected]}
            textStyle={{ fontWeight: style === ls.key ? 'bold' : 'normal', fontFamily: FONTS.medium }}
          >
            {ls.label}
          </Chip>
        ))}
      </View>
      <PrimaryButton
        style={styles.button}
        onPress={handleContinue}
        disabled={!name.trim() || !style}
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
  input: {
    width: '100%',
    marginBottom: SIZES.margin,
    backgroundColor: COLORS.surface,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: SIZES.margin,
  },
  chip: {
    margin: SIZES.small / 2,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  chipSelected: {
    backgroundColor: COLORS.primary,
  },
  button: {
    width: '100%',
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
  },
});
