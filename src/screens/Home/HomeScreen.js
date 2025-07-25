import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Text, Card } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import { COLORS, SIZES, FONTS } from '../../constants/theme';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to UTME Mastery</Text>
      <Text style={styles.subtitle}>Your personalized dashboard</Text>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Today's Plan</Text>
          <Text style={styles.cardText}>- 2 Quizzes
- 1 Flashcard session
- 30 min study</Text>
        </Card.Content>
      </Card>
      <PrimaryButton style={styles.button} onPress={() => {/* navigation.navigate('QuizScreen') */}}>
        Start Quiz
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.primary,
    fontFamily: FONTS.bold,
    fontSize: SIZES.h2,
    textAlign: 'center',
    marginBottom: SIZES.margin / 2,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
    textAlign: 'center',
    marginBottom: SIZES.margin,
  },
  card: {
    width: '100%',
    borderRadius: SIZES.cardRadius,
    marginBottom: SIZES.margin * 2,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  cardTitle: {
    color: COLORS.primary,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.h5,
    marginBottom: SIZES.small,
  },
  cardText: {
    color: COLORS.textPrimary,
    fontFamily: FONTS.regular,
    fontSize: SIZES.body,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    height: SIZES.buttonHeight,
    justifyContent: 'center',
  },
});

