export interface Community {
  name: string;
  tagline: string;
  description: string;
  highlight: string;
  image?: string;
  imageAlt?: string;
}

export const communities: Community[] = [
  {
    name: "Boone",
    tagline: "University Town",
    description:
      "Home to Appalachian State University and the cultural heart of the High Country. A walkable downtown with restaurants, galleries, and live music.",
    highlight: "20,000+ university students",
    image: "/images/downtown-boone.jpg",
    imageAlt: "Downtown Boone main street with shops and American flag",
  },
  {
    name: "Blowing Rock",
    tagline: "Village Charm",
    description:
      "A charming resort village with upscale shopping, fine dining, and sweeping views from the Blowing Rock attraction on the Blue Ridge Parkway.",
    highlight: "Blue Ridge Parkway gateway",
    image: "/images/mountain-vista.jpg",
    imageAlt: "Blue Ridge Parkway scenic mountain views",
  },
  {
    name: "Valle Crucis",
    tagline: "Heritage Valley",
    description:
      "A pastoral valley known for the historic Mast General Store, organic farms, fly fishing on the Watauga River, and a deep Appalachian heritage.",
    highlight: "Historic Mast General Store",
    image: "/images/fly-fishing-stream.jpg",
    imageAlt: "Fly fishing on a mountain stream",
  },
  {
    name: "Sugar Mountain",
    tagline: "Mountain Resort",
    description:
      "Eastern America's largest ski resort area with year-round recreation including skiing, ice skating, golf, and mountain biking trails.",
    highlight: "Largest ski area in the Southeast",
    image: "/images/mountain-hero2.jpg",
    imageAlt: "Misty Blue Ridge mountain landscape",
  },
  {
    name: "Seven Devils",
    tagline: "Scenic Escape",
    description:
      "A quiet mountain community at 4,000+ feet elevation with stunning views, hiking access, and proximity to Grandfather Mountain and Hawksbill.",
    highlight: "4,000+ feet elevation",
    image: "/images/hiking-trail.jpg",
    imageAlt: "Hiking trail through mountain forest",
  },
];
