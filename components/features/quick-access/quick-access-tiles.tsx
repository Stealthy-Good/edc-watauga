import { Container } from "@/components/ui/container";
import Link from "next/link";

interface Tile {
  title: string;
  description: string;
  links: { label: string; href: string }[];
  cta: { label: string; href: string };
  icon: React.ReactNode;
  color: string;
}

const tiles: Tile[] = [
  {
    title: "Explore & Visit",
    description: "Discover the Blue Ridge Mountains, outdoor adventure, and vibrant culture.",
    links: [
      { label: "Tourism Guide", href: "/visit" },
      { label: "Trail Systems", href: "/visit#outdoor-adventure" },
      { label: "Arts & Events", href: "/visit#downtown-boone" },
      { label: "Dining & Breweries", href: "/visit#dining" },
    ],
    cta: { label: "Plan Your Visit", href: "/visit" },
    icon: <CompassIcon />,
    color: "sky-custom",
  },
  {
    title: "Live & Work",
    description: "Experience mountain living with modern amenities and tight-knit community.",
    links: [
      { label: "Relocate Here", href: "/live-here" },
      { label: "Housing Market", href: "/live-here#relocate" },
      { label: "Quality of Life", href: "/live-here#quality-of-life" },
      { label: "Schools & Education", href: "/live-here#education" },
    ],
    cta: { label: "Learn About Living Here", href: "/live-here" },
    icon: <HomeIcon />,
    color: "primary",
  },
  {
    title: "Grow & Invest",
    description: "Access talented workforce, business resources, and economic incentives.",
    links: [
      { label: "Business Resources", href: "/do-business" },
      { label: "Available Sites", href: "/do-business#available-sites" },
      { label: "Incentives", href: "/do-business#incentives" },
      { label: "Workforce Data", href: "/data-center" },
    ],
    cta: { label: "Explore Opportunities", href: "/do-business" },
    icon: <TrendingUpIcon />,
    color: "accent",
  },
];

export function QuickAccessTiles() {
  return (
    <section className="relative -mt-12 z-20 pb-16">
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiles.map((tile) => (
            <div
              key={tile.title}
              className="group rounded-dashboard bg-white p-8 shadow-elevated transition-all duration-normal hover:-translate-y-1 hover:shadow-medium"
            >
              <div
                className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-card bg-${tile.color}-light text-${tile.color}`}
              >
                {tile.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-text-primary">{tile.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{tile.description}</p>
              <ul className="mt-5 space-y-2">
                {tile.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary transition-colors duration-fast hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={tile.cta.href}
                className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-${tile.color} transition-colors duration-fast hover:text-${tile.color}-dark`}
              >
                {tile.cta.label}
                <ArrowRightIcon />
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CompassIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 0v0m-3.5 6.5l7-3.5-3.5 7-7 3.5 3.5-7z" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function TrendingUpIcon() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  );
}
