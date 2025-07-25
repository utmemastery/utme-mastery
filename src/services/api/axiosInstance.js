import axios from 'axios';
     import AsyncStorage from '@react-native-async-storage/async-storage';
     import Constants from 'expo-constants';
     import { strings } from '../../constants/strings';
     import * as Updates from 'expo-updates';

     const getApiBaseUrl = () => {
        if (__DEV__) {
          return Constants.expoConfig?.extra?.apiBaseUrl || 'http://192.168.132.67:5000/api';
        } else {
          return Updates.manifest?.extra?.apiBaseUrl || 'http://192.168.132.67:5000/api';
        }
      };
      
      const baseUrl = getApiBaseUrl();
      console.log('Axios Base URL:', baseUrl); // ✅ for debugging
     
     const axiosInstance = axios.create({
       baseURL: baseUrl,
       timeout: 10000,
       headers: {
         'Content-Type': 'application/json',
       },
     });

     axiosInstance.interceptors.request.use(
       async (config) => {
         const token = await AsyncStorage.getItem('authToken');
         if (token) {
           config.headers.Authorization = `Bearer ${token}`;
         }
         return config;
       },
       (error) => Promise.reject(error),
     );

     axiosInstance.interceptors.response.use(
       (response) => response,
       (error) => {
         const message =
           error.response?.data?.message ||
           error.message ||
           strings.errors.networkError;
         return Promise.reject(new Error(message));
       },
     );

     export default axiosInstance;