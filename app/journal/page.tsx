"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FadeIn, HeroLine, SlideIn } from "@/components/animations";
import { ArrowRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import JournalGrid from "./JournalGrid";
import { useLanguage } from "@/contexts/LanguageContext";

const coverStory = articles[0];

export default function JournalPage() {
  const { tr } = useLanguage();
  const j = tr.journal;
  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav />

      {/* Hero */}
      <section className="flex w-full flex-col px-4 md:px-12 py-10 md:py-20 gap-7">
        <FadeIn className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              {j.label}
            </span>
          </div>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            Issue 014 — {articles.length} Dispatches
          </span>
        </FadeIn>
        <div className="flex flex-col font-['Oswald'] font-medium leading-[0.92] uppercase overflow-hidden">
          <HeroLine delay={0.05}><span className="block text-[clamp(44px,12vw,180px)] tracking-[-3.6px]">{j.heroLine1}</span></HeroLine>
          <HeroLine delay={0.18}><span className="block text-[clamp(44px,12vw,180px)] tracking-[-3.6px]">{j.heroLine2}</span></HeroLine>
        </div>
        <FadeIn delay={0.3} className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-2 gap-4 sm:gap-12">
          <p className="max-w-full sm:max-w-[680px] text-[#1a1a1ad9] text-[17px] md:text-[19px] leading-[1.55]">
            {j.tagline}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <div className="size-[5px] rounded-full bg-[#2563eb] animate-pulse" />
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              {j.dispatchesOpen}
            </span>
          </div>
        </FadeIn>
      </section>

      {/* Cover story */}
      <section className="flex flex-col md:flex-row w-full pt-0 pb-16 md:pb-24 px-4 md:px-12 gap-8 md:gap-12">
        <SlideIn direction="left" className="relative h-[280px] sm:h-[400px] md:h-[600px] w-full md:flex-1">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
            style={{ backgroundImage: `url('${coverStory.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
          <div className="absolute flex h-7 items-center left-4 md:left-6 top-4 md:top-6 bg-[#2563eb] px-3.5">
            <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              {j.coverStoryBadge}
            </span>
          </div>
          <div className="absolute flex items-center left-4 md:left-6 bottom-4 md:bottom-5 gap-2.5">
            <div className="flex w-[18px] h-0.5 bg-[#2563eb]" />
            <span className="text-[#f7f6f3d9] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Plate I — The Writing Hour, Tri-X 400
            </span>
          </div>
        </SlideIn>
        <FadeIn delay={0.15} className="flex w-full md:w-[460px] flex-col shrink-0 pt-0 md:pt-2 gap-5">
          <div className="flex items-center gap-3">
            <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              {coverStory.type} — {j.longRead}
            </span>
            <div className="size-[3px] bg-[#1a1a1a66] rounded-full" />
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              {coverStory.date}
            </span>
          </div>
          <h2 className="font-['Oswald'] text-[36px] md:text-[52px] leading-[0.98] tracking-[-1.04px] uppercase">
            {coverStory.title}
          </h2>
          <p className="text-[#1a1a1acc] text-[15px] md:text-[17px] leading-[1.6]">
            {coverStory.excerpt}
          </p>
          <div className="flex flex-col gap-4 pt-3 mt-2 border-t border-t-[#1a1a1a26]">
            <div className="flex items-center gap-3">
              <div
                className="size-11 bg-cover bg-no-repeat grayscale shrink-0"
                style={{
                  backgroundImage:
                    "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/ce94a7a8c90a64c8826dc81646696dfbd5b5c210ae88c39214676f6c65feca95.jpg')",
                }}
              />
              <div className="flex flex-col gap-0.5">
                <span className="font-['Oswald'] text-[13px] leading-normal tracking-[2.08px] uppercase">
                  {coverStory.author}
                </span>
                <span className="text-[#1a1a1a99] text-[13px] italic leading-normal">
                  Editor-At-Large
                </span>
              </div>
              <div className="flex-1" />
              <div className="flex items-center gap-1.5">
                <Clock size={12} className="text-[#1a1a1a8c]" strokeWidth={2} />
                <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                  {coverStory.readTime}
                </span>
              </div>
            </div>
            <Link
              href={`/journal/${coverStory.slug}`}
              className="flex w-fit h-[48px] md:h-[52px] items-center bg-[#2563eb] px-5 gap-2.5 hover:bg-[#1d4ed8] transition-colors"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase">
                {j.readTheEssay}
              </span>
              <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} />
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Article grid with working tab filters */}
      <section className="flex flex-col w-full border-t border-t-[#1a1a1a33]">
        <div className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-end pt-8 md:pt-10 pb-7 border-b px-4 md:px-12 gap-5 sm:gap-12 border-b-[#1a1a1a33]">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                {j.label}
              </span>
            </div>
            <span className="font-['Oswald'] text-[clamp(36px,7vw,72px)] leading-[0.94] tracking-[-1.44px] uppercase">
              {j.fromTheBureau}
            </span>
          </div>
          <div className="flex items-center pb-0 sm:pb-3 gap-4 sm:gap-6">
            <span className="text-[#1a1a1aa6] text-sm italic leading-normal">
              {j.sentMonthly}
            </span>
            <Link
              href="/pricing"
              className="flex flex-col group"
            >
              <span className="font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase group-hover:text-[#2563eb] transition-colors">
                {j.receiveByLetter}
              </span>
              <div className="w-full h-0.5 bg-[#1a1a1a] mt-1 group-hover:bg-[#2563eb] transition-colors" />
            </Link>
          </div>
        </div>

        <JournalGrid articles={articles} />
      </section>

      {/* Pull quote */}
      <section className="flex flex-col md:flex-row w-full bg-[#1a1a1a] text-[#f7f6f3] px-4 md:px-12 py-12 md:py-[112px] gap-8 md:gap-16">
        <div className="flex w-full md:w-[320px] flex-col shrink-0 gap-3.5">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            {j.receiveSubtitle}
          </span>
          <span className="font-['Oswald'] text-[clamp(36px,6vw,64px)] leading-[0.94] tracking-[-1.28px] uppercase">
            {j.receiveTitle}
          </span>
          <p className="mt-2 text-[#f7f6f3a6] text-sm italic leading-normal">{j.receiveBody}</p>
        </div>
        <div className="flex flex-col justify-center flex-1 gap-7">
          <div className="flex items-start gap-4 md:gap-5">
            <div className="h-[40px] md:h-[50px] text-[#2563eb] text-[80px] md:text-[100px] leading-[0.6]">"</div>
            <p className="max-w-[640px] text-[#f7f6f3f2] text-[20px] md:text-[28px] leading-[1.3]">{j.testimonial}</p>
          </div>
          <div className="flex items-center pl-0 md:pl-[120px] gap-3">
            <div className="flex w-5 h-0.5 bg-[#f7f6f366]" />
            <span className="text-[#f7f6f3b3] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              {j.testimonialAuthor}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row w-full sm:w-[560px] h-auto sm:h-[60px] mt-4 border border-[#f7f6f3]">
            <div className="flex items-center flex-1 px-[18px] h-14 sm:h-auto">
              <span className="text-[#f7f6f38c] text-[15px] italic leading-normal">
                your@editorial.address
              </span>
            </div>
            <Link href="/pricing" className="flex items-center justify-center sm:justify-start bg-[#2563eb] px-6 h-14 sm:h-auto gap-2.5 hover:bg-[#1d4ed8] transition-colors border-t sm:border-t-0 border-t-[#f7f6f333]">
              <span className="text-[#f7f6f3] font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase">{j.sendNextLetter}</span>
              <ArrowRight size={14} color="#f7f6f3" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
