import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/ui/cta-banner";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Watauga County Economic Development Commission. Our mission, partners, and commitment to growing the High Country's economy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <PageHero
        badge="About Us"
        title="Watauga County Economic Development Commission"
        subtitle="Fostering economic growth and opportunity in the High Country since its founding, the EDC works to attract, retain, and expand businesses in Watauga County."
        backgroundImage="/images/community-event.jpg"
        backgroundAlt="Watauga County community gathering"
      />

      {/* Mission */}
      <AnimateOnScroll>
        <section className="py-20">
          <Container>
            <SectionHeading
              badge="Our Mission"
              title="Growing the High Country's Economy"
            />
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-lg leading-relaxed text-text-secondary">
                The Watauga County Economic Development Commission is dedicated to creating a vibrant,
                diversified economy that provides quality jobs and opportunities for all residents. We work
                with businesses, educators, and community partners to leverage our unique assets —
                Appalachian State University, the Blue Ridge Mountains, and a fiercely entrepreneurial
                community — to attract investment and support local business growth.
              </p>
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      {/* What We Do */}
      <AnimateOnScroll>
        <section className="bg-surface-muted py-20">
          <Container>
            <SectionHeading
              badge="What We Do"
              title="Our Services"
              subtitle="We provide confidential, no-cost assistance to businesses exploring Watauga County."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card key={service.title}>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-card bg-primary-light text-primary">
                    {service.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {service.description}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      {/* Partners */}
      <AnimateOnScroll>
        <section className="py-20">
          <Container>
            <SectionHeading
              badge="Partners"
              title="Working Together"
              subtitle="We partner with organizations across the region to support economic development in Watauga County."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {partners.map((partner) => (
                <Card key={partner.name} hover={false} className="p-6 text-center">
                  <h3 className="font-display text-base font-bold text-text-primary">
                    {partner.name}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {partner.role}
                  </p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      <CTABanner
        title="Let's Work Together"
        description="Whether you're a business considering Watauga County or a community partner looking to collaborate, we'd love to hear from you."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Do Business Here", href: "/do-business" }}
      />
    </>
  );
}

const services = [
  {
    title: "Business Recruitment",
    description:
      "We identify and recruit businesses that align with Watauga County's strengths — outdoor industry, technology, healthcare, and education-related enterprises.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
      </svg>
    ),
  },
  {
    title: "Site Selection",
    description:
      "Confidential assistance finding the right location — available commercial properties, industrial sites, and Opportunity Zone parcels in Watauga County.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
  {
    title: "Workforce Solutions",
    description:
      "Connections to App State talent pipeline, workforce training programs, and data on the regional labor market to help you find the right people.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    title: "Incentive Navigation",
    description:
      "Guidance through state and local incentive programs including JDIG, One NC Fund grants, Opportunity Zone benefits, and county property tax incentives.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Community Data",
    description:
      "Comprehensive data packages on demographics, workforce, infrastructure, market access, and quality of life to support your decision-making.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "Business Retention",
    description:
      "Ongoing support for existing businesses through workforce training referrals, expansion assistance, and connections to local resources.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const partners = [
  {
    name: "Boone Area Chamber of Commerce",
    role: "Business networking, events, and community advocacy",
  },
  {
    name: "Appalachian State University",
    role: "Workforce pipeline, research partnerships, and student entrepreneurship",
  },
  {
    name: "Watauga County Government",
    role: "Infrastructure, permitting, and public services",
  },
  {
    name: "Town of Boone",
    role: "Municipal planning, utilities, and downtown development",
  },
  {
    name: "NC Department of Commerce",
    role: "State-level incentives, workforce programs, and trade development",
  },
  {
    name: "High Country Council of Governments",
    role: "Regional planning, economic development coordination, and grant administration",
  },
];
