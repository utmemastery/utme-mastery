import axiosInstance from './axiosInstance';
import { strings } from '../../constants/strings';

// login
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data; // { token, user: { id, email, username } }
  } catch (error) {
    throw new Error(error.response?.data?.message || strings.errors.loginFailed);
  }
};

// signup
export const signup = async (firstName, lastName, phoneNumber, email, password) => {
  try {
    const response = await axiosInstance.post('/auth/register', { firstName, lastName, phoneNumber, email, password });
    return response.data; // { token, user: { id, email, firstName, lastName, phoneNumber, } }
  } catch (error) {
    const message = error.response?.data?.message || strings.errors.signupFailed;
    console.log('Signup API error:', message, error); // Debug log
    throw new Error(message);
  }
};

// reset password
export const resetPassword = async (email) => {
  try {
    await axiosInstance.post('/auth/forgot-password', { email });
  } catch (error) {
    throw new Error(error.response?.data?.message || strings.errors.resetPasswordFailed);
  }
};

// reset password confirm
export const resetPasswordConfirm = async (token, newPassword) => {
  try {
    await axiosInstance.post('/auth/reset-password', { token, newPassword });
  } catch (error) {
    throw new Error(error.response?.data?.message || strings.errors.resetPasswordFailed);
  }
};

// verify email with 4-digit code
/*export const verifyEmailCode = async (email, code) => {
  try {
    await axiosInstance.post('/auth/verify-email-code', { email, code });
  } catch (error) {
    throw new Error(error.response?.data?.message || strings.errors.verifyEmailFailed);
  }
};

// resend 4-digit verification code
export const resendVerificationCode = async (email) => {
  try {
    await axiosInstance.post('/auth/resend-verification-code', { email });
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to resend verification code');
  }
};*/



export const getUserProfile = async (token) => {
  try {
    console.log('Sending token to backend:', token);
    const response = await axiosInstance.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // { id, email, username, ... }
  } catch (error) {
    throw new Error(error.response?.data?.message || strings.errors.profileFetchFailed);
  }
};

export const authApi = {
  login,
  signup,
  resetPassword,
  resetPasswordConfirm,
  getUserProfile,
};
