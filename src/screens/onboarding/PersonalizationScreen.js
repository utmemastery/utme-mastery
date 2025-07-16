import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Chip, Button, ProgressBar } from 'react-native-paper';
import Slider from '@react-native-community/slider';
import PrimaryButton from '../../components/PrimaryButton';

export default function PersonalizationScreen({ navigation }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selfAssessment, setSelfAssessment] = useState({});
  const [learningGoals, setLearningGoals] = useState({});
  const [learningStyle, setLearningStyle] = useState('');

  const subjects = [
    'Mathematics', 'English', 'Physics', 'Chemistry', 
    'Biology', 'Economics', 'Literature', 'Government'
  ];

  const learningStyles = [
    { id: 'visual', label: 'Visual Learner', description: 'I learn best with diagrams, charts, and visual aids' },
    { id: 'auditory', label: 'Auditory Learner', description: 'I learn best by listening and discussing' },
    { id: 'kinesthetic', label: 'Hands-on Learner', description: 'I learn best by doing and practicing' },
    { id: 'reading', label: 'Reading/Writing', description: 'I learn best by reading and writing notes' }
  ];

  const steps = [
    {
      title: 'Select Your Subjects',
      subtitle: 'Choose the subjects you want to focus on',
      component: (
        <View style={styles.stepContent}>
          <Text variant="bodyLarge" style={styles.stepDescription}>
            Select all subjects you plan to take in UTME. You can change this later.
          </Text>
          <View style={styles.chipContainer}>
            {subjects.map((subject) => (
              <Chip
                key={subject}
                selected={selectedSubjects.includes(subject)}
                onPress={() => {
                  if (selectedSubjects.includes(subject)) {
                    setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
                  } else {
                    setSelectedSubjects([...selectedSubjects, subject]);
                  }
                }}
                style={styles.chip}
                textStyle={styles.chipText}
              >
                {subject}
              </Chip>
            ))}
          </View>
        </View>
      )
    },
    {
      title: 'Self-Assessment',
      subtitle: 'Rate your current knowledge in each subject',
      component: (
        <View style={styles.stepContent}>
          <Text variant="bodyLarge" style={styles.stepDescription}>
            Rate your current level (1 = Beginner, 5 = Expert)
          </Text>
          {selectedSubjects.map((subject) => (
            <View key={subject} style={styles.sliderContainer}>
              <Text variant="titleMedium" style={styles.sliderLabel}>
                {subject}
              </Text>
              <Slider
                value={selfAssessment[subject] || 1}
                onValueChange={(value) => 
                  setSelfAssessment({...selfAssessment, [subject]: value})
                }
                minimumValue={1}
                maximumValue={5}
                step={1}
                style={styles.slider}
              />
              <Text style={styles.sliderValue}>
                Level {selfAssessment[subject] || 1}
              </Text>
            </View>
          ))}
        </View>
      )
    },
    {
      title: 'Learning Goals',
      subtitle: 'Set your target score and study time',
      component: (
        <View style={styles.stepContent}>
          <Text variant="bodyLarge" style={styles.stepDescription}>
            Help us personalize your learning experience
          </Text>
          
          <View style={styles.goalContainer}>
            <Text variant="titleMedium" style={styles.goalLabel}>
              Target UTME Score
            </Text>
            <Slider
              value={learningGoals.targetScore || 200}
              onValueChange={(value) => 
                setLearningGoals({...learningGoals, targetScore: value})
              }
              minimumValue={120}
              maximumValue={400}
              step={10}
              style={styles.slider}
            />
            <Text style={styles.goalValue}>
              {learningGoals.targetScore || 200} points
            </Text>
          </View>

          <View style={styles.goalContainer}>
            <Text variant="titleMedium" style={styles.goalLabel}>
              Daily Study Time (minutes)
            </Text>
            <Slider
              value={learningGoals.studyTime || 30}
              onValueChange={(value) => 
                setLearningGoals({...learningGoals, studyTime: value})
              }
              minimumValue={15}
              maximumValue={180}
              step={15}
              style={styles.slider}
            />
            <Text style={styles.goalValue}>
              {learningGoals.studyTime || 30} minutes
            </Text>
          </View>
        </View>
      )
    },
    {
      title: 'Learning Style',
      subtitle: 'How do you learn best?',
      component: (
        <View style={styles.stepContent}>
          <Text variant="bodyLarge" style={styles.stepDescription}>
            Choose the learning style that works best for you
          </Text>
          {learningStyles.map((style) => (
            <Chip
              key={style.id}
              selected={learningStyle === style.id}
              onPress={() => setLearningStyle(style.id)}
              style={styles.styleChip}
              textStyle={styles.styleChipText}
            >
              <View style={styles.styleChipContent}>
                <Text variant="titleMedium" style={styles.styleChipTitle}>
                  {style.label}
                </Text>
                <Text variant="bodySmall" style={styles.styleChipDescription}>
                  {style.description}
                </Text>
              </View>
            </Chip>
          ))}
        </View>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const progress = (currentStep + 1) / steps.length;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save personalization data and continue
      const personalizationData = {
        subjects: selectedSubjects,
        selfAssessment,
        learningGoals,
        learningStyle
      };
      console.log('Personalization Data:', personalizationData);
      navigation.navigate('Permissions');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedSubjects.length > 0;
      case 1: return selectedSubjects.every(subject => selfAssessment[subject]);
      case 2: return learningGoals.targetScore && learningGoals.studyTime;
      case 3: return learningStyle !== '';
      default: return true;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>UTME</Text>
        <Text style={styles.tagline}>Mastery</Text>
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} color="#0057FF" style={styles.progressBar} />
        <Text style={styles.progressText}>
          Step {currentStep + 1} of {steps.length}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text variant="headlineMedium" style={styles.title}>
          {currentStepData.title}
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {currentStepData.subtitle}
        </Text>
        
        {currentStepData.component}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && (
          <Button 
            mode="outlined" 
            onPress={handleBack}
            style={styles.backButton}
          >
            Back
          </Button>
        )}
        
        <PrimaryButton 
          style={styles.nextButton} 
          onPress={handleNext}
          disabled={!canProceed()}
        >
          {currentStep === steps.length - 1 ? 'Continue' : 'Next'}
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0057FF',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFB300',
    marginTop: 4,
  },
  progressContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    marginTop: 8,
    color: '#757575',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    color: '#1A1A1A',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#757575',
    marginBottom: 24,
  },
  stepContent: {
    marginBottom: 24,
  },
  stepDescription: {
    textAlign: 'center',
    color: '#757575',
    marginBottom: 24,
    lineHeight: 22,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  chip: {
    margin: 4,
    backgroundColor: '#FFFFFF',
  },
  chipText: {
    color: '#1A1A1A',
  },
  sliderContainer: {
    marginBottom: 24,
  },
  sliderLabel: {
    marginBottom: 8,
    color: '#1A1A1A',
  },
  slider: {
    marginBottom: 8,
  },
  sliderValue: {
    textAlign: 'center',
    color: '#0057FF',
    fontWeight: '600',
  },
  goalContainer: {
    marginBottom: 32,
  },
  goalLabel: {
    marginBottom: 8,
    color: '#1A1A1A',
  },
  goalValue: {
    textAlign: 'center',
    color: '#0057FF',
    fontWeight: '600',
  },
  styleChip: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    height: 'auto',
    paddingVertical: 12,
  },
  styleChipText: {
    color: '#1A1A1A',
  },
  styleChipContent: {
    alignItems: 'center',
  },
  styleChipTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  styleChipDescription: {
    textAlign: 'center',
    color: '#757575',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  backButton: {
    flex: 1,
    marginRight: 12,
    borderRadius: 12,
    height: 56,
  },
  nextButton: {
    flex: 1,
    marginLeft: 12,
    borderRadius: 12,
    height: 56,
  },
}); 