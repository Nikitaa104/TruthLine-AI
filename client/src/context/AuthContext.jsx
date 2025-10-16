
import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import { initSocket, disconnectSocket } from '../socket/socket';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      initSocket(localStorage.getItem('token'));
    }
    setLoading(false);
  }, []);

  const signup = async (userData) => {
    try {
      setError(null);
      const data = await authService.signup(userData);
      setUser(data);
      initSocket(data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      setError(null);
      const data = await authService.login(credentials);
      setUser(data);
      initSocket(data.token);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const logout = () => {
    authService.logout();
    disconnectSocket();
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};