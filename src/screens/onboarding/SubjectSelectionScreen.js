import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

// Canonical UTME subject list (can be updated as needed)
const SUBJECTS = [
  'English Language',
  'Mathematics',
  'Biology',
  'Physics',
  'Chemistry',
  'Literature in English',
  'Government',
  'Economics',
  'Geography',
  'Christian Religious Studies',
  'Islamic Religious Studies',
  'Agricultural Science',
  'Commerce',
  'Accounting',
  'History',
  'Civic Education',
  'French',
  'Yoruba',
  'Igbo',
  'Hausa',
  'Further Mathematics',
  'Computer Studies',
  'Technical Drawing',
  'Home Economics',
  'Music',
  'Visual Arts',
];

export default function SubjectSelectionScreen({ navigation }) {
  const [selected, setSelected] = useState([]);

  const toggleSubject = (subject) => {
    setSelected((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : prev.length < 4
        ? [...prev, subject]
        : prev
    );
  };

  const handleContinue = () => {
    // You can save the data to context or backend here
    navigation.navigate('DiagnosticIntroScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your UTME Subjects</Text>
      <Text style={styles.subtitle}>
        Choose 1 to 4 subjects you will take in the UTME exam.
      </Text>
      <ScrollView contentContainerStyle={styles.chipContainer} showsVerticalScrollIndicator={false}>
        {SUBJECTS.map((subject) => (
          <Chip
            key={subject}
            selected={selected.includes(subject)}
            onPress={() => toggleSubject(subject)}
            style={[styles.chip, selected.includes(subject) && styles.chipSelected]}
            textStyle={{ fontWeight: selected.includes(subject) ? 'bold' : 'normal', fontFamily: FONTS.medium }}
            disabled={!selected.includes(subject) && selected.length >= 4}
          >
            {subject}
          </Chip>
        ))}
      </ScrollView>
      <PrimaryButton
        style={styles.button}
        onPress={handleContinue}
        disabled={selected.length < 1 || selected.length > 4}
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
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: SIZES.margin * 2,
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
