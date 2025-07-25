// __tests__/authApi.test.js
import { login, signup, resetPassword } from '../services/api/authApi';
import axiosInstance from '../services/api/axiosInstance';
jest.mock('../services/api/axiosInstance');

test('login handles invalid credentials', async () => {
  axiosInstance.post.mockRejectedValue({ response: { data: { message: 'Invalid credentials' } } });
  await expect(login('test@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
});

test('signup handles duplicate email', async () => {
  axiosInstance.post.mockRejectedValue({ response: { data: { message: 'Email already exists' } } });
  await expect(signup('Test', 'test@example.com', 'password123')).rejects.toThrow('Email already exists');
});