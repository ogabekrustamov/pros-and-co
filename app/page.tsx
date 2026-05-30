import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

export default function EditorialPage() {
  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a] overflow-clip">
      <Nav />

      {/* Hero */}
      <section className="flex relative w-full flex-col pt-10 pb-16 px-12 gap-7 overflow-clip">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              Dispatch No. 014 — The Writing Machine
            </span>
          </div>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            P. 001 / 064
          </span>
        </div>

        {/* Cover image mock */}
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
              Plate I — The Studio, Predawn. Photograph by M. Reinhardt.
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
                      The cursor blinks like a metronome and the page, as
                      always, refuses. One writes a sentence, then a second; the
                      second betrays the first.{" "}
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

        {/* Hero headline */}
        <div className="flex flex-col font-['Oswald'] text-[clamp(72px,12vw,180px)] font-medium leading-[0.92] tracking-[-3.6px] uppercase">
          <span>A Quiet Machine</span>
          <span>For Loud Ideas.</span>
        </div>

        <div className="flex w-full justify-between items-end gap-12">
          <div className="flex max-w-[520px] flex-col gap-[18px]">
            <p className="text-[#1a1a1ad9] text-[19px] leading-[1.55]">
              Prose &amp; Co. is a writing studio with an opinion. Drafted in
              Zürich, edited in Kyoto — an AI co-author for essays, manifestos
              and the occasional dangerous email.
            </p>
            <div className="flex items-center mt-1.5 gap-6">
              <Link
                href="/editor"
                className="flex h-[52px] items-center bg-[#2563eb] px-[22px] gap-2.5 hover:bg-[#1d4ed8] transition-colors"
              >
                <span className="text-[#f7f6f3] font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase">
                  Open The Editor
                </span>
                <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} />
              </Link>
              <Link
                href="/manifesto"
                className="flex flex-col group"
              >
                <span className="font-['Oswald'] text-[13px] leading-normal tracking-[2.86px] uppercase">
                  Read The Manifesto
                </span>
                <div className="w-full h-0.5 bg-[#1a1a1a] mt-1" />
              </Link>
            </div>
          </div>
          <div className="flex items-end pb-1 gap-10">
            <div className="flex flex-col gap-1">
              <span className="font-['Oswald'] text-[44px] leading-none">2.4M</span>
              <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
                Drafts Saved
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-['Oswald'] text-[44px] leading-none">47</span>
              <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
                Countries Reading
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto pull quote */}
      <section className="flex w-full border-t border-b px-12 py-[88px] gap-16 border-y-[#1a1a1a26]">
        <div className="flex w-[220px] flex-col shrink-0 gap-3">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            A Brief Manifesto
          </span>
          <span className="text-[#1a1a1a8c] text-sm italic leading-normal">
            Pinned to the studio wall, Zürich.
          </span>
        </div>
        <div className="flex flex-col flex-1 gap-5">
          <div className="flex flex-wrap gap-x-4 font-['Oswald'] text-[clamp(36px,5vw,64px)] leading-[0.98] tracking-[-0.96px] uppercase">
            <span>We believe writing is thinking made visible —</span>
            <span className="text-[#2563eb]">
              and that most software for thinking
            </span>
            <span>behaves like a noisy roommate.</span>
          </div>
          <div className="flex items-center mt-2 gap-4">
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              § 01.
            </span>
            <p className="max-w-[640px] text-[#1a1a1ab3] text-[15px] leading-[1.55]">
              Prose &amp; Co. is built for the slow, deliberate version of you.
              The one who still believes a paragraph is an argument and an em
              dash is a decision — not a tic.
            </p>
          </div>
        </div>
      </section>

      {/* Three desks */}
      <section className="flex w-full flex-col px-12 py-[112px] gap-12">
        <div className="flex justify-between items-end pb-8 border-b gap-12 border-b-[#1a1a1a26]">
          <div className="flex max-w-[760px] flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                The Bureau — Three Departments
              </span>
            </div>
            <div className="flex flex-col font-['Oswald'] text-[clamp(48px,7vw,96px)] leading-[0.92] tracking-[-1.92px] uppercase">
              <span>A Newsroom</span>
              <span>In One Window.</span>
            </div>
          </div>
          <p className="max-w-[360px] pb-3 text-[#1a1a1abf] text-base leading-[1.6]">
            Three deliberate tools, one obsessive house style. We borrowed the
            structure from a magazine, not a chatbot.
          </p>
        </div>

        <div className="flex">
          {[
            {
              no: "No. 01",
              label: "Drafting Desk",
              title: "Begin with a sentence, not a prompt.",
              body: "Start with a single line of intent. The Editor responds with three rival openings, three rival angles, and a quiet question about what you actually mean.",
              note: "Inspired by 1960s assignment slips.",
            },
            {
              no: "No. 02",
              label: "Copy Desk",
              title: "An editor who has read everything you have.",
              body: "Real-time line edits in your house voice. Argues for shorter clauses, fewer adverbs, and the occasional dangerous full stop — never autocomplete.",
              note: "Cadence model trained on essays, not tweets.",
            },
            {
              no: "No. 03",
              label: "Research Desk",
              title: "Footnotes that earn their keep.",
              body: "Pull citations, contradictions, and counter-arguments into the margin. Every claim arrives with its source, its date, and a one-line summary in plain English.",
              note: "Sources visible. Hallucinations cited as such.",
            },
          ].map((desk) => (
            <div
              key={desk.no}
              className="flex flex-col flex-1 p-9 gap-[18px] border-l first:border-l-0 border-l-[#1a1a1a1a]"
            >
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
              <p className="text-[#1a1a1acc] text-[15px] leading-[1.6]">
                {desk.body}
              </p>
              <div className="flex items-center pt-4 mt-2 border-t gap-2.5 border-t-[#1a1a1a1a]">
                <div className="size-2 rounded-full bg-[#2563eb]" />
                <span className="text-[#1a1a1a8c] text-[13px] italic leading-normal">
                  {desk.note}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Press quote */}
      <section className="flex w-full bg-[#1a1a1a] text-[#f7f6f3] px-12 py-[112px] gap-16">
        <div
          className="relative w-[440px] h-[520px] flex-col shrink-0 bg-cover bg-no-repeat grayscale"
          style={{
            backgroundImage:
              "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/8c87c8525a0fa08bffa3264aa43e5ad1503a8c871525ffed337841d2aeb7d1c1.jpg')",
          }}
        >
          <div className="absolute flex items-center left-4 bottom-4 gap-2.5">
            <div className="flex w-[18px] h-0.5 bg-[#2563eb]" />
            <span className="text-[#f7f6f3cc] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Plate II — M. Reinhardt, Editor-At-Large
            </span>
          </div>
        </div>
        <div className="flex flex-col justify-between flex-1 py-2 gap-10">
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                From The Press — March
              </span>
            </div>
            <div className="h-[60px] text-[#2563eb] text-[120px] leading-[0.6]">"</div>
            <p className="max-w-[760px] text-[42px] leading-[1.18] tracking-[-0.42px]">
              It is the first writing tool in a decade that respects the
              sentence as a unit of thought — and the first AI I have allowed
              near my own.
            </p>
          </div>
          <div className="flex justify-between items-end pt-7 border-t gap-8 border-t-[#f7f6f333]">
            <div className="flex flex-col gap-1.5">
              <span className="font-['Oswald'] text-lg leading-normal tracking-[1.08px] uppercase">
                Maya Reinhardt
              </span>
              <span className="text-[#f7f6f3a6] text-sm italic leading-normal">
                Senior Editor, The Continental Review
              </span>
            </div>
            <div className="flex items-center gap-7">
              {[
                "Continental Rev.",
                "Field Journal",
                "Atlas Weekly",
                "In The Margins",
              ].map((pub, i) => (
                <span
                  key={pub}
                  className="flex items-center gap-7 text-[#f7f6f3b3] font-['Oswald'] text-xs leading-normal tracking-[2.88px] uppercase"
                >
                  {i > 0 && (
                    <span className="inline-block w-px h-3 bg-[#f7f6f340] mr-0" />
                  )}
                  {pub}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="flex w-full flex-col px-12 py-[128px] gap-10">
        <div className="flex items-center gap-3">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            Become A Subscriber — 14 Days, On The House
          </span>
        </div>
        <div className="flex flex-col font-['Oswald'] text-[clamp(64px,10vw,140px)] leading-[0.92] tracking-[-2.8px] uppercase">
          <span>Write The Thing</span>
          <span>You&apos;ve Been Avoiding.</span>
        </div>
        <div className="flex justify-between items-end mt-4 gap-12">
          <div className="flex w-[560px] h-14 border border-[#1a1a1a]">
            <div className="flex items-center flex-1 px-[18px]">
              <span className="text-[#1a1a1a8c] text-[15px] italic leading-normal">
                your@editorial.address
              </span>
            </div>
            <Link
              href="/pricing"
              className="flex items-center bg-[#2563eb] px-[22px] gap-2.5 hover:bg-[#1d4ed8] transition-colors"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase">
                Begin Issue 014
              </span>
              <ArrowRight size={14} color="#f7f6f3" strokeWidth={2} />
            </Link>
          </div>
          <div className="flex max-w-[360px] flex-col text-right gap-1.5">
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              No Card — Cancel By Postcard
            </span>
            <p className="text-[#1a1a1ab3] text-sm italic leading-normal text-right">
              Or read three free essays first — we are in no rush, and neither
              is your draft.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
