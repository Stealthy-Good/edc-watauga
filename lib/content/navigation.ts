import type { NavItem, AudiencePath, FooterColumn } from "@/types/navigation";

export const mainNav: NavItem[] = [
  {
    label: "Do Business",
    href: "/do-business",
    sections: [
      {
        title: "Business Resources",
        links: [
          { label: "Available Sites & Buildings", href: "/do-business#available-sites", description: "Find your next location" },
          { label: "Workforce & Talent", href: "/do-business#workforce", description: "Educated, skilled workforce" },
          { label: "Incentives & Support", href: "/do-business#incentives", description: "Tax credits, grants, programs" },
        ],
      },
      {
        title: "Key Industries",
        links: [
          { label: "Outdoor Industry", href: "/do-business#outdoor-industry" },
          { label: "Technology & Remote Work", href: "/do-business#technology" },
          { label: "Arts & Manufacturing", href: "/do-business#arts-manufacturing" },
          { label: "Health & Wellness", href: "/do-business#health-wellness" },
        ],
      },
    ],
  },
  {
    label: "Live Here",
    href: "/live-here",
    sections: [
      {
        title: "Moving to Watauga",
        links: [
          { label: "Relocate to Watauga", href: "/live-here#relocate", description: "Housing, neighborhoods, cost of living" },
          { label: "Quality of Life", href: "/live-here#quality-of-life", description: "Schools, healthcare, recreation" },
          { label: "Mountain Living Guide", href: "/live-here#mountain-living", description: "What to expect" },
        ],
      },
    ],
  },
  {
    label: "Visit",
    href: "/visit",
    sections: [
      {
        title: "Things to Do",
        links: [
          { label: "Outdoor Adventure", href: "/visit#outdoor-adventure", description: "Trails, skiing, rivers" },
          { label: "Downtown Boone", href: "/visit#downtown-boone", description: "Shopping, dining, culture" },
          { label: "Breweries & Dining", href: "/visit#dining", description: "Local flavors" },
        ],
      },
    ],
  },
  {
    label: "Data Center",
    href: "/data-center",
  },
  {
    label: "University",
    href: "/university",
  },
];

export const audiencePaths: AudiencePath[] = [
  { label: "Start a Business", description: "Resources for entrepreneurs", href: "/do-business#incentives" },
  { label: "Relocate My Company", description: "Sites, workforce, incentives", href: "/do-business" },
  { label: "Move to the Area", description: "Housing, schools, lifestyle", href: "/live-here" },
  { label: "Plan a Visit", description: "Trails, dining, culture", href: "/visit" },
  { label: "Find Workforce Data", description: "Demographics, reports", href: "/data-center" },
];

export const footerColumns: FooterColumn[] = [
  {
    title: "Do Business",
    links: [
      { label: "Available Sites", href: "/do-business#available-sites" },
      { label: "Workforce & Talent", href: "/do-business#workforce" },
      { label: "Incentives", href: "/do-business#incentives" },
      { label: "Key Industries", href: "/do-business#industries" },
    ],
  },
  {
    title: "Live Here",
    links: [
      { label: "Relocate", href: "/live-here#relocate" },
      { label: "Quality of Life", href: "/live-here#quality-of-life" },
      { label: "Mountain Living", href: "/live-here#mountain-living" },
    ],
  },
  {
    title: "Visit",
    links: [
      { label: "Outdoor Adventure", href: "/visit#outdoor-adventure" },
      { label: "Downtown Boone", href: "/visit#downtown-boone" },
      { label: "Events & Culture", href: "/visit#events" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Data Center", href: "/data-center" },
      { label: "University Connection", href: "/university" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];
