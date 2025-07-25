// src/utils/offlineStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const cacheDailyPlan = async (userId, plan) => {
  await AsyncStorage.setItem(`dailyPlan_${userId}`, JSON.stringify(plan));
};

export const getCachedDailyPlan = async (userId) => {
  const plan = await AsyncStorage.getItem(`dailyPlan_${userId}`);
  return plan ? JSON.parse(plan) : null;
};