// src/services/api/recommendationApi.js
import axiosInstance from './axiosInstance';

export const getDailyPlan = async (userId) => {
  const response = await axiosInstance.get(`/recommendations/daily/${userId}`);
  return response.data; // { tasks: [{ type: 'flashcard', count: 5, subject: 'Physics' }, ...] }
};