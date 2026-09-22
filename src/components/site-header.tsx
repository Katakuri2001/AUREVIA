"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

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
    const onScroll = () => setScrolled(window.scrollY > 40);
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
          <span className="brand-wordmark">The Guys</span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-cta" href="/#contact">
            Start a Project
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
          height: var(--header-height);
          background: transparent;
          transition: background var(--duration-medium) var(--ease-out), 
                      box-shadow var(--duration-medium) var(--ease-out),
                      border-color var(--duration-medium) var(--ease-out);
        }
        .site-header.scrolled {
          background: rgba(7, 7, 7, 0.9);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(201, 199, 192, 0.1);
        }
        .header-inner {
          display: flex;
          align-items: center;
          gap: var(--space-2xl);
          height: 100%;
          padding: 0 var(--container-padding);
          max-width: var(--container-width);
          margin: 0 auto;
        }
        .brand-lockup {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          transition: opacity var(--duration-fast) var(--ease-out);
        }
        .brand-lockup:hover {
          opacity: 0.7;
        }
        .brand-mark {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border: 1px solid rgba(139, 92, 246, 0.7);
          color: var(--electric-violet);
          font-family: var(--font-editorial);
          font-style: italic;
          font-size: 15px;
          line-height: 1;
        }
        .brand-wordmark {
          font-family: var(--font-display);
          font-size: 0.9375rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--warm-white);
        }
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: var(--space-xl);
          margin-left: var(--space-xl);
        }
        .nav-link {
          font-family: var(--font-body);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--soft-gray);
          padding: var(--space-xs) 0;
          position: relative;
          transition: color var(--duration-fast) var(--ease-out);
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--electric-violet);
          transition: width var(--duration-medium) var(--ease-out);
        }
        .nav-link:hover {
          color: var(--warm-white);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: var(--space-md);
          margin-left: auto;
        }
        .header-cta {
          display: inline-flex;
          align-items: center;
          gap: var(--space-sm);
          padding: 0.75rem 1.5rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: var(--electric-violet);
          color: var(--black);
          transition: all var(--duration-medium) var(--ease-out);
        }
        .header-cta:hover {
          background: var(--warm-white);
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(139, 92, 246, 0.3);
          color: var(--black);
        }
        .mobile-menu-button {
          display: none;
          width: 44px;
          height: 44px;
          border-radius: 0;
          background: transparent;
          border: 1px solid var(--soft-gray);
          color: var(--off-white);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-out);
        }
        .mobile-menu-button:hover {
          border-color: var(--electric-violet);
          color: var(--electric-violet);
        }
        .mobile-nav-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          z-index: 40;
        }
        @media (max-width: 1024px) {
          .desktop-nav {
            position: fixed;
            top: var(--header-height);
            left: 0;
            right: 0;
            flex-direction: column;
            padding: var(--space-xl) var(--container-padding);
            gap: var(--space-md);
            background: var(--deep-black);
            border-bottom: 1px solid rgba(201, 199, 192, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all var(--duration-medium) var(--ease-out);
          }
          .site-header.mobile-open .desktop-nav {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
          }
          .nav-link {
            width: 100%;
            text-align: left;
            padding: var(--space-sm) 0;
            font-size: 1rem;
          }
          .header-cta {
            width: 100%;
            justify-content: center;
            margin-top: var(--space-md);
          }
          .mobile-menu-button {
            display: grid;
            place-items: center;
          }
          .mobile-nav-overlay {
            display: block;
          }
        }
        @media (max-width: 640px) {
          .header-inner {
            padding: 0 var(--container-padding);
          }
          .site-header {
            height: 64px;
          }
          .brand-wordmark {
            font-size: 0.875rem;
            letter-spacing: 0.15em;
          }
        }
      `}</style>
    </header>
  );
}