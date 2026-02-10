export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
}

// TODO: Replace with real testimonials from local businesses
export const testimonials: Testimonial[] = [
  {
    quote:
      "Moving our outdoor gear company to Boone was the best decision we ever made. The talent pipeline from App State, proximity to the trails we design for, and the supportive business community made the transition seamless.",
    name: "Sarah Mitchell",
    title: "CEO",
    company: "High Country Outfitters",
  },
  {
    quote:
      "As a remote tech company, we were looking for a place where our team could thrive. Watauga County's broadband infrastructure and quality of life have helped us recruit talent that wouldn't come to a big city.",
    name: "David Chen",
    title: "Founder",
    company: "Summit Digital Solutions",
  },
  {
    quote:
      "The EDC connected us with every resource we needed — from site selection to workforce training. Three years in, we've doubled our team and couldn't imagine being anywhere else.",
    name: "Maria Rodriguez",
    title: "Operations Director",
    company: "Blue Ridge Manufacturing",
  },
];
