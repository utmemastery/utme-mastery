import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, ProgressBar, Chip, Avatar } from 'react-native-paper';
import PrimaryButton from '../../components/PrimaryButton';
import SectionCard from '../../components/SectionCard';

export default function HomeScreen({ navigation }) {
  // Mock user data (in real app, this would come from onboarding/storage)
  const [userData] = useState({
    name: 'Yusuf',
    subjects: ['Physics', 'Mathematics', 'English'],
    dailyGoal: 5,
    completedToday: 2,
    streak: 7,
    targetScore: 350,
    studyTime: 45,
    learningStyle: 'visual',
    weakSubjects: ['Physics', 'Chemistry']
  });

  const [currentTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 17) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, [currentTime]);

  const progress = userData.completedToday / userData.dailyGoal;
  const nextWeakSubject = userData.weakSubjects[0] || 'Physics';

  const quickActions = [
    {
      title: 'Continue Practice',
      subtitle: 'Resume your Physics session',
      icon: '🎯',
      onPress: () => navigation.navigate('Practice')
    },
    {
      title: 'Review Flashcards',
      subtitle: 'Active recall for better retention',
      icon: '📚',
      onPress: () => navigation.navigate('Flashcards')
    },
    {
      title: 'Take Mock Test',
      subtitle: 'Simulate real exam conditions',
      icon: '📝',
      onPress: () => navigation.navigate('Practice')
    }
  ];

  const recommendations = [
    {
      type: 'weakness',
      title: `Focus on ${nextWeakSubject}`,
      description: `Based on your performance, we recommend extra practice in ${nextWeakSubject}`,
      action: 'Start Practice'
    },
    {
      type: 'goal',
      title: 'Daily Goal Progress',
      description: `You're ${userData.completedToday}/${userData.dailyGoal} sessions complete today`,
      action: 'Continue'
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Greeting */}
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text variant="headlineMedium" style={styles.greeting}>
            {greeting}, {userData.name}!
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Ready to master {nextWeakSubject} today?
          </Text>
        </View>
        <Avatar.Text 
          size={50} 
          label={userData.name.charAt(0).toUpperCase()} 
          style={styles.avatar}
        />
      </View>

      {/* Daily Goal Progress */}
      <Card style={styles.goalCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.goalTitle}>
            Daily Goal Progress
          </Text>
          <View style={styles.progressContainer}>
            <ProgressBar 
              progress={progress} 
              color="#0057FF" 
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>
              {userData.completedToday}/{userData.dailyGoal} sessions completed
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Quick Actions
        </Text>
        {quickActions.map((action, index) => (
          <SectionCard
            key={index}
            title={`${action.icon} ${action.title}`}
            description={action.subtitle}
            onPress={action.onPress}
            style={styles.actionCard}
          />
        ))}
      </View>

      {/* Recommendations */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Recommended Next Steps
        </Text>
        {recommendations.map((rec, index) => (
          <Card key={index} style={styles.recommendationCard}>
            <Card.Content>
              <View style={styles.recommendationHeader}>
                <Chip 
                  mode="outlined" 
                  style={styles.recommendationChip}
                  textStyle={styles.recommendationChipText}
                >
                  {rec.type === 'weakness' ? '🎯 Focus Area' : '📊 Progress'}
                </Chip>
              </View>
              <Text variant="titleMedium" style={styles.recommendationTitle}>
                {rec.title}
              </Text>
              <Text variant="bodyMedium" style={styles.recommendationDescription}>
                {rec.description}
              </Text>
              <PrimaryButton 
                style={styles.recommendationButton}
                onPress={() => navigation.navigate('Practice')}
              >
                {rec.action}
              </PrimaryButton>
            </Card.Content>
          </Card>
        ))}
      </View>

      {/* Streaks & Achievements */}
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Your Progress
        </Text>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statIcon}>🔥</Text>
              <Text variant="titleLarge" style={styles.statValue}>
                {userData.streak}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Day Streak
              </Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statIcon}>🎯</Text>
              <Text variant="titleLarge" style={styles.statValue}>
                {userData.targetScore}
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Target Score
              </Text>
            </Card.Content>
          </Card>
          
          <Card style={styles.statCard}>
            <Card.Content>
              <Text style={styles.statIcon}>⏰</Text>
              <Text variant="titleLarge" style={styles.statValue}>
                {userData.studyTime}m
              </Text>
              <Text variant="bodySmall" style={styles.statLabel}>
                Daily Goal
              </Text>
            </Card.Content>
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#757575',
    marginTop: 4,
  },
  avatar: {
    backgroundColor: '#0057FF',
  },
  goalCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 12,
  },
  goalTitle: {
    marginBottom: 12,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressText: {
    color: '#757575',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginHorizontal: 24,
    marginBottom: 16,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  actionCard: {
    marginHorizontal: 24,
    marginBottom: 12,
  },
  recommendationCard: {
    marginHorizontal: 24,
    marginBottom: 16,
    borderRadius: 12,
  },
  recommendationHeader: {
    marginBottom: 8,
  },
  recommendationChip: {
    alignSelf: 'flex-start',
  },
  recommendationChipText: {
    fontSize: 12,
  },
  recommendationTitle: {
    marginBottom: 4,
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  recommendationDescription: {
    color: '#757575',
    marginBottom: 12,
    lineHeight: 20,
  },
  recommendationButton: {
    borderRadius: 8,
    height: 40,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  statValue: {
    textAlign: 'center',
    color: '#0057FF',
    fontWeight: 'bold',
  },
  statLabel: {
    textAlign: 'center',
    color: '#757575',
    marginTop: 2,
  },
}); 