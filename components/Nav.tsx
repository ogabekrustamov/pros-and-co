"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Nav({
  ctaHref,
}: {
  ctaHref?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, openAuthModal, signOut } = useAuth();
  const { lang, toggleLang, tr } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isPricingPage = pathname === "/pricing";

  const handleCta = () => {
    if (user) {
      router.push("/editor");
    } else {
      openAuthModal(isPricingPage ? "signin" : "signup");
    }
    setMobileOpen(false);
  };

  const ctaText = user ? tr.nav.openEditor : tr.nav.subscribe;

  const links = [
    { label: tr.nav.theEditor, href: "/editor" },
    { label: tr.nav.manifesto, href: "/manifesto" },
    { label: tr.nav.library, href: "/library" },
    { label: tr.nav.pricing, href: "/pricing" },
    { label: tr.nav.journal, href: "/journal" },
  ];

  return (
    <>
      <nav className="flex h-[72px] shrink-0 items-center border-b px-4 md:px-12 py-0 gap-6 border-b-[#1a1a1a26]">
        <div className="hidden md:flex w-[200px] shrink-0 items-center gap-2.5">
          <div className="size-2 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2.42px] uppercase">
            {tr.nav.issue}
          </span>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.42px] uppercase">
            {tr.nav.vol}
          </span>
        </div>

        <div className="flex justify-start md:justify-center items-center flex-1">
          <Link
            href="/"
            className="font-['Oswald'] text-[22px] font-medium leading-normal tracking-[3.96px] uppercase"
          >
            Prose &amp; Co.
          </Link>
        </div>

        {/* Desktop nav links */}
        <div className="hidden md:flex shrink-0 items-center gap-7">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  "font-['Oswald'] text-xs leading-normal tracking-[2.4px] uppercase transition-colors",
                  active
                    ? "text-[#1a1a1a] pb-0.5 border-b-2 border-b-[#2563eb]"
                    : "text-[#1a1a1ab3] hover:text-[#1a1a1a]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop right actions */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="flex items-center gap-0 font-['Oswald'] text-[11px] leading-normal tracking-[2px] uppercase"
            title="Switch language / Tilni o'zgartirish"
          >
            <span className={lang === "en" ? "text-[#1a1a1a]" : "text-[#1a1a1a4d] hover:text-[#1a1a1a8c] transition-colors"}>
              EN
            </span>
            <span className="text-[#1a1a1a26] mx-1.5">/</span>
            <span className={lang === "uz" ? "text-[#2563eb]" : "text-[#1a1a1a4d] hover:text-[#1a1a1a8c] transition-colors"}>
              UZ
            </span>
          </button>

          {user && (
            <button
              onClick={signOut}
              className="font-['Oswald'] text-xs leading-normal tracking-[2.4px] uppercase text-[#1a1a1a8c] hover:text-[#1a1a1a] transition-colors"
            >
              {tr.nav.signOut}
            </button>
          )}
          <button
            onClick={handleCta}
            className="flex h-10 shrink-0 items-center bg-[#1a1a1a] px-[18px] py-0 gap-2 hover:bg-[#2563eb] transition-colors"
          >
            <span className="text-[#f7f6f3] font-['Oswald'] text-xs leading-normal tracking-[2.4px] uppercase">
              {ctaText}
            </span>
            <ArrowRight size={14} color="#f7f6f3" strokeWidth={2} />
          </button>
        </div>

        {/* Mobile: CTA + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={handleCta}
            className="flex h-9 shrink-0 items-center bg-[#1a1a1a] px-4 gap-2 hover:bg-[#2563eb] transition-colors"
          >
            <span className="text-[#f7f6f3] font-['Oswald'] text-[11px] leading-normal tracking-[2px] uppercase">
              {ctaText}
            </span>
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="p-1 text-[#1a1a1a]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="flex md:hidden flex-col bg-[#f7f6f3] border-b border-b-[#1a1a1a26] px-4 pb-5">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={[
                  "py-3.5 border-b border-b-[#1a1a1a0f] font-['Oswald'] text-xs leading-normal tracking-[2.4px] uppercase transition-colors",
                  active ? "text-[#2563eb]" : "text-[#1a1a1ab3]",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={toggleLang}
              className="flex items-center font-['Oswald'] text-[11px] leading-normal tracking-[2px] uppercase"
            >
              <span className={lang === "en" ? "text-[#1a1a1a]" : "text-[#1a1a1a4d]"}>EN</span>
              <span className="text-[#1a1a1a26] mx-1.5">/</span>
              <span className={lang === "uz" ? "text-[#2563eb]" : "text-[#1a1a1a4d]"}>UZ</span>
            </button>
            {user && (
              <button
                onClick={() => { signOut(); setMobileOpen(false); }}
                className="font-['Oswald'] text-xs leading-normal tracking-[2.4px] uppercase text-[#1a1a1a8c]"
              >
                {tr.nav.signOut}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
