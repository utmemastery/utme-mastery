// src/services/api/analyticsApi.js
export const getSubjectMastery = async (userId, subjectId) => {
    const response = await axiosInstance.get(`/analytics/mastery/${userId}/${subjectId}`);
    return response.data; // { subject: 'Physics', mastery: 0.85 }
  };