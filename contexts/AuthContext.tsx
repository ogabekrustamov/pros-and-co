"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authModalOpen: boolean;
  authModalMode: "signin" | "signup";
  openAuthModal: (mode?: "signin" | "signup") => void;
  closeAuthModal: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("prose_user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setLoading(false);
  }, []);

  const openAuthModal = useCallback((mode: "signin" | "signup" = "signin") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const signIn = useCallback(async (email: string, _password: string) => {
    const u: User = { email, name: email.split("@")[0] };
    setUser(u);
    localStorage.setItem("prose_user", JSON.stringify(u));
    setAuthModalOpen(false);
    router.push("/editor");
  }, [router]);

  const signUp = useCallback(async (email: string, _password: string, name: string) => {
    const u: User = { email, name };
    setUser(u);
    localStorage.setItem("prose_user", JSON.stringify(u));
    setAuthModalOpen(false);
    router.push("/editor");
  }, [router]);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem("prose_user");
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, loading, authModalOpen, authModalMode, openAuthModal, closeAuthModal, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
