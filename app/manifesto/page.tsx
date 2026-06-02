"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FadeIn, Stagger, StaggerItem, HeroLine, SlideIn, RevealLine } from "@/components/animations";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ManifestoPage() {
  const { tr } = useLanguage();
  const m = tr.manifesto;

  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="flex relative w-full flex-col px-4 md:px-12 py-10 md:py-20 gap-7">
        <FadeIn className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{m.label}</span>
          </div>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">P. 002 / 064</span>
        </FadeIn>

        <div className="flex flex-col gap-4">
          <HeroLine delay={0.05}>
            <p className="text-[#1a1a1aa6] text-[22px] md:text-[28px] italic leading-normal">{m.subtitle}</p>
          </HeroLine>
          <div className="flex flex-col font-['Oswald'] font-medium leading-[0.88] uppercase overflow-hidden">
            <RevealLine delay={0.1}><span className="text-[clamp(56px,16vw,220px)] tracking-[-5.5px] block">{m.line1}</span></RevealLine>
            <RevealLine delay={0.22}><span className="text-[clamp(56px,16vw,220px)] tracking-[-5.5px] block">{m.line2}</span></RevealLine>
            <RevealLine delay={0.34}><span className="text-[#2563eb] text-[clamp(56px,16vw,220px)] tracking-[-5.5px] block">{m.line3}</span></RevealLine>
          </div>
        </div>

        <FadeIn delay={0.5} className="flex flex-col sm:flex-row justify-between items-start sm:items-end pt-10 mt-4 border-t gap-6 sm:gap-12 border-t-[#1a1a1a33]">
          <div className="flex items-center gap-5">
            <div className="size-14 bg-cover bg-no-repeat grayscale shrink-0"
              style={{ backgroundImage: "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/ce94a7a8c90a64c8826dc81646696dfbd5b5c210ae88c39214676f6c65feca95.jpg')" }} />
            <div className="flex flex-col gap-1">
              <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">{m.draftedBy}</span>
              <span className="font-['Oswald'] text-base tracking-[1.92px] uppercase">{m.draftedByName}</span>
            </div>
          </div>
          <div className="flex gap-8 sm:gap-12">
            <div className="flex flex-col gap-1">
              <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">{m.edition}</span>
              <span className="font-['Oswald'] text-base tracking-[1.92px] uppercase">{m.editionValue}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">{m.readIn}</span>
              <span className="font-['Oswald'] text-base tracking-[1.92px] uppercase">{m.readInValue}</span>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── § 01 The Premise ─────────────────────────── */}
      <section className="flex flex-col md:flex-row w-full border-t px-4 md:px-12 py-12 md:py-24 gap-8 md:gap-20 border-t-[#1a1a1a33]">
        <div className="flex max-w-full md:max-w-[820px] flex-col flex-1 gap-7">
          <FadeIn className="flex items-center gap-3">
            <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">§ 01.</span>
            <span className="text-[#1a1a1aa6] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{m.s01label}</span>
          </FadeIn>
          <FadeIn delay={0.05} className="flex items-start gap-3 md:gap-5">
            <span className="shrink-0 font-['Oswald'] text-[80px] md:text-[180px] leading-[0.78] tracking-[-7.2px] uppercase">{m.s01drop}</span>
            <p className="pt-2 text-[#1a1a1a] text-lg md:text-xl leading-[1.55]">{m.s01body1}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[#1a1a1ae6] text-base md:text-lg leading-[1.65]">{m.s01body2}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <blockquote className="max-w-[680px] pl-5 md:pl-7 text-[#1a1a1a] text-2xl md:text-4xl italic leading-tight my-4 border-l-[3px] border-l-[#2563eb]">
              &ldquo;{m.s02quote}&rdquo;
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#1a1a1ae6] text-base md:text-lg leading-[1.65]">{m.s02body}</p>
          </FadeIn>
        </div>

        <SlideIn direction="right" className="flex w-full md:w-[320px] flex-col shrink-0 pt-2 gap-7">
          <div className="flex flex-col pl-5 border-l gap-2.5 border-l-[#1a1a1a33]">
            <span className="text-[#2563eb] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">Marginalia — Note 1</span>
            <p className="text-[#1a1a1abf] text-[15px] italic leading-[1.55]">
              &ldquo;Speed is a virtue in messengers, not in editors.&rdquo; — pinned above M. Reinhardt&apos;s desk, on a strip of masking tape.
            </p>
          </div>
          <div className="flex flex-col border p-5 gap-2.5 border-[#1a1a1a33]">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">An Honest Number</span>
            <div className="flex items-baseline gap-[18px]">
              <span className="font-['Oswald'] text-7xl leading-[0.9]">71</span>
              <span className="text-[#2563eb] font-['Oswald'] text-[28px] leading-[0.9]">%</span>
            </div>
            <p className="text-[#1a1a1ab3] text-[13px] leading-normal">
              Of our subscribers told us, unprompted, that the Editor &ldquo;does less than I expected, on purpose.&rdquo; We took it as a compliment.
            </p>
          </div>
          <div className="flex flex-col pl-5 border-l gap-2.5 border-l-[#1a1a1a33]">
            <span className="text-[#2563eb] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">Marginalia — Note 2</span>
            <p className="text-[#1a1a1abf] text-[15px] italic leading-[1.55]">
              If the room expects the word, the Editor will quietly suggest the second-best one. Surprise is a feature.
            </p>
          </div>
        </SlideIn>
      </section>

      {/* ── § 02 Five Tenets ─────────────────────────── */}
      <section className="flex w-full flex-col bg-[#1a1a1a] text-[#f7f6f3] px-4 md:px-12 py-12 md:py-[112px] gap-12">
        <FadeIn className="flex flex-col md:flex-row justify-between items-start md:items-end pb-7 border-b gap-5 md:gap-12 border-b-[#f7f6f333]">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{m.s02sectionLabel}</span>
            </div>
            <span className="font-['Oswald'] text-[clamp(36px,8vw,112px)] leading-[0.92] tracking-[-2.24px] uppercase">{m.s02headline}</span>
          </div>
          <p className="max-w-full md:max-w-[320px] pb-0 md:pb-4 text-[#f7f6f3a6] text-base italic">{m.s02sub}</p>
        </FadeIn>

        <Stagger className="flex flex-col">
          {m.tenets.map((t: { n: string; title: string; body: string }) => (
            <StaggerItem key={t.n} className="flex border-b py-7 md:py-9 gap-5 md:gap-10 border-b-[#f7f6f326]">
              <span className="w-12 md:w-[160px] shrink-0 text-[#2563eb] font-['Oswald'] text-5xl md:text-8xl leading-[0.9] tracking-[-1.92px]">{t.n}</span>
              <div className="flex flex-col pt-1 md:pt-2 flex-1 gap-3.5">
                <h3 className="font-['Oswald'] text-[28px] md:text-[44px] leading-none tracking-[-0.44px] uppercase">{t.title}</h3>
                <p className="max-w-[760px] text-[#f7f6f3d9] text-[15px] md:text-[17px] leading-[1.6]">{t.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── § 03 What We Will Not Do ──────────────────── */}
      <section className="flex flex-col md:flex-row w-full px-4 md:px-12 py-12 md:py-[112px] gap-8 md:gap-16">
        <FadeIn className="flex flex-col flex-1 gap-5">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{m.s03sectionLabel}</span>
          </div>
          <span className="font-['Oswald'] text-[clamp(36px,8vw,96px)] leading-[0.92] tracking-[-1.92px] uppercase">{m.s03headline}</span>
          <p className="max-w-[500px] mt-2 text-[#1a1a1acc] text-base md:text-lg leading-[1.6]">{m.s03sub}</p>
        </FadeIn>
        <Stagger className="flex flex-col flex-1">
          {m.refusals.map((item: { n: string; title: string; body: string }) => (
            <StaggerItem key={item.n} className="flex py-5 gap-5">
              <span className="w-10 shrink-0 pt-1 text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">{item.n}</span>
              <div className="flex flex-col gap-1.5">
                <h4 className="font-['Oswald'] text-xl leading-[1.15] uppercase">{item.title}</h4>
                <p className="max-w-[520px] text-[#1a1a1abf] text-[15px] leading-[1.55]">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── § 04 Closing CTA ─────────────────────────── */}
      <section className="flex w-full flex-col border-t px-4 md:px-12 py-16 md:py-[128px] gap-10 border-t-[#1a1a1a33]">
        <FadeIn className="flex items-center gap-3">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{m.s04sectionLabel}</span>
        </FadeIn>
        <div className="flex flex-col font-['Oswald'] text-[clamp(40px,10vw,140px)] leading-[0.92] tracking-[-3.5px] uppercase overflow-hidden">
          <RevealLine delay={0}><span className="block">{m.closingLine1}</span></RevealLine>
          <RevealLine delay={0.12}><span className="block">{m.closingLine2}</span></RevealLine>
          <RevealLine delay={0.24}><span className="block">{m.closingLine3}</span></RevealLine>
        </div>
        <div className="pt-10 mt-6 border-t border-t-[#1a1a1a33]" />
        <FadeIn delay={0.35} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
          <div className="flex max-w-full md:max-w-[640px] flex-col gap-[18px]">
            <p className="text-[#1a1a1ad9] text-[17px] md:text-[19px] leading-[1.6]">{m.closingBody}</p>
            <div className="flex flex-wrap items-center mt-2 gap-4 md:gap-6">
              <Link href="/pricing" className="group flex h-12 md:h-14 items-center bg-[#2563eb] px-[18px] md:px-[22px] gap-2.5 hover:bg-[#1d4ed8] transition-colors">
                <span className="text-[#f7f6f3] font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase">{m.closingCta}</span>
                <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="/" className="group flex flex-col">
                <span className="font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase group-hover:text-[#2563eb] transition-colors">{m.closingCtaSub}</span>
                <div className="h-0.5 bg-[#1a1a1a] mt-1 group-hover:bg-[#2563eb] transition-colors" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-[36px] md:text-[44px] italic leading-none">{m.closingAuthor}</span>
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">{m.closingAuthorTitle}</span>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
