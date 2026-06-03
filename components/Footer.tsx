"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { tr } = useLanguage();
  const f = tr.footer;

  return (
    <footer className="flex w-full flex-col border-t px-4 md:px-12 py-16 gap-10 border-t-[#1a1a1a33]">
      <div className="flex flex-wrap gap-12">
        <div className="flex w-[300px] flex-col shrink-0 gap-3.5">
          <div className="font-['Oswald'] text-[32px] leading-normal tracking-[5.12px] uppercase">
            Folio &amp; Co.
          </div>
          <p className="text-[#1a1a1aa6] text-sm italic leading-[1.55]">{f.tagline}</p>
          <div className="flex flex-col mt-2 gap-0.5">
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Digital — Founded In A Reading Chair
            </span>
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Reading Everywhere
            </span>
          </div>
        </div>

        <div className="flex flex-1 gap-12 flex-wrap">
          <div className="flex flex-col gap-3">
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{f.theEditor}</span>
            {[
              { label: f.draftingDesk, href: "/write" },
              { label: f.copyDesk, href: "/feed" },
              { label: f.researchDesk, href: "/feed" },
              { label: f.personalLibrary, href: "/library" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-[#1a1a1abf] text-sm leading-normal hover:text-[#1a1a1a] transition-colors">{item.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{f.theStudio}</span>
            {[
              { label: f.manifesto, href: "/manifesto" },
              { label: f.fieldJournal, href: "/journal" },
              { label: f.inThePress, href: "/" },
              { label: f.theBureau, href: "/" },
            ].map((item) => (
              <Link key={item.label} href={item.href} className="text-[#1a1a1abf] text-sm leading-normal hover:text-[#1a1a1a] transition-colors">{item.label}</Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{f.subscribe}</span>
            {[f.monthly, f.annual, f.patronEdition, f.giftSubscription].map((item) => (
              <Link key={item} href="/pricing" className="text-[#1a1a1abf] text-sm leading-normal hover:text-[#1a1a1a] transition-colors">{item}</Link>
            ))}
          </div>
        </div>

        <div className="flex w-[240px] flex-col shrink-0 gap-3">
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{f.colophon}</span>
          <p className="text-[#1a1a1aa6] text-[13px] italic leading-[1.6]">{f.colophonText}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-7 border-t gap-4 sm:gap-6 border-t-[#1a1a1a26]">
        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">{f.copyright}</span>
        <div className="flex gap-6">
          {[f.privacy, f.terms, "RSS"].map((item) => (
            <Link key={item} href="/" className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase hover:text-[#1a1a1a] transition-colors">{item}</Link>
          ))}
        </div>
        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">Every book deserves a conclusion</span>
      </div>
    </footer>
  );
}
