import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  title: {
    default: "The Guys — Impossible to Ignore",
    template: "%s | The Guys",
  },
  description: "The Guys turns attention into meaningful growth through strategy, story, amplification, conversion, and intelligent optimization.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Guys",
    title: "The Guys — Impossible to Ignore",
    description: "A digital marketing agency for brands ready to be remembered.",
    images: ["/images/the-guys-og.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Guys — Impossible to Ignore",
    description: "Attention is the beginning. Growth is the proof.",
    images: ["/images/the-guys-og.svg"],
  },
};

export function articleMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: "article",
      title,
      description,
      images: ["/images/the-guys-og.svg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/the-guys-og.svg"],
    },
  };
}