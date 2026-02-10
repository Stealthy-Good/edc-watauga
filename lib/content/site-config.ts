export const siteConfig = {
  name: "Watauga County EDC",
  fullName: "Watauga County Economic Development Commission",
  tagline: "Where Mountains Meet Innovation",
  description:
    "The High Country's modern mountain community: Outdoor adventure. Academic excellence. Economic opportunity.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://wataugaedc.org",
  contact: {
    address: "228 Queen Street",
    city: "Boone",
    state: "NC",
    zip: "28607",
    phone: "(828) 264-3082",
    email: "info@boonechamber.com",
  },
  social: {
    facebook: "https://www.facebook.com/boonechamber",
    twitter: "https://twitter.com/boonechamber",
    linkedin: "https://www.linkedin.com/company/boone-area-chamber-of-commerce",
    instagram: "https://www.instagram.com/boonechamber",
  },
} as const;
