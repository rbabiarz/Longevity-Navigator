import React, { createContext, useContext, useState, useEffect } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  plan: "free" | "premium";
  joinedAt: string;
  sex: "male" | "female";
  dob: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeToPremium: () => void;
  updateProfile: (updates: Partial<Pick<User, "name" | "email" | "sex" | "dob">>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const DEMO_USER: User = {
  id: "u_demo123",
  name: "Alex Chen",
  email: "alex@example.com",
  plan: "free",
  joinedAt: "2024-11-01",
  sex: "male",
  dob: "1985-06-15",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("insightblood_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("insightblood_user");
      }
    }
    setIsLoading(false);
  }, []);

  const persist = (u: User) => {
    setUser(u);
    localStorage.setItem("insightblood_user", JSON.stringify(u));
  };

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 900));
    persist({ ...DEMO_USER, email });
  };

  const signup = async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 1100));
    persist({ ...DEMO_USER, name, email });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("insightblood_user");
  };

  const upgradeToPremium = () => {
    if (user) persist({ ...user, plan: "premium" });
  };

  const updateProfile = (updates: Partial<Pick<User, "name" | "email" | "sex" | "dob">>) => {
    if (user) persist({ ...user, ...updates });
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, upgradeToPremium, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
