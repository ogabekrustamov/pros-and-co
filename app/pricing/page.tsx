"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FadeIn, Stagger, StaggerItem, HeroLine, HoverLift } from "@/components/animations";
import { ArrowRight, Check, Minus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PRICES = [
  { currency: "CHF", price: "14", annualPrice: "140", patronPrice: "480" },
];

const ledgerRows = [
  { feature: "Unlimited drafts",          monthly: "check",         annual: "check",          patron: "check" },
  { feature: "Copy Desk, all tones",       monthly: "5 tones",       annual: "12 tones",       patron: "Custom voice" },
  { feature: "Personal Library",           monthly: "1 GB",          annual: "25 GB",          patron: "250 GB shared" },
  { feature: "Research Desk — live citations", monthly: false,       annual: "check",          patron: "check" },
  { feature: "Field Journal print archive",monthly: false,           annual: "check",          patron: "check" },
  { feature: "Private house-style model",  monthly: false,           annual: false,            patron: "check" },
  { feature: "Editor reply",               monthly: "Email, 72h",    annual: "Priority, 4h",   patron: "Real human, 1h" },
  { feature: "Masthead listing",           monthly: false,           annual: false,            patron: "check" },
  { feature: "Seats included",             monthly: "1",             annual: "1",              patron: "Up to 12" },
];

function LedgerCell({ value }: { value: string | boolean }) {
  if (value === "check") return <Check size={18} className="text-[#2563eb]" strokeWidth={2} />;
  if (value === false) return <Minus size={18} className="text-[#1a1a1a4d]" strokeWidth={2} />;
  return <span className="font-['Oswald'] text-[10px] leading-normal tracking-[2.16px] uppercase text-center">{value}</span>;
}

export default function PricingPage() {
  const { tr } = useLanguage();
  const p = tr.pricing;

  const planPrices = ["14", "140", "480"];

  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav />

      {/* Hero */}
      <section className="flex w-full flex-col px-4 md:px-12 py-12 md:py-[88px] gap-7">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{p.heroDispatch}</span>
          </div>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">P. 014 / 064</span>
        </div>
        <div className="flex flex-col font-['Oswald'] font-medium leading-[0.92] uppercase overflow-hidden">
          <HeroLine delay={0.05}><span className="block text-[clamp(44px,12vw,180px)] tracking-[-3.6px]">{p.heroLine1p}</span></HeroLine>
          <HeroLine delay={0.18}><span className="block text-[clamp(44px,12vw,180px)] tracking-[-3.6px]">{p.heroLine2p}</span></HeroLine>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-2 gap-5 sm:gap-12">
          <p className="max-w-full sm:max-w-[640px] text-[#1a1a1ad9] text-[17px] md:text-[19px] leading-[1.55]">{p.heroTaglineFull}</p>
          <div className="flex items-center border border-[#1a1a1a] shrink-0">
            {["CHF", "USD", "EUR"].map((cur, i) => (
              <div key={cur} className={["flex h-10 items-center px-4", i > 0 && "border-l border-l-[#1a1a1a]", i === 0 ? "bg-[#1a1a1a]" : ""].join(" ")}>
                <span className={["font-['Oswald'] text-[11px] leading-normal tracking-[2.2px] uppercase", i === 0 ? "text-[#f7f6f3]" : "text-[#1a1a1ab3]"].join(" ")}>{cur}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <Stagger className="flex flex-col md:flex-row w-full border-t border-b border-y-[#1a1a1a33]">
        {p.plans.map((plan: { no: string; label: string; name: string; period: string; description: string; features: string[]; cta: string; badge?: string }, idx: number) => (
          <StaggerItem key={plan.no} className="flex-1">
            <HoverLift className={["relative flex flex-col h-full p-8 md:p-10 gap-5 border-t md:border-t-0 md:border-l first:border-t-0 md:first:border-l-0 border-[#1a1a1a33]", idx === 1 ? "bg-[#1a1a1a] text-[#f7f6f3]" : ""].join(" ")}>
              {"badge" in plan && plan.badge && (
                <div className="absolute flex h-7 items-center top-0 right-0 bg-[#2563eb] px-3.5">
                  <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">{plan.badge}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{plan.no}</span>
                <span className={["font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase", idx === 1 ? "text-[#f7f6f3a6]" : "text-[#1a1a1a99]"].join(" ")}>{plan.label}</span>
              </div>
              <span className="font-['Oswald'] text-4xl md:text-5xl tracking-[-0.48px] uppercase">{plan.name}</span>
              <div className="flex items-end pt-2 gap-1.5">
                <span className={["pb-3 font-['Oswald'] text-[20px] md:text-[22px] leading-normal", idx === 1 ? "text-[#f7f6f3a6]" : "text-[#1a1a1a99]"].join(" ")}>CHF</span>
                <span className="font-['Oswald'] text-[64px] md:text-[88px] leading-[0.9]">{planPrices[idx]}</span>
                <span className={["pb-3.5 text-[15px] italic leading-normal", idx === 1 ? "text-[#f7f6f3b3]" : "text-[#1a1a1aa6]"].join(" ")}>{plan.period}</span>
              </div>
              <p className={["max-w-[360px] text-[15px] leading-[1.6]", idx === 1 ? "text-[#f7f6f3d9]" : "text-[#1a1a1acc]"].join(" ")}>{plan.description}</p>
              <div className={["flex flex-col pt-4 mt-2 border-t gap-2.5", idx === 1 ? "border-t-[#f7f6f333]" : "border-t-[#1a1a1a26]"].join(" ")}>
                {plan.features.map((f: string) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <Check size={14} className="shrink-0 mt-1 text-[#2563eb]" strokeWidth={2} />
                    <span className={["text-sm leading-normal", idx === 1 ? "text-[#f7f6f3e6]" : "text-[#1a1a1ad9]"].join(" ")}>{f}</span>
                  </div>
                ))}
              </div>
              {idx === 1 ? (
                <div className="flex justify-between items-center mt-4 -mb-8 md:-mb-10 bg-[#2563eb] border-t border-t-[#f7f6f333] px-8 md:px-10 py-6 -mx-8 md:-mx-10 cursor-pointer hover:bg-[#1d4ed8] transition-colors">
                  <span className="font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase text-[#f7f6f3]">{plan.cta}</span>
                  <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} />
                </div>
              ) : (
                <div className="flex justify-between items-center pt-5 mt-4 border-t border-t-[#1a1a1a26] cursor-pointer group">
                  <span className="pb-[3px] font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase border-b-2 border-b-[#1a1a1a]">{plan.cta}</span>
                  <ArrowRight size={16} strokeWidth={2} />
                </div>
              )}
            </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Ledger */}
      <section className="flex w-full flex-col px-4 md:px-12 py-12 md:py-[112px] gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-7 border-b gap-5 md:gap-12 border-b-[#1a1a1a33]">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{p.ledgerLabel}</span>
            </div>
            <span className="font-['Oswald'] text-[clamp(36px,7vw,72px)] leading-[0.94] tracking-[-1.44px] uppercase">{p.ledgerHeadline}</span>
          </div>
          <p className="max-w-full md:max-w-[320px] pb-0 md:pb-2 text-[#1a1a1aa6] text-[15px] italic leading-normal">{p.ledgerSub}</p>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-0 px-4 md:px-0">
          <div className="flex flex-col min-w-[520px]">
            {ledgerRows.map((row) => (
              <div key={row.feature} className="flex items-center py-[18px] border-b border-b-[#1a1a1a1a]">
                <span className="text-[13px] md:text-[15px] leading-normal flex-1 pr-4">{row.feature}</span>
                {[row.monthly, row.annual, row.patron].map((val, i) => (
                  <div key={i} className="flex w-[140px] md:w-[200px] justify-center items-center py-1.5"><LedgerCell value={val} /></div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center pt-3 border-t-2 border-t-[#1a1a1a] min-w-[520px]">
            <div className="flex-1" />
            {p.plans.map((plan: { no: string; name: string }, i: number) => (
              <div key={plan.no} className={["flex w-[140px] md:w-[200px] justify-center py-2.5", i === 1 ? "bg-[#1a1a1a0d]" : ""].join(" ")}>
                <span className={["font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase", i === 1 ? "text-[#2563eb]" : "text-[#1a1a1aa6]"].join(" ")}>{plan.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="flex flex-col md:flex-row w-full border-t px-4 md:px-12 py-12 md:py-[112px] gap-8 md:gap-16 border-t-[#1a1a1a33]">
        <div className="flex w-full md:w-[300px] flex-col shrink-0 gap-3.5">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">{p.faqLabel}</span>
          <span className="font-['Oswald'] text-[40px] md:text-[56px] leading-[0.94] tracking-[-1.12px] uppercase">{p.faqHeadline}</span>
          <p className="mt-2 text-[#1a1a1aa6] text-sm italic leading-normal">{p.faqSub}</p>
        </div>
        <Stagger className="flex flex-col flex-1">
          {p.faqs.map((faq: { n: string; q: string; a: string }) => (
            <StaggerItem key={faq.n}>
              <div className="flex border-t py-7 gap-5 md:gap-8 border-t-[#1a1a1a26]">
                <span className="w-8 md:w-10 shrink-0 pt-1 text-[#2563eb] font-['Oswald'] text-xs leading-normal tracking-[2.88px] uppercase">{faq.n}</span>
                <div className="flex flex-col flex-1 gap-2.5">
                  <h4 className="font-['Oswald'] text-[18px] md:text-[22px] leading-[1.15] tracking-[-0.11px] uppercase">{faq.q}</h4>
                  <p className="max-w-[680px] text-[#1a1a1acc] text-[15px] leading-[1.65]">{faq.a}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <Footer />
    </div>
  );
}
