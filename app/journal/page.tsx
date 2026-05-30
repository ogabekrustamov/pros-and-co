import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FadeIn, Stagger, StaggerItem, HeroLine, SlideIn, HoverLift } from "@/components/animations";
import { ArrowRight, Clock } from "lucide-react";

export const metadata = {
  title: "Field Journal — Prose & Co.",
};

const articles = [
  {
    type: "Interview",
    no: "No. 014.02",
    title: "On Marginalia, With An Archivist.",
    excerpt:
      "Anika Sato keeps a museum of other people's annotations. We asked her what they know that we don't.",
    author: "By H. Okabe",
    readTime: "22 min",
    image:
      "https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/3909e1490646aa938f96c7c6dedb2679ac35a5e40513d0a26e83b62e26933aa7.jpg",
  },
  {
    type: "Notebook",
    no: "No. 014.03",
    title: "A Week Of Single-Sentence Days.",
    excerpt:
      "Seven days, seven sentences, one ill-advised experiment in radical restraint — with results.",
    author: "By The Bureau",
    readTime: "6 min",
    image:
      "https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/d3aa762bf76c97debeef5b829b765837af02967faa659fa325f59b2d5e2a0e44.jpg",
  },
  {
    type: "Essay",
    no: "No. 014.04",
    title: "Against The Tidy Conclusion.",
    excerpt:
      "Endings that pretend to resolve are, more often than not, hiding the actual argument three paragraphs back.",
    author: "By P. Lindqvist",
    readTime: "14 min",
    image:
      "https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/60112fffd04b3b534053952972d1161e4be3c8a2c1334bf3da7456d44fa68616.jpg",
  },
  {
    type: "Letters",
    no: "No. 014.05",
    title: "Dear Editor — March.",
    excerpt:
      'On commas, the verb "to leverage," and the reader from Bogotá who has caught us out.',
    author: "By Readers",
    readTime: "9 min",
    image:
      "https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/97e1cc4dad71ed9159bb413a874ca33d928e41101063c61ed67923361f517131.jpg",
  },
  {
    type: "Essay",
    no: "No. 014.06",
    title: "The Editor As Reader, First.",
    excerpt:
      "Why our best edits begin not in the manuscript but in the silence that follows the first read-through.",
    author: "By M. Reinhardt",
    readTime: "11 min",
    image:
      "https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/8f0e6aedcc78c1c7d5c12574d2f75921ddf07cf2189cd7cdf6d434a3280999b5.jpg",
  },
  {
    type: "Notebook",
    no: "No. 014.07",
    title: "A Glossary For The Self-Critical.",
    excerpt:
      "Sixteen working definitions for the words writers tend to use against themselves, and against each other.",
    author: "By The Bureau",
    readTime: "7 min",
    image:
      "https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/3909e1490646aa938f96c7c6dedb2679ac35a5e40513d0a26e83b62e26933aa7.jpg",
  },
];

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
            P. 028 / 064
          </span>
        </FadeIn>
        <div className="flex flex-col font-['Oswald'] font-medium leading-[0.92] uppercase overflow-hidden">
          <HeroLine delay={0.05}><span className="block text-[clamp(64px,12vw,180px)] tracking-[-3.6px]">Notes From</span></HeroLine>
          <HeroLine delay={0.18}><span className="block text-[clamp(64px,12vw,180px)] tracking-[-3.6px]">The Margin.</span></HeroLine>
        </div>
        <div className="flex justify-between items-end mt-2 gap-12">
          <p className="max-w-[680px] text-[#1a1a1ad9] text-[19px] leading-[1.55]">
            A monthly journal of essays on style, the sentence, and the small
            disasters of working alone. Written by the bureau, edited by M.
            Reinhardt, set in cold type.
          </p>
          <div className="flex items-center gap-6">
            {["All Dispatches", "Essays", "Interviews", "Letters", "Notebook"].map(
              (tab, i) => (
                <button
                  key={tab}
                  className={[
                    "font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase transition-colors",
                    i === 0
                      ? "text-[#1a1a1a] pb-[3px] border-b-2 border-b-[#2563eb]"
                      : "text-[#1a1a1aa6] hover:text-[#1a1a1a]",
                  ].join(" ")}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Cover story */}
      <section className="flex w-full pt-0 pb-24 px-12 gap-12">
        <SlideIn direction="left" className="relative h-[640px] flex-1">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat grayscale"
            style={{
              backgroundImage:
                "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/261d27901adb56aacc9db5fd3d84815aa122fed6395a6952047801d03166feea.jpg')",
            }}
          />
          <div className="absolute flex h-7 items-center left-6 top-6 bg-[#2563eb] px-3.5">
            <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Cover Story — Issue 014
            </span>
          </div>
          <div className="absolute flex items-center left-6 bottom-5 gap-2.5">
            <div className="flex w-[18px] h-0.5 bg-[#2563eb]" />
            <span className="text-[#f7f6f3d9] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Plate III — The Quiet Hour, Tri-X 400
            </span>
          </div>
        </SlideIn>
        <FadeIn delay={0.15} className="flex w-[440px] flex-col shrink-0 pt-2 gap-5">
          <div className="flex items-center gap-3">
            <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              Essay — The Long Read
            </span>
            <div className="size-[3px] bg-[#1a1a1a66] rounded-full" />
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              14 March 2025
            </span>
          </div>
          <h2 className="font-['Oswald'] text-[56px] leading-[0.98] tracking-[-1.12px] uppercase">
            In Defence Of The Boring First Draft.
          </h2>
          <p className="text-[#1a1a1acc] text-[17px] leading-[1.6]">
            The first draft is allowed to be a failure of nerve. M. Reinhardt on
            why the writers she trusts begin every essay badly, and why she has
            come to suspect anyone who does not.
          </p>
          <div className="flex items-center pt-3 mt-2 border-t gap-4 border-t-[#1a1a1a26]">
            <div
              className="size-11 bg-cover bg-no-repeat grayscale"
              style={{
                backgroundImage:
                  "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/ce94a7a8c90a64c8826dc81646696dfbd5b5c210ae88c39214676f6c65feca95.jpg')",
              }}
            />
            <div className="flex flex-col gap-0.5">
              <span className="font-['Oswald'] text-[13px] leading-normal tracking-[2.08px] uppercase">
                Maya Reinhardt
              </span>
              <span className="text-[#1a1a1a99] text-[13px] italic leading-normal">
                Editor-At-Large
              </span>
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#1a1a1a8c]" strokeWidth={2} />
              <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                18 min
              </span>
            </div>
          </div>
          <button className="flex w-fit h-[52px] items-center mt-3 bg-[#2563eb] px-5 gap-2.5 hover:bg-[#1d4ed8] transition-colors">
            <span className="text-[#f7f6f3] font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase">
              Read The Essay
            </span>
            <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} />
          </button>
        </FadeIn>
      </section>

      {/* Recent dispatches */}
      <section className="flex flex-col w-full">
        <div className="flex w-full justify-between items-end pt-10 pb-7 border-t border-b px-12 gap-12 border-y-[#1a1a1a33]">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                Recent — Last Six Dispatches
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
            <div className="flex flex-col">
              <span className="font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase">
                Receive By Letter
              </span>
              <div className="w-full h-0.5 bg-[#1a1a1a] mt-1" />
            </div>
          </div>
        </div>

        <Stagger className="grid grid-cols-3">
          {articles.map((article, i) => (
            <StaggerItem key={article.no}>
            <HoverLift
              className={[
                "flex flex-col p-8 gap-4 h-full",
                i >= 3 ? "border-t border-t-[#1a1a1a1a]" : "",
                i % 3 !== 0 ? "border-l border-l-[#1a1a1a1a]" : "",
              ].join(" ")}
            >
              <div
                className="w-full h-[200px] bg-cover bg-no-repeat grayscale overflow-hidden"
                style={{ backgroundImage: `url('${article.image}')` }}
              />
              <div className="flex items-center gap-2.5">
                <span className="text-[#2563eb] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
                  {article.type}
                </span>
                <div className="size-[3px] bg-[#1a1a1a59] rounded-full" />
                <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
                  {article.no}
                </span>
              </div>
              <h3 className="font-['Oswald'] text-[26px] leading-[1.05] tracking-[-0.26px] uppercase group-hover:text-[#2563eb] transition-colors">
                {article.title}
              </h3>
              <p className="text-[#1a1a1abf] text-sm leading-[1.55]">
                {article.excerpt}
              </p>
              <div className="flex justify-between items-center pt-3.5 mt-1.5 border-t border-t-[#1a1a1a1f]">
                <span className="text-[#1a1a1aa6] text-[13px] italic leading-normal">
                  {article.author}
                </span>
                <div className="flex items-center gap-1.5">
                  <Clock size={11} className="text-[#1a1a1a8c]" strokeWidth={2} />
                  <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                    {article.readTime}
                  </span>
                </div>
              </div>
            </HoverLift>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Newsletter CTA */}
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
