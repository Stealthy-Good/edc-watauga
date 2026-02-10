export interface Testimonial {
  quote: string;
  attribution: string;
  industry: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Moving our company to Boone gave us direct access to App State graduates, proximity to the outdoor spaces that inspire our products, and a business community that genuinely supports growth.",
    attribution: "Outdoor Industry CEO",
    industry: "Outdoor Recreation",
  },
  {
    quote:
      "As a distributed tech team, we needed a place where talent actually wants to live. The broadband infrastructure and quality of life here have made recruiting easier than it ever was in a metro area.",
    attribution: "Tech Startup Founder",
    industry: "Technology",
  },
  {
    quote:
      "The EDC connected us with site selection resources, workforce training programs, and local partnerships. Three years in, we've doubled our team and couldn't imagine being anywhere else.",
    attribution: "Manufacturing Operations Director",
    industry: "Advanced Manufacturing",
  },
];
