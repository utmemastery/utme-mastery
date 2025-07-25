import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation/NavigationService';
import * as authApi from '../services/api/authApi';
import { logger } from '../utils/logger';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        console.log('Token from AsyncStorage:', token);
        if (token) {
          const userData = await authApi.getUserProfile(token);
          setUser({ ...userData, token });
        }
      } catch (error) {
        logger.error('Auth check failed:', error.message);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      await AsyncStorage.setItem('authToken', response.token);
      setUser({ ...response.user, token: response.token });
    } catch (error) {
      logger.error('Login failed:', error.message);
      throw error;
    }
  };

  const signup = async (firstName, lastName, phoneNumber, email, password) => {
    try {
      const response = await authApi.signup(firstName, lastName, phoneNumber, email, password);
      await AsyncStorage.setItem('authToken', response.token);
      setUser({ ...response.user, token: response.token });
  
      navigate('Onboarding'); 
    } catch (error) {
      logger.error('Signup failed:', error.message);
      throw error;
    }
  };
  

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setUser(null);
    } catch (error) {
      logger.error('Logout failed:', error.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      await authApi.resetPassword(email);
    } catch (error) {
      logger.error('Password reset failed:', error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};