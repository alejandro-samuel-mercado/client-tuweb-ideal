"use client";

import { API_URL } from "@/config";
import Logger from "@/lib/logger";
import { useRouter } from "next/navigation";
import {
      ReactNode,
      createContext,
      useContext,
      useEffect,
      useState,
} from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();



  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/current_user`, {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      Logger.error("Auth check failed", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        router.push("/dashboard");
      } else {
        const error = await res.json();
        alert(error.message || "Error al iniciar sesión");
      }
    } catch (error) {
      Logger.error("Login failed", error);
      alert("Error de conexión");
    }
  };

  const register = async (data: any) => {
    try {
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (res.ok) {
        const responseData = await res.json();
        setUser(responseData.user);
        router.push("/dashboard");
      } else {
        const error = await res.json();
        alert(error.message || "Error al registrarse");
      }
    } catch (error) {
      Logger.error("Register failed", error);
      alert("Error de conexión");
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        credentials: "include",
      });
      setUser(null);
      router.push("/login");
    } catch (error) {
      Logger.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, checkAuth }}
    >
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
