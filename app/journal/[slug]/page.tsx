import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FadeIn, SlideIn } from "@/components/animations";
import { ArrowRight, ArrowLeft, Clock } from "lucide-react";
import { getArticleBySlug, articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return { title: `${article.title} — Prose & Co.` };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prev = articles[currentIndex + 1] ?? null;
  const next = articles[currentIndex - 1] ?? null;

  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav />

      {/* Hero image */}
      <SlideIn direction="up" className="relative h-[220px] sm:h-[340px] md:h-[480px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{ backgroundImage: `url('${article.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f3] via-transparent to-transparent" />
        <div className="absolute left-4 md:left-12 top-6 md:top-8 flex h-7 items-center bg-[#2563eb] px-3.5">
          <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
            {article.type} — {article.no}
          </span>
        </div>
      </SlideIn>

      {/* Article content */}
      <FadeIn className="flex flex-col w-full max-w-[760px] mx-auto px-4 md:px-12 pb-24 -mt-12 relative z-10">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            {article.type}
          </span>
          <div className="size-[3px] bg-[#1a1a1a66] rounded-full" />
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
            {article.date}
          </span>
          <div className="flex-1" />
          <Clock size={12} className="text-[#1a1a1a8c]" strokeWidth={2} />
          <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">
            {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-['Oswald'] text-[clamp(40px,6vw,72px)] leading-[0.96] tracking-[-1.44px] uppercase mb-8">
          {article.title}
        </h1>

        {/* Byline */}
        <div className="flex items-center gap-3 pb-8 mb-10 border-b border-b-[#1a1a1a26]">
          <div className="flex flex-col gap-px">
            <span className="font-['Oswald'] text-[13px] leading-normal tracking-[2.08px] uppercase">
              {article.author}
            </span>
            <span className="text-[#1a1a1a8c] text-[12px] italic leading-normal">
              {article.type === "Interview" ? "In conversation with The Bureau" :
               article.type === "Letters" ? "Selected correspondence" :
               article.type === "Notebook" ? "Field Notes" :
               "Contributing Editor"}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6">
          {article.body.map((paragraph, i) => (
            <p
              key={i}
              className={[
                "text-[#1a1a1ae6] leading-[1.75]",
                i === 0
                  ? "text-[20px] font-medium"
                  : "text-[17px]",
              ].join(" ")}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* End mark */}
        <div className="flex items-center gap-4 mt-14 pt-8 border-t border-t-[#1a1a1a26]">
          <div className="size-2 bg-[#2563eb]" />
          <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
            End of dispatch — {article.no}
          </span>
        </div>
      </FadeIn>

      {/* Prev / Next */}
      <div className="flex flex-col sm:flex-row border-t border-t-[#1a1a1a26] mx-4 md:mx-12 mb-24">
        {prev ? (
          <Link
            href={`/journal/${prev.slug}`}
            className="flex flex-1 flex-col gap-2 py-6 sm:py-8 pr-0 sm:pr-8 group hover:bg-[#f0efe9] transition-colors px-0"
          >
            <div className="flex items-center gap-2 text-[#1a1a1a8c]">
              <ArrowLeft size={12} strokeWidth={2} />
              <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">Previous</span>
            </div>
            <span className="font-['Oswald'] text-xl leading-none tracking-[-0.2px] uppercase group-hover:text-[#2563eb] transition-colors">
              {prev.title}
            </span>
            <span className="text-[#1a1a1a8c] text-[12px] italic">{prev.type} — {prev.readTime}</span>
          </Link>
        ) : <div className="flex-1" />}

        {prev && next && <div className="w-px bg-[#1a1a1a26] my-4" />}

        {next ? (
          <Link
            href={`/journal/${next.slug}`}
            className="flex flex-1 flex-col gap-2 py-6 sm:py-8 pl-0 sm:pl-8 items-start sm:items-end text-left sm:text-right group hover:bg-[#f0efe9] transition-colors border-t sm:border-t-0 border-t-[#1a1a1a26]"
          >
            <div className="flex items-center gap-2 text-[#1a1a1a8c]">
              <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.2px] uppercase">Next</span>
              <ArrowRight size={12} strokeWidth={2} />
            </div>
            <span className="font-['Oswald'] text-xl leading-none tracking-[-0.2px] uppercase group-hover:text-[#2563eb] transition-colors">
              {next.title}
            </span>
            <span className="text-[#1a1a1a8c] text-[12px] italic">{next.type} — {next.readTime}</span>
          </Link>
        ) : <div className="flex-1" />}
      </div>

      {/* Back to journal */}
      <div className="flex justify-center pb-16">
        <Link
          href="/journal"
          className="flex items-center gap-2.5 border border-[#1a1a1a26] h-11 px-6 hover:border-[#1a1a1a] hover:bg-[#1a1a1a08] transition-colors"
        >
          <ArrowLeft size={13} strokeWidth={2} />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[2.4px] uppercase">
            Back to The Journal
          </span>
        </Link>
      </div>

      <Footer />
    </div>
  );
}
