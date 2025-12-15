"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "@/types";

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read auth state from localStorage on mount
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("authUser");
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { mockLogin } = await import("@/services/authService");
      const result = await mockLogin(username, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem("authUser", JSON.stringify(result.user));
        return { success: true };
      } else {
        return { success: false, error: result.error || "Login failed" };
      }
    } catch (error) {
      return { success: false, error: "An error occurred during login" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const refreshUser = async () => {
    if (!user) return;
    
    try {
      const { mockGetCurrentUser } = await import("@/services/authService");
      const account = await mockGetCurrentUser(user.id);
      if (account) {
        const updatedUser: AuthUser = {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role,
        };
        setUser(updatedUser);
        localStorage.setItem("authUser", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error refreshing user:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin,
        login,
        logout,
        refreshUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

