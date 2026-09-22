import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/reveal";

export default function NotFound() {
  return (
    <main className="inner-page" style={{ textAlign: "center", paddingTop: "120px" }}>
      <Reveal as="h1" className="hero-title" style={{ marginBottom: "16px" }}>
        <span>404</span>
      </Reveal>
      <Reveal className="hero-deck" style={{ marginBottom: "32px" }}>
        The signal you&apos;re looking for doesn&apos;t exist.
      </Reveal>
      <Reveal>
        <Link className="button button-primary" href="/">
          <ArrowLeft size={16} /> Back to home
        </Link>
      </Reveal>
    </main>
  );
}