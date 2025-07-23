import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, RadioButton, ProgressBar } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

// Mock diagnostic questions
const QUESTIONS = [
  {
    question: 'What is the capital of Nigeria?',
    options: ['Lagos', 'Abuja', 'Kano', 'Port Harcourt'],
    answer: 1,
  },
  {
    question: 'Which is a prime number?',
    options: ['4', '6', '9', '7'],
    answer: 3,
  },
  {
    question: 'Water boils at what temperature (°C)?',
    options: ['90', '100', '120', '80'],
    answer: 1,
  },
];

export default function DiagnosticQuizScreen({ navigation }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    setAnswers((prev) => [...prev, selected]);
    setSelected(null);
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      navigation.navigate('ResultFeedbackScreen');
    }
  };

  const q = QUESTIONS[current];
  const progress = (current + 1) / QUESTIONS.length;

  return (
    <View style={styles.container}>
      <Text style={styles.progressText}>
        Question {current + 1} of {QUESTIONS.length}
      </Text>
      <ProgressBar progress={progress} color={COLORS.primary} style={styles.progressBar} />
      <Text style={styles.question}>{q.question}</Text>
      <RadioButton.Group onValueChange={setSelected} value={selected}>
        {q.options.map((opt, idx) => (
          <RadioButton.Item
            key={opt}
            label={opt}
            value={idx.toString()}
            style={styles.option}
            labelStyle={{ color: COLORS.textPrimary, fontFamily: FONTS.regular, fontSize: SIZES.body }}
          />
        ))}
      </RadioButton.Group>
      <PrimaryButton
        style={styles.button}
        onPress={handleNext}
        disabled={selected === null}
      >
        {current === QUESTIONS.length - 1 ? 'Finish' : 'Next'}
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  progressText: {
    textAlign: 'center',
    marginBottom: SIZES.small,
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: SIZES.body,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: SIZES.margin,
  },
  question: {
    color: COLORS.textPrimary,
    marginBottom: SIZES.margin,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.h5,
  },
  option: {
    marginVertical: SIZES.small / 2,
    backgroundColor: COLORS.surface,
    borderRadius: SIZES.radius,
  },
  button: {
    width: '100%',
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
  },
});
