"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { HoverLift, Stagger, StaggerItem } from "@/components/animations";
import type { Article } from "@/lib/articles";

const TABS = ["All", "Essays", "Interviews", "Letters", "Notebook"] as const;
type Tab = (typeof TABS)[number];

const TAB_MAP: Record<Tab, Article["type"] | null> = {
  All: null,
  Essays: "Essay",
  Interviews: "Interview",
  Letters: "Letters",
  Notebook: "Notebook",
};

export default function JournalGrid({ articles }: { articles: Article[] }) {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered =
    TAB_MAP[activeTab] === null
      ? articles
      : articles.filter((a) => a.type === TAB_MAP[activeTab]);

  return (
    <>
      {/* Tabs */}
      <div className="flex items-center gap-8 px-12 pt-7 pb-0">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase pb-3 transition-colors border-b-2",
              activeTab === tab
                ? "text-[#1a1a1a] border-b-[#2563eb]"
                : "text-[#1a1a1aa6] border-b-transparent hover:text-[#1a1a1a]",
            ].join(" ")}
          >
            {tab}
            <span className="ml-2 text-[#1a1a1a4d] text-[9px]">
              {tab === "All"
                ? articles.length
                : articles.filter((a) => a.type === TAB_MAP[tab]).length}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <Stagger className="grid grid-cols-3 border-t border-t-[#1a1a1a1a]">
        {filtered.map((article, i) => (
          <StaggerItem key={article.slug}>
            <HoverLift
              className={[
                "flex flex-col p-8 gap-4 h-full border-b border-b-[#1a1a1a1a]",
                i % 3 !== 0 ? "border-l border-l-[#1a1a1a1a]" : "",
              ].join(" ")}
            >
              <Link href={`/journal/${article.slug}`} className="group flex flex-col gap-4 flex-1">
                <div
                  className="w-full h-[200px] bg-cover bg-center bg-no-repeat grayscale overflow-hidden"
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
                <h3 className="font-['Oswald'] text-[26px] leading-[1.05] tracking-[-0.26px] uppercase group-hover:text-[#2563eb] transition-colors flex-1">
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
        <div className="flex items-center justify-center py-24 px-12">
          <p className="text-[#1a1a1a8c] text-[15px] italic leading-normal">
            No dispatches in this category yet.
          </p>
        </div>
      )}
    </>
  );
}
