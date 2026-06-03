"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";

const GENRES = ["Fiction", "Non-Fiction", "Biography", "History", "Philosophy", "Science", "Psychology", "Memoir", "Classic"];

export default function WritePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const [genre, setGenre] = useState("Fiction");
  const [genreOpen, setGenreOpen] = useState(false);
  const [published, setPublished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, user, router]);

  const wordCount =
    content.trim() === "" ? 0 : content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const canPublish =
    bookTitle.trim().length > 0 &&
    bookAuthor.trim().length > 0 &&
    headline.trim().length > 0 &&
    content.trim().length > 50;

  const handlePublish = async () => {
    if (!canPublish || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookTitle, bookAuthor, headline, content, genre }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Could not publish review.");
      }
      setPublished(true);
      setTimeout(() => router.push("/feed"), 1600);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7f6f3]">
        <div className="flex items-center gap-2.5">
          <div className="size-2 bg-[#2563eb] animate-pulse" />
          <span className="font-['Oswald'] text-[11px] tracking-[2.4px] uppercase text-[#1a1a1a8c]">
            Loading…
          </span>
        </div>
      </div>
    );
  }

  if (published) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7f6f3]">
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2.5">
            <Check size={14} className="text-[#2563eb]" strokeWidth={2} />
            <span className="font-['Oswald'] text-[11px] tracking-[2.4px] uppercase">
              Review Published
            </span>
          </div>
          <p className="text-[#1a1a1a8c] text-[13px] italic leading-normal">
            Returning to your feed…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f6f3] text-[#1a1a1a]">

      {/* Toolbar */}
      <div className="flex h-[60px] shrink-0 items-center border-b border-b-[#1a1a1a26] px-4 md:px-12 gap-4">
        <Link
          href="/feed"
          className="flex items-center gap-2 text-[#1a1a1a8c] hover:text-[#1a1a1a] transition-colors"
        >
          <ArrowLeft size={13} strokeWidth={2} />
          <span className="font-['Oswald'] text-[11px] tracking-[2.4px] uppercase">Feed</span>
        </Link>

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          {wordCount > 0 && (
            <>
              <span className="hidden sm:block text-[#1a1a1a8c] font-['Oswald'] text-[10px] tracking-[2px] uppercase">
                {wordCount.toLocaleString()} words
              </span>
              <span className="hidden sm:block text-[#1a1a1a8c] font-['Oswald'] text-[10px] tracking-[2px] uppercase">
                {readTime} min read
              </span>
            </>
          )}
          {error && (
            <span className="text-red-600 font-['Oswald'] text-[10px] tracking-[1.8px] uppercase hidden sm:block">
              {error}
            </span>
          )}
          <button
            onClick={handlePublish}
            disabled={!canPublish || submitting}
            className={[
              "flex h-9 items-center gap-2 px-5 font-['Oswald'] text-[11px] tracking-[2.4px] uppercase transition-colors",
              canPublish && !submitting
                ? "bg-[#2563eb] text-[#f7f6f3] hover:bg-[#1d4ed8]"
                : "bg-[#1a1a1a0f] text-[#1a1a1a33] cursor-not-allowed",
            ].join(" ")}
          >
            {submitting ? "Publishing…" : "Publish Review"}
            {canPublish && !submitting && (
              <ArrowRight size={13} color="#f7f6f3" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Writing area */}
      <div className="flex flex-col flex-1 max-w-[720px] mx-auto w-full px-4 md:px-0 py-12 md:py-16 gap-8">

        {/* Book details */}
        <div className="flex flex-col gap-4 pb-8 border-b border-b-[#1a1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="w-6 h-0.5 bg-[#2563eb]" />
            <span className="text-[#2563eb] font-['Oswald'] text-[10px] tracking-[2.8px] uppercase">
              The Book
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              placeholder="Book title"
              className="flex-1 bg-transparent font-['Oswald'] text-[20px] leading-none tracking-[-0.2px] uppercase placeholder:text-[#1a1a1a26] outline-none border-b border-b-[#1a1a1a1a] focus:border-b-[#2563eb] pb-2 transition-colors"
            />
            <input
              type="text"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              placeholder="Author name"
              className="flex-1 sm:max-w-[220px] bg-transparent text-[15px] italic leading-normal placeholder:text-[#1a1a1a26] outline-none border-b border-b-[#1a1a1a1a] focus:border-b-[#2563eb] pb-2 transition-colors text-[#1a1a1a8c]"
            />
          </div>

          {/* Genre picker */}
          <div className="relative w-fit">
            <button
              onClick={() => setGenreOpen((v) => !v)}
              className="flex items-center gap-2 h-7 border border-[#1a1a1a26] px-3 font-['Oswald'] text-[10px] tracking-[2px] uppercase text-[#1a1a1a8c] hover:border-[#1a1a1a] hover:text-[#1a1a1a] transition-colors"
            >
              {genre}
              <ChevronDown size={11} strokeWidth={2} />
            </button>
            {genreOpen && (
              <div className="absolute top-full left-0 mt-1 z-30 flex flex-col bg-[#f7f6f3] border border-[#1a1a1a26] shadow-sm min-w-[160px]">
                {GENRES.map((g) => (
                  <button
                    key={g}
                    onClick={() => { setGenre(g); setGenreOpen(false); }}
                    className={[
                      "flex h-8 items-center px-3 font-['Oswald'] text-[10px] tracking-[2px] uppercase text-left transition-colors",
                      g === genre
                        ? "bg-[#2563eb] text-[#f7f6f3]"
                        : "text-[#1a1a1a8c] hover:bg-[#1a1a1a0a] hover:text-[#1a1a1a]",
                    ].join(" ")}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Headline */}
        <textarea
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="Your single strongest thought about this book"
          rows={2}
          className="w-full bg-transparent font-['Oswald'] text-[clamp(28px,5vw,48px)] leading-[1.05] tracking-[-0.96px] uppercase placeholder:text-[#1a1a1a18] outline-none resize-none"
        />

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-0.5 bg-[#1a1a1a1a]" />
          <span className="text-[#1a1a1a33] font-['Oswald'] text-[10px] tracking-[2.8px] uppercase">
            Your Review
          </span>
          <div className="flex-1 h-0.5 bg-[#1a1a1a0a]" />
        </div>

        {/* Review body */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write what you understood from this book. What meaning did you take from it? What stayed with you after the last page? There are no rules — only your honest response to what you read."
          className="w-full bg-transparent text-[17px] leading-[1.8] placeholder:text-[#1a1a1a1a] outline-none resize-none min-h-[400px]"
        />

        {/* Error on mobile */}
        {error && (
          <p className="sm:hidden text-red-600 font-['Oswald'] text-[10px] tracking-[1.8px] uppercase">
            {error}
          </p>
        )}

        {/* Hint */}
        {!canPublish && (bookTitle || bookAuthor || headline || content) && (
          <p className="text-[#1a1a1a4d] text-[13px] italic leading-normal">
            Fill in the book details, a headline, and write at least a few sentences to publish.
          </p>
        )}
      </div>
    </div>
  );
}
