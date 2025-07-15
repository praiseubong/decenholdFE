
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
  kycStatus: "pending" | "approved" | "rejected";
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  // Use API Gateway for auth endpoints, direct to User Service for user endpoints
  const API_GATEWAY_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";
  const USER_SERVICE_URL =
    import.meta.env.VITE_USER_SERVICE_URL || "http://localhost:3002";

  // Generate a simple device ID
  const getDeviceId = () => {
    let deviceId = localStorage.getItem("device_id");
    if (!deviceId) {
      deviceId = "device_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("device_id", deviceId);
    }
    return deviceId;
  };

  const checkOnboardingStatus = (userData: User) => {
    console.log("[ONBOARDING CHECK] User data:", userData);
    
    // Check if user needs onboarding (treat empty strings as incomplete)
    const needsProfile =
      !userData.fullName ||
      userData.fullName.trim() === "" ||
      !userData.phone ||
      userData.phone.trim() === "" ||
      !userData.gender ||
      userData.gender.trim() === "" ||
      !userData.dateOfBirth ||
      userData.dateOfBirth.trim() === "";
    
    console.log("[ONBOARDING CHECK] Needs profile:", needsProfile);
    console.log("[ONBOARDING CHECK] Full name:", userData.fullName);
    console.log("[ONBOARDING CHECK] Phone:", userData.phone);
    console.log("[ONBOARDING CHECK] Gender:", userData.gender);
    console.log("[ONBOARDING CHECK] DOB:", userData.dateOfBirth);
    
    setNeedsOnboarding(needsProfile);
    return needsProfile;
  };

  useEffect(() => {
    // Check for existing auth token and fetch user
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      console.log("[FETCH USER] Token exists:", !!token);
      
      const response = await fetch(`${API_GATEWAY_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("[FETCH USER] Response status:", response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log("[FETCH USER] User data received:", userData);
        setUser(userData);
        checkOnboardingStatus(userData);
      } else {
        console.log("[FETCH USER] Failed, removing token");
        localStorage.removeItem("auth_token");
        setUser(null);
        setNeedsOnboarding(false);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("auth_token");
      setUser(null);
      setNeedsOnboarding(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string) => {
    const deviceId = getDeviceId();
    console.log("[LOGIN] Required:", { email, "x-device-id": deviceId });
    const payload = { email };
    console.log("[LOGIN] Sending:", payload);
    const response = await fetch(`${API_GATEWAY_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-id": deviceId,
      },
      body: JSON.stringify(payload),
    });
    const resBody = await response.clone().text();
    console.log("[LOGIN] Received:", response.status, resBody);
    if (!response.ok) {
      throw new Error("Login failed");
    }
    console.log("OTP sent for login");
  };

  const signup = async (email: string) => {
    const deviceId = getDeviceId();
    const response = await fetch(`${API_GATEWAY_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-id": deviceId,
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    console.log("OTP sent for signup");
  };

  const verifyOTP = async (email: string, otp: string) => {
    const deviceId = getDeviceId();
    console.log("[VERIFY OTP] Required:", {
      email,
      otp,
      "x-device-id": deviceId,
    });
    const payload = { email, otp };
    console.log("[VERIFY OTP] Sending:", payload);
    const response = await fetch(`${API_GATEWAY_URL}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-device-id": deviceId,
      },
      body: JSON.stringify(payload),
    });
    const resBody = await response.clone().text();
    console.log("[VERIFY OTP] Received:", response.status, resBody);
    if (!response.ok) {
      throw new Error("OTP verification failed");
    }
    const parsed = JSON.parse(resBody);
    // Extract token from data.jwt, data.idToken, or data.accessToken
    const token =
      parsed.data?.jwt || parsed.data?.idToken || parsed.data?.accessToken;
    if (token) {
      localStorage.setItem("auth_token", token);
      await fetchUser();
    } else {
      throw new Error("No token received");
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("device_id");
    setUser(null);
    setNeedsOnboarding(false);
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const token = localStorage.getItem("auth_token");
      console.log("[UPDATE PROFILE] Sending data:", data);
      
      const response = await fetch(`${API_GATEWAY_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      console.log("[UPDATE PROFILE] Response status:", response.status);

      if (response.ok) {
        const updatedUser = await response.json();
        console.log("[UPDATE PROFILE] Updated user:", updatedUser);
        setUser(updatedUser);
        checkOnboardingStatus(updatedUser);
      } else {
        const errorText = await response.text();
        console.error("[UPDATE PROFILE] Error:", errorText);
        throw new Error("Profile update failed");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        verifyOTP,
        logout,
        updateProfile,
        needsOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
