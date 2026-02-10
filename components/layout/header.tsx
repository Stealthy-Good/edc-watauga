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
        mobileOpen
          ? "bg-transparent shadow-none"
          : scrolled
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
                    className="flex items-start gap-3 rounded-card px-4 py-3 transition-colors duration-fast hover:bg-primary-light"
                    onClick={() => setAudienceOpen(false)}
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-light text-primary">
                      <AudienceIcon icon={path.icon} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{path.label}</p>
                      <p className="text-xs text-text-secondary">{path.description}</p>
                    </div>
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

function AudienceIcon({ icon }: { icon: string }) {
  const cls = "h-3.5 w-3.5";
  switch (icon) {
    case "briefcase":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>;
    case "building":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" /></svg>;
    case "home":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>;
    case "compass":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>;
    case "chart":
      return <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg>;
    default:
      return null;
  }
}
