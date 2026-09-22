import type { Metadata } from "next";
import { Space_Grotesk, DM_Serif_Display } from "next/font/google";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { siteMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
});

const dmSerifDisplay = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-editorial",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSerifDisplay.variable} scroll-smooth`}>
      <body className={`${spaceGrotesk.className} ${dmSerifDisplay.className}`}>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}