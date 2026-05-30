import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FadeIn, Stagger, StaggerItem, HeroLine, HoverLift } from "@/components/animations";
import { ArrowRight, Check, Minus } from "lucide-react";

export const metadata = {
  title: "Subscriptions — Prose & Co.",
};

const plans = [
  {
    no: "No. 01",
    label: "For The Curious",
    name: "The Monthly",
    currency: "CHF",
    price: "14",
    period: "/ month",
    description:
      "A trial run with full editorial privileges. For the writer who is still testing whether they like having an editor at all.",
    features: [
      "The Editor — unlimited drafts",
      "Copy Desk in five tones",
      "Personal Library — 1 GB",
      "Three voice presets",
      "Email-only support",
    ],
    cta: "Begin The Monthly",
    featured: false,
  },
  {
    no: "No. 02",
    label: "For The Working Writer",
    name: "The Annual",
    currency: "CHF",
    price: "140",
    period: "/ year — two issues free",
    description:
      "For the writer who has decided. A standing relationship with the editor, the library, and the bureau — for the price of two London lunches.",
    features: [
      "Everything in The Monthly",
      "Personal Library — 25 GB",
      "Twelve voice presets & house style",
      "Research Desk — live citations",
      "Field Journal print archive",
      "Priority editor — 4-hour reply",
    ],
    cta: "Begin The Annual",
    featured: true,
    badge: "Editor's Choice",
  },
  {
    no: "No. 03",
    label: "For The Bureau",
    name: "The Patron",
    currency: "CHF",
    price: "480",
    period: "/ year, per masthead",
    description:
      "For mastheads, agencies, and the occasional novelist with a foundation. A shared bureau with a private house style and a real editor on the masthead.",
    features: [
      "Everything in The Annual",
      "Up to 12 seats — shared Library",
      "Private house-style model",
      "Signed first print of every Issue",
      "A real editor (M. Reinhardt's desk)",
      "Masthead listing in the colophon",
    ],
    cta: "Write To The Bureau",
    featured: false,
  },
];

const ledgerRows = [
  {
    feature: "Unlimited drafts",
    monthly: "check",
    annual: "check",
    patron: "check",
  },
  {
    feature: "Copy Desk, all tones",
    monthly: "5 tones",
    annual: "12 tones",
    patron: "Custom voice",
  },
  {
    feature: "Personal Library",
    monthly: "1 GB",
    annual: "25 GB",
    patron: "250 GB shared",
  },
  {
    feature: "Research Desk — live citations",
    monthly: false,
    annual: "check",
    patron: "check",
  },
  {
    feature: "Field Journal print archive",
    monthly: false,
    annual: "check",
    patron: "check",
  },
  {
    feature: "Private house-style model",
    monthly: false,
    annual: false,
    patron: "check",
  },
  {
    feature: "Editor reply (M. Reinhardt's desk)",
    monthly: "Email, 72h",
    annual: "Priority, 4h",
    patron: "Real human, 1h",
  },
  { feature: "Masthead listing", monthly: false, annual: false, patron: "check" },
  { feature: "Seats included", monthly: "1", annual: "1", patron: "Up to 12" },
];

function LedgerCell({ value }: { value: string | boolean }) {
  if (value === "check")
    return <Check size={18} className="text-[#2563eb]" strokeWidth={2} />;
  if (value === false)
    return <Minus size={18} className="text-[#1a1a1a4d]" strokeWidth={2} />;
  return (
    <span className="font-['Oswald'] text-xs leading-normal tracking-[2.16px] uppercase">
      {value}
    </span>
  );
}

export default function PricingPage() {
  return (
    <div className="flex flex-col bg-[#f7f6f3] text-[#1a1a1a]">
      <Nav ctaLabel="Sign In" />

      {/* Hero */}
      <section className="flex w-full flex-col px-12 py-[88px] gap-7">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="flex w-7 h-0.5 bg-[#2563eb]" />
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              Subscriptions — Three Plans, One Voice
            </span>
          </div>
          <span className="text-[#1a1a1a99] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            P. 014 / 064
          </span>
        </div>
        <div className="flex flex-col font-['Oswald'] font-medium leading-[0.92] uppercase overflow-hidden">
          <HeroLine delay={0.05}><span className="block text-[clamp(64px,12vw,180px)] tracking-[-3.6px]">Pay For The Hours</span></HeroLine>
          <HeroLine delay={0.18}><span className="block text-[clamp(64px,12vw,180px)] tracking-[-3.6px]">You Spend Writing.</span></HeroLine>
        </div>
        <div className="flex justify-between items-end mt-2 gap-12">
          <p className="max-w-[640px] text-[#1a1a1ad9] text-[19px] leading-[1.55]">
            Three subscriptions, no usage meters, no surprise tokens. The same
            editor — only the company you keep changes. Cancel by postcard, or
            by clicking a button like a coward.
          </p>
          <div className="flex items-center border border-[#1a1a1a]">
            {["CHF", "USD", "EUR"].map((cur, i) => (
              <div
                key={cur}
                className={[
                  "flex h-10 items-center px-4",
                  i > 0 && "border-l border-l-[#1a1a1a]",
                  i === 0 ? "bg-[#1a1a1a]" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-['Oswald'] text-[11px] leading-normal tracking-[2.2px] uppercase",
                    i === 0 ? "text-[#f7f6f3]" : "text-[#1a1a1ab3]",
                  ].join(" ")}
                >
                  {cur}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plan cards */}
      <Stagger className="flex w-full border-t border-b border-y-[#1a1a1a33]">
        {plans.map((plan) => (
          <StaggerItem key={plan.no} className="flex-1">
          <HoverLift
            className={[
              "relative flex flex-col h-full p-10 gap-5 border-l first:border-l-0 border-l-[#1a1a1a33]",
              plan.featured ? "bg-[#1a1a1a] text-[#f7f6f3]" : "",
            ].join(" ")}
          >
            {plan.badge && (
              <div className="absolute flex h-7 items-center top-0 right-0 bg-[#2563eb] px-3.5">
                <span className="text-[#f7f6f3] font-['Oswald'] text-[10px] leading-normal tracking-[2.4px] uppercase">
                  {plan.badge}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                {plan.no}
              </span>
              <span
                className={[
                  "font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase",
                  plan.featured ? "text-[#f7f6f3a6]" : "text-[#1a1a1a99]",
                ].join(" ")}
              >
                {plan.label}
              </span>
            </div>
            <span className="font-['Oswald'] text-5xl tracking-[-0.48px] uppercase">
              {plan.name}
            </span>
            <div className="flex items-end pt-2 gap-1.5">
              <span
                className={[
                  "pb-3 font-['Oswald'] text-[22px] leading-normal",
                  plan.featured ? "text-[#f7f6f3a6]" : "text-[#1a1a1a99]",
                ].join(" ")}
              >
                {plan.currency}
              </span>
              <span className="font-['Oswald'] text-[88px] leading-[0.9]">
                {plan.price}
              </span>
              <span
                className={[
                  "pb-3.5 text-[15px] italic leading-normal",
                  plan.featured ? "text-[#f7f6f3b3]" : "text-[#1a1a1aa6]",
                ].join(" ")}
              >
                {plan.period}
              </span>
            </div>
            <p
              className={[
                "max-w-[360px] text-[15px] leading-[1.6]",
                plan.featured ? "text-[#f7f6f3d9]" : "text-[#1a1a1acc]",
              ].join(" ")}
            >
              {plan.description}
            </p>

            <div
              className={[
                "flex flex-col pt-4 mt-2 border-t gap-2.5",
                plan.featured ? "border-t-[#f7f6f333]" : "border-t-[#1a1a1a26]",
              ].join(" ")}
            >
              {plan.features.map((f) => (
                <div key={f} className="flex items-start gap-2.5">
                  <Check
                    size={14}
                    className="shrink-0 mt-1 text-[#2563eb]"
                    strokeWidth={2}
                  />
                  <span
                    className={[
                      "text-sm leading-normal",
                      plan.featured ? "text-[#f7f6f3e6]" : "text-[#1a1a1ad9]",
                    ].join(" ")}
                  >
                    {f}
                  </span>
                </div>
              ))}
            </div>

            {plan.featured ? (
              <div className="flex justify-between items-center mt-4 -mb-10 bg-[#2563eb] border-t border-t-[#f7f6f333] px-10 py-6 -mx-10 cursor-pointer hover:bg-[#1d4ed8] transition-colors">
                <span className="font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase text-[#f7f6f3]">
                  {plan.cta}
                </span>
                <ArrowRight size={16} color="#f7f6f3" strokeWidth={2} />
              </div>
            ) : (
              <div className="flex justify-between items-center pt-5 mt-4 border-t border-t-[#1a1a1a26] cursor-pointer group">
                <span className="pb-[3px] font-['Oswald'] text-xs leading-normal tracking-[2.64px] uppercase border-b-2 border-b-[#1a1a1a]">
                  {plan.cta}
                </span>
                <ArrowRight size={16} strokeWidth={2} />
              </div>
            )}
          </HoverLift>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Ledger */}
      <section className="flex w-full flex-col px-12 py-[112px] gap-8">
        <div className="flex justify-between items-end pb-7 border-b gap-12 border-b-[#1a1a1a33]">
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-3">
              <div className="flex w-7 h-0.5 bg-[#2563eb]" />
              <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
                Index — What Is Included
              </span>
            </div>
            <span className="font-['Oswald'] text-7xl leading-[0.94] tracking-[-1.44px] uppercase">
              An Honest Ledger.
            </span>
          </div>
          <p className="max-w-[320px] pb-2 text-[#1a1a1aa6] text-[15px] italic leading-normal">
            No asterisks. No "contact us." If a row says no, it means no — for
            now.
          </p>
        </div>

        <div className="flex flex-col">
          {ledgerRows.map((row) => (
            <div
              key={row.feature}
              className="flex items-center py-[18px] border-b border-b-[#1a1a1a1a]"
            >
              <span className="text-[15px] leading-normal flex-1">
                {row.feature}
              </span>
              {[row.monthly, row.annual, row.patron].map((val, i) => (
                <div
                  key={i}
                  className="flex w-[200px] justify-center items-center py-1.5"
                >
                  <LedgerCell value={val} />
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center pt-3 border-t-2 border-t-[#1a1a1a]">
          <div className="flex-1" />
          <div className="flex w-[200px] justify-center">
            <span className="text-[#1a1a1aa6] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              The Monthly
            </span>
          </div>
          <div className="flex w-[200px] justify-center bg-[#1a1a1a0d] py-2.5">
            <span className="text-[#2563eb] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              The Annual — Editor&apos;s Choice
            </span>
          </div>
          <div className="flex w-[200px] justify-center">
            <span className="text-[#1a1a1aa6] font-['Oswald'] text-[11px] leading-normal tracking-[2.64px] uppercase">
              The Patron
            </span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="flex w-full border-t px-12 py-[112px] gap-16 border-t-[#1a1a1a33]">
        <div className="flex w-[300px] flex-col shrink-0 gap-3.5">
          <div className="flex w-7 h-0.5 bg-[#2563eb]" />
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            Frequently, Earnestly Asked
          </span>
          <span className="font-['Oswald'] text-[56px] leading-[0.94] tracking-[-1.12px] uppercase">
            Questions, Answered Plainly.
          </span>
          <p className="mt-2 text-[#1a1a1aa6] text-sm italic leading-normal">
            If your question is missing, write to the bureau. We answer letters
            in the order they arrive.
          </p>
        </div>
        <Stagger className="flex flex-col flex-1">
          {[
            {
              n: "01 .",
              q: "Do you train on my writing?",
              a: "No. Your drafts stay in your Library. The Editor reads to advise, never to learn. Our house-style models are trained on essays we have license to use, full stop.",
            },
            {
              n: "02 .",
              q: "What happens to my work if I cancel?",
              a: "It stays. You can export the entire Library as Markdown, DOCX, or plain text in one click. Your account becomes read-only for ninety days, then archived, then yours forever as a single zip file.",
            },
            {
              n: "03 .",
              q: "Is there a free trial?",
              a: "Fourteen days on The Annual, no card. You will receive three of our favourite essays on day one, in case you would rather read than write that week.",
            },
            {
              n: "04 .",
              q: "Why no usage meters?",
              a: "Because token meters reward shorter sentences, and we are in the long-sentence business. Subscriptions are flat, generous, and quietly assume you intend to use the thing.",
            },
            {
              n: "05 .",
              q: "Can I move between plans?",
              a: "Yes, at any time, pro-rated to the day. The Monthly upgrades to The Annual with one click; The Patron is set up over a short call so we can match the masthead.",
            },
          ].map((faq) => (
            <StaggerItem key={faq.n}>
            <div
              className="flex border-t py-7 gap-8 border-t-[#1a1a1a26]"
            >
              <span className="w-10 shrink-0 pt-1 text-[#2563eb] font-['Oswald'] text-xs leading-normal tracking-[2.88px] uppercase">
                {faq.n}
              </span>
              <div className="flex flex-col flex-1 gap-2.5">
                <h4 className="font-['Oswald'] text-[22px] leading-[1.15] tracking-[-0.11px] uppercase">
                  {faq.q}
                </h4>
                <p className="max-w-[680px] text-[#1a1a1acc] text-[15px] leading-[1.65]">
                  {faq.a}
                </p>
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
