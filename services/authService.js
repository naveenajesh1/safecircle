import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.233.196:5000/api/auth';



// Login Function
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    const token = response.data.token;

    if (token) {
      await AsyncStorage.setItem('authToken', token); // Save token
    }

    return response.data;
  } catch (error) {
    console.error('Login Error:', error);
    throw error.response?.data?.message || 'Login failed. Please try again.';
  }
};

// Register Function
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    const token = response.data.token;

    if (token) {
      await AsyncStorage.setItem('authToken', token); // Save token after registration
    }

    return response.data;
  } catch (error) {
    console.error('Registration Error:', error);
    throw error.response?.data?.message || 'Registration failed. Please try again.';
  }
};

// Logout Function
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken'); // Clear stored token
  } catch (error) {
    console.error('Logout Error:', error);
  }
};

// Get Auth Token Function
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken'); // Retrieve stored token
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};
