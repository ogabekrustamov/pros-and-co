import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FadeIn, Stagger, StaggerItem, HeroLine, SlideIn, HoverLift } from "@/components/animations";
import { ArrowRight, Clock } from "lucide-react";
import { articles } from "@/lib/articles";
import JournalGrid from "./JournalGrid";

export const metadata = {
  title: "Field Journal — Prose & Co.",
};

const coverStory = articles[0];

export default function JournalPage() {
  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav />

      {/* Hero */}
      <section className="flex w-full flex-col px-12 py-20 gap-7">
        <FadeIn className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              The Field Journal — Dispatches On Writing
            </span>
          </div>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            Issue 014 — {articles.length} Dispatches
          </span>
        </FadeIn>
        <div className="flex flex-col font-['Oswald'] font-medium leading-[0.92] uppercase overflow-hidden">
          <HeroLine delay={0.05}><span className="block text-[clamp(64px,12vw,180px)] tracking-[-3.6px]">Notes From</span></HeroLine>
          <HeroLine delay={0.18}><span className="block text-[clamp(64px,12vw,180px)] tracking-[-3.6px]">The Margin.</span></HeroLine>
        </div>
        <FadeIn delay={0.3} className="flex justify-between items-end mt-2 gap-12">
          <p className="max-w-[680px] text-[#1a1a1ad9] text-[19px] leading-[1.55]">
            A monthly journal of essays on style, the sentence, and the small
            disasters of working alone. Written by the bureau, edited by M.
            Reinhardt, set in cold type.
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <div className="size-[5px] rounded-full bg-[#2563eb] animate-pulse" />
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              Dispatches Open
            </span>
          </div>
        </FadeIn>
      </section>

      {/* Cover story */}
      <section className="flex w-full pt-0 pb-24 px-12 gap-12">
        <SlideIn direction="left" className="relative h-[600px] flex-1">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
            style={{ backgroundImage: `url('${coverStory.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/40 to-transparent" />
          <div className="absolute flex h-7 items-center left-6 top-6 bg-[#2563eb] px-3.5">
            <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Cover Story — Issue 014
            </span>
          </div>
          <div className="absolute flex items-center left-6 bottom-5 gap-2.5">
            <div className="flex w-[18px] h-0.5 bg-[#2563eb]" />
            <span className="text-[#f7f6f3d9] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Plate I — The Writing Hour, Tri-X 400
            </span>
          </div>
        </SlideIn>
        <FadeIn delay={0.15} className="flex w-[460px] flex-col shrink-0 pt-2 gap-5">
          <div className="flex items-center gap-3">
            <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              {coverStory.type} — The Long Read
            </span>
            <div className="size-[3px] bg-[#1a1a1a66] rounded-full" />
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              {coverStory.date}
            </span>
          </div>
          <h2 className="font-['Oswald'] text-[52px] leading-[0.98] tracking-[-1.04px] uppercase">
            {coverStory.title}
          </h2>
          <p className="text-[#1a1a1acc] text-[17px] leading-[1.6]">
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
              className="flex w-fit h-[52px] items-center bg-[#2563eb] px-5 gap-2.5 hover:bg-[#1d4ed8] transition-colors"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase">
                Read The Essay
              </span>
              <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} />
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Article grid with working tab filters */}
      <section className="flex flex-col w-full border-t border-t-[#1a1a1a33]">
        <div className="flex w-full justify-between items-end pt-10 pb-7 border-b px-12 gap-12 border-b-[#1a1a1a33]">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                All Dispatches — Issue 014
              </span>
            </div>
            <span className="font-['Oswald'] text-7xl leading-[0.94] tracking-[-1.44px] uppercase">
              From The Bureau.
            </span>
          </div>
          <div className="flex items-center pb-3 gap-6">
            <span className="text-[#1a1a1aa6] text-sm italic leading-normal">
              Sent the first Monday of every month.
            </span>
            <Link
              href="/pricing"
              className="flex flex-col group"
            >
              <span className="font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase group-hover:text-[#2563eb] transition-colors">
                Receive By Letter
              </span>
              <div className="w-full h-0.5 bg-[#1a1a1a] mt-1 group-hover:bg-[#2563eb] transition-colors" />
            </Link>
          </div>
        </div>

        <JournalGrid articles={articles} />
      </section>

      {/* Pull quote */}
      <section className="flex w-full bg-[#1a1a1a] text-[#f7f6f3] px-12 py-[112px] gap-16">
        <div className="flex w-[320px] flex-col shrink-0 gap-3.5">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            A Letter, Once A Month
          </span>
          <span className="font-['Oswald'] text-[64px] leading-[0.94] tracking-[-1.28px] uppercase">
            Receive It By Post.
          </span>
          <p className="mt-2 text-[#f7f6f3a6] text-sm italic leading-normal">
            Or, failing that, by email. The bureau sends one envelope a month —
            an essay, an interview, a letter from a reader. Never a sale.
          </p>
        </div>
        <div className="flex flex-col justify-center flex-1 gap-7">
          <div className="flex items-start gap-5">
            <div className="h-[50px] text-[#2563eb] text-[100px] leading-[0.6]">"</div>
            <p className="max-w-[640px] text-[#f7f6f3f2] text-[28px] leading-[1.3]">
              The only newsletter I have not unsubscribed from in two years. It
              reads like a friend has written, because one has.
            </p>
          </div>
          <div className="flex items-center pl-[120px] gap-3">
            <div className="flex w-5 h-0.5 bg-[#f7f6f366]" />
            <span className="text-[#f7f6f3b3] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              A. Castellanos — Subscriber Since 2023
            </span>
          </div>
          <div className="flex w-[560px] h-[60px] mt-4 border border-[#f7f6f3]">
            <div className="flex items-center flex-1 px-[18px]">
              <span className="text-[#f7f6f38c] text-[15px] italic leading-normal">
                your@editorial.address
              </span>
            </div>
            <Link
              href="/pricing"
              className="flex items-center bg-[#2563eb] px-6 gap-2.5 hover:bg-[#1d4ed8] transition-colors"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase">
                Send The Next Letter
              </span>
              <ArrowRight size={14} color="#f7f6f3" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
