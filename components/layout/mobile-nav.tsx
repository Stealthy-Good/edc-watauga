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
                    className="block rounded-card px-4 py-2.5 hover:bg-accent-light"
                    onClick={onClose}
                  >
                    <p className="text-sm font-medium text-text-primary">{path.label}</p>
                    <p className="text-xs text-text-secondary">{path.description}</p>
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
