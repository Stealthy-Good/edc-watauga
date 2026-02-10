import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/ui/cta-banner";
import { Button } from "@/components/ui/button";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export const metadata: Metadata = {
  title: "Data Center",
  description:
    "Watauga County community profiles, economic data, workforce statistics, industry reports, and location advantages for business decision-making.",
  alternates: { canonical: "/data-center" },
};

export default function DataCenterPage() {
  return (
    <>
      <PageHero
        badge="Data Center"
        title="Data & Community Profiles"
        subtitle="The facts, figures, and reports you need to make informed decisions about Watauga County."
        backgroundImage="/images/mountain-vista.jpg"
        backgroundAlt="Curved road along Blue Ridge Parkway with mountain views"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Data Center" }]}
      />

      {/* Community Profile */}
      <AnimateOnScroll>
        <section id="community-profile" className="py-20">
          <Container>
            <SectionHeading
              badge="Snapshot"
              title="Community Profile"
              subtitle="Key statistics and demographics for Watauga County, North Carolina."
            />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {communityStats.map((stat) => (
                <Card key={stat.label} hover={false} className="text-center p-6">
                  <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      {/* Location Advantages */}
      <AnimateOnScroll>
        <section id="location" className="bg-surface-muted py-20">
          <Container>
            <SectionHeading
              badge="Strategic Location"
              title="Location Advantages"
              subtitle="Accessible yet elevated — Watauga County offers proximity to major markets with mountain quality of life."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="p-8">
                <h3 className="font-display text-lg font-bold text-text-primary">Proximity to Major Markets</h3>
                <ul className="mt-4 space-y-3">
                  {proximityData.map((item) => (
                    <li key={item.city} className="flex items-center justify-between border-b border-border-light pb-2 last:border-0">
                      <span className="text-sm text-text-primary">{item.city}</span>
                      <span className="text-sm font-medium text-primary">{item.distance}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-8">
                <h3 className="font-display text-lg font-bold text-text-primary">Infrastructure</h3>
                <ul className="mt-4 space-y-3">
                  {infrastructure.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-sm text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      {/* Reports */}
      <AnimateOnScroll>
        <section id="reports" className="py-20">
          <Container>
            <SectionHeading
              badge="Reports"
              title="Industry Reports & Data"
              subtitle="Download reports and explore economic indicators for Watauga County."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <Card key={report.title} className="p-6">
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-card bg-sky-custom-light text-sky-custom">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base font-bold text-text-primary">{report.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{report.description}</p>
                  <div className="mt-3">
                    <Button variant="secondary" size="sm" href="/contact">
                      Request Report
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      <CTABanner
        title="Need Custom Data?"
        description="Our economic development team can provide tailored data packages, site-specific reports, and personalized assistance for your project."
        primaryAction={{ label: "Request Data", href: "/contact" }}
      />
    </>
  );
}

const communityStats = [
  { value: "56,000+", label: "County Population" },
  { value: "20,000+", label: "University Students" },
  { value: "4,800 ft", label: "Peak Elevation" },
  { value: "95%", label: "Air Quality Rating" },
  { value: "$52K", label: "Median Household Income" },
  { value: "35%", label: "Bachelor's Degree+" },
  { value: "3.2%", label: "Unemployment Rate" },
  { value: "#1", label: "NC Mountain County" },
];

const proximityData = [
  { city: "Charlotte, NC (CLT Airport)", distance: "~2 hours" },
  { city: "Greensboro / Winston-Salem, NC", distance: "~1.5 hours" },
  { city: "Asheville, NC", distance: "~1.5 hours" },
  { city: "Tri-Cities, TN/VA", distance: "~1.5 hours" },
  { city: "Raleigh-Durham, NC (RDU)", distance: "~3.5 hours" },
  { city: "Atlanta, GA (ATL Airport)", distance: "~4.5 hours" },
];

const infrastructure = [
  "High-speed broadband via SkyLine/SkyBest and Charter",
  "Natural gas service available in Boone",
  "Reliable electric service via Blue Ridge Energy",
  "Municipal water and sewer in Boone town limits",
  "US-321 and US-421 highway access",
  "Watauga Medical Center (acute care hospital)",
];

const reports = [
  {
    title: "Annual Economic Snapshot",
    description: "Key economic indicators, employment data, and business climate overview.",
  },
  {
    title: "Tourism Impact Study",
    description: "Visitor spending, tourism employment, and economic impact of the hospitality industry.",
  },
  {
    title: "Workforce Analysis",
    description: "Labor market statistics, educational attainment, and workforce development programs.",
  },
  {
    title: "Real Estate Trends",
    description: "Commercial and residential real estate market overview, vacancy rates, and development pipeline.",
  },
  {
    title: "Tech Sector Growth",
    description: "Technology industry growth, remote worker trends, and digital infrastructure development.",
  },
  {
    title: "Quality of Life Index",
    description: "Healthcare access, education rankings, environmental quality, and community amenities.",
  },
];
