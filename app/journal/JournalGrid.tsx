"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { HoverLift, Stagger, StaggerItem } from "@/components/animations";
import type { Article } from "@/lib/articles";
import { useLanguage } from "@/contexts/LanguageContext";

type Tab = "all" | "essays" | "interviews" | "letters" | "notebook";

const TAB_TYPE: Record<Tab, Article["type"] | null> = {
  all: null,
  essays: "Essay",
  interviews: "Interview",
  letters: "Letters",
  notebook: "Notebook",
};

export default function JournalGrid({ articles }: { articles: Article[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const { tr } = useLanguage();
  const j = tr.journal;

  const TABS: { key: Tab; label: string }[] = [
    { key: "all", label: j.allDispatches },
    { key: "essays", label: j.essays },
    { key: "interviews", label: j.interviews },
    { key: "letters", label: j.letters },
    { key: "notebook", label: j.notebook },
  ];

  const filtered =
    TAB_TYPE[activeTab] === null
      ? articles
      : articles.filter((a) => a.type === TAB_TYPE[activeTab]);

  return (
    <>
      {/* Tabs — scrollable on mobile */}
      <div className="flex items-center gap-5 md:gap-8 px-4 md:px-12 pt-7 pb-0 overflow-x-auto scrollbar-none">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={[
              "font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase pb-3 transition-colors border-b-2 whitespace-nowrap shrink-0",
              activeTab === key
                ? "text-[#1a1a1a] border-b-[#2563eb]"
                : "text-[#1a1a1aa6] border-b-transparent hover:text-[#1a1a1a]",
            ].join(" ")}
          >
            {label}
            <span className="ml-2 text-[#1a1a1a4d] text-[9px]">
              {key === "all"
                ? articles.length
                : articles.filter((a) => a.type === TAB_TYPE[key]).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-t-[#1a1a1a1a]">
        {filtered.map((article, i) => (
          <StaggerItem key={article.slug}>
            <HoverLift
              className={[
                "flex flex-col p-6 md:p-8 gap-4 h-full border-b border-b-[#1a1a1a1a]",
                "sm:[&:nth-child(2n)]:border-l sm:[&:nth-child(2n)]:border-l-[#1a1a1a1a]",
                "lg:border-l lg:border-l-[#1a1a1a1a] lg:[&:nth-child(3n+1)]:border-l-0",
              ].join(" ")}
            >
              <Link href={`/journal/${article.slug}`} className="group flex flex-col gap-4 flex-1">
                <div
                  className="w-full h-[180px] md:h-[200px] bg-cover bg-center bg-no-repeat grayscale overflow-hidden"
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
                <h3 className="font-['Oswald'] text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.26px] uppercase group-hover:text-[#2563eb] transition-colors flex-1">
                  {article.title}
                </h3>
                <p className="text-[#1a1a1abf] text-sm leading-[1.55]">
                  {article.excerpt}
                </p>
                <div className="flex justify-between items-center pt-3.5 mt-1.5 border-t border-t-[#1a1a1a1f]">
                  <span className="text-[#1a1a1aa6] text-[13px] italic leading-normal">
                    {article.author === "Readers" || article.author === "The Bureau"
                      ? article.author
                      : `By ${article.author}`}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} className="text-[#1a1a1a8c]" strokeWidth={2} />
                    <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>

      {filtered.length === 0 && (
        <div className="flex items-center justify-center py-24 px-4 md:px-12">
          <p className="text-[#1a1a1a8c] text-[15px] italic leading-normal">
            No dispatches in this category yet.
          </p>
        </div>
      )}
    </>
  );
}
