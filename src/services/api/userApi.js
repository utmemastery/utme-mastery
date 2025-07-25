import axiosInstance from './axiosInstance';
import { strings } from '../../constants/strings';

export const updateUserProfile = async (token, data) => {
  try {
    const response = await axiosInstance.put('/user/profile', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // { id, email, username, selectedSubjects, aspiringCourse, goalScore, ... }
  } catch (error) {
    throw new Error(error.response?.data?.message || strings.errors.profileUpdateFailed);
  }
};

export const getUserProgress = async (token, userId) => {
  try {
    const response = await axiosInstance.get(`/user/${userId}/progress`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // { progress: [{ topicId, masteryScore, ... }] }
  } catch (error) {
    throw new Error(error.response?.data?.message || strings.errors.progressFetchFailed);
  }
};