import type { Metadata } from "next";
import { Oswald, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-oswald",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  title: "Prose & Co. — A Writing Studio With An Opinion",
  description:
    "Prose & Co. is a writing studio with an opinion. Drafted in Zürich, edited in Kyoto — an AI co-author for essays, manifestos and the occasional dangerous email.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${sourceSerif.variable}`}>
      <body className="bg-[#f7f6f3] text-[#1a1a1a]"><Providers>{children}</Providers></body>
    </html>
  );
}
