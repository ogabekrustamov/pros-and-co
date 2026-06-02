"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  FadeIn,
  Stagger,
  StaggerItem,
  HeroLine,
  SlideIn,
  HoverLift,
  CountUp,
} from "@/components/animations";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EditorialPage() {
  const { tr } = useLanguage();
  const h = tr.home;
  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a] overflow-clip">
      <Nav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="flex relative w-full flex-col pt-10 pb-16 px-12 gap-7 overflow-clip">
        <FadeIn className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              {h.dispatch}
            </span>
          </div>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            P. 001 / 064
          </span>
        </FadeIn>

        {/* Cover image */}
        <FadeIn delay={0.1}>
          <div className="relative w-full h-[560px] bg-[#1a1a1a] overflow-clip">
            <div
              className="absolute inset-0 bg-cover bg-no-repeat grayscale"
              style={{
                backgroundImage:
                  "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/79f7acf44e7ad0b0348b3f5c42df0fe646affee7905a3c19c282de028782d2ff.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0)_30%,_rgb(10,10,10)_100%)]" />
            <div className="absolute flex items-center z-20 left-8 bottom-6 gap-2.5">
              <div className="flex w-[18px] h-0.5 bg-[#2563eb]" />
              <span className="text-[#f7f6f3d9] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
                {h.plateCaption1}
              </span>
            </div>

            {/* Editor window mockup */}
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <div className="w-[720px] shadow-[0px_40px_80px_-20px_rgba(0,0,0,0.55),0px_20px_40px_-10px_rgba(0,0,0,0.45)] rotate-[-4deg]">
                <div className="bg-[#f7f6f3] border border-[#1a1a1a33]">
                  <div className="flex h-9 items-center bg-[#eceae4] border-b border-b-[#1a1a1a26] px-3.5 gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="size-[11px] bg-[#ff5f57] rounded-full" />
                      <div className="size-[11px] bg-[#febc2e] rounded-full" />
                      <div className="size-[11px] bg-[#28c840] rounded-full" />
                    </div>
                    <div className="flex h-[22px] items-center bg-[#f7f6f3] border border-[#1a1a1a1a] flex-1 mx-12 gap-2 px-2">
                      <span className="text-[#1a1a1ab3] font-['Oswald'] text-[10px] tracking-0.5 uppercase">
                        prose.co / editor / the-writing-machine
                      </span>
                    </div>
                  </div>
                  <div className="flex p-6 gap-4">
                    <div className="flex flex-col gap-3 flex-1">
                      <span className="text-[#2563eb] font-['Oswald'] text-[10px] tracking-[2.8px] uppercase">
                        Chapter Three
                      </span>
                      <h2 className="font-['Oswald'] text-3xl leading-none tracking-[-0.34px] uppercase">
                        On The Difficulty Of Plain Speech
                      </h2>
                      <p className="text-[#1a1a1ad9] text-sm leading-[1.65]">
                        The cursor blinks like a metronome and the page, as always, refuses. One writes a sentence, then a second; the second betrays the first.{" "}
                        <span className="bg-[#2563eb26] px-0.5">
                          Plain speech is the most expensive thing on earth
                        </span>{" "}
                        — ask anyone who has tried to mean exactly what they said.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Hero headline */}
        <div className="flex flex-col font-['Oswald'] text-[clamp(72px,12vw,180px)] font-medium leading-[0.92] tracking-[-3.6px] uppercase overflow-hidden">
          <HeroLine delay={0.15}>{h.heroLine1}</HeroLine>
          <HeroLine delay={0.28}>{h.heroLine2}</HeroLine>
        </div>

        <div className="flex w-full justify-between items-end gap-12">
          <FadeIn delay={0.35} className="flex max-w-[520px] flex-col gap-[18px]">
            <p className="text-[#1a1a1ad9] text-[19px] leading-[1.55]">
              {h.tagline}
            </p>
            <div className="flex items-center mt-1.5 gap-6">
              <Link
                href="/editor"
                className="group flex h-[52px] items-center bg-[#2563eb] px-[22px] gap-2.5 hover:bg-[#1d4ed8] transition-colors"
              >
                <span className="text-[#f7f6f3] font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase">
                  {h.openEditor}
                </span>
                <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="/manifesto" className="flex flex-col group">
                <span className="font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase group-hover:text-[#2563eb] transition-colors">
                  {h.readManifesto}
                </span>
                <div className="h-0.5 bg-[#1a1a1a] mt-1 group-hover:bg-[#2563eb] transition-colors" />
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.45} className="flex items-end pb-1 gap-10">
            <div className="flex flex-col gap-1">
              <span className="font-['Oswald'] text-[44px] leading-none">
                <CountUp value={2_400_000} millions />
              </span>
              <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
                {h.draftsSaved}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-['Oswald'] text-[44px] leading-none">
                <CountUp value={47} />
              </span>
              <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
                {h.countriesReading}
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Manifesto pull quote ──────────────────────── */}
      <section className="flex w-full border-t border-b px-12 py-[88px] gap-16 border-y-[#1a1a1a26]">
        <SlideIn direction="left" className="flex w-[220px] flex-col shrink-0 gap-3">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            {h.briefManifesto}
          </span>
          <span className="text-[#1a1a1a8c] text-sm italic leading-normal">
            {h.manifestoLocation}
          </span>
        </SlideIn>
        <FadeIn className="flex flex-col flex-1 gap-5">
          <div className="flex flex-wrap gap-x-4 font-['Oswald'] text-[clamp(36px,5vw,64px)] leading-[0.98] tracking-[-0.96px] uppercase">
            <span>{h.manifestoQuote}</span>
          </div>
          <div className="flex items-center mt-2 gap-4">
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              § 01.
            </span>
            <p className="max-w-[640px] text-[#1a1a1ab3] text-[15px] leading-[1.55]">
              {h.manifestoBody}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ── Three desks ──────────────────────────────── */}
      <section className="flex w-full flex-col px-12 py-[112px] gap-12">
        <FadeIn className="flex justify-between items-end pb-8 border-b gap-12 border-b-[#1a1a1a26]">
          <div className="flex max-w-[760px] flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                {h.bureauLabel}
              </span>
            </div>
            <div className="flex flex-col font-['Oswald'] text-[clamp(48px,7vw,96px)] leading-[0.92] tracking-[-1.92px] uppercase">
              <span>{h.bureauHeadline1}</span>
              <span>{h.bureauHeadline2}</span>
            </div>
          </div>
          <p className="max-w-[360px] pb-3 text-[#1a1a1abf] text-base leading-[1.6]">
            {h.bureauSubtitle}
          </p>
        </FadeIn>

        <Stagger className="flex">
          {h.desks.map((desk: { no: string; label: string; title: string; body: string; note: string }) => (
            <StaggerItem key={desk.no} className="flex-1">
              <HoverLift className="flex flex-col h-full p-9 gap-[18px] border-l first:border-l-0 border-l-[#1a1a1a1a] cursor-default">
                <div className="flex justify-between items-center">
                  <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                    {desk.no}
                  </span>
                  <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
                    {desk.label}
                  </span>
                </div>
                <h3 className="mt-3 font-['Oswald'] text-[34px] leading-none tracking-[-0.34px] uppercase">
                  {desk.title}
                </h3>
                <p className="text-[#1a1a1acc] text-[15px] leading-[1.6]">{desk.body}</p>
                <div className="flex items-center pt-4 mt-2 border-t gap-2.5 border-t-[#1a1a1a1a]">
                  <div className="size-2 rounded-full bg-[#2563eb]" />
                  <span className="text-[#1a1a1a8c] text-[13px] italic leading-normal">
                    {desk.note}
                  </span>
                </div>
              </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── Press quote ──────────────────────────────── */}
      <section className="flex w-full bg-[#1a1a1a] text-[#f7f6f3] px-12 py-[112px] gap-16">
        <SlideIn direction="left" className="relative w-[440px] h-[520px] flex-col shrink-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat grayscale"
            style={{
              backgroundImage:
                "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/8c87c8525a0fa08bffa3264aa43e5ad1503a8c871525ffed337841d2aeb7d1c1.jpg')",
            }}
          />
          <div className="absolute flex items-center left-4 bottom-4 gap-2.5">
            <div className="flex w-[18px] h-0.5 bg-[#2563eb]" />
            <span className="text-[#f7f6f3cc] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              {h.plateCaption2}
            </span>
          </div>
        </SlideIn>
        <FadeIn delay={0.15} className="flex flex-col justify-between flex-1 py-2 gap-10">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                {h.pressLabel}
              </span>
            </div>
            <div className="h-[60px] text-[#2563eb] text-[120px] leading-[0.6]">"</div>
            <p className="max-w-[760px] text-[42px] leading-[1.18] tracking-[-0.42px]">
              {h.pressQuote}
            </p>
          </div>
          <div className="flex justify-between items-end pt-7 border-t gap-8 border-t-[#f7f6f333]">
            <div className="flex flex-col gap-1.5">
              <span className="font-['Oswald'] text-lg leading-normal tracking-[1.08px] uppercase">
                {h.pressName}
              </span>
              <span className="text-[#f7f6f3a6] text-sm italic leading-normal">
                {h.pressTitle}
              </span>
            </div>
            <div className="flex items-center gap-7">
              {["Continental Rev.", "Field Journal", "Atlas Weekly", "In The Margins"].map((pub, i) => (
                <span key={pub} className="flex items-center gap-7 text-[#f7f6f3b3] font-['Oswald'] text-xs leading-normal tracking-[2.88px] uppercase">
                  {i > 0 && <span className="inline-block w-px h-3 bg-[#f7f6f340]" />}
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="flex w-full flex-col px-12 py-[128px] gap-10">
        <FadeIn className="flex items-center gap-3">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            Become A Subscriber — 14 Days, On The House
          </span>
        </FadeIn>

        <div className="flex flex-col font-['Oswald'] text-[clamp(64px,10vw,140px)] leading-[0.92] tracking-[-2.8px] uppercase overflow-hidden">
          <HeroLine delay={0}>Write The Thing</HeroLine>
          <HeroLine delay={0.13}>You&apos;ve Been Avoiding.</HeroLine>
        </div>

        <FadeIn delay={0.2} className="flex justify-between items-end mt-4 gap-12">
          <div className="flex w-[560px] h-14 border border-[#1a1a1a]">
            <div className="flex items-center flex-1 px-[18px]">
              <span className="text-[#1a1a1a8c] text-[15px] italic leading-normal">
                your@editorial.address
              </span>
            </div>
            <Link
              href="/pricing"
              className="group flex items-center bg-[#2563eb] px-[22px] gap-2.5 hover:bg-[#1d4ed8] transition-colors"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase">
                Begin Issue 014
              </span>
              <ArrowRight size={14} color="#f7f6f3" strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
          <div className="flex max-w-[360px] flex-col text-right gap-1.5">
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              No Card — Cancel By Postcard
            </span>
            <p className="text-[#1a1a1ab3] text-sm italic leading-normal text-right">
              Or read three free essays first — we are in no rush, and neither is your draft.
            </p>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
