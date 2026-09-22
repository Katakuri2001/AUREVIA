"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link href="/" className="brand-lockup" aria-label="The Guys home">
            <span className="brand-mark">TG</span>
            <span className="brand-wordmark">The Guys</span>
          </Link>
          <p className="footer-tagline">We make attention move.</p>
        </div>
        <div className="footer-nav">
          <div className="footer-column">
            <span className="footer-heading">EXPLORE</span>
            <Link href="/work">Work</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/#method">Method</Link>
          </div>
          <div className="footer-column">
            <span className="footer-heading">SERVICES</span>
            <Link href="/#services">Content Marketing</Link>
            <Link href="/#services">Paid Media</Link>
            <Link href="/#services">Growth Intelligence</Link>
          </div>
          <div className="footer-column">
            <span className="footer-heading">CONNECT</span>
            <Link href="mailto:hello@theguys.studio">Email</Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</Link>
            <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} The Guys. All rights reserved.</span>
        <span>DEMO EXPERIENCE / FICTIONAL CASE WORK</span>
        <Link href="#top" className="back-to-top">
          Back to top <ArrowUpRight size={14} />
        </Link>
      </div>
      <style jsx>{`
        .site-footer {
          padding: var(--space-5xl) var(--container-padding) var(--space-xl);
          background: var(--deep-black);
          border-top: 1px solid rgba(201, 199, 192, 0.1);
        }
        .footer-inner {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--space-4xl);
          max-width: var(--container-width);
          margin: 0 auto var(--space-4xl);
          padding-bottom: var(--space-4xl);
          border-bottom: 1px solid rgba(201, 199, 192, 0.1);
        }
        .brand-lockup {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .brand-mark {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border: 1px solid rgba(139, 92, 246, 0.7);
          color: var(--electric-violet);
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: 16px;
          line-height: 1;
        }
        .brand-wordmark {
          font-family: var(--font-display);
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--warm-white);
        }
        .footer-tagline {
          margin-top: var(--space-md);
          font-family: var(--font-body);
          font-size: 1rem;
          color: var(--muted-gray);
          max-width: 280px;
        }
        .footer-nav {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-xl);
        }
        .footer-column {
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .footer-heading {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--muted-gray);
        }
        .footer-column a {
          font-family: var(--font-body);
          font-size: 0.9375rem;
          color: var(--soft-gray);
          padding: var(--space-xs) 0;
          transition: color var(--duration-fast) var(--ease-out);
        }
        .footer-column a:hover {
          color: var(--electric-violet);
        }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: var(--container-width);
          margin: 0 auto;
          padding-top: var(--space-lg);
          font-size: 0.75rem;
          color: var(--muted-gray);
        }
        .back-to-top {
          display: inline-flex;
          align-items: center;
          gap: var(--space-xs);
          color: var(--muted-gray);
          transition: color var(--duration-fast) var(--ease-out);
        }
        .back-to-top:hover {
          color: var(--electric-violet);
        }
        @media (max-width: 1024px) {
          .footer-inner {
            grid-template-columns: 1fr;
            gap: var(--space-3xl);
          }
        }
        @media (max-width: 768px) {
          .footer-nav {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .footer-nav {
            grid-template-columns: 1fr;
          }
          .footer-bottom {
            flex-direction: column;
            gap: var(--space-md);
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}