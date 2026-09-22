"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/#method", label: "Method" },
  { href: "/work", label: "Work" },
  { href: "/insights", label: "Insights" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header ${scrolled ? "scrolled" : ""} ${mobileOpen ? "mobile-open" : ""}`}
      role="banner"
    >
      <div className="header-inner">
        <Link href="/" className="brand-lockup" aria-label="The Guys home">
          <span className="brand-mark">TG</span>
          <span>The Guys</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              <span>{item.label}</span>
              <ChevronRight size={14} aria-hidden="true" />
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-cta" href="/#contact">
            Start a conversation
            <ChevronRight size={15} />
          </Link>
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <style jsx>{`
        .site-header {
          position: fixed;
          z-index: 50;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          transition: background 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease;
        }
        .site-header.scrolled {
          background: rgba(10, 12, 13, 0.85);
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          border-bottom: 1px solid rgba(232, 185, 106, 0.15);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
          padding: 0 4.2vw;
          max-width: 100%;
        }
        .brand-lockup {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 13px;
          letter-spacing: 0.22em;
          font-weight: 650;
          color: var(--paper);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .brand-lockup:hover {
          opacity: 0.8;
        }
        .brand-mark {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border: 1px solid var(--gold);
          color: var(--gold);
          font-family: var(--serif);
          font-size: 15px;
          font-style: italic;
          font-weight: 600;
          border-radius: 4px;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        .brand-lockup:hover .brand-mark {
          background: var(--gold);
          color: var(--ink);
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          color: rgba(244, 240, 232, 0.7);
          font-size: 12px;
          letter-spacing: 0.08em;
          font-weight: 500;
          border-radius: 8px;
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .nav-link::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(232, 185, 106, 0.15), rgba(232, 185, 106, 0.05));
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .nav-link:hover {
          color: var(--paper);
          border-color: rgba(232, 185, 106, 0.4);
          background: rgba(232, 185, 106, 0.08);
        }
        .nav-link:hover::before {
          opacity: 1;
        }
        .nav-link:hover svg {
          transform: translateX(4px);
          color: var(--gold);
        }
        .nav-link svg {
          transition: transform 0.25s ease, color 0.25s ease;
          flex-shrink: 0;
        }
        .header-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border: 1px solid rgba(232, 185, 106, 0.6);
          color: var(--gold);
          font-size: 11px;
          letter-spacing: 0.08em;
          font-weight: 650;
          border-radius: 8px;
          background: linear-gradient(135deg, rgba(232, 185, 106, 0.1), transparent);
          transition: all 0.25s cubic-bezier(0.2, 0.7, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        .header-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1);
          z-index: -1;
        }
        .header-cta:hover {
          color: var(--ink);
          border-color: var(--gold);
        }
        .header-cta:hover::before {
          transform: scaleX(1);
        }
        .header-cta svg {
          transition: transform 0.25s ease;
        }
        .header-cta:hover svg {
          transform: translateX(4px);
        }
        .mobile-menu-button {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(232, 185, 106, 0.1);
          border: 1px solid rgba(232, 185, 106, 0.3);
          color: var(--paper);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mobile-menu-button:hover {
          background: rgba(232, 185, 106, 0.2);
          border-color: var(--gold);
        }
        .mobile-nav-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 40;
        }
        @media (max-width: 900px) {
          .desktop-nav {
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            flex-direction: column;
            padding: 24px 4.2vw;
            gap: 8px;
            background: rgba(10, 12, 13, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(232, 185, 106, 0.15);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.35s cubic-bezier(0.2, 0.7, 0.2, 1);
          }
          .site-header.mobile-open .desktop-nav {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          .nav-link {
            width: 100%;
            justify-content: flex-start;
            padding: 14px 16px;
          }
          .header-cta {
            width: 100%;
            justify-content: center;
            margin-top: 8px;
          }
          .mobile-menu-button {
            display: grid;
            place-items: center;
          }
          .mobile-nav-overlay {
            display: block;
          }
        }
        @media (max-width: 700px) {
          .header-inner {
            padding: 0 5vw;
          }
          .site-header {
            height: 70px;
          }
          .brand-lockup {
            font-size: 12px;
            gap: 10px;
          }
          .brand-mark {
            width: 32px;
            height: 32px;
            font-size: 13px;
          }
        }
      `}</style>
    </header>
  );
}