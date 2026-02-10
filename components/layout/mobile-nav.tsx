"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { mainNav, audiencePaths } from "@/lib/content/navigation";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedItem(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
    return undefined;
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-normal",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-elevated transition-transform duration-normal",
          open ? "translate-x-0" : "translate-x-full",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-light px-6 py-4">
          <p className="font-display text-lg font-bold text-primary">Menu</p>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-card text-text-primary hover:bg-primary-light"
            aria-label="Close navigation menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="overflow-y-auto px-4 py-4" style={{ maxHeight: "calc(100vh - 180px)" }}>
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.label}>
                {item.sections ? (
                  <div>
                    <button
                      className="flex w-full items-center justify-between rounded-card px-4 py-3 text-left text-base font-medium text-text-primary hover:bg-primary-light"
                      onClick={() =>
                        setExpandedItem(expandedItem === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <svg
                        className={cn(
                          "h-4 w-4 transition-transform duration-fast",
                          expandedItem === item.label && "rotate-180",
                        )}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </button>
                    {expandedItem === item.label && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-primary-light pl-4">
                        <Link
                          href={item.href}
                          className="block rounded-card px-3 py-2 text-sm font-semibold text-primary hover:bg-primary-light"
                          onClick={onClose}
                        >
                          Overview
                        </Link>
                        {item.sections.map((section) =>
                          section.links.map((link) => (
                            <Link
                              key={link.href}
                              href={link.href}
                              className="block rounded-card px-3 py-2 text-sm text-text-secondary hover:bg-primary-light hover:text-text-primary"
                              onClick={onClose}
                            >
                              {link.label}
                            </Link>
                          )),
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block rounded-card px-4 py-3 text-base font-medium text-text-primary hover:bg-primary-light"
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Audience quick-paths */}
          <div className="mt-6 border-t border-border-light pt-6">
            <p className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
              I want to...
            </p>
            <ul className="space-y-1">
              {audiencePaths.map((path) => (
                <li key={path.label}>
                  <Link
                    href={path.href}
                    className="flex items-start gap-3 rounded-card px-4 py-2.5 hover:bg-accent-light"
                    onClick={onClose}
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-light text-primary">
                      <MobileAudienceIcon icon={path.icon} />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{path.label}</p>
                      <p className="text-xs text-text-secondary">{path.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Contact CTA */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border-light bg-white p-4">
          <Link
            href="/contact"
            className="block w-full rounded-card bg-accent py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
            onClick={onClose}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}

function MobileAudienceIcon({ icon }: { icon: string }) {
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
