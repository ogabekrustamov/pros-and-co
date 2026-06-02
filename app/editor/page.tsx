"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight, Search, Plus, PenLine, FileText, BookOpen,
  Archive, Clock, Check, X, CornerDownLeft, Loader2,
  ChevronDown, Bold, Italic, Folder, Trash2, Menu,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// ─── Types ────────────────────────────────────────────────────────────────────

type Section = "editor" | "drafting" | "copy" | "research" | "library";
type PanelTab = "suggestions" | "research" | "voice" | "history";
type SuggestionState = "active" | "accepted" | "dismissed";
type Tone = "Editorial" | "Formal" | "Conversational" | "Sharp" | "Lyrical";

interface Draft {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  if (Math.floor(hours / 24) === 1) return "Yesterday";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

function draftNo(index: number, total: number): string {
  return `No. ${String(total - 1 - index).padStart(2, "0")}`;
}

const SOURCES = [
  { id: 1, author: "Strunk & White", title: "The Elements of Style", year: 1959, chapter: "ch. III, § 13", cited: true },
  { id: 2, author: "Joan Didion", title: "Slouching Towards Bethlehem", year: 1968, chapter: "Preface", cited: false },
  { id: 3, author: "George Orwell", title: "Politics and the English Language", year: 1946, chapter: "§ 4", cited: false },
  { id: 4, author: "William Zinsser", title: "On Writing Well", year: 1976, chapter: "ch. 1", cited: false },
];

const LIBRARY_ITEMS = [
  { id: 1, title: "The Elements of Style", author: "Strunk & White", type: "Reference", pages: 105, saved: "14 Mar" },
  { id: 2, title: "On Writing Well", author: "William Zinsser", type: "Reference", pages: 321, saved: "12 Mar" },
  { id: 3, title: "Slouching Towards Bethlehem", author: "Joan Didion", type: "Essays", pages: 238, saved: "10 Mar" },
  { id: 4, title: "Politics and the English Language", author: "George Orwell", type: "Essay", pages: 14, saved: "08 Mar" },
  { id: 5, title: "The Writing Life", author: "Annie Dillard", type: "Memoir", pages: 112, saved: "06 Mar" },
];

const INITIAL_COPY_ISSUES = [
  { id: 1, type: "Weak adverb", text: '"actually"', suggestion: "Remove — the sentence is stronger without it.", severity: "medium", fixed: false },
  { id: 2, type: "Passive voice", text: '"has not actually worked out"', suggestion: 'Consider active: "the writer left unresolved."', severity: "low", fixed: false },
  { id: 3, type: "Long sentence", text: "Paragraph 3, sentence 1", suggestion: "41 words. Consider splitting after the colon.", severity: "low", fixed: false },
];

const HISTORY_ENTRIES = [
  { time: "11:42", action: "Draft saved", detail: "1,248 words" },
  { time: "11:31", action: "Chapter title updated", detail: '"Chapter Three" added' },
  { time: "10:58", action: "Draft saved", detail: "1,201 words" },
  { time: "10:22", action: "Paragraph added", detail: "+89 words" },
  { time: "09:45", action: "Draft created", detail: "blank" },
];

const TONES: Tone[] = ["Editorial", "Formal", "Conversational", "Sharp", "Lyrical"];

const CHIPS = [
  { label: "Tighten", prompt: 'Suggest a tighter verb than "refuses".' },
  { label: "Argue against", prompt: 'Make the case for keeping "refuses" as written.' },
  { label: "Cite a source", prompt: "Cite a source on the value of plain speech." },
  { label: "Read aloud", prompt: "How does this sentence read aloud?" },
];

const AI_RESPONSES = [
  {
    triggers: ["tighten", "verb", "sharper", "shorter", "replace", "alternative"],
    answer: '"Resists" implies active friction without the passive weight of "refuses." "Will not yield" remains the strongest — it turns the page into an adversary worth arguing with.',
  },
  {
    triggers: ["argue", "keep", "defend", "stay", "original"],
    answer: 'The case for "refuses": the personification pairs cleanly with the metronome — both mechanical, both indifferent. The word is doing structural work. Do not change it lightly.',
  },
  {
    triggers: ["cite", "source", "reference", "footnote", "quote"],
    answer: 'Strunk & White: "Omit needless words. Vigorous writing is concise." — The Elements of Style, ch. III, § 13. Useful context. Not a verdict on your choice.',
  },
  {
    triggers: ["read", "aloud", "sound", "cadence", "rhythm", "hear"],
    answer: '"Blinks / refuses" has a short-syllable snap that mirrors the metronome it describes. This rhythm is earned, not accidental. Leave it.',
  },
];

function getAIResponse(q: string): string {
  const lower = q.toLowerCase();
  for (const r of AI_RESPONSES) {
    if (r.triggers.some((t) => lower.includes(t))) return r.answer;
  }
  return "A more specific question tends to produce a more useful answer — or a more provocative one.";
}

// ─── Section views ────────────────────────────────────────────────────────────

function DraftingDeskView({
  drafts,
  activeDraftId,
  onOpen,
  onNew,
  onDelete,
}: {
  drafts: Draft[];
  activeDraftId: string | null;
  onOpen: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
}) {
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const statusColor: Record<string, string> = {
    draft: "text-[#1a1a1a8c]",
    review: "text-[#2563eb]",
    sent: "text-[#1a1a1a4d]",
  };

  function handleDeleteClick(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    if (confirmId === id) {
      onDelete(id);
      setConfirmId(null);
    } else {
      setConfirmId(id);
    }
  }

  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-12 py-10 gap-8" onClick={() => setConfirmId(null)}>
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase text-[#1a1a1a99]">
            Drafting Desk — Issue 014
          </span>
          <h2 className="font-['Oswald'] text-5xl leading-none tracking-[-0.96px] uppercase">
            All Drafts
          </h2>
        </div>
        <button
          onClick={onNew}
          className="flex h-10 items-center gap-2 bg-[#2563eb] px-5 hover:bg-[#1d4ed8] transition-colors"
        >
          <Plus size={13} color="#f7f6f3" strokeWidth={2} />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase text-[#f7f6f3]">
            New Draft
          </span>
        </button>
      </div>
      <div className="flex flex-col border-t border-t-[#1a1a1a1a]">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            onClick={() => { setConfirmId(null); onOpen(draft.id); }}
            className={[
              "flex items-center border-b border-b-[#1a1a1a1a] py-5 gap-6 cursor-pointer group hover:bg-[#f7f6f3] transition-colors -mx-1 px-1",
              draft.id === activeDraftId ? "bg-[#f7f6f3]" : "",
            ].join(" ")}
          >
            <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase w-14 shrink-0">
              {draftNo(drafts.indexOf(draft), drafts.length)}
            </span>
            <span className="font-['Oswald'] text-xl leading-none tracking-[-0.2px] uppercase flex-1 group-hover:text-[#2563eb] transition-colors">
              {draft.title}
            </span>
            <span className={["font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase w-20 shrink-0", statusColor[draft.status] ?? "text-[#1a1a1a8c]"].join(" ")}>
              {draft.status}
            </span>
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase w-24 shrink-0 text-right">
              {draft.wordCount.toLocaleString()} wds
            </span>
            <span className="text-[#1a1a1a8c] text-[13px] italic leading-normal w-28 shrink-0 text-right">
              {timeAgo(draft.updatedAt)}
            </span>
            {confirmId === draft.id ? (
              <button
                onClick={(e) => handleDeleteClick(e, draft.id)}
                className="flex items-center gap-1.5 h-7 bg-[#1a1a1a] px-3 shrink-0 hover:bg-red-600 transition-colors"
              >
                <span className="font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase text-[#f7f6f3]">
                  Confirm
                </span>
              </button>
            ) : (
              <button
                onClick={(e) => handleDeleteClick(e, draft.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-1 hover:text-red-500 text-[#1a1a1a4d]"
                title="Delete draft"
              >
                <Trash2 size={13} strokeWidth={2} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CopyDeskView({
  issues,
  onFix,
}: {
  issues: typeof INITIAL_COPY_ISSUES;
  onFix: (id: number) => void;
}) {
  const pending = issues.filter((i) => !i.fixed);
  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-12 py-10 gap-8">
      <div className="flex flex-col gap-1">
        <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase text-[#1a1a1a99]">
          Copy Desk — Essay 03
        </span>
        <h2 className="font-['Oswald'] text-5xl leading-none tracking-[-0.96px] uppercase">
          {pending.length === 0 ? "Clean." : `${pending.length} Issue${pending.length > 1 ? "s" : ""} Found.`}
        </h2>
      </div>
      <div className="flex flex-col gap-4 max-w-[760px]">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className={[
              "flex flex-col border p-6 gap-3 transition-colors",
              issue.fixed ? "border-[#1a1a1a1a] opacity-50" : "border-[#1a1a1a26]",
            ].join(" ")}
          >
            <div className="flex justify-between items-center">
              <span className={["font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase", issue.fixed ? "text-[#1a1a1a4d]" : "text-[#2563eb]"].join(" ")}>
                {issue.type}
              </span>
              <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase text-[#1a1a1a8c]">
                {issue.severity}
              </span>
            </div>
            <p className="text-[17px] leading-[1.6] font-medium">{issue.text}</p>
            <p className="text-[#1a1a1a8c] text-[15px] leading-[1.55] italic">{issue.suggestion}</p>
            {!issue.fixed && (
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onFix(issue.id)}
                  className="flex h-8 items-center bg-[#2563eb] px-4 gap-1.5 hover:bg-[#1d4ed8] transition-colors"
                >
                  <Check size={11} color="#f7f6f3" strokeWidth={2} />
                  <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase text-[#f7f6f3]">
                    Apply Fix
                  </span>
                </button>
                <button
                  onClick={() => onFix(issue.id)}
                  className="flex h-8 items-center border border-[#1a1a1a26] px-4 hover:bg-[#1a1a1a08] transition-colors"
                >
                  <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase text-[#1a1a1a8c]">
                    Ignore
                  </span>
                </button>
              </div>
            )}
            {issue.fixed && (
              <div className="flex items-center gap-1.5">
                <Check size={12} className="text-[#1a1a1a4d]" strokeWidth={2} />
                <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase text-[#1a1a1a4d]">
                  Resolved
                </span>
              </div>
            )}
          </div>
        ))}
        {pending.length === 0 && (
          <p className="text-[#1a1a1a8c] text-[15px] italic leading-normal">
            No outstanding copy issues. The editor is satisfied — for now.
          </p>
        )}
      </div>
    </div>
  );
}

function ResearchDeskView({
  sources,
  citedIds,
  onCite,
  onViewLibrary,
}: {
  sources: typeof SOURCES;
  citedIds: Set<number>;
  onCite: (id: number) => void;
  onViewLibrary: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-12 py-10 gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase text-[#1a1a1a99]">
            Research Desk — Essay 03
          </span>
          <h2 className="font-['Oswald'] text-5xl leading-none tracking-[-0.96px] uppercase">
            Sources
          </h2>
        </div>
        <button
          onClick={onViewLibrary}
          className="flex h-10 items-center gap-2 border border-[#1a1a1a] px-5 hover:bg-[#1a1a1a] hover:text-[#f7f6f3] transition-colors"
        >
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase">
            Open Library
          </span>
          <ArrowRight size={13} strokeWidth={2} />
        </button>
      </div>
      <div className="flex flex-col gap-4 max-w-[760px]">
        {sources.map((source) => {
          const isCited = citedIds.has(source.id) || source.cited;
          return (
            <div key={source.id} className="flex flex-col border border-[#1a1a1a26] p-6 gap-3">
              <div className="flex justify-between items-center">
                <span className={["font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase", isCited ? "text-[#2563eb]" : "text-[#1a1a1a8c]"].join(" ")}>
                  {isCited ? "Cited in Essay 03" : "Available"}
                </span>
                <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase text-[#1a1a1a8c]">
                  {source.year}
                </span>
              </div>
              <p className="font-['Oswald'] text-xl leading-none tracking-[-0.2px] uppercase">
                {source.title}
              </p>
              <p className="text-[#1a1a1a8c] text-[14px] italic leading-normal">
                {source.author} — {source.chapter}
              </p>
              {!isCited && (
                <button
                  onClick={() => onCite(source.id)}
                  className="flex w-fit h-8 items-center bg-[#2563eb] px-4 gap-1.5 hover:bg-[#1d4ed8] transition-colors"
                >
                  <Plus size={11} color="#f7f6f3" strokeWidth={2} />
                  <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase text-[#f7f6f3]">
                    Add Citation
                  </span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LibraryView({ items, onImport, userName }: { items: typeof LIBRARY_ITEMS; onImport: () => void; userName: string }) {
  return (
    <div className="flex flex-col flex-1 overflow-y-auto px-12 py-10 gap-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase text-[#1a1a1a99]">
            Personal Library — {userName}
          </span>
          <h2 className="font-['Oswald'] text-5xl leading-none tracking-[-0.96px] uppercase">
            {items.length} Items
          </h2>
        </div>
        <button
          onClick={onImport}
          className="flex h-10 items-center gap-2 bg-[#2563eb] px-5 hover:bg-[#1d4ed8] transition-colors"
        >
          <Plus size={13} color="#f7f6f3" strokeWidth={2} />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase text-[#f7f6f3]">
            Import Document
          </span>
        </button>
      </div>
      <div className="flex flex-col border-t border-t-[#1a1a1a1a]">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center border-b border-b-[#1a1a1a1a] py-5 gap-6 cursor-pointer group hover:bg-[#f7f6f3] transition-colors -mx-1 px-1"
          >
            <Folder size={16} className="text-[#1a1a1a4d] group-hover:text-[#2563eb] transition-colors shrink-0" strokeWidth={1.5} />
            <div className="flex flex-col flex-1 gap-0.5">
              <span className="font-['Oswald'] text-lg leading-none tracking-[-0.2px] uppercase group-hover:text-[#2563eb] transition-colors">
                {item.title}
              </span>
              <span className="text-[#1a1a1a8c] text-[13px] italic leading-normal">
                {item.author}
              </span>
            </div>
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase w-28 shrink-0">
              {item.type}
            </span>
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase w-20 shrink-0 text-right">
              {item.pages}p
            </span>
            <span className="text-[#1a1a1a8c] text-[13px] italic leading-normal w-20 shrink-0 text-right">
              {item.saved}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function EditorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, user, router]);

  const [section, setSection] = useState<Section>("editor");
  const [suggestion, setSuggestion] = useState<SuggestionState>("active");
  const [tightenDismissed, setTightenDismissed] = useState(false);
  const [panelTab, setPanelTab] = useState<PanelTab>("suggestions");
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [draftsLoading, setDraftsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [askValue, setAskValue] = useState("");
  const [extraCards, setExtraCards] = useState<Array<{ id: number; question: string; answer: string; streaming: boolean }>>([]);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving">("saved");
  const [wordCount, setWordCount] = useState(0);
  const [tone, setTone] = useState<Tone>("Editorial");
  const [showToneMenu, setShowToneMenu] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copyIssues, setCopyIssues] = useState(INITIAL_COPY_ISSUES);
  const [citedIds, setCitedIds] = useState<Set<number>>(new Set());
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const continuationRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const panelBottomRef = useRef<HTMLDivElement>(null);

  // Load drafts from DB
  useEffect(() => {
    fetch("/api/drafts")
      .then((r) => (r.ok ? r.json() : []))
      .then((data: unknown) => {
        const list = Array.isArray(data) ? (data as Draft[]) : [];
        setDrafts(list);
        if (list.length > 0) setActiveDraftId(list[0].id);
        setDraftsLoading(false);
      })
      .catch(() => setDraftsLoading(false));
  }, []);

  // Load content into editor when active draft changes
  useEffect(() => {
    if (!activeDraftId || !continuationRef.current) return;
    const draft = drafts.find((d) => d.id === activeDraftId);
    if (draft) {
      continuationRef.current.innerText = draft.content;
      setWordCount(draft.wordCount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeDraftId]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  }, []);

  const triggerSave = useCallback(() => {
    setSaveStatus("saving");
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => setSaveStatus("saved"), 1400);
  }, []);

  const handleContinuationInput = useCallback(() => {
    if (!activeDraftId) return;
    const text = continuationRef.current?.innerText ?? "";
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    triggerSave();

    clearTimeout(autoSaveTimer.current);
    autoSaveTimer.current = setTimeout(async () => {
      await fetch(`/api/drafts/${activeDraftId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, wordCount: words }),
      });
      setDrafts((prev) =>
        prev.map((d) =>
          d.id === activeDraftId
            ? { ...d, content: text, wordCount: words, updatedAt: new Date().toISOString() }
            : d
        )
      );
    }, 1500);
  }, [activeDraftId, triggerSave]);

  const acceptSuggestion = useCallback(() => {
    setSuggestion("accepted");
    triggerSave();
    showToast("Suggestion accepted.");
  }, [triggerSave, showToast]);

  const dismissSuggestion = useCallback(() => {
    setSuggestion("dismissed");
    setTightenDismissed(true);
    showToast("Suggestion dismissed.");
  }, [showToast]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = askValue.trim();
    if (!q) return;
    const cardId = Date.now();
    const draftText = continuationRef.current?.innerText?.trim() ?? "";
    setExtraCards((prev) => [...prev, { id: cardId, question: q, answer: "", streaming: true }]);
    setAskValue("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, context: draftText || undefined }),
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }
      if (!res.body) throw new Error("No response body.");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setExtraCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, answer: c.answer + chunk } : c))
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error.";
      setExtraCards((prev) =>
        prev.map((c) =>
          c.id === cardId
            ? { ...c, answer: `The Editor is unavailable: ${msg}` }
            : c
        )
      );
    } finally {
      setExtraCards((prev) =>
        prev.map((c) => (c.id === cardId ? { ...c, streaming: false } : c))
      );
    }
  };

  const handleNewDraft = useCallback(async () => {
    const res = await fetch("/api/drafts", { method: "POST" });
    if (!res.ok) { showToast("Could not create draft."); return; }
    const newDraft: Draft = await res.json();
    setDrafts((prev) => [newDraft, ...prev]);
    setActiveDraftId(newDraft.id);
    setSection("editor");
    setTimeout(() => {
      if (continuationRef.current) continuationRef.current.innerText = "";
      continuationRef.current?.focus();
    }, 100);
    showToast("New draft created.");
  }, [showToast]);

  const handleOpenDraft = useCallback((id: string) => {
    setActiveDraftId(id);
    setSection("editor");
  }, []);

  const handleSendToEditor = () => {
    showToast("Sent to M. Reinhardt — expect a reply within 4 hours.");
    triggerSave();
  };

  const handleFormatText = (cmd: string) => {
    document.execCommand(cmd, false);
    continuationRef.current?.focus();
  };

  const handleFixCopyIssue = useCallback((id: number) => {
    setCopyIssues((prev) => prev.map((i) => (i.id === id ? { ...i, fixed: true } : i)));
    showToast("Fix applied.");
  }, [showToast]);

  const handleCiteSource = useCallback((id: number) => {
    setCitedIds((prev) => new Set([...prev, id]));
    const source = SOURCES.find((s) => s.id === id);
    showToast(`"${source?.title}" added to citations.`);
  }, [showToast]);

  const handleImportToLibrary = () => showToast("Import feature coming soon.");

  const handleDeleteDraft = useCallback(async (id: string) => {
    await fetch(`/api/drafts/${id}`, { method: "DELETE" });
    setDrafts((prev) => {
      const next = prev.filter((d) => d.id !== id);
      if (activeDraftId === id) {
        setActiveDraftId(next[0]?.id ?? null);
        if (continuationRef.current) continuationRef.current.innerText = next[0]?.content ?? "";
        setWordCount(next[0]?.wordCount ?? 0);
      }
      return next;
    });
    showToast("Draft deleted.");
  }, [activeDraftId, showToast]);

  const handleTitleClick = useCallback(() => {
    const draft = drafts.find((d) => d.id === activeDraftId);
    if (!draft) return;
    setTitleValue(draft.title);
    setEditingTitle(true);
    setTimeout(() => titleInputRef.current?.select(), 30);
  }, [drafts, activeDraftId]);

  const handleTitleSave = useCallback(async () => {
    if (!activeDraftId) return;
    setEditingTitle(false);
    const trimmed = titleValue.trim() || "Untitled Draft";
    setDrafts((prev) =>
      prev.map((d) => (d.id === activeDraftId ? { ...d, title: trimmed } : d))
    );
    await fetch(`/api/drafts/${activeDraftId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed }),
    });
  }, [activeDraftId, titleValue]);

  useEffect(() => {
    panelBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [extraCards]);

  const filteredDrafts = drafts.filter((d) =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeDraft = drafts.find((d) => d.id === activeDraftId) ?? drafts[0] ?? null;

  const BUREAU_NAV: Array<{ id: Section; Icon: typeof PenLine; label: string; count: string }> = [
    { id: "editor", Icon: PenLine, label: "The Editor", count: draftsLoading ? "…" : `${wordCount.toLocaleString()} wds` },
    { id: "drafting", Icon: FileText, label: "Drafting Desk", count: String(drafts.length) },
    { id: "copy", Icon: BookOpen, label: "Copy Desk", count: String(copyIssues.filter((i) => !i.fixed).length) },
    { id: "research", Icon: Archive, label: "Research Desk", count: String(SOURCES.length) },
    { id: "library", Icon: Folder, label: "Personal Library", count: String(LIBRARY_ITEMS.length) },
  ];

  const sidebarListLabel =
    section === "library" ? "Library" : section === "research" ? "Sources" : "Open Drafts";

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7f6f3]">
        <div className="flex items-center gap-2.5">
          <div className="size-2 bg-[#2563eb] animate-pulse" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase text-[#1a1a1a8c]">
            Loading…
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f7f6f3] text-[#1a1a1a] overflow-hidden" onClick={() => { setShowToneMenu(false); setMobileSidebarOpen(false); }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[#1a1a1a] text-[#f7f6f3] px-5 py-3 shadow-lg">
          <Check size={12} color="#f7f6f3" strokeWidth={2} />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2px] uppercase">{toast}</span>
        </div>
      )}

      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#1a1a1a40] md:hidden"
          onClick={(e) => { e.stopPropagation(); setMobileSidebarOpen(false); }}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────── */}
      <aside className={[
        "flex w-[260px] h-full flex-col shrink-0 bg-[#f2f0ea] border-r border-r-[#1a1a1a26]",
        "fixed md:relative z-40 md:z-auto top-0 left-0 transition-transform duration-200",
        mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      ].join(" ")} onClick={(e) => e.stopPropagation()}>

        <div className="flex w-full h-16 shrink-0 items-center border-b px-5 gap-2.5 border-b-[#1a1a1a26]">
          <div className="size-2 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-base font-medium tracking-[2.88px] uppercase flex-1">
            Prose &amp; Co.
          </span>
          <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.98px] uppercase">014</span>
        </div>

        <div className="flex w-full flex-col px-0 py-4">
          {/* Search */}
          <div className="flex h-[34px] items-center bg-[#f7f6f3] border border-[#1a1a1a26] px-2.5 mx-4 gap-2 focus-within:border-[#2563eb] transition-colors">
            <Search size={12} className="text-[#1a1a1a8c] shrink-0" strokeWidth={2} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find a draft, a line"
              className="text-[#1a1a1a] text-xs italic leading-normal flex-1 bg-transparent outline-none placeholder:text-[#1a1a1a80]"
            />
            {searchQuery ? (
              <button onClick={() => setSearchQuery("")}>
                <X size={10} className="text-[#1a1a1a8c]" strokeWidth={2} />
              </button>
            ) : (
              <span className="text-[#1a1a1a73] font-['Oswald'] text-[9px] leading-normal tracking-[1.62px] uppercase">⌘K</span>
            )}
          </div>

          {/* Bureau nav */}
          <div className="flex justify-between items-center pt-5 pb-2.5 px-5">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">The Bureau</span>
            <button onClick={handleNewDraft} title="New draft">
              <Plus size={12} className="text-[#1a1a1a8c] hover:text-[#2563eb] transition-colors cursor-pointer" strokeWidth={2} />
            </button>
          </div>
          <div className="flex flex-col">
            {BUREAU_NAV.map(({ id, Icon, label, count }) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={[
                  "flex h-[34px] items-center px-2.5 mx-2.5 gap-2.5 cursor-pointer rounded-sm transition-colors text-left",
                  section === id ? "bg-[#f7f6f3]" : "hover:bg-[#1a1a1a0a]",
                ].join(" ")}
              >
                <Icon size={13} strokeWidth={2} className={section === id ? "text-[#2563eb]" : "text-[#1a1a1a]"} />
                <span className="font-['Oswald'] text-[11px] leading-normal tracking-[1.98px] uppercase flex-1">
                  {label}
                </span>
                <span className="font-['Oswald'] text-[9px] leading-normal tracking-[1.44px] uppercase text-[#1a1a1a8c]">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Article list */}
        <div className="flex w-full flex-col flex-1 overflow-y-auto">
          <div className="flex justify-between items-center pt-6 pb-2.5 mt-2 border-t px-5 border-t-[#1a1a1a1f]">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
              {sidebarListLabel}
            </span>
            {(section === "editor" || section === "drafting" || section === "copy") && (
              <span className="text-[#1a1a1a73] font-['Oswald'] text-[9px] leading-normal tracking-[1.62px] uppercase">
                Issue 014
              </span>
            )}
          </div>
          <div className="flex flex-col">
            {section === "library" &&
              LIBRARY_ITEMS.map((item) => (
                <button key={item.id} onClick={() => setSection("library")}
                  className="flex flex-col px-2.5 py-2 mx-2.5 gap-0.5 cursor-pointer hover:bg-[#1a1a1a0a] rounded-sm transition-colors text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">{item.type}</span>
                    <div className="flex-1" />
                    <span className="text-[#1a1a1a8c] text-[10px] italic leading-normal">{item.saved}</span>
                  </div>
                  <span className="text-[13px] leading-[1.3] truncate">{item.title}</span>
                </button>
              ))}
            {section === "research" &&
              SOURCES.map((s) => (
                <button key={s.id} onClick={() => setSection("research")}
                  className="flex flex-col px-2.5 py-2 mx-2.5 gap-0.5 cursor-pointer hover:bg-[#1a1a1a0a] rounded-sm transition-colors text-left">
                  <div className="flex items-center gap-2">
                    <span className={["font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase", citedIds.has(s.id) || s.cited ? "text-[#2563eb]" : "text-[#1a1a1a8c]"].join(" ")}>
                      {citedIds.has(s.id) || s.cited ? "Cited" : "Saved"}
                    </span>
                    <div className="flex-1" />
                    <span className="text-[#1a1a1a8c] text-[10px] italic leading-normal">{s.year}</span>
                  </div>
                  <span className="text-[13px] leading-[1.3] truncate">{s.title}</span>
                </button>
              ))}
            {section !== "library" && section !== "research" &&
              (draftsLoading
                ? <p className="px-4 py-3 text-[11px] italic text-[#1a1a1a4d]">Loading…</p>
                : filteredDrafts.length === 0
                ? <p className="px-4 py-3 text-[11px] italic text-[#1a1a1a4d]">No drafts yet.</p>
                : filteredDrafts.map((draft, i) => (
                <button
                  key={draft.id}
                  onClick={() => handleOpenDraft(draft.id)}
                  className={[
                    "flex flex-col px-2.5 py-2 mx-2.5 gap-0.5 cursor-pointer rounded-sm transition-colors text-left",
                    draft.id === activeDraftId && section === "editor" ? "bg-[#f7f6f3]" : "hover:bg-[#1a1a1a0a]",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">{draftNo(i, filteredDrafts.length)}</span>
                    <div className="flex-1" />
                    <span className="text-[#1a1a1a8c] text-[10px] italic leading-normal">{timeAgo(draft.updatedAt)}</span>
                  </div>
                  <span className="text-[13px] leading-[1.3]">{draft.title}</span>
                </button>
              )))}
          </div>
        </div>

        {/* User */}
        <div className="flex w-full h-[72px] shrink-0 items-center border-t px-4 gap-2.5 border-t-[#1a1a1a26]">
          <div className="size-9 bg-cover bg-no-repeat grayscale rounded-sm shrink-0"
            style={{ backgroundImage: "url('https://cdn.wonder.so/images/019e78d3-8c57-7249-90b5-12594e7963ad/118a4da713f525b14d3cf23c19f7fc59974984d968b214fe2260b2a1482326d8.jpg')" }}
          />
          <div className="flex min-w-0 flex-col flex-1 gap-px">
            <span className="font-['Oswald'] text-xs leading-normal tracking-[1.44px] uppercase">{user.name}</span>
            <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">{user.email}</span>
          </div>
          <div className="flex h-[22px] items-center border border-[#1a1a1a33] px-2 gap-1.5">
            <div className="size-[5px] bg-[#2563eb] animate-pulse" />
            <span className="font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Writing</span>
          </div>
        </div>
      </aside>

      {/* ── Main ──────────────────────────────────────── */}
      <div className="flex h-full flex-col flex-1 min-w-0">

        {/* Toolbar */}
        <div className="flex w-full h-14 shrink-0 items-center border-b px-4 md:px-7 gap-3 md:gap-5 border-b-[#1a1a1a26]">
          {/* Mobile sidebar toggle */}
          <button
            className="flex md:hidden items-center justify-center w-8 h-8 shrink-0 hover:bg-[#1a1a1a0a] transition-colors"
            onClick={(e) => { e.stopPropagation(); setMobileSidebarOpen((v) => !v); }}
          >
            <Menu size={16} strokeWidth={2} />
          </button>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
              {section === "editor" ? "Drafting Desk" : BUREAU_NAV.find((n) => n.id === section)?.label}
            </span>
            {section === "editor" && activeDraft && (
              <>
                <span className="text-[#1a1a1a59] text-[10px]">/</span>
                {editingTitle ? (
                  <input
                    ref={titleInputRef}
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    onBlur={handleTitleSave}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") { e.preventDefault(); titleInputRef.current?.blur(); }
                      if (e.key === "Escape") { setEditingTitle(false); }
                    }}
                    className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase bg-transparent outline-none border-b border-b-[#2563eb] text-[#1a1a1a] min-w-[120px] max-w-[320px]"
                    style={{ width: `${Math.max(titleValue.length, 8)}ch` }}
                  />
                ) : (
                  <button
                    onClick={handleTitleClick}
                    title="Click to rename"
                    className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase text-[#1a1a1a8c] hover:text-[#1a1a1a] transition-colors cursor-text"
                  >
                    {activeDraft.title}
                  </button>
                )}
              </>
            )}
          </div>

          {section === "editor" && (
            <div className="flex h-8 items-center border-x px-[18px] gap-3 border-x-[#1a1a1a26]" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => handleFormatText("bold")} title="Bold" className="hover:text-[#2563eb] transition-colors">
                <Bold size={13} strokeWidth={2} />
              </button>
              <button onClick={() => handleFormatText("italic")} title="Italic" className="hover:text-[#2563eb] transition-colors">
                <Italic size={13} strokeWidth={2} />
              </button>
              <div className="w-px h-3.5 bg-[#1a1a1a26]" />
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowToneMenu((v) => !v); }}
                  className="flex items-center gap-1.5"
                >
                  <span className="text-[#1a1a1aa6] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">Tone</span>
                  <div className="flex h-5 items-center bg-[#1a1a1a] px-2 gap-1 hover:bg-[#2563eb] transition-colors">
                    <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">{tone}</span>
                    <ChevronDown size={8} color="#f7f6f3" strokeWidth={2} />
                  </div>
                </button>
                {showToneMenu && (
                  <div className="absolute top-full left-0 mt-1 bg-[#f7f6f3] border border-[#1a1a1a26] z-30 shadow-sm min-w-[140px]" onClick={(e) => e.stopPropagation()}>
                    {TONES.map((t) => (
                      <button key={t} onClick={() => { setTone(t); setShowToneMenu(false); showToast(`Tone set to ${t}.`); }}
                        className={["flex w-full items-center px-3 py-2 hover:bg-[#1a1a1a08] transition-colors gap-2", t === tone ? "text-[#2563eb]" : ""].join(" ")}>
                        <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2px] uppercase flex-1">{t}</span>
                        {t === tone && <Check size={10} strokeWidth={2} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex-1" />

          {section === "editor" && (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-1.5">
                <span className="font-['Oswald'] text-xs leading-normal tracking-[1.92px] uppercase">{wordCount.toLocaleString()}</span>
                <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.98px] uppercase">Words</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={11} className="text-[#1a1a1a8c]" strokeWidth={2} />
                <span className="text-[#1a1a1aa6] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                  {Math.ceil(wordCount / 200)} min read
                </span>
              </div>
              <div className="flex items-center gap-1.5 min-w-[72px]">
                {saveStatus === "saving" ? (
                  <><Loader2 size={11} className="text-[#1a1a1a8c] animate-spin" strokeWidth={2} /><span className="text-[#1a1a1a8c] text-xs italic">Saving…</span></>
                ) : (
                  <><Check size={11} className="text-[#2563eb]" strokeWidth={2} /><span className="text-[#1a1a1aa6] text-xs italic">Saved</span></>
                )}
              </div>
              <button
                onClick={handleSendToEditor}
                className="flex h-8 items-center bg-[#2563eb] px-3.5 gap-2 hover:bg-[#1d4ed8] transition-colors"
              >
                <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">Send To Editor</span>
                <ArrowRight size={11} color="#f7f6f3" strokeWidth={2} />
              </button>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex w-full flex-1 overflow-hidden">

          {/* Section views */}
          <div className="flex h-full flex-1 overflow-hidden">
            {section === "editor" && (
              <>
                {/* Line numbers */}
                <div className="flex w-14 flex-col shrink-0 items-end pt-16 pr-3 border-r gap-[22.4px] border-r-[#1a1a1a1a] overflow-hidden">
                  {Array.from({ length: 18 }, (_, i) => (
                    <span key={i} className="text-[#1a1a1a4d] font-['Oswald'] text-[10px] leading-normal">{i + 1}</span>
                  ))}
                </div>

                {/* Writing area */}
                <div className="flex h-full flex-col pt-14 flex-1 px-20 gap-[22px] overflow-y-auto" onClick={() => continuationRef.current?.focus()}>
                  {/* Editable writing area */}
                  <div
                    ref={continuationRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleContinuationInput}
                    onClick={(e) => e.stopPropagation()}
                    data-placeholder="start writing…"
                    className="min-h-full text-[17px] leading-[1.7] text-[#1a1a1aeb] outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-[#1a1a1a33] empty:before:italic"
                  />
                  <div className="h-24" />
                </div>
              </>
            )}

            {section === "drafting" && (
              <DraftingDeskView
                drafts={filteredDrafts}
                activeDraftId={activeDraftId}
                onOpen={handleOpenDraft}
                onNew={handleNewDraft}
                onDelete={handleDeleteDraft}
              />
            )}

            {section === "copy" && (
              <CopyDeskView issues={copyIssues} onFix={handleFixCopyIssue} />
            )}

            {section === "research" && (
              <ResearchDeskView
                sources={SOURCES}
                citedIds={citedIds}
                onCite={handleCiteSource}
                onViewLibrary={() => setSection("library")}
              />
            )}

            {section === "library" && (
              <LibraryView items={LIBRARY_ITEMS} onImport={handleImportToLibrary} userName={user.name} />
            )}
          </div>

          {/* Right panel — only in editor section, hidden on mobile */}
          {section === "editor" && (
            <div className="hidden lg:flex w-[340px] h-full flex-col shrink-0 bg-[#f2f0ea] border-l border-l-[#1a1a1a26]">
              {/* Tabs */}
              <div className="flex h-11 shrink-0 items-center border-b border-b-[#1a1a1a26]">
                {(["suggestions", "research", "voice", "history"] as PanelTab[]).map((tab) => (
                  <button key={tab} onClick={() => setPanelTab(tab)}
                    className={["flex h-full items-center px-3 transition-colors", panelTab === tab ? "border-b-2 border-b-[#2563eb]" : "text-[#1a1a1a8c] hover:text-[#1a1a1a] hover:bg-[#1a1a1a08]"].join(" ")}>
                    <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                      {tab === "suggestions" ? "The Editor" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col flex-1 p-5 gap-4 overflow-y-auto">

                {/* ── The Editor tab ── */}
                {panelTab === "suggestions" && (
                  <>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="size-1.5 bg-[#2563eb] animate-pulse" />
                        <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">Reading Paragraph Two</span>
                      </div>
                      <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">just now</span>
                    </div>

                    {!tightenDismissed && (
                      <div className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">Suggestion — Tighten</span>
                          <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">High</span>
                        </div>
                        <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">
                          "refuses" → <span className="text-[#2563eb]">"will not yield."</span> Sharper, less metronomic.
                        </p>
                        {suggestion !== "accepted" ? (
                          <div className="flex items-center gap-1.5">
                            <button onClick={acceptSuggestion} className="flex h-[22px] items-center bg-[#2563eb] px-2 hover:bg-[#1d4ed8] transition-colors">
                              <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Accept</span>
                            </button>
                            <button onClick={dismissSuggestion} className="flex h-[22px] items-center border border-[#1a1a1a40] px-2 hover:bg-[#1a1a1a08] transition-colors">
                              <span className="text-[#1a1a1aa6] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Dismiss</span>
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <Check size={11} className="text-[#2563eb]" strokeWidth={2} />
                            <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Accepted</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">Tone — Editorial</span>
                        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Note</span>
                      </div>
                      <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">Reads like late Didion. Hold the cadence through paragraph two — resist the urge to summarise.</p>
                    </div>

                    <div className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">Footnote — [01]</span>
                        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Cited</span>
                      </div>
                      <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">Strunk &amp; White, 1959. "Vigorous writing is concise." — ch. III, § 17.</p>
                      <button onClick={() => setSection("library")} className="flex items-center gap-1.5 w-fit">
                        <div className="size-[7px] rounded-full bg-[#2563eb]" />
                        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase hover:text-[#2563eb] transition-colors">
                          View In Library
                        </span>
                      </button>
                    </div>

                    {extraCards.map((card) => (
                      <div key={card.id} className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">Response — The Editor</span>
                          {card.streaming ? (
                            <span className="flex items-center gap-1">
                              <span className="size-1 rounded-full bg-[#2563eb] animate-bounce" style={{ animationDelay: "0ms" }} />
                              <span className="size-1 rounded-full bg-[#2563eb] animate-bounce" style={{ animationDelay: "150ms" }} />
                              <span className="size-1 rounded-full bg-[#2563eb] animate-bounce" style={{ animationDelay: "300ms" }} />
                            </span>
                          ) : (
                            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Now</span>
                          )}
                        </div>
                        <p className="text-[#1a1a1a8c] text-[11px] italic leading-normal border-l-2 border-l-[#1a1a1a1a] pl-2">{card.question}</p>
                        <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55]">
                          {card.answer}
                          {card.streaming && <span className="inline-block w-0.5 h-3.5 bg-[#2563eb] ml-0.5 animate-pulse align-middle" />}
                        </p>
                      </div>
                    ))}
                    <div ref={panelBottomRef} />
                  </>
                )}

                {/* ── Research tab ── */}
                {panelTab === "research" && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">Sources — Essay 03</span>
                      <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">{SOURCES.filter((s) => s.cited || citedIds.has(s.id)).length} cited</span>
                    </div>
                    {SOURCES.map((source) => {
                      const isCited = source.cited || citedIds.has(source.id);
                      return (
                        <div key={source.id} className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2">
                          <div className="flex justify-between items-center">
                            <span className={["font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase", isCited ? "text-[#2563eb]" : "text-[#1a1a1a8c]"].join(" ")}>
                              {isCited ? "Cited" : "Available"}
                            </span>
                            <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">{source.year}</span>
                          </div>
                          <p className="text-[#1a1a1ae6] text-[13px] leading-[1.55] font-medium">{source.title}</p>
                          <p className="text-[#1a1a1a8c] text-[11px] italic leading-normal">{source.author} — {source.chapter}</p>
                          {!isCited && (
                            <button onClick={() => handleCiteSource(source.id)}
                              className="flex h-[22px] items-center border border-[#1a1a1a40] px-2 w-fit hover:bg-[#1a1a1a08] transition-colors">
                              <span className="text-[#1a1a1aa6] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Add Citation</span>
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}

                {/* ── Voice tab ── */}
                {panelTab === "voice" && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">Voice Profile</span>
                      <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">Analysed</span>
                    </div>
                    <div className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-3">
                      <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">Tone Preset</span>
                      <div className="flex flex-wrap gap-1.5">
                        {TONES.map((t) => (
                          <button key={t} onClick={() => { setTone(t); showToast(`Tone set to ${t}.`); }}
                            className={["flex h-[22px] items-center px-2 border transition-colors font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase", t === tone ? "bg-[#2563eb] border-[#2563eb] text-[#f7f6f3]" : "border-[#1a1a1a33] text-[#1a1a1aa6] hover:bg-[#1a1a1a08]"].join(" ")}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] p-3.5 gap-2.5">
                      <span className="text-[#2563eb] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">Style Analysis</span>
                      {[
                        { label: "Avg sentence length", value: "18 words" },
                        { label: "Passive voice", value: "8%" },
                        { label: "Adverb density", value: "Low" },
                        { label: "Readability", value: "Graduate" },
                      ].map((stat) => (
                        <div key={stat.label} className="flex justify-between items-center">
                          <span className="text-[#1a1a1a8c] text-[12px] leading-normal">{stat.label}</span>
                          <span className="font-['Oswald'] text-[10px] tracking-[1.5px] uppercase">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* ── History tab ── */}
                {panelTab === "history" && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">Edit History</span>
                      <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">Today</span>
                    </div>
                    {HISTORY_ENTRIES.map((entry, i) => (
                      <div key={i} className="flex items-start gap-3 py-2.5 border-b border-b-[#1a1a1a0f] last:border-0">
                        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[1.62px] uppercase shrink-0 pt-0.5">
                          {entry.time}
                        </span>
                        <div className="flex flex-col gap-0.5 flex-1">
                          <span className="text-[13px] leading-normal">{entry.action}</span>
                          <span className="text-[#1a1a1a8c] text-[11px] italic leading-normal">{entry.detail}</span>
                        </div>
                        {i === 0 && (
                          <button onClick={() => showToast("Restored to previous version.")}
                            className="shrink-0 flex h-[22px] items-center border border-[#1a1a1a33] px-2 hover:bg-[#1a1a1a08] transition-colors">
                            <span className="text-[#1a1a1aa6] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">Restore</span>
                          </button>
                        )}
                      </div>
                    ))}
                  </>
                )}

                <div className="flex-1" />

                {/* Ask The Editor — only on suggestions tab */}
                {panelTab === "suggestions" && (
                  <form onSubmit={handleAsk} className="flex flex-col pt-3.5 border-t gap-2 border-t-[#1a1a1a26]" onClick={(e) => e.stopPropagation()}>
                    <span className="text-[#1a1a1a8c] font-['Oswald'] text-[9px] leading-normal tracking-[2.16px] uppercase">Ask The Editor</span>
                    <div className="flex h-9 items-center bg-[#f7f6f3] border border-[#1a1a1a40] px-2.5 gap-2 focus-within:border-[#2563eb] transition-colors">
                      <input
                        type="text"
                        value={askValue}
                        onChange={(e) => setAskValue(e.target.value)}
                        className="flex-1 bg-transparent text-xs italic leading-normal outline-none text-[#1a1a1a] placeholder:text-[#1a1a1a4d]"
                      />
                      <button type="submit">
                        <CornerDownLeft size={11} className={askValue ? "text-[#2563eb]" : "text-[#1a1a1a4d]"} strokeWidth={2} />
                      </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {CHIPS.map((chip) => (
                        <button key={chip.label} type="button" onClick={() => setAskValue(chip.prompt)}
                          className="flex h-[22px] items-center border border-[#1a1a1a33] px-2 hover:bg-[#1a1a1a08] hover:border-[#1a1a1a66] transition-colors">
                          <span className="text-[#1a1a1aa6] font-['Oswald'] text-[9px] leading-normal tracking-[1.8px] uppercase">{chip.label}</span>
                        </button>
                      ))}
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
