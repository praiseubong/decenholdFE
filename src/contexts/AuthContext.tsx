
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  kycStatus: 'pending' | 'approved' | 'rejected';
  emailVerified: boolean;
  profileCompleted: boolean;
  documentsUploaded: boolean;
  walletAddress?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  signup: (email: string) => Promise<void>;
  verifyOTP: (email: string, otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  needsOnboarding: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

  // Generate a simple device ID
  const getDeviceId = () => {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
      deviceId = 'device_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
  };

  useEffect(() => {
    // Check for existing auth token and fetch user
    const token = localStorage.getItem('auth_token');
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        
        // Check if user needs onboarding
        const needsProfile = !userData.fullName || !userData.phone || !userData.gender || !userData.dateOfBirth;
        setNeedsOnboarding(needsProfile);
      } else {
        localStorage.removeItem('auth_token');
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('auth_token');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string) => {
    const deviceId = getDeviceId();
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceId,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    console.log('OTP sent for login');
  };

  const signup = async (email: string) => {
    const deviceId = getDeviceId();
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceId,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    console.log('OTP sent for signup');
  };

  const verifyOTP = async (email: string, otp: string) => {
    const deviceId = getDeviceId();
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-device-id': deviceId,
      },
      body: JSON.stringify({ email, otp }),
    });

    if (!response.ok) {
      throw new Error('OTP verification failed');
    }

    const data = await response.json();
    const token = data.token || data.jwt || data.accessToken;
    
    if (token) {
      localStorage.setItem('auth_token', token);
      await fetchUser();
    } else {
      throw new Error('No token received');
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('device_id');
    setUser(null);
    setNeedsOnboarding(false);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const token = localStorage.getItem('auth_token');
      const response = await fetch(`${API_BASE_URL}/api/v1/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        
        // Check if onboarding is complete
        const needsProfile = !updatedUser.fullName || !updatedUser.phone || !updatedUser.gender || !updatedUser.dateOfBirth;
        setNeedsOnboarding(needsProfile);
      } else {
        throw new Error('Profile update failed');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      login,
      signup,
      verifyOTP,
      logout,
      updateProfile,
      needsOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
