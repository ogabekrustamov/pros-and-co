"use client";

import { useState, useEffect, useRef } from "react";
import { X, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthModal() {
  const { authModalOpen, authModalMode, closeAuthModal, signIn, signUp } = useAuth();
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
