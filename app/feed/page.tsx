"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Clock, BookOpen, ArrowRight } from "lucide-react";

const CATEGORIES = ["All", "Fiction", "Non-Fiction", "Biography", "History", "Philosophy", "Science", "Psychology"];

const SIDEBAR_GENRES = ["Fiction", "Non-Fiction", "Biography", "History", "Philosophy", "Science", "Psychology", "Memoir", "Classic"];

type Review = {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  headline: string;
  content: string;
  readTime: number;
  genre: string;
  likes: number;
  likedByMe: boolean;
  reviewer: { name: string; initials: string };
  createdAt: string;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins || 1} ${mins === 1 ? "minute" : "minutes"} ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} ${hrs === 1 ? "hour" : "hours"} ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days} ${days === 1 ? "day" : "days"} ago`;
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function FeedPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setReviews(data);
      })
      .finally(() => setFetching(false));
  }, [user]);

  const toggleLike = useCallback(async (id: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, likedByMe: !r.likedByMe, likes: r.likedByMe ? r.likes - 1 : r.likes + 1 }
          : r
      )
    );
    const res = await fetch(`/api/reviews/${id}/like`, { method: "POST" });
    if (res.ok) {
      const data = await res.json();
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, likes: data.likes, likedByMe: data.liked } : r))
      );
    }
  }, []);

  const filteredReviews =
    activeCategory === "All" ? reviews : reviews.filter((r) => r.genre === activeCategory);

  const trending = [...reviews]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5)
    .map((r, i) => ({
      no: String(i + 1).padStart(2, "0"),
      title: r.bookTitle,
      author: r.bookAuthor,
      count: r.likes,
    }));

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

  const firstName = user.name.split(" ")[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav />

      {/* Category tabs */}
      <div className="sticky top-0 z-20 flex w-full border-b border-b-[#1a1a1a26] bg-[#f7f6f3] overflow-x-auto scrollbar-hide">
        <div className="flex items-center px-4 md:px-12 shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "flex h-12 items-center px-4 font-['Oswald'] text-[11px] tracking-[2.4px] uppercase shrink-0 transition-colors border-b-2",
                activeCategory === cat
                  ? "text-[#1a1a1a] border-b-[#2563eb]"
                  : "text-[#1a1a1a8c] border-b-transparent hover:text-[#1a1a1a]",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex w-full flex-col lg:flex-row px-4 md:px-12 py-10 gap-12 max-w-[1280px] mx-auto">

        {/* Reviews feed */}
        <div className="flex flex-col flex-1 min-w-0">

          {/* Greeting */}
          <div className="flex items-start sm:items-center justify-between mb-10 gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-['Oswald'] text-[11px] tracking-[3.08px] uppercase text-[#1a1a1a99]">
                Your Reading Feed
              </span>
              <h1 className="font-['Oswald'] text-[clamp(28px,5vw,44px)] leading-none tracking-[-0.88px] uppercase">
                Good reading, {firstName}.
              </h1>
            </div>
            <Link
              href="/write"
              className="hidden sm:flex h-10 items-center gap-2 bg-[#2563eb] px-5 hover:bg-[#1d4ed8] transition-colors shrink-0"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-[11px] tracking-[2.4px] uppercase">
                Write A Review
              </span>
              <ArrowRight size={13} color="#f7f6f3" strokeWidth={2} />
            </Link>
          </div>

          {/* Loading skeleton */}
          {fetching && (
            <div className="flex flex-col divide-y divide-[#1a1a1a1a]">
              {[1, 2, 3].map((n) => (
                <div key={n} className="flex flex-col py-8 gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="size-7 rounded-full bg-[#1a1a1a0f] animate-pulse" />
                    <div className="h-3 w-32 bg-[#1a1a1a0f] animate-pulse" />
                  </div>
                  <div className="h-7 w-3/4 bg-[#1a1a1a0f] animate-pulse" />
                  <div className="h-4 w-full bg-[#1a1a1a0a] animate-pulse" />
                  <div className="h-4 w-5/6 bg-[#1a1a1a0a] animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {/* Review cards */}
          {!fetching && (
            <div className="flex flex-col divide-y divide-[#1a1a1a1a]">
              {filteredReviews.map((review) => (
                <article key={review.id} className="flex flex-col py-8 gap-4 group cursor-pointer">
                  {/* Reviewer */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-7 shrink-0 items-center justify-center bg-[#1a1a1a] rounded-full">
                      <span className="text-[#f7f6f3] font-['Oswald'] text-[9px] tracking-[0.5px]">
                        {review.reviewer.initials}
                      </span>
                    </div>
                    <span className="font-['Oswald'] text-[11px] tracking-[2px] uppercase">
                      {review.reviewer.name}
                    </span>
                    <span className="text-[#1a1a1a33]">·</span>
                    <span className="text-[#1a1a1a8c] text-[13px] italic leading-normal">
                      {timeAgo(review.createdAt)}
                    </span>
                  </div>

                  {/* Book */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <BookOpen size={12} className="text-[#2563eb] shrink-0" strokeWidth={2} />
                    <span className="text-[#2563eb] font-['Oswald'] text-[11px] tracking-[2px] uppercase">
                      {review.bookTitle}
                    </span>
                    <span className="text-[#1a1a1a33] text-[11px]">—</span>
                    <span className="text-[#1a1a1a8c] text-[13px] italic leading-normal">
                      {review.bookAuthor}
                    </span>
                  </div>

                  {/* Headline */}
                  <h2 className="font-['Oswald'] text-[22px] md:text-[28px] leading-none tracking-[-0.28px] uppercase group-hover:text-[#2563eb] transition-colors">
                    {review.headline}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#1a1a1acc] text-[15px] leading-[1.65] line-clamp-3">
                    {review.content}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-5">
                      <span className="flex items-center gap-1 font-['Oswald'] text-[10px] tracking-[2px] uppercase text-[#1a1a1a8c]">
                        <div className="size-1.5 rounded-full bg-[#1a1a1a26]" />
                        {review.genre}
                      </span>
                      <div className="flex items-center gap-1.5 text-[#1a1a1a8c]">
                        <Clock size={11} strokeWidth={2} />
                        <span className="font-['Oswald'] text-[10px] tracking-[1.8px] uppercase">
                          {review.readTime} min read
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(review.id);
                      }}
                      className="flex items-center gap-1.5 group/like"
                    >
                      <Heart
                        size={13}
                        strokeWidth={2}
                        className={
                          review.likedByMe
                            ? "fill-[#2563eb] text-[#2563eb]"
                            : "text-[#1a1a1a8c] group-hover/like:text-[#2563eb] transition-colors"
                        }
                      />
                      <span
                        className={[
                          "font-['Oswald'] text-[10px] tracking-[1.8px] uppercase transition-colors",
                          review.likedByMe
                            ? "text-[#2563eb]"
                            : "text-[#1a1a1a8c] group-hover/like:text-[#2563eb]",
                        ].join(" ")}
                      >
                        {review.likes}
                      </span>
                    </button>
                  </div>
                </article>
              ))}

              {filteredReviews.length === 0 && (
                <div className="flex flex-col items-center py-20 gap-4">
                  <span className="font-['Oswald'] text-[11px] tracking-[3.08px] uppercase text-[#1a1a1a33]">
                    No Reviews Yet
                  </span>
                  <p className="text-[#1a1a1a8c] text-[15px] italic leading-normal text-center max-w-[320px]">
                    {reviews.length === 0
                      ? "No reviews have been written yet. Be the first."
                      : `No one has reviewed a ${activeCategory.toLowerCase()} book yet. Be the first.`}
                  </p>
                  <Link
                    href="/write"
                    className="flex h-10 items-center gap-2 bg-[#2563eb] px-5 mt-2 hover:bg-[#1d4ed8] transition-colors"
                  >
                    <span className="text-[#f7f6f3] font-['Oswald'] text-[11px] tracking-[2.4px] uppercase">
                      Write A Review
                    </span>
                    <ArrowRight size={13} color="#f7f6f3" strokeWidth={2} />
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:flex w-[280px] shrink-0 flex-col gap-10 pt-[88px]">

          {/* Trending */}
          {trending.length > 0 && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <div className="w-6 h-0.5 bg-[#2563eb]" />
                <span className="font-['Oswald'] text-[11px] tracking-[3.08px] uppercase">
                  Most Liked
                </span>
              </div>
              <div className="flex flex-col gap-5">
                {trending.map((book) => (
                  <div key={book.no} className="flex items-start gap-4 group cursor-pointer">
                    <span className="text-[#2563eb] font-['Oswald'] text-[11px] tracking-[2px] uppercase shrink-0 pt-0.5">
                      {book.no}
                    </span>
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      <span className="font-['Oswald'] text-[13px] leading-none tracking-[-0.13px] uppercase group-hover:text-[#2563eb] transition-colors truncate">
                        {book.title}
                      </span>
                      <span className="text-[#1a1a1a8c] text-[12px] italic leading-normal truncate">
                        {book.author}
                      </span>
                    </div>
                    <span className="text-[#1a1a1a4d] font-['Oswald'] text-[10px] tracking-[1.8px] uppercase shrink-0 text-right">
                      {book.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse by genre */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] tracking-[3.08px] uppercase">
                Browse By Genre
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SIDEBAR_GENRES.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setActiveCategory(genre)}
                  className={[
                    "flex h-7 items-center border px-3 font-['Oswald'] text-[10px] tracking-[2px] uppercase transition-colors",
                    activeCategory === genre
                      ? "bg-[#2563eb] border-[#2563eb] text-[#f7f6f3]"
                      : "border-[#1a1a1a26] text-[#1a1a1a8c] hover:border-[#1a1a1a] hover:text-[#1a1a1a]",
                  ].join(" ")}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Write CTA */}
          <div className="flex flex-col border border-[#1a1a1a26] p-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] tracking-[3.08px] uppercase">
                Write A Review
              </span>
            </div>
            <p className="text-[#1a1a1a8c] text-[13px] italic leading-[1.6]">
              Just finished a book? Write what you understood, what it meant to you, and what you carry from it.
            </p>
            <Link
              href="/write"
              className="group flex h-9 items-center bg-[#1a1a1a] px-4 gap-2 hover:bg-[#2563eb] transition-colors w-fit"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] tracking-[2.2px] uppercase">
                Start Writing
              </span>
              <ArrowRight
                size={12}
                color="#f7f6f3"
                strokeWidth={2}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
