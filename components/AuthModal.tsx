"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
    </svg>
  );
}

export default function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal, signIn, signUp, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">(authModalMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMode(authModalMode);
    setError("");
  }, [authModalMode]);

  useEffect(() => {
    if (authModalOpen) {
      setName(""); setEmail(""); setPassword(""); setError("");
      setTimeout(() => emailRef.current?.focus(), 80);
    }
  }, [authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError("Please enter your name.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email.trim(), password);
      } else {
        await signUp(email.trim(), password, name.trim());
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/60 backdrop-blur-sm"
      onClick={closeAuthModal}
    >
      <div
        className="relative bg-[#f7f6f3] w-full max-w-[480px] mx-4 p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-[#1a1a1a8c] hover:text-[#1a1a1a] transition-colors"
        >
          <X size={16} strokeWidth={2} />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-8">
          <div className="size-2 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-base font-medium tracking-[2.88px] uppercase">
            Prose &amp; Co.
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-b-[#1a1a1a26] mb-8">
          {(["signin", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(""); }}
              className={[
                "pb-3 mr-6 font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase transition-colors",
                mode === m
                  ? "border-b-2 border-b-[#2563eb] text-[#1a1a1a]"
                  : "text-[#1a1a1a8c] hover:text-[#1a1a1a]",
              ].join(" ")}
            >
              {m === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <div className="flex flex-col gap-1.5">
              <label className="font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase text-[#1a1a1a8c]">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="M. Reinhardt"
                className="h-11 border border-[#1a1a1a26] px-3 bg-transparent text-[15px] outline-none focus:border-[#2563eb] transition-colors placeholder:text-[#1a1a1a4d] placeholder:italic"
              />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase text-[#1a1a1a8c]">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@editorial.address"
              className="h-11 border border-[#1a1a1a26] px-3 bg-transparent text-[15px] outline-none focus:border-[#2563eb] transition-colors placeholder:text-[#1a1a1a4d] placeholder:italic"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase text-[#1a1a1a8c]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 border border-[#1a1a1a26] px-3 bg-transparent text-[15px] outline-none focus:border-[#2563eb] transition-colors placeholder:text-[#1a1a1a4d]"
            />
          </div>

          {error && (
            <p className="text-[13px] italic text-[#1a1a1a8c]">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex h-12 items-center justify-between bg-[#2563eb] px-5 mt-2 hover:bg-[#1d4ed8] transition-colors disabled:opacity-60"
          >
            <span className="font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase text-[#f7f6f3]">
              {loading
                ? "One moment…"
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </span>
            <ArrowRight size={14} color="#f7f6f3" strokeWidth={2} />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 mt-5">
          <div className="flex-1 h-px bg-[#1a1a1a1a]" />
          <span className="font-['Oswald'] text-[9px] tracking-[2px] uppercase text-[#1a1a1a4d]">or</span>
          <div className="flex-1 h-px bg-[#1a1a1a1a]" />
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={signInWithGoogle}
          className="flex h-12 w-full items-center justify-center gap-3 border border-[#1a1a1a26] mt-3 hover:border-[#1a1a1a66] hover:bg-[#f0efe9] transition-colors"
        >
          <GoogleIcon />
          <span className="font-['Oswald'] text-[12px] leading-normal tracking-[2.4px] uppercase text-[#1a1a1a]">
            Continue with Google
          </span>
        </button>

        {mode === "signup" && (
          <p className="mt-5 text-[#1a1a1a8c] text-[12px] italic leading-normal">
            Fourteen days on The Annual, no card required.
          </p>
        )}

        <p className="mt-4 text-[#1a1a1a8c] text-[12px] leading-normal">
          {mode === "signin" ? (
            <>
              No account?{" "}
              <button onClick={() => setMode("signup")} className="underline hover:text-[#2563eb] transition-colors">
                Create one.
              </button>
            </>
          ) : (
            <>
              Already a subscriber?{" "}
              <button onClick={() => setMode("signin")} className="underline hover:text-[#2563eb] transition-colors">
                Sign in.
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
