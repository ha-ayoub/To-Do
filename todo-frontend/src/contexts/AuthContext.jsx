import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    const response = await authService.register(userData);
    setUser({
      userId: response.userId,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
    });
    return response;
  };

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    setUser({
      userId: response.userId,
      email: response.email,
      firstName: response.firstName,
      lastName: response.lastName,
    });
    return response;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};