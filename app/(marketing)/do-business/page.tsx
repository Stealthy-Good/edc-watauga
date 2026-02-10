import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/ui/cta-banner";

export const metadata: Metadata = {
  title: "Do Business",
  description:
    "Explore business opportunities in Watauga County. Available sites, workforce data, incentives, and resources for relocating or expanding your business.",
};

export default function DoBusinessPage() {
  return (
    <>
      <PageHero
        badge="Do Business"
        title="Grow Your Business in the High Country"
        subtitle="Access educated talent, outdoor industry expertise, and a community that values both entrepreneurship and quality of life."
        backgroundImage="/images/business-meeting.jpg"
        backgroundAlt="Professional working on laptop in office setting"
      />

      {/* Available Sites */}
      <section id="available-sites" className="py-20">
        <Container>
          <SectionHeading
            badge="Available Properties"
            title="Available Sites & Buildings"
            subtitle="Find the perfect location for your business in Watauga County."
          />
          <div className="rounded-dashboard border border-border-light bg-surface-muted p-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-text-primary">Property Search Coming Soon</h3>
            <p className="mt-2 text-sm text-text-secondary">
              Interactive property search with GIS-powered site selection tools, Opportunity Zone maps, and shovel-ready sites.
            </p>
          </div>
        </Container>
      </section>

      {/* Workforce & Talent */}
      <section id="workforce" className="bg-surface-muted py-20">
        <Container>
          <SectionHeading
            badge="Workforce"
            title="Workforce & Talent Pipeline"
            subtitle="Appalachian State University produces 4,000+ graduates annually, feeding a skilled, educated workforce into the local economy."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workforceCards.map((card) => (
              <Card key={card.title}>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-card bg-sky-custom-light text-sky-custom">
                  {card.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary">{card.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{card.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Incentives */}
      <section id="incentives" className="py-20">
        <Container>
          <SectionHeading
            badge="Incentives"
            title="Incentives & Business Support"
            subtitle="Watauga County and the State of North Carolina offer a range of incentives to help businesses start, relocate, and expand."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {incentiveCategories.map((category) => (
              <Card key={category.title} className="p-8">
                <h3 className="font-display text-lg font-bold text-text-primary">{category.title}</h3>
                <ul className="mt-4 space-y-3">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Ready to Explore Business Opportunities?"
        description="Our economic development team is here to help. Let's discuss how Watauga County can work for your business."
        primaryAction={{ label: "Contact Our Team", href: "/contact" }}
        secondaryAction={{ label: "View Workforce Data", href: "/data-center" }}
      />
    </>
  );
}

const workforceCards = [
  {
    title: "App State Partnership",
    description: "20,000+ students across programs in technology, business, education, and sustainable development. Internship and co-op programs connect students directly with local businesses.",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
  },
  {
    title: "STABLE Workplaces",
    description: "A regional training program helping employers create stable, supportive workplaces that attract and retain talent. Access to training resources and workforce development tools.",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>,
  },
  {
    title: "Remote Worker Appeal",
    description: "High-speed broadband, co-working spaces, and an unbeatable quality of life make Watauga County ideal for remote workers and distributed teams.",
    icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" /></svg>,
  },
];

const incentiveCategories = [
  {
    title: "County & State Incentives",
    items: [
      "North Carolina Job Development Investment Grant (JDIG)",
      "One North Carolina Fund grants",
      "Opportunity Zone tax benefits",
      "County property tax incentives for qualifying businesses",
      "Infrastructure development assistance",
    ],
  },
  {
    title: "Small Business Resources",
    items: [
      "Small Business Center at Caldwell Community College",
      "SCORE mentoring (free business mentors)",
      "Entrepreneurship programs through App State",
      "Boone Area Chamber of Commerce resources",
      "Local networking events and business mixers",
    ],
  },
];
