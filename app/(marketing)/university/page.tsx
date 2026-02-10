import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/ui/cta-banner";

export const metadata: Metadata = {
  title: "University Connection",
  description:
    "Appalachian State University's partnership with Watauga County economic development. Workforce pipeline, research, innovation, and community impact.",
};

export default function UniversityPage() {
  return (
    <>
      <PageHero
        badge="University Connection"
        title="Appalachian State University"
        subtitle="The only university town in the NC mountains — 20,000+ students, cutting-edge research, and a workforce pipeline that drives the regional economy."
        backgroundImage="/images/app-state-campus.jpg"
        backgroundAlt="University graduates throwing caps at sunset"
      />

      {/* Economic Impact */}
      <section className="py-20">
        <Container>
          <SectionHeading
            badge="Impact"
            title="University Economic Impact"
            subtitle="Appalachian State University is the largest employer in Watauga County and a cornerstone of the regional economy."
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {impactStats.map((stat) => (
              <Card key={stat.label} hover={false} className="text-center p-6">
                <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-text-secondary">{stat.label}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Academic Programs */}
      <section className="bg-surface-muted py-20">
        <Container>
          <SectionHeading
            badge="Academics"
            title="Programs Driving Industry"
            subtitle="Academic programs aligned with Watauga County's target industries, producing job-ready graduates every year."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Card key={program.title} className="p-6">
                <h3 className="font-display text-lg font-bold text-text-primary">{program.title}</h3>
                <p className="mt-2 text-sm text-text-secondary">{program.description}</p>
                <p className="mt-3 text-xs font-medium text-accent">{program.college}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Collaboration */}
      <section className="py-20">
        <Container>
          <SectionHeading
            badge="Partnership"
            title="Collaborate with App State"
            subtitle="Ways your business can connect with university talent, research, and resources."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {collaborationTypes.map((item) => (
              <div key={item.title} className="flex gap-5 rounded-card border border-border-light bg-white p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-primary-light text-primary">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-text-primary">{item.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABanner
        title="Connect with App State"
        description="Interested in partnering with Appalachian State University? Our team can facilitate introductions to the right departments and programs."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "View Workforce Data", href: "/data-center" }}
      />
    </>
  );
}

const impactStats = [
  { value: "20,000+", label: "Enrolled Students" },
  { value: "4,000+", label: "Annual Graduates" },
  { value: "$1B+", label: "Regional Economic Impact" },
  { value: "6,000+", label: "University Employees" },
];

const programs = [
  {
    title: "Computer Science & IT",
    description: "Programs in software engineering, cybersecurity, data science, and IT management producing tech talent for the region.",
    college: "College of Arts & Sciences",
  },
  {
    title: "Sustainable Technology",
    description: "Nationally recognized programs in sustainable energy, building science, and environmental technology.",
    college: "College of Fine & Applied Arts",
  },
  {
    title: "Business & Entrepreneurship",
    description: "Walker College of Business programs in finance, marketing, supply chain, and the Peacock Entrepreneurship Program.",
    college: "Walker College of Business",
  },
  {
    title: "Education",
    description: "One of NC's top teacher education programs, producing educators for schools across the region and state.",
    college: "Reich College of Education",
  },
  {
    title: "Health Sciences",
    description: "Programs in nursing, social work, nutrition, exercise science, and recreation management.",
    college: "Beaver College of Health Sciences",
  },
  {
    title: "Music Industry Studies",
    description: "Unique programs in music business, recording arts, and entertainment management attracting creative talent.",
    college: "Hayes School of Music",
  },
];

const collaborationTypes = [
  {
    title: "Internship & Co-op Programs",
    description: "Connect with talented students for internships, co-ops, and part-time positions. App State's career services facilitates thousands of student placements annually.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" /></svg>,
  },
  {
    title: "Research Partnerships",
    description: "Access university research capabilities, labs, and faculty expertise. Technology transfer opportunities and sponsored research agreements available.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
  },
  {
    title: "Student Entrepreneurship",
    description: "The Peacock Entrepreneurship Program, business incubators, and startup competitions create a pipeline of new business ideas and founders.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
  },
  {
    title: "Continuing Education",
    description: "Professional development, executive education, and workforce training programs customized for local businesses and industry needs.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>,
  },
];
