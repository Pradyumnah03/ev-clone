import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login as loginService, logout as logoutService } from '../services/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (localStorage.getItem('token')) {
          const userData = await getCurrentUser();
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error('Failed to load user:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username, password) => {
    const data = await loginService(username, password);
    const userData = await getCurrentUser();
    setCurrentUser(userData);
    return data;
  };

  const logout = () => {
    logoutService();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
