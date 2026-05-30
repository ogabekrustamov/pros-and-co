import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col border-t px-12 py-16 gap-10 border-t-[#1a1a1a33]">
      <div className="flex flex-wrap gap-12">
        <div className="flex w-[300px] flex-col shrink-0 gap-3.5">
          <div className="font-['Oswald'] text-[32px] leading-normal tracking-[5.12px] uppercase">
            Prose &amp; Co.
          </div>
          <p className="text-[#1a1a1aa6] text-sm italic leading-[1.55]">
            A writing studio with an opinion. Drafted in Zürich, edited in
            Kyoto, printed nowhere.
          </p>
          <div className="flex flex-col mt-2 gap-0.5">
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              Bureau — Bahnhofstrasse 14
            </span>
            <span className="text-[#1a1a1a99] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
              8001 Zürich, CH
            </span>
          </div>
        </div>

        <div className="flex flex-1 gap-12 flex-wrap">
          <div className="flex flex-col gap-3">
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              The Editor
            </span>
            {["Drafting Desk", "Copy Desk", "Research Desk", "Personal Library"].map(
              (item) => (
                <Link
                  key={item}
                  href="/editor"
                  className="text-[#1a1a1abf] text-sm leading-normal hover:text-[#1a1a1a] transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              The Studio
            </span>
            {[
              { label: "Manifesto", href: "/manifesto" },
              { label: "Field Journal", href: "/journal" },
              { label: "In The Press", href: "/" },
              { label: "The Bureau", href: "/" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-[#1a1a1abf] text-sm leading-normal hover:text-[#1a1a1a] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
              Subscribe
            </span>
            {[
              "Monthly — CHF 14",
              "Annual — CHF 140",
              "Patron Edition",
              "A Gift Subscription",
            ].map((item) => (
              <Link
                key={item}
                href="/pricing"
                className="text-[#1a1a1abf] text-sm leading-normal hover:text-[#1a1a1a] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex w-[240px] flex-col shrink-0 gap-3">
          <span className="font-['Oswald'] text-[11px] leading-normal tracking-[3.08px] uppercase">
            Colophon
          </span>
          <p className="text-[#1a1a1aa6] text-[13px] italic leading-[1.6]">
            Set in Oswald and Source Serif. Photographed on Tri-X. Printed
            digitally for the meantime.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-7 border-t gap-6 border-t-[#1a1a1a26]">
        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
          © 2025 Prose &amp; Co. — All Sentences Reserved
        </span>
        <div className="flex gap-6">
          {["Privacy", "Terms", "RSS"].map((item) => (
            <Link
              key={item}
              href="/"
              className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase hover:text-[#1a1a1a] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
        <span className="text-[#1a1a1a8c] font-['Oswald'] text-[10px] leading-normal tracking-[2.8px] uppercase">
          ISSN 2754-0917
        </span>
      </div>
    </footer>
  );
}
