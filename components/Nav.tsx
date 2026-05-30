"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { label: "The Editor", href: "/editor" },
  { label: "Manifesto", href: "/manifesto" },
  { label: "Library", href: "/library" },
  { label: "Pricing", href: "/pricing" },
  { label: "Journal", href: "/journal" },
];

export default function Nav({
  ctaLabel = "Subscribe",
  ctaHref,
}: {
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, openAuthModal, signOut } = useAuth();

  const isPricingPage = pathname === "/pricing";

  const handleCta = () => {
    if (user) {
      router.push("/editor");
    } else {
      openAuthModal(isPricingPage ? "signin" : "signup");
    }
  };

  const ctaText = user
    ? "Open Editor"
    : ctaLabel;

  return (
    <nav className="flex h-[72px] shrink-0 items-center border-b px-12 py-0 gap-6 border-b-[#1a1a1a26]">
      <div className="flex w-[200px] shrink-0 items-center gap-2.5">
        <div className="size-2 bg-[#2563eb]" />
        <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2.42px] uppercase">
          Issue 014
        </span>
        <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.42px] uppercase">
          Vol. III
        </span>
      </div>

      <div className="flex justify-center items-center flex-1">
        <Link
          href="/"
          className="font-['Oswald'] text-[22px] font-medium leading-normal tracking-[3.96px] uppercase"
        >
          Prose &amp; Co.
        </Link>
      </div>

      <div className="flex shrink-0 items-center gap-7">
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

      <div className="flex items-center gap-3">
        {user && (
          <button
            onClick={signOut}
            className="font-['Oswald'] text-xs leading-normal tracking-[2.4px] uppercase text-[#1a1a1a8c] hover:text-[#1a1a1a] transition-colors"
          >
            Sign Out
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
    </nav>
  );
}
