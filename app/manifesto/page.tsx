import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FadeIn, Stagger, StaggerItem, HeroLine, SlideIn, RevealLine } from "@/components/animations";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "The Manifesto — Prose & Co." };

export default function ManifestoPage() {
  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="flex relative w-full flex-col px-12 py-20 gap-7">
        <FadeIn className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              The Manifesto — Pinned To The Wall, Zürich
            </span>
          </div>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            P. 002 / 064
          </span>
        </FadeIn>

        <div className="flex flex-col gap-4">
          <HeroLine delay={0.05}>
            <p className="text-[#1a1a1aa6] text-[28px] italic leading-normal">
              A short, opinionated theory of
            </p>
          </HeroLine>
          <div className="flex flex-col font-['Oswald'] font-medium leading-[0.88] uppercase overflow-hidden">
            <RevealLine delay={0.1}><span className="text-[clamp(80px,16vw,220px)] tracking-[-5.5px] block">Writing</span></RevealLine>
            <RevealLine delay={0.22}><span className="text-[clamp(80px,16vw,220px)] tracking-[-5.5px] block">As Thinking</span></RevealLine>
            <RevealLine delay={0.34}><span className="text-[#2563eb] text-[clamp(80px,16vw,220px)] tracking-[-5.5px] block">Made Visible.</span></RevealLine>
          </div>
        </div>

        <FadeIn delay={0.5} className="flex justify-between items-end pt-10 mt-4 border-t gap-12 border-t-[#1a1a1a33]">
          <div className="flex items-center gap-5">
            <div
              className="size-14 bg-cover bg-no-repeat grayscale"
              style={{ backgroundImage: "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/ce94a7a8c90a64c8826dc81646696dfbd5b5c210ae88c39214676f6c65feca95.jpg')" }}
            />
            <div className="flex flex-col gap-1">
              <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">Drafted By</span>
              <span className="font-['Oswald'] text-base tracking-[1.92px] uppercase">M. Reinhardt &amp; The Bureau</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">Edition</span>
            <span className="font-['Oswald'] text-base tracking-[1.92px] uppercase">Third — Spring 2025</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">Read In</span>
            <span className="font-['Oswald'] text-base tracking-[1.92px] uppercase">Twelve Quiet Minutes</span>
          </div>
        </FadeIn>
      </section>

      {/* ── § 01 The Premise ─────────────────────────── */}
      <section className="flex w-full border-t px-12 py-24 gap-20 border-t-[#1a1a1a33]">
        <div className="flex max-w-[820px] flex-col flex-1 gap-7">
          <FadeIn className="flex items-center gap-3">
            <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">§ 01.</span>
            <span className="text-[#1a1a1aa6] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">The Premise</span>
          </FadeIn>
          <FadeIn delay={0.05} className="flex items-start gap-5">
            <span className="shrink-0 font-['Oswald'] text-[180px] leading-[0.78] tracking-[-7.2px] uppercase">W</span>
            <p className="pt-2 text-[#1a1a1a] text-xl leading-[1.55]">
              e have spent ten years watching writing tools mistake speed for help. They finish our sentences before we have finished thinking them, predict the word the room expects, and call it intelligence. We disagree, politely.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-[#1a1a1ae6] text-lg leading-[1.65]">
              Writing is not the typing. Writing is the small, structural act of choosing a sentence over the sentence next to it — an act that requires the writer to be slightly uncomfortable, slightly slower than the machine. Prose &amp; Co. was built to protect that discomfort, not to relieve it.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <blockquote className="max-w-[680px] pl-7 text-[#1a1a1a] text-4xl italic leading-tight my-4 border-l-[3px] border-l-[#2563eb]">
              "We do not finish your sentence. We hand it back to you, slightly heavier than it was."
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#1a1a1ae6] text-lg leading-[1.65]">
              This is a manifesto, in the old sense: a short list of beliefs we are willing to be unfashionable about. There are five of them. They are written in plain English so that we cannot wriggle out of any of them later.
            </p>
          </FadeIn>
        </div>

        <SlideIn direction="right" className="flex w-[320px] flex-col shrink-0 pt-2 gap-7">
          <div className="flex flex-col pl-5 border-l gap-2.5 border-l-[#1a1a1a33]">
            <span className="text-[#2563eb] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">Marginalia — Note 1</span>
            <p className="text-[#1a1a1abf] text-[15px] italic leading-[1.55]">
              "Speed is a virtue in messengers, not in editors." — pinned above M. Reinhardt&apos;s desk, on a strip of masking tape.
            </p>
          </div>
          <div className="flex flex-col border p-5 gap-2.5 border-[#1a1a1a33]">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">An Honest Number</span>
            <div className="flex items-baseline gap-[18px]">
              <span className="font-['Oswald'] text-7xl leading-[0.9]">71</span>
              <span className="text-[#2563eb] font-['Oswald'] text-[28px] leading-[0.9]">%</span>
            </div>
            <p className="text-[#1a1a1ab3] text-[13px] leading-normal">
              Of our subscribers told us, unprompted, that the Editor "does less than I expected, on purpose." We took it as a compliment.
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
      <section className="flex w-full flex-col bg-[#1a1a1a] text-[#f7f6f3] px-12 py-[112px] gap-12">
        <FadeIn className="flex justify-between items-end pb-7 border-b gap-12 border-b-[#f7f6f333]">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">§ 02. — Five Tenets, Plainly Stated</span>
            </div>
            <span className="font-['Oswald'] text-[clamp(48px,8vw,112px)] leading-[0.92] tracking-[-2.24px] uppercase">What We Believe.</span>
          </div>
          <p className="max-w-[320px] pb-4 text-[#f7f6f3a6] text-base italic">
            Pin them up. Argue with us. Write back if any of them are wrong — we will print the letter.
          </p>
        </FadeIn>

        <Stagger className="flex flex-col">
          {[
            { n: "01", title: "The Sentence Is The Unit.", body: "Not the paragraph. Not the document. The Editor is built around the sentence because that is where thinking actually happens — one decision at a time, one line at a time." },
            { n: "02", title: "Suggest, Never Substitute.", body: "We will never quietly replace your words with ours. The Editor proposes, in the margin, the way a real editor does. The author keeps the pen." },
            { n: "03", title: "Cadence Over Correctness.", body: "Grammar is a floor, not a ceiling. We will defend a comma splice if it earns its keep, and we will argue against a perfectly correct sentence if it bores us both." },
            { n: "04", title: "Sources, Visible. Always.", body: "Every fact carries its citation. Every guess is labelled a guess. If the Editor is uncertain, it says so, in a tone of voice that does not pretend otherwise." },
            { n: "05", title: "The Writer's Voice Is The Product.", body: "We do not train on your drafts. We do not flatten you into the mean. The house style we offer is one option, not a verdict — and yours is always the one we are protecting." },
          ].map((t) => (
            <StaggerItem key={t.n} className="flex border-b py-9 gap-10 border-b-[#f7f6f326]">
              <span className="w-[160px] shrink-0 text-[#2563eb] font-['Oswald'] text-8xl leading-[0.9] tracking-[-1.92px]">{t.n}</span>
              <div className="flex flex-col pt-2 flex-1 gap-3.5">
                <h3 className="font-['Oswald'] text-[44px] leading-none tracking-[-0.44px] uppercase">{t.title}</h3>
                <p className="max-w-[760px] text-[#f7f6f3d9] text-[17px] leading-[1.6]">{t.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── § 03 What We Will Not Do ──────────────────── */}
      <section className="flex w-full px-12 py-[112px] gap-16">
        <FadeIn className="flex flex-col flex-1 gap-5">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">§ 03. — Apophatic Definitions</span>
          </div>
          <span className="font-['Oswald'] text-8xl leading-[0.92] tracking-[-1.92px] uppercase">What We Will Not Do.</span>
          <p className="max-w-[500px] mt-2 text-[#1a1a1acc] text-lg leading-[1.6]">
            A manifesto is also a list of refusals. Some of these are technically possible. We have chosen not to ship them, and we would like the choice to be on the record.
          </p>
        </FadeIn>
        <Stagger className="flex flex-col flex-1">
          {[
            { n: "01 .", title: "We will not autocomplete in the body of the document.", body: "Ghost text trains writers to accept the obvious word. We refuse to be a worse version of your own voice." },
            { n: "02 .", title: "We will not score your writing out of one hundred.", body: "There is no such number. Any product that supplies one is selling theatre." },
            { n: "03 .", title: "We will not train on customer drafts.", body: 'Ever. Not anonymised, not aggregated, not "to improve the service." Your sentences are yours.' },
            { n: "04 .", title: "We will not bury the model behind a personality.", body: 'No mascots, no first-name AI, no "hello, friend!" The Editor speaks in the voice of an editor: brief, particular, slightly tired.' },
            { n: "05 .", title: "We will not chase the leaderboard.", body: "We optimise for one number: the percentage of suggestions the writer actually accepts and keeps in the final draft. Nothing else." },
          ].map((item) => (
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
      <section className="flex w-full flex-col border-t px-12 py-[128px] gap-10 border-t-[#1a1a1a33]">
        <FadeIn className="flex items-center gap-3">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">§ 04. — In Closing</span>
        </FadeIn>
        <div className="flex flex-col font-['Oswald'] text-[clamp(56px,10vw,140px)] leading-[0.92] tracking-[-3.5px] uppercase overflow-hidden">
          <RevealLine delay={0}><span className="block">If You Have Read</span></RevealLine>
          <RevealLine delay={0.12}><span className="block">This Far, You Are</span></RevealLine>
          <RevealLine delay={0.24}><span className="block">Already One Of Us.</span></RevealLine>
        </div>
        <div className="pt-10 mt-6 border-t border-t-[#1a1a1a33]" />
        <FadeIn delay={0.35} className="flex justify-between items-end gap-12">
          <div className="flex max-w-[640px] flex-col gap-[18px]">
            <p className="text-[#1a1a1ad9] text-[19px] leading-[1.6]">
              Fourteen days on the house. No card, no asterisks. If, on day fifteen, you decide we are wrong about all of this — you owe us nothing but the favour of writing back to tell us why.
            </p>
            <div className="flex items-center mt-2 gap-6">
              <Link href="/pricing" className="group flex h-14 items-center bg-[#2563eb] px-[22px] gap-2.5 hover:bg-[#1d4ed8] transition-colors">
                <span className="text-[#f7f6f3] font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase">Sign The Manifesto</span>
                <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link href="/" className="group flex flex-col">
                <span className="font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase group-hover:text-[#2563eb] transition-colors">Write To The Bureau</span>
                <div className="h-0.5 bg-[#1a1a1a] mt-1 group-hover:bg-[#2563eb] transition-colors" />
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[44px] italic leading-none">— M. Reinhardt</span>
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">Editor-At-Large — Zürich, March 2025</span>
          </div>
        </FadeIn>
      </section>

      <Footer />
    </div>
  );
}
