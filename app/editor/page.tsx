"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  ArrowRight, Search, Plus, PenLine, FileText, BookOpen,
  Archive, Clock, Zap, Check, X, CornerDownLeft, Loader2,
} from "lucide-react";

type SuggestionState = "active" | "accepted" | "dismissed";

const AI_RESPONSES: Array<{ triggers: string[]; answer: string }> = [
  {
    triggers: ["tighten", "verb", "sharper", "shorter", "replace", "alternative"],
    answer:
      '"Resists" is another option — implies friction without the passive weight of "refuses." "Will not yield" remains the strongest; it turns the page into an adversary.',
  },
  {
    triggers: ["argue", "keep", "defend", "stay", "original"],
    answer:
      'The case for keeping "refuses": the personification pairs cleanly with the metronome — both mechanical, both indifferent. The word is doing structural work here.',
  },
  {
    triggers: ["cite", "source", "reference", "footnote", "quote"],
    answer:
      'Strunk & White: "Omit needless words. Vigorous writing is concise." — The Elements of Style, ch. III, § 13. Useful context, but not a verdict on your choice.',
  },
  {
    triggers: ["read", "aloud", "sound", "cadence", "rhythm", "hear"],
    answer:
      'Read aloud, the sentence lands well. "Blinks / refuses" has a short-syllable snap that mirrors the metronome it describes — this rhythm is earned, not accidental.',
  },
];

function getAIResponse(question: string): string {
  const q = question.toLowerCase();
  for (const r of AI_RESPONSES) {
    if (r.triggers.some((t) => q.includes(t))) return r.answer;
  }
  return "The Editor is reading the sentence again. A more specific question tends to produce a more useful answer — or a more provocative one.";
}

const DRAFTS = [
  { no: "No. 03", time: "Edited 4m ago", title: "On The Difficulty Of Plain Speech" },
  { no: "No. 02", time: "Yesterday", title: "A Glossary For The Self-Critical" },
  { no: "No. 01", time: "12 Mar", title: "Against The Tidy Conclusion" },
  { no: "No. 00", time: "08 Mar — sent", title: "Letter From M. Reinhardt" },
];

const PANEL_TABS = ["The Editor", "Research", "Voice", "History"];

const CHIPS = [
  { label: "Tighten", prompt: 'Can you suggest a tighter verb than "refuses"?' },
  { label: "Argue against", prompt: 'Argue for keeping "refuses" as written.' },
  { label: "Cite a source", prompt: "Cite a source on the value of plain speech." },
  { label: "Read aloud", prompt: "How does this sentence read aloud?" },
];

export default function EditorPage() {
  const [suggestion, setSuggestion] = useState<SuggestionState>("active");
  const [tightenDismissed, setTightenDismissed] = useState(false);
  const [activeDraft, setActiveDraft] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [askValue, setAskValue] = useState("");
  const [extraCards, setExtraCards] = useState<Array<{ id: number; question: string; answer: string }>>([]);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const [wordCount, setWordCount] = useState(1248);
  const continuationRef = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelBottomRef = useRef<HTMLDivElement>(null);

  const triggerSave = useCallback(() => {
    setSaveStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaveStatus("saved"), 1400);
  }, []);

  const handleContinuationInput = useCallback(() => {
    const text = continuationRef.current?.innerText ?? "";
    const extra = text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(1248 + extra);
    triggerSave();
  }, [triggerSave]);

  const acceptSuggestion = useCallback(() => {
    setSuggestion("accepted");
    triggerSave();
  }, [triggerSave]);

  const dismissSuggestion = useCallback(() => {
    setSuggestion("dismissed");
    setTightenDismissed(true);
  }, []);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    const q = askValue.trim();
    if (!q) return;
    setExtraCards((prev) => [...prev, { id: Date.now(), question: q, answer: getAIResponse(q) }]);
    setAskValue("");
  };

  // Scroll panel to bottom when new cards appear
  useEffect(() => {
    panelBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [extraCards]);

  // Focus the continuation area when clicking on text
  const focusContinuation = () => continuationRef.current?.focus();

  return (
    <div className="flex h-screen bg-[#f7f6f3] text-[#1a1a1a] overflow-hidden">

      {/* ── Sidebar ──────────────────────────────────── */}
      <aside className="flex w-[260px] h-full flex-col shrink-0 bg-[#f2f0ea] border-r border-r-[#1a1a1a26]">

        <div className="flex w-full h-16 shrink-0 items-center border-b px-5 gap-2.5 border-b-[#1a1a1a26]">
          <div className="size-2 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-base font-medium tracking-[2.88px] uppercase flex-1">
            Prose &amp; Co.
          </span>
          <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.98px] uppercase">
            014
          </span>
        </div>

        <div className="flex w-full flex-col px-0 py-4">
          <div className="flex h-[34px] items-center bg-[#f7f6f3] border border-[#1a1a1a26] px-2.5 mx-4 gap-2 cursor-text">
            <Search size={12} className="text-[#1a1a1a8c]" strokeWidth={2} />
            <span className="text-[#1a1a1a80] text-xs italic leading-normal flex-1">
              Find a draft, a line
            </span>
            <span className="text-[#1a1a1a73] font-['Oswald'] text-[9px] leading-normal tracking-[1.62px] uppercase">
              ⌘K
            </span>
          </div>

          <div className="flex justify-between items-center pt-5 pb-2.5 px-5">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
              The Bureau
            </span>
            <Plus size={12} className="text-[#1a1a1a8c] cursor-pointer hover:text-[#1a1a1a] transition-colors" strokeWidth={2} />
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
            {DRAFTS.map((draft, i) => (
              <div
                key={draft.no}
                onClick={() => setActiveDraft(i)}
                className={[
                  "flex flex-col px-2.5 py-2 mx-2.5 gap-0.5 cursor-pointer rounded-sm transition-colors",
                  i === activeDraft ? "bg-[#f7f6f3]" : "hover:bg-[#1a1a1a0a]",
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

        <div className="flex w-full h-[72px] shrink-0 items-center border-t px-4 gap-2.5 border-t-[#1a1a1a26]">
          <div
            className="size-9 bg-cover bg-no-repeat grayscale rounded-sm shrink-0"
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
            <div className="size-[5px] bg-[#2563eb] animate-pulse" />
            <span className="font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
              Writing
            </span>
          </div>
        </div>
      </aside>

      {/* ── Main editor ──────────────────────────────── */}
      <div className="flex h-full flex-col flex-1 min-w-0">

        {/* Toolbar */}
        <div className="flex w-full h-14 shrink-0 items-center border-b px-7 gap-5 border-b-[#1a1a1a26]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              Drafting Desk
            </span>
            <span className="text-[#1a1a1a59] font-['Oswald'] text-[10px]">/</span>
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              Essay 03
            </span>
            <span className="text-[#1a1a1a59] font-['Oswald'] text-[10px]">/</span>
            <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              Chapter Three
            </span>
          </div>
          <div className="flex h-8 items-center border-x px-[18px] gap-3.5 border-x-[#1a1a1a26]">
            <span className="text-[#1a1a1aa6] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              Tone
            </span>
            <div className="flex h-5 items-center bg-[#1a1a1a] px-2 cursor-pointer hover:bg-[#2563eb] transition-colors">
              <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                Editorial
              </span>
            </div>
          </div>
          <div className="flex-1" />
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="font-['Oswald'] text-xs leading-normal tracking-[1.92px] uppercase">
                {wordCount.toLocaleString()}
              </span>
              <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.98px] uppercase">
                Words
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} className="text-[#1a1a1a8c]" strokeWidth={2} />
              <span className="text-[#1a1a1aa6] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                {Math.ceil(wordCount / 200)} min read
              </span>
            </div>
            <div className="flex items-center gap-1.5 min-w-[80px]">
              {saveStatus === "saving" ? (
                <>
                  <Loader2 size={11} className="text-[#1a1a1a8c] animate-spin" strokeWidth={2} />
                  <span className="text-[#1a1a1a8c] text-xs italic leading-normal">Saving…</span>
                </>
              ) : (
                <>
                  <Check size={11} className="text-[#2563eb]" strokeWidth={2} />
                  <span className="text-[#1a1a1aa6] text-xs italic leading-normal">Saved</span>
                </>
              )}
            </div>
            <button className="flex h-8 items-center bg-[#2563eb] px-3.5 gap-2 hover:bg-[#1d4ed8] transition-colors">
              <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                Send To Editor
              </span>
              <ArrowRight size={11} color="#f7f6f3" strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex w-full flex-1 overflow-hidden">

          {/* Writing area */}
          <div className="flex h-full flex-1 overflow-hidden">

            {/* Line numbers */}
            <div className="flex w-14 flex-col shrink-0 items-end pt-16 pr-3 border-r gap-[22.4px] border-r-[#1a1a1a1a] overflow-hidden">
              {Array.from({ length: 18 }, (_, i) => (
                <span key={i} className="text-[#1a1a1a4d] font-['Oswald'] text-[10px] leading-normal">
                  {i + 1}
                </span>
              ))}
            </div>

            {/* Text content */}
            <div
              className="flex h-full flex-col pt-14 flex-1 px-20 gap-[22px] overflow-y-auto cursor-text"
              onClick={focusContinuation}
            >
              {/* Meta */}
              <div className="flex items-center gap-3">
                <span className="text-[#2563eb] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
                  Chapter Three
                </span>
                <div className="size-[3px] bg-[#1a1a1a59] rounded-full" />
                <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                  Draft 7 — 14 March, 11:42
                </span>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-0.5">
                <h1 className="font-['Oswald'] text-[64px] leading-[0.95] tracking-[-0.96px] uppercase">
                  On The Difficulty
                </h1>
                <h1 className="font-['Oswald'] text-[64px] leading-[0.95] tracking-[-0.96px] uppercase">
                  Of Plain Speech
                </h1>
              </div>

              {/* Paragraph 1 — highlighted suggestion word */}
              <p className="text-[17px] leading-[1.7]">
                The cursor blinks like a metronome and the page, as always,{" "}
                {suggestion === "active" && (
                  <span className="bg-[#2563eb1f] underline decoration-[#2563eb] decoration-dotted underline-offset-[3px] px-[3px] cursor-pointer" title="Suggestion active">
                    refuses
                  </span>
                )}
                {suggestion === "accepted" && (
                  <span className="text-[#2563eb] font-medium transition-colors">
                    will not yield.
                  </span>
                )}
                {suggestion === "dismissed" && "refuses"}
                . One writes a sentence, then a second; the second betrays the first.{" "}
                <span className="bg-[#2563eb33] px-[3px]">
                  Plain speech is the most expensive thing on earth
                </span>{" "}
                — ask anyone who has tried to mean exactly what they said.
              </p>

              {/* Paragraph 2 */}
              <p className="text-[#1a1a1aeb] text-[17px] leading-[1.7]">
                Prose &amp; Co. does not write the sentence for you. It reads over
                your shoulder, quietly, the way a good editor does — offering a comma
                here, a sharper verb there, occasionally a silence. The silences, in
                our experience, are the most useful interventions of all.
              </p>

              {/* Paragraph 3 */}
              <p className="text-[#1a1a1aeb] text-[17px] leading-[1.7]">
                There is a particular kind of dishonesty in the tidy paragraph: the
                kind that resolves a contradiction the writer has not actually worked
                out. The Editor will notice this. It will not, however, fix it for
                you.{" "}
                <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal">
                  [01]
                </span>
              </p>

              {/* Continuation line + cursor */}
              <div className="flex items-start gap-0.5">
                <span className="text-[#1a1a1aeb] text-[17px] leading-[1.7]">
                  We continue, then, with{" "}
                </span>
              </div>

              {/* Inline suggestion card */}
              {suggestion === "active" && (
                <div className="flex max-w-[600px] border border-[#2563eb] animate-in fade-in duration-200">
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
                      <span className="text-[#2563eb] font-medium">"will not yield."</span>{" "}
                      Sharper, less metronomic — and it lets the simile do more of the work.
                    </p>
                    <div className="flex items-center mt-1 gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); acceptSuggestion(); }}
                        className="flex h-[26px] items-center bg-[#2563eb] px-2.5 gap-1.5 hover:bg-[#1d4ed8] transition-colors"
                      >
                        <Check size={10} color="#f7f6f3" strokeWidth={2} />
                        <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                          Accept
                        </span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); dismissSuggestion(); }}
                        className="flex h-[26px] items-center border border-[#1a1a1a4d] px-2.5 gap-1.5 hover:bg-[#1a1a1a08] transition-colors"
                      >
                        <X size={10} className="text-[#1a1a1ab3]" strokeWidth={2} />
                        <span className="text-[#1a1a1ab3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                          Dismiss
                        </span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setAskValue('Why suggest "will not yield" over "refuses"?'); }}
                        className="ml-1 text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase underline hover:text-[#1a1a1a] transition-colors"
                      >
                        Why this edit?
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Editable continuation area */}
              <div
                ref={continuationRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleContinuationInput}
                onClick={(e) => e.stopPropagation()}
                data-placeholder="Continue writing…"
                className="min-h-[120px] text-[17px] leading-[1.7] text-[#1a1a1aeb] outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#1a1a1a33] empty:before:italic"
              />

              <div className="h-24" />
            </div>
          </div>

          {/* ── Right panel ──────────────────────────── */}
          <div className="flex w-[340px] h-full flex-col shrink-0 bg-[#f2f0ea] border-l border-l-[#1a1a1a26]">

            {/* Tabs */}
            <div className="flex h-11 shrink-0 items-center border-b border-b-[#1a1a1a26]">
              {PANEL_TABS.map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(i)}
                  className={[
                    "flex h-full items-center px-3 transition-colors",
                    i === activeTab
                      ? "border-b-2 border-b-[#2563eb]"
                      : "text-[#1a1a1a8c] hover:text-[#1a1a1a] hover:bg-[#1a1a1a08]",
                  ].join(" ")}
                >
                  <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                    {tab}
                  </span>
                </button>
              ))}
            </div>

            {/* Panel content */}
            <div className="flex flex-col flex-1 p-5 gap-4 overflow-y-auto">

              {activeTab === 0 && (
                <>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="size-1.5 bg-[#2563eb] animate-pulse" />
                      <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                        Reading Paragraph Two
                      </span>
                    </div>
                    <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">
                      just now
                    </span>
                  </div>

                  {/* Tighten card */}
                  {!tightenDismissed && (
                    <div className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">
                          Suggestion — Tighten
                        </span>
                        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                          High
                        </span>
                      </div>
                      <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">
                        "refuses" →{" "}
                        <span className="text-[#2563eb]">"will not yield."</span>{" "}
                        Sharper, less metronomic.
                      </p>
                      {suggestion !== "accepted" && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={acceptSuggestion}
                            className="flex h-[22px] items-center bg-[#2563eb] px-2 hover:bg-[#1d4ed8] transition-colors"
                          >
                            <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                              Accept
                            </span>
                          </button>
                          <button
                            onClick={dismissSuggestion}
                            className="flex h-[22px] items-center border border-[#1a1a1a40] px-2 hover:bg-[#1a1a1a08] transition-colors"
                          >
                            <span className="text-[#1a1a1aa6] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                              Dismiss
                            </span>
                          </button>
                        </div>
                      )}
                      {suggestion === "accepted" && (
                        <div className="flex items-center gap-1.5">
                          <Check size={11} className="text-[#2563eb]" strokeWidth={2} />
                          <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                            Accepted
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tone card */}
                  <div className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">
                        Tone — Editorial
                      </span>
                      <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                        Note
                      </span>
                    </div>
                    <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">
                      Reads like late Didion. Hold the cadence through paragraph two
                      — resist the urge to summarise.
                    </p>
                  </div>

                  {/* Footnote card */}
                  <div className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">
                        Footnote — [01]
                      </span>
                      <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                        Cited
                      </span>
                    </div>
                    <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">
                      Source: Strunk &amp; White, 1959. "Vigorous writing is concise." —
                      ch. III, § 17.
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="size-[7px] rounded-full bg-[#2563eb]" />
                      <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase cursor-pointer hover:text-[#2563eb] transition-colors">
                        View In Library
                      </span>
                    </div>
                  </div>

                  {/* Ask the Editor responses */}
                  {extraCards.map((card) => (
                    <div
                      key={card.id}
                      className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">
                          Response — The Editor
                        </span>
                        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                          Now
                        </span>
                      </div>
                      <p className="text-[#1a1a1a8c] text-[11px] italic leading-normal border-l-2 border-l-[#1a1a1a1a] pl-2">
                        {card.question}
                      </p>
                      <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">
                        {card.answer}
                      </p>
                    </div>
                  ))}

                  <div ref={panelBottomRef} />
                </>
              )}

              {activeTab !== 0 && (
                <div className="flex flex-col flex-1 items-center justify-center gap-2 opacity-40">
                  <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase">
                    {PANEL_TABS[activeTab]}
                  </span>
                  <span className="text-[13px] italic text-[#1a1a1a8c]">
                    Coming soon.
                  </span>
                </div>
              )}

              <div className="flex-1" />

              {/* Ask The Editor */}
              {activeTab === 0 && (
                <form
                  onSubmit={handleAsk}
                  className="flex flex-col pt-3.5 border-t gap-2 border-t-[#1a1a1a26]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">
                    Ask The Editor
                  </span>
                  <div className="flex h-9 items-center bg-[#f7f6f3] border border-[#1a1a1a40] px-2.5 gap-2 focus-within:border-[#2563eb] transition-colors">
                    <input
                      type="text"
                      value={askValue}
                      onChange={(e) => setAskValue(e.target.value)}
                      placeholder="Ask something about the text…"
                      className="flex-1 bg-transparent text-xs italic leading-normal outline-none placeholder:text-[#1a1a1a8c] text-[#1a1a1a]"
                    />
                    <button type="submit">
                      <CornerDownLeft
                        size={11}
                        className={askValue ? "text-[#2563eb]" : "text-[#1a1a1a4d]"}
                        strokeWidth={2}
                      />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {CHIPS.map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => setAskValue(chip.prompt)}
                        className="flex h-[22px] items-center border border-[#1a1a1a33] px-2 hover:bg-[#1a1a1a08] hover:border-[#1a1a1a66] transition-colors"
                      >
                        <span className="text-[#1a1a1aa6] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">
                          {chip.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
