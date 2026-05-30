import { ArrowRight, Search, Plus, PenLine, FileText, BookOpen, Archive, Clock, Zap, Check, X, CornerDownLeft } from "lucide-react";

export const metadata = {
  title: "The Editor — Prose & Co.",
};

export default function EditorPage() {
  return (
    <div className="flex h-screen bg-[#f7f6f3] text-[#1a1a1a] overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-[260px] h-full flex-col shrink-0 bg-[#f2f0ea] border-r border-r-[#1a1a1a26]">
        {/* Sidebar header */}
        <div className="flex w-full h-16 shrink-0 items-center border-b px-5 gap-2.5 border-b-[#1a1a1a26]">
          <div className="size-2 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-base font-medium tracking-[2.88px] uppercase flex-1">
            Prose &amp; Co.
          </span>
          <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.98px] uppercase">
            014
          </span>
        </div>

        {/* Search */}
        <div className="flex w-full flex-col px-0 py-4">
          <div className="flex h-[34px] items-center bg-[#f7f6f3] border border-[#1a1a1a26] px-2.5 mx-4 gap-2">
            <Search size={12} className="text-[#1a1a1a8c]" strokeWidth={2} />
            <span className="text-[#1a1a1a80] text-xs italic leading-normal flex-1">
              Find a draft, a line
            </span>
            <span className="text-[#1a1a1a73] font-['Oswald'] text-[9px] leading-normal tracking-[1.62px] uppercase">
              ⌘K
            </span>
          </div>

          {/* Bureau nav */}
          <div className="flex justify-between items-center pt-5 pb-2.5 px-5">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
              The Bureau
            </span>
            <Plus size={12} className="text-[#1a1a1a8c]" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            {[
              { icon: PenLine, label: "The Editor", count: "1,248 wds" },
              { icon: FileText, label: "Drafting Desk", count: "12" },
              { icon: BookOpen, label: "Copy Desk", count: "4" },
              { icon: Archive, label: "Research Desk", count: "31" },
              { icon: Archive, label: "Personal Library", count: "204" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex h-[34px] items-center px-2.5 mx-2.5 gap-2.5 hover:bg-[#1a1a1a0a] cursor-pointer rounded-sm transition-colors"
              >
                <item.icon size={13} strokeWidth={2} />
                <span className="font-['Oswald'] text-[11px] leading-normal tracking-[1.98px] uppercase flex-1">
                  {item.label}
                </span>
                <span className="font-['Oswald'] text-[9px] leading-normal tracking-[1.44px] uppercase">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Open Drafts */}
        <div className="flex w-full flex-col flex-1 overflow-clip">
          <div className="flex justify-between items-center pt-6 pb-2.5 mt-2 border-t px-5 border-t-[#1a1a1a1f]">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
              Open Drafts
            </span>
            <span className="text-[#1a1a1a73] font-['Oswald'] text-[9px] leading-normal tracking-[1.62px] uppercase">
              Issue 014
            </span>
          </div>
          <div className="flex flex-col">
            {[
              {
                no: "No. 03",
                time: "Edited 4m ago",
                title: "On The Difficulty Of Plain Speech",
                active: true,
              },
              { no: "No. 02", time: "Yesterday", title: "A Glossary For The Self-Critical" },
              { no: "No. 01", time: "12 Mar", title: "Against The Tidy Conclusion" },
              { no: "No. 00", time: "08 Mar — sent", title: "Letter From M. Reinhardt" },
            ].map((draft) => (
              <div
                key={draft.no}
                className={[
                  "flex flex-col px-2.5 py-2 mx-2.5 gap-0.5 cursor-pointer rounded-sm",
                  draft.active ? "bg-[#f7f6f3]" : "hover:bg-[#1a1a1a0a] transition-colors",
                ].join(" ")}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                    {draft.no}
                  </span>
                  <div className="flex-1" />
                  <span className="text-[#1a1a1a8c] text-[10px] italic leading-normal">
                    {draft.time}
                  </span>
                </div>
                <span className="text-[13px] leading-[1.3]">{draft.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="flex w-full h-[72px] shrink-0 items-center border-t px-4 gap-2.5 border-t-[#1a1a1a26]">
          <div
            className="size-9 bg-cover bg-no-repeat grayscale rounded-sm"
            style={{
              backgroundImage:
                "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/118a4da713f525b14d3cf23c19f7fc59974984d968b214fe2260b2a1482326d8.jpg')",
            }}
          />
          <div className="flex min-w-0 flex-col flex-1 gap-px">
            <span className="font-['Oswald'] text-xs leading-normal tracking-[1.44px] uppercase">
              H. Okabe
            </span>
            <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">
              The Annual — Issue 014
            </span>
          </div>
          <div className="flex h-[22px] items-center border border-[#1a1a1a33] px-2 gap-1.5">
            <div className="size-[5px] bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
              Writing
            </span>
          </div>
        </div>
      </aside>

      {/* Main editor */}
      <div className="flex h-full flex-col flex-1">
        {/* Toolbar */}
        <div className="flex w-full h-14 shrink-0 items-center border-b px-7 gap-5 border-b-[#1a1a1a26]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              Drafting Desk
            </span>
            <span className="text-[#1a1a1a59] font-['Oswald'] text-[10px] leading-normal">/</span>
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              Essay 03
            </span>
            <span className="text-[#1a1a1a59] font-['Oswald'] text-[10px] leading-normal">/</span>
            <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              Chapter Three
            </span>
          </div>
          <div className="flex h-8 items-center border-x px-[18px] gap-3.5 border-x-[#1a1a1a26]">
            <span className="text-[#1a1a1aa6] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              Tone
            </span>
            <div className="flex h-5 items-center bg-[#1a1a1a] px-2">
              <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                Editorial
              </span>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="font-['Oswald'] text-xs leading-normal tracking-[1.92px] uppercase">
                1,248
              </span>
              <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.98px] uppercase">
                Words
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-[#1a1a1a8c]" strokeWidth={2} />
              <span className="text-[#1a1a1aa6] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                6 min read
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check size={11} className="text-[#2563eb]" strokeWidth={2} />
              <span className="text-[#1a1a1aa6] text-xs italic leading-normal">
                Saved — 4m ago
              </span>
            </div>
            <button className="flex h-8 items-center bg-[#2563eb] px-3.5 gap-2 hover:bg-[#1d4ed8] transition-colors">
              <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                Send To Editor
              </span>
              <ArrowRight size={11} color="#f7f6f3" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Editor body */}
        <div className="flex w-full flex-1 overflow-hidden">
          {/* Writing area */}
          <div className="flex h-full flex-1 overflow-clip">
            {/* Line numbers */}
            <div className="flex w-14 flex-col shrink-0 items-end pt-16 pr-3 border-r gap-3.5 border-r-[#1a1a1a1a]">
              {Array.from({ length: 20 }, (_, i) => (
                <span
                  key={i + 1}
                  className="text-[#1a1a1a4d] font-['Oswald'] text-[10px] leading-normal"
                >
                  {i + 1}
                </span>
              ))}
            </div>

            {/* Text content */}
            <div className="flex h-full flex-col pt-14 flex-1 px-20 gap-[18px] overflow-auto">
              <div className="flex items-center gap-3">
                <span className="text-[#2563eb] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
                  Chapter Three
                </span>
                <div className="size-[3px] bg-[#1a1a1a59] rounded-full" />
                <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                  Draft 7 — 14 March, 11:42
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <h1 className="font-['Oswald'] text-[64px] leading-[0.95] tracking-[-0.96px] uppercase">
                  On The Difficulty
                </h1>
                <h1 className="font-['Oswald'] text-[64px] leading-[0.95] tracking-[-0.96px] uppercase">
                  Of Plain Speech
                </h1>
              </div>

              <p className="text-[17px] leading-[1.7]">
                The cursor blinks like a metronome and the page, as always,{" "}
                <span className="bg-[#2563eb1f] underline decoration-[#2563eb] decoration-dotted underline-offset-[3px] px-[3px]">
                  refuses
                </span>
                . One writes a sentence, then a second; the second betrays the
                first.{" "}
                <span className="bg-[#2563eb33] px-[3px]">
                  Plain speech is the most expensive thing on earth
                </span>{" "}
                — ask anyone who has tried to mean exactly what they said.
              </p>

              <p className="text-[#1a1a1aeb] text-[17px] leading-[1.7]">
                Prose &amp; Co. does not write the sentence for you. It reads
                over your shoulder, quietly, the way a good editor does —
                offering a comma here, a sharper verb there, occasionally a
                silence. The silences, in our experience, are the most useful
                interventions of all.
              </p>

              <p className="text-[#1a1a1aeb] text-[17px] leading-[1.7]">
                There is a particular kind of dishonesty in the tidy paragraph:
                the kind that resolves a contradiction the writer has not
                actually worked out. The Editor will notice this. It will not,
                however, fix it for you.{" "}
                <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal">
                  [01]
                </span>
              </p>

              <div className="flex items-center gap-0.5">
                <span className="text-[#1a1a1aeb] text-[17px] leading-[1.7]">
                  We continue, then, with
                </span>
                <div className="w-0.5 h-[22px] bg-[#2563eb] ml-[3px]" />
              </div>

              {/* Editor suggestion */}
              <div className="flex max-w-[640px] mt-3 border border-[#2563eb]">
                <div className="flex w-1 shrink-0 bg-[#2563eb]" />
                <div className="flex flex-col flex-1 p-4 gap-2">
                  <div className="flex items-center gap-2.5">
                    <Zap size={11} className="text-[#2563eb]" strokeWidth={2} />
                    <span className="text-[#2563eb] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
                      The Editor Suggests
                    </span>
                    <span className="text-[#1a1a1a8c] text-xs italic leading-normal">
                      Replace "refuses"
                    </span>
                  </div>
                  <p className="text-[#1a1a1ae6] text-sm leading-[1.55]">
                    Consider{" "}
                    <span className="text-[#2563eb] font-medium">
                      "will not yield."
                    </span>{" "}
                    Sharper, less metronomic — and it lets the simile do more of
                    the work.
                  </p>
                  <div className="flex items-center mt-1 gap-2">
                    <button className="flex h-[26px] items-center bg-[#2563eb] px-2.5 gap-1.5 hover:bg-[#1d4ed8] transition-colors">
                      <Check size={10} color="#f7f6f3" strokeWidth={2} />
                      <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                        Accept
                      </span>
                    </button>
                    <button className="flex h-[26px] items-center border border-[#1a1a1a4d] px-2.5 gap-1.5 hover:bg-[#1a1a1a08] transition-colors">
                      <X size={10} className="text-[#1a1a1ab3]" strokeWidth={2} />
                      <span className="text-[#1a1a1ab3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                        Dismiss
                      </span>
                    </button>
                    <button className="ml-1 text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase underline">
                      Why this edit?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="flex w-[340px] h-full flex-col shrink-0 bg-[#f2f0ea] border-l border-l-[#1a1a1a26]">
            {/* Panel tabs */}
            <div className="flex h-11 shrink-0 items-center border-b border-b-[#1a1a1a26]">
              {["The Editor", "Research", "Voice", "History"].map((tab, i) => (
                <div
                  key={tab}
                  className={[
                    "flex h-full items-center px-3 cursor-pointer",
                    i === 0
                      ? "border-b-2 border-b-[#2563eb]"
                      : "hover:bg-[#1a1a1a08] transition-colors",
                  ].join(" ")}
                >
                  <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                    {tab}
                  </span>
                </div>
              ))}
            </div>

            {/* Panel content */}
            <div className="flex flex-col flex-1 p-5 gap-4 overflow-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 bg-[#2563eb]" />
                  <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                    Reading Paragraph Two
                  </span>
                </div>
                <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">
                  just now
                </span>
              </div>

              {[
                {
                  tag: "Suggestion — Tighten",
                  priority: "High",
                  body: (
                    <span>
                      "refuses" →{" "}
                      <span className="text-[#2563eb]">"will not yield."</span>{" "}
                      Sharper, less metronomic.
                    </span>
                  ),
                  actions: true,
                },
                {
                  tag: "Tone — Editorial",
                  priority: "Note",
                  body: "Reads like late Didion. Hold the cadence through paragraph two — resist the urge to summarise.",
                  actions: false,
                },
                {
                  tag: "Footnote — [01]",
                  priority: "Cited",
                  body: 'Source: Strunk & White, 1959. "Vigorous writing is concise." — ch. III, § 17.',
                  actions: false,
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">
                      {card.tag}
                    </span>
                    <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                      {card.priority}
                    </span>
                  </div>
                  <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">
                    {card.body}
                  </p>
                  {card.actions && (
                    <div className="flex items-center gap-1.5">
                      <button className="flex h-[22px] items-center bg-[#2563eb] px-2 hover:bg-[#1d4ed8] transition-colors">
                        <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                          Accept
                        </span>
                      </button>
                      <button className="flex h-[22px] items-center border border-[#1a1a1a40] px-2 hover:bg-[#1a1a1a08] transition-colors">
                        <span className="text-[#1a1a1aa6] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                          Dismiss
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex-1" />

              {/* Ask the editor */}
              <div className="flex flex-col pt-3.5 border-t gap-2 border-t-[#1a1a1a26]">
                <div className="flex items-center gap-2">
                  <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">
                    Ask The Editor
                  </span>
                </div>
                <div className="flex h-9 justify-between items-center bg-[#f7f6f3] border border-[#1a1a1a40] px-2.5 gap-2">
                  <span className="text-[#1a1a1a8c] text-xs italic leading-normal">
                    A sharper verb for "refuses"?
                  </span>
                  <CornerDownLeft size={11} className="text-[#2563eb]" strokeWidth={2} />
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {["Tighten", "Argue against", "Cite a source", "Read aloud"].map(
                    (chip) => (
                      <button
                        key={chip}
                        className="flex h-[22px] items-center border border-[#1a1a1a33] px-2 hover:bg-[#1a1a1a08] transition-colors"
                      >
                        <span className="text-[#1a1a1aa6] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                          {chip}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
