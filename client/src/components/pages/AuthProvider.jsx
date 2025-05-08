import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth by checking existing session
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Check if user is authenticated
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/users/check-auth', {
        withCredentials: true
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        localStorage.setItem('userdata', JSON.stringify(response.data.user));
      }
    } catch (err) {
      console.log('Not authenticated', err);
      // If token is expired, try to refresh
      if (err.response?.status === 401) {
        try {
          await refreshTokens();
        } catch (refreshErr) {
          // If refresh fails, clear user data
          setUser(null);
          localStorage.removeItem('userdata');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Refresh tokens
  const refreshTokens = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/refresh-token', {}, {
        withCredentials: true
      });
      
      if (response.data.status) {
        setUser(response.data.data);
        localStorage.setItem('userdata', JSON.stringify(response.data.data));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Token refresh failed:', err);
      setUser(null);
      localStorage.removeItem('userdata');
      return false;
    }
  };

  // Login function
  const login = async (email, password, role) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('http://localhost:3000/api/users/login', 
        { email, password, role: role.toLowerCase() },
        { withCredentials: true }
      );
      
      setUser(response.data.data);
      localStorage.setItem('userdata', JSON.stringify(response.data.data));
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/api/users/logOut', {}, {
        withCredentials: true
      });
      
      setUser(null);
      localStorage.removeItem('userdata');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Setup axios interceptor for token expiry
  useEffect(() => {
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      async error => {
        const originalRequest = error.config;
        
        // Check if error is due to token expiry and request is not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            // Try to refresh token
            const refreshSuccess = await refreshTokens();
            if (refreshSuccess) {
              // Retry original request
              return axios(originalRequest);
            }
          } catch (refreshError) {
            // If refresh fails, redirect to login
            setUser(null);
            localStorage.removeItem('userdata');
          }
        }
        
        return Promise.reject(error);
      }
    );
    
    // Clean up interceptor
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    refreshTokens,
    checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};