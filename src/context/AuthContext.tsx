import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("clickors_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, _password?: string) => {
    // Mock login delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simple verification (allowing any email for mock)
    const newUser = { id: Math.random().toString(36).substr(2, 9), email, name: email.split("@")[0] };
    setUser(newUser);
    localStorage.setItem("clickors_user", JSON.stringify(newUser));
  };

  const register = async (name: string, email: string, _password?: string) => {
    // Mock register delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newUser = { id: Math.random().toString(36).substr(2, 9), email, name };
    setUser(newUser);
    localStorage.setItem("clickors_user", JSON.stringify(newUser));
  };

  const updateProfile = (name: string, email: string) => {
    if (user) {
      const updatedUser = { ...user, name, email };
      setUser(updatedUser);
      localStorage.setItem("clickors_user", JSON.stringify(updatedUser));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("clickors_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
