export interface Industry {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
}

export const industries: Industry[] = [
  {
    id: "outdoor",
    title: "Outdoor Industry & Recreation",
    description:
      "A natural hub for outdoor brands, gear companies, and recreation businesses. Access to trails, rivers, and ski resorts right outside your door.",
    icon: "mountain",
    href: "/do-business#outdoor-industry",
  },
  {
    id: "tech",
    title: "Technology & Remote Work",
    description:
      "High-speed broadband, an educated workforce from App State, and a quality of life that attracts top talent. The perfect remote work destination.",
    icon: "laptop",
    href: "/do-business#technology",
  },
  {
    id: "education",
    title: "Education & Research",
    description:
      "Appalachian State University drives innovation with 20,000+ students, cutting-edge research centers, and a pipeline of skilled graduates.",
    icon: "graduation",
    href: "/university",
  },
  {
    id: "tourism",
    title: "Tourism & Hospitality",
    description:
      "Year-round tourism fueled by the Blue Ridge Parkway, ski resorts, fall foliage, and a vibrant arts and culture scene.",
    icon: "compass",
    href: "/visit",
  },
  {
    id: "arts",
    title: "Arts & Craft Manufacturing",
    description:
      "Deep Appalachian craft heritage meets contemporary creativity. A thriving community of artisans, makers, and creative businesses.",
    icon: "palette",
    href: "/do-business#arts-manufacturing",
  },
  {
    id: "health",
    title: "Health & Wellness",
    description:
      "Clean mountain air, active outdoor lifestyle, and growing healthcare infrastructure. An ideal environment for wellness-focused businesses.",
    icon: "heart",
    href: "/do-business#health-wellness",
  },
];
