"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { mainNav, audiencePaths } from "@/lib/content/navigation";
import { MegaMenu } from "./mega-menu";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [audienceOpen, setAudienceOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveMenu(null);
        setAudienceOpen(false);
      }
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-normal",
        scrolled
          ? "bg-white/95 shadow-soft backdrop-blur-sm"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-card bg-primary">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 19l6-9 4 5 4-7 4 11H3z" />
            </svg>
          </div>
          <div className="hidden sm:block">
            <p
              className={cn(
                "font-display text-sm font-bold leading-tight transition-colors",
                scrolled ? "text-primary" : "text-white",
              )}
            >
              Watauga County
            </p>
            <p
              className={cn(
                "text-xs transition-colors",
                scrolled ? "text-text-secondary" : "text-white/80",
              )}
            >
              Economic Development
            </p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
          {mainNav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.sections && setActiveMenu(item.label)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-fast",
                  scrolled
                    ? "text-text-primary hover:bg-primary-light hover:text-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10",
                  activeMenu === item.label && (scrolled ? "bg-primary-light text-primary" : "bg-white/10 text-white"),
                )}
              >
                {item.label}
                {item.sections && (
                  <svg className="ml-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                )}
              </Link>
              {item.sections && activeMenu === item.label && (
                <MegaMenu sections={item.sections} onClose={() => setActiveMenu(null)} />
              )}
            </div>
          ))}
        </nav>

        {/* Right side: Audience paths + CTA + Mobile trigger */}
        <div className="flex items-center gap-3">
          {/* I want to... dropdown */}
          <div
            className="relative hidden lg:block"
            onMouseEnter={() => setAudienceOpen(true)}
            onMouseLeave={() => setAudienceOpen(false)}
          >
            <button
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-fast",
                scrolled
                  ? "text-text-secondary hover:text-primary"
                  : "text-white/80 hover:text-white",
              )}
            >
              I want to...
              <svg className="ml-1 inline h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {audienceOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-dashboard bg-white p-2 shadow-elevated">
                {audiencePaths.map((path) => (
                  <Link
                    key={path.label}
                    href={path.href}
                    className="block rounded-card px-4 py-3 transition-colors duration-fast hover:bg-primary-light"
                    onClick={() => setAudienceOpen(false)}
                  >
                    <p className="text-sm font-semibold text-text-primary">{path.label}</p>
                    <p className="text-xs text-text-secondary">{path.description}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact CTA */}
          <Link
            href="/contact"
            className={cn(
              "hidden sm:inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-card transition-all duration-fast",
              scrolled
                ? "bg-accent text-white hover:bg-accent-dark"
                : "bg-white/15 text-white border border-white/30 hover:bg-white/25",
            )}
          >
            Contact Us
          </Link>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-card transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <svg
              className={cn("h-6 w-6", scrolled ? "text-text-primary" : "text-white")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
