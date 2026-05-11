import React, { createContext, useContext, useState, useEffect } from "react";
import { DEMO_AUTH } from "@/lib/auth-mode";

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
/** Default matches Replit / local api-server when PORT=5000 */
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

function demoUserId(email: string): string {
  const normalized = email.toLowerCase();
  let h = 5381;
  for (let i = 0; i < normalized.length; i++) {
    h = Math.imul(h, 33) ^ normalized.charCodeAt(i);
  }
  return `demo-${(h >>> 0).toString(16)}`;
}

function buildDemoUser(name: string, email: string): User {
  const today = new Date().toISOString().slice(0, 10);
  return {
    id: demoUserId(email),
    name: name.trim() || email.split("@")[0] || "Member",
    email: email.toLowerCase().trim(),
    plan: "free",
    joinedAt: today,
    sex: "male",
    dob: "1985-06-15",
  };
}

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

const DEFAULT_USER: User = {
  id: "free-user",
  name: "Robert",
  email: "rbabiarz@gmail.com",
  plan: "premium",
  joinedAt: "2024-01-01",
  sex: "male",
  dob: "1985-06-15",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Free site: always signed in as default user
  }, []);

  const persist = (u: User) => {
    setUser(u);
    localStorage.setItem("insightblood_user", JSON.stringify(u));
  };

  const login = async (email: string, _password: string) => {
    if (DEMO_AUTH) {
      persist(buildDemoUser(email.split("@")[0] || "Member", email));
      return;
    }
    const data = await apiRequest<{ user: User }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password: _password }),
    });
    persist(data.user);
  };

  const signup = async (name: string, email: string, _password: string) => {
    if (DEMO_AUTH) {
      persist(buildDemoUser(name, email));
      return;
    }
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
