import Link from "next/link";
import type { NavSection } from "@/types/navigation";

interface MegaMenuProps {
  sections: NavSection[];
  onClose: () => void;
}

export function MegaMenu({ sections, onClose }: MegaMenuProps) {
  return (
    <div
      className="absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-dashboard bg-white p-6 shadow-elevated animate-scale-in"
      style={{ minWidth: sections.length > 1 ? "500px" : "320px" }}
    >
      <div className={`grid gap-8 ${sections.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-card px-3 py-2.5 transition-colors duration-fast hover:bg-primary-light"
                    onClick={onClose}
                  >
                    <p className="text-sm font-medium text-text-primary">{link.label}</p>
                    {link.description && (
                      <p className="mt-0.5 text-xs text-text-secondary">{link.description}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
