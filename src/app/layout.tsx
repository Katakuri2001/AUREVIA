import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";
import { siteMetadata } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}