import type { Metadata, Viewport } from "next";
import { satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "little fella",
  description:
    "little fella. we get in early with strong founders, on work that will matter.",
  icons: { icon: "/brand/4.png" },
};

export const viewport: Viewport = {
  themeColor: "#4193ff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <body className="font-sans antialiased">
        {/*
          THESIS: the name is the first memory; refuse cream-serif fund sites and generic dark-tech VC.
          OWN-WORLD: #4193FF fields, #1C1C1C reading, cream type, Satoshi Black lowercase, radius 0, text CTAs.
          STORY: see the name, read what we buy, see four companies, send a note.
          FIRST VIEWPORT: full-bleed blue, giant stacked wordmark as the picture, H1 is the job, send a note.
          FORM: user-pinned brand field + Prime Intellect type craft. seed: user-pinned
          FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md
        */}
        {children}
      </body>
    </html>
  );
}
