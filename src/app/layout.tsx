import type { Metadata } from "next";
import React from "react";
import "@/app/globals.css";
import { siteMetadata } from "@/lib/seo";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}