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
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000";

async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });
  if (!response.ok) {
    let message = "Request failed";
    try {
      const body = (await response.json()) as { error?: string };
      if (body.error) message = body.error;
    } catch {
      // Ignore JSON parse failures for non-JSON errors.
    }
    throw new Error(message);
  }
  return (await response.json()) as T;
}

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
    const data = await apiRequest<{ user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password: _password }),
    });
    persist(data.user);
  };

  const signup = async (name: string, email: string, _password: string) => {
    const data = await apiRequest<{ user: User }>("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password: _password }),
    });
    persist(data.user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("insightblood_user");
  };

  const upgradeToPremium = () => {
    if (user) persist({ ...user, plan: "premium" });
  };

  const updateProfile = (updates: Partial<Pick<User, "name" | "email" | "sex" | "dob">>) => {
    if (!user) return;
    apiRequest<{ user: User }>("/api/auth/me", {
      method: "PATCH",
      body: JSON.stringify({
        id: user.id,
        ...updates,
      }),
    })
      .then((data) => persist(data.user))
      .catch(() => {
        // Keep the UX responsive even if API write fails.
        persist({ ...user, ...updates });
      });
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
