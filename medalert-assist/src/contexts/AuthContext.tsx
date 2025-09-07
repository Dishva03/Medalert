import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AuthService, { LoginCredentials, SignupCredentials } from "../services/auth.service";

interface User {
  _id: string;
  photoUrl?: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to safely parse JSON from localStorage
const safelyParseJSON = (value: string | null): any => {
  if (!value || value === "null" || value === "undefined") {
    return null;
  }
  
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (error) {
    console.error("Error parsing JSON from localStorage:", error);
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Initialize user state from localStorage if available
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("medalert-user");
    const parsedUser = safelyParseJSON(savedUser);
    
    if (parsedUser && parsedUser._id && parsedUser.email) {
      return parsedUser;
    }
    
    // Clear invalid data
    if (savedUser) {
      localStorage.removeItem("medalert-user");
    }
    return null;
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("medalert-token");
      if (token && !user) {
        try {
          setLoading(true);
          const userData = await AuthService.getCurrentUser();
          setUser(userData);
        } catch (err) {
          // Token might be invalid or expired
          localStorage.removeItem("medalert-token");
          localStorage.removeItem("medalert-user");
        } finally {
          setLoading(false);
        }
      }
    };

    checkAuthStatus();
  }, [user]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.login(credentials);
      setUser(response.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (credentials: SignupCredentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AuthService.signup(credentials);
      setUser(response.user);
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthService.logout();
      setUser(null);
      // Clear local storage on logout
      localStorage.removeItem("medalert-token");
      localStorage.removeItem("medalert-user");
    } catch (err: any) {
      setError(err.response?.data?.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("medalert-user", JSON.stringify(user));
      } catch (error) {
        console.error("Error saving user to localStorage:", error);
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
