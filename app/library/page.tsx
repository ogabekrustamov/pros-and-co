"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { BookOpen, Clock, Heart, ArrowRight } from "lucide-react";

type Review = {
  id: string;
  bookTitle: string;
  bookAuthor: string;
  headline: string;
  content: string;
  wordCount: number;
  readTime: number;
  genre: string;
  likes: number;
  likedByMe: boolean;
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
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function LibraryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [fetching, setFetching] = useState(true);
  const [activeGenre, setActiveGenre] = useState("All");

  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    fetch("/api/reviews?mine=true")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setReviews(data);
      })
      .finally(() => setFetching(false));
  }, [user]);

  const genres = ["All", ...Array.from(new Set(reviews.map((r) => r.genre))).sort()];
  const filtered = activeGenre === "All" ? reviews : reviews.filter((r) => r.genre === activeGenre);

  const totalWords = reviews.reduce((s, r) => s + r.wordCount, 0);
  const totalReviews = reviews.length;
  const genreSet = new Set(reviews.map((r) => r.genre));

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

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav />

      {/* Hero */}
      <section className="flex flex-col w-full px-4 md:px-12 pt-10 pb-12 md:pb-16 gap-6 border-b border-b-[#1a1a1a26]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] tracking-[3.08px] uppercase">
            Personal Shelf — {user.name}
          </span>
        </div>
        <h1 className="font-['Oswald'] text-[clamp(44px,10vw,120px)] leading-[0.92] tracking-[-2.4px] uppercase">
          My Shelf.
        </h1>

        {/* Stats row */}
        {!fetching && totalReviews > 0 && (
          <div className="flex flex-wrap items-end gap-8 md:gap-12 mt-2">
            <div className="flex flex-col gap-1">
              <span className="font-['Oswald'] text-[clamp(32px,6vw,56px)] leading-none">
                {totalReviews}
              </span>
              <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] tracking-[2.4px] uppercase">
                {totalReviews === 1 ? "Review Written" : "Reviews Written"}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-['Oswald'] text-[clamp(32px,6vw,56px)] leading-none">
                {genreSet.size}
              </span>
              <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] tracking-[2.4px] uppercase">
                {genreSet.size === 1 ? "Genre" : "Genres"}
              </span>
            </div>
            {totalWords > 0 && (
              <div className="flex flex-col gap-1">
                <span className="font-['Oswald'] text-[clamp(32px,6vw,56px)] leading-none">
                  {totalWords.toLocaleString()}
                </span>
                <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] tracking-[2.4px] uppercase">
                  Words Written
                </span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Genre filter tabs */}
      {!fetching && reviews.length > 0 && (
        <div className="flex w-full border-b border-b-[#1a1a1a26] overflow-x-auto scrollbar-hide">
          <div className="flex items-center px-4 md:px-12 shrink-0">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => setActiveGenre(g)}
                className={[
                  "flex h-11 items-center px-4 font-['Oswald'] text-[11px] tracking-[2.4px] uppercase shrink-0 transition-colors border-b-2",
                  activeGenre === g
                    ? "text-[#1a1a1a] border-b-[#2563eb]"
                    : "text-[#1a1a1a8c] border-b-transparent hover:text-[#1a1a1a]",
                ].join(" ")}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Reviews grid */}
      <div className="flex flex-col flex-1 px-4 md:px-12 py-10 max-w-[1280px] mx-auto w-full">

        {/* Loading skeleton */}
        {fetching && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px border border-[#1a1a1a1a]">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex flex-col p-7 gap-4 bg-[#f7f6f3]">
                <div className="h-3 w-24 bg-[#1a1a1a0f] animate-pulse" />
                <div className="h-6 w-3/4 bg-[#1a1a1a0f] animate-pulse" />
                <div className="h-4 w-full bg-[#1a1a1a0a] animate-pulse" />
                <div className="h-4 w-2/3 bg-[#1a1a1a0a] animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!fetching && reviews.length === 0 && (
          <div className="flex flex-col items-center py-24 gap-5">
            <span className="font-['Oswald'] text-[11px] tracking-[3.08px] uppercase text-[#1a1a1a33]">
              Your Shelf Is Empty
            </span>
            <p className="text-[#1a1a1a8c] text-[15px] italic leading-normal text-center max-w-[360px]">
              Every book you review lives here. Start with the one you just finished.
            </p>
            <Link
              href="/write"
              className="flex h-10 items-center gap-2 bg-[#2563eb] px-5 mt-2 hover:bg-[#1d4ed8] transition-colors"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-[11px] tracking-[2.4px] uppercase">
                Write Your First Review
              </span>
              <ArrowRight size={13} color="#f7f6f3" strokeWidth={2} />
            </Link>
          </div>
        )}

        {/* Review cards grid */}
        {!fetching && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-[#1a1a1a1a]">
            {filtered.map((review) => (
              <article
                key={review.id}
                className="flex flex-col p-7 bg-[#f7f6f3] gap-4 group cursor-pointer hover:bg-[#f0efe9] transition-colors"
              >
                {/* Book */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <BookOpen size={11} className="text-[#2563eb] shrink-0" strokeWidth={2} />
                  <span className="text-[#2563eb] font-['Oswald'] text-[10px] tracking-[2px] uppercase truncate max-w-[180px]">
                    {review.bookTitle}
                  </span>
                  <span className="text-[#1a1a1a33] text-[10px]">—</span>
                  <span className="text-[#1a1a1a8c] text-[12px] italic leading-normal">
                    {review.bookAuthor}
                  </span>
                </div>

                {/* Headline */}
                <h2 className="font-['Oswald'] text-[20px] md:text-[22px] leading-none tracking-[-0.22px] uppercase group-hover:text-[#2563eb] transition-colors line-clamp-2">
                  {review.headline}
                </h2>

                {/* Excerpt */}
                <p className="text-[#1a1a1acc] text-[13px] leading-[1.65] line-clamp-3 flex-1">
                  {review.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-t-[#1a1a1a0f]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-['Oswald'] text-[9px] tracking-[1.8px] uppercase text-[#1a1a1a8c]">
                      <div className="size-1.5 rounded-full bg-[#1a1a1a26]" />
                      {review.genre}
                    </span>
                    <div className="flex items-center gap-1 text-[#1a1a1a8c]">
                      <Clock size={10} strokeWidth={2} />
                      <span className="font-['Oswald'] text-[9px] tracking-[1.6px] uppercase">
                        {review.readTime} min
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#1a1a1a8c]">
                    <Heart size={11} strokeWidth={2} className={review.likedByMe ? "fill-[#2563eb] text-[#2563eb]" : ""} />
                    <span className="font-['Oswald'] text-[9px] tracking-[1.6px] uppercase">
                      {review.likes}
                    </span>
                  </div>
                </div>

                <span className="text-[#1a1a1a4d] font-['Oswald'] text-[9px] tracking-[1.8px] uppercase">
                  {timeAgo(review.createdAt)}
                </span>
              </article>
            ))}
          </div>
        )}

        {/* No results for genre filter */}
        {!fetching && reviews.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 gap-3">
            <span className="font-['Oswald'] text-[11px] tracking-[3.08px] uppercase text-[#1a1a1a33]">
              No {activeGenre} Reviews Yet
            </span>
          </div>
        )}

        {/* Write CTA at bottom */}
        {!fetching && reviews.length > 0 && (
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-t-[#1a1a1a26]">
            <p className="text-[#1a1a1a8c] text-[13px] italic leading-normal max-w-[400px]">
              Keep adding to your shelf. Every review is a record of how you read.
            </p>
            <Link
              href="/write"
              className="flex h-10 items-center gap-2 bg-[#1a1a1a] px-5 hover:bg-[#2563eb] transition-colors"
            >
              <span className="text-[#f7f6f3] font-['Oswald'] text-[11px] tracking-[2.4px] uppercase">
                Write A Review
              </span>
              <ArrowRight size={13} color="#f7f6f3" strokeWidth={2} />
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
