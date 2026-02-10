export interface IndustrySection {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  highlights: {
    title: string;
    description: string;
  }[];
}

export const industrySections: IndustrySection[] = [
  {
    id: "outdoor-industry",
    badge: "Outdoor Industry",
    title: "Outdoor Industry & Recreation",
    subtitle:
      "Watauga County is a natural hub for outdoor brands, gear companies, and recreation-focused businesses with direct access to trails, rivers, and ski resorts.",
    highlights: [
      {
        title: "Built-In Testing Ground",
        description:
          "Develop and test outdoor products year-round with access to the Blue Ridge Parkway, Grandfather Mountain, ski slopes, rivers, and 100+ miles of trails.",
      },
      {
        title: "Outdoor-Fluent Workforce",
        description:
          "App State's Recreation Management and Sustainable Technology programs produce graduates who understand outdoor industry from manufacturing to marketing.",
      },
      {
        title: "Growing Sector",
        description:
          "North Carolina's outdoor recreation economy generates $28B+ annually. Watauga County sits at the center of the High Country outdoor corridor.",
      },
    ],
  },
  {
    id: "technology",
    badge: "Technology",
    title: "Technology & Remote Work",
    subtitle:
      "High-speed broadband, an educated workforce from App State, and a quality of life that attracts top talent make Watauga County a prime destination for tech companies and remote workers.",
    highlights: [
      {
        title: "Broadband Infrastructure",
        description:
          "SkyLine/SkyBest fiber network provides gigabit-capable internet across the county. Charter/Spectrum offers additional coverage in town limits.",
      },
      {
        title: "Tech Talent Pipeline",
        description:
          "App State's Computer Science, Data Science, and Information Systems programs graduate 500+ students annually. The university also operates a cybersecurity research center.",
      },
      {
        title: "Remote Work Appeal",
        description:
          "Co-working spaces, low cost of living relative to tech hubs, and unmatched outdoor lifestyle attract remote workers relocating from Charlotte, Raleigh, and beyond.",
      },
    ],
  },
  {
    id: "arts-manufacturing",
    badge: "Arts & Manufacturing",
    title: "Arts & Craft Manufacturing",
    subtitle:
      "Deep Appalachian craft heritage meets contemporary creativity. Watauga County supports a thriving community of artisans, makers, and creative manufacturing businesses.",
    highlights: [
      {
        title: "Craft Heritage",
        description:
          "Generations of Appalachian craft tradition provide a skilled maker workforce experienced in woodworking, textiles, ceramics, metalwork, and specialty food production.",
      },
      {
        title: "Creative Economy",
        description:
          "Downtown Boone and surrounding communities support galleries, studios, and maker spaces. App State's art programs add emerging talent each year.",
      },
      {
        title: "Manufacturing Support",
        description:
          "Access to small-batch manufacturing facilities, the Caldwell Community College small business center, and regional supply chains for materials and distribution.",
      },
    ],
  },
  {
    id: "health-wellness",
    badge: "Health & Wellness",
    title: "Health & Wellness",
    subtitle:
      "Clean mountain air, an active outdoor lifestyle, and growing healthcare infrastructure create an ideal environment for wellness-focused businesses and health services.",
    highlights: [
      {
        title: "Healthcare Infrastructure",
        description:
          "Watauga Medical Center provides acute care services. App State's Beaver College of Health Sciences trains the next generation of healthcare professionals.",
      },
      {
        title: "Wellness Lifestyle",
        description:
          "95% air quality rating, four-season outdoor recreation, and a community culture focused on health and wellness attract both providers and health-conscious residents.",
      },
      {
        title: "Growing Demand",
        description:
          "An aging population, university health services needs, and tourism-driven wellness spending create a growing market for healthcare and wellness businesses.",
      },
    ],
  },
];
