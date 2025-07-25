// src/components/ProgressRing.js
import React from 'react';
import { View, Text } from 'react-native';
import { ProgressCircle } from 'react-native-svg-charts';

const ProgressRing = ({ mastery, subject }) => (
  <View>
    <ProgressCircle
      style={{ height: 100 }}
      progress={mastery}
      progressColor={theme.primaryColor}
      backgroundColor={theme.backgroundColor}
    />
    <Text>{subject} Mastery: {(mastery * 100).toFixed(0)}%</Text>
  </View>
);