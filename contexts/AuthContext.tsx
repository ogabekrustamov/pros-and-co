"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  useSession,
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from "next-auth/react";
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
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<"signin" | "signup">("signin");
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("prose_user");
      if (stored) setLocalUser(JSON.parse(stored));
    } catch {}
    setLocalLoading(false);
  }, []);

  const sessionUser: User | null = session?.user
    ? {
        email: session.user.email ?? "",
        name: session.user.name ?? session.user.email?.split("@")[0] ?? "",
      }
    : null;

  const user = sessionUser ?? localUser;
  const loading = status === "loading" || localLoading;

  const openAuthModal = useCallback((mode: "signin" | "signup" = "signin") => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => setAuthModalOpen(false), []);

  const signIn = useCallback(async (email: string, _password: string) => {
    const u: User = { email, name: email.split("@")[0] };
    setLocalUser(u);
    localStorage.setItem("prose_user", JSON.stringify(u));
    setAuthModalOpen(false);
    router.push("/editor");
  }, [router]);

  const signUp = useCallback(async (email: string, _password: string, name: string) => {
    const u: User = { email, name };
    setLocalUser(u);
    localStorage.setItem("prose_user", JSON.stringify(u));
    setAuthModalOpen(false);
    router.push("/editor");
  }, [router]);

  const signInWithGoogle = useCallback(async () => {
    await nextAuthSignIn("google", { callbackUrl: "/editor" });
  }, []);

  const signOut = useCallback(() => {
    setLocalUser(null);
    localStorage.removeItem("prose_user");
    if (session) {
      nextAuthSignOut({ callbackUrl: "/" });
    } else {
      router.push("/");
    }
  }, [router, session]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
      }}
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
