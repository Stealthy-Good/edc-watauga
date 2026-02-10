import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/ui/cta-banner";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export const metadata: Metadata = {
  title: "Live Here",
  description:
    "Discover what it's like to live in Watauga County. Housing, quality of life, schools, healthcare, and everything you need to relocate to the NC mountains.",
  alternates: { canonical: "/live-here" },
};

export default function LiveHerePage() {
  return (
    <>
      <PageHero
        badge="Live Here"
        title="Make the Mountains Your Home"
        subtitle="Live where every day feels like vacation. Mountain adventure, university culture, and modern amenities in a community that welcomes newcomers."
        backgroundImage="/images/couple-dog-field.jpg"
        backgroundAlt="Couple walking with their dog through a golden field at sunset"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Live Here" }]}
      />

      {/* Relocate */}
      <AnimateOnScroll>
        <section id="relocate" className="py-20">
          <Container>
            <SectionHeading
              badge="Relocate"
              title="Relocate to Watauga County"
              subtitle="Everything you need to know about making the move to the High Country."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relocateCards.map((card) => (
                <Card key={card.title}>
                  <h3 className="font-display text-lg font-bold text-text-primary">{card.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{card.description}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      {/* Quality of Life */}
      <AnimateOnScroll>
        <section id="quality-of-life" className="bg-surface-muted py-20">
          <Container>
            <SectionHeading
              badge="Quality of Life"
              title="Why People Love Living Here"
              subtitle="Clean mountain air, outdoor recreation at your doorstep, and a tight-knit community with modern amenities."
            />
            <div className="mb-10 overflow-hidden rounded-card">
              <Image
                src="/images/couple-laughing-outdoors.jpg"
                alt="Couple enjoying an afternoon outdoors in the mountains"
                width={1200}
                height={400}
                className="h-60 w-full object-cover md:h-72"
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {qualityOfLifeItems.map((item) => (
                <div key={item.title} className="flex gap-5">
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
      </AnimateOnScroll>

      {/* Mountain Living Guide */}
      <AnimateOnScroll>
        <section id="mountain-living" className="py-20">
          <Container>
            <SectionHeading
              badge="Mountain Living"
              title="What to Expect"
              subtitle="A practical guide to living at 4,800 feet in the Blue Ridge Mountains."
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {mountainLivingTips.map((tip) => (
                <Card key={tip.title} className="p-8">
                  <h3 className="font-display text-lg font-bold text-text-primary">{tip.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{tip.description}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      <CTABanner
        title="Ready to Make the Move?"
        description="Our team can connect you with real estate partners, relocation resources, and everything you need to call Watauga County home."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Explore the Region", href: "/visit" }}
      />
    </>
  );
}

const relocateCards = [
  {
    title: "Housing Market",
    description: "A range of options from downtown Boone condos to mountain homesteads. The market offers variety across price points with growing new construction.",
  },
  {
    title: "Neighborhoods",
    description: "Boone offers university-town energy, Blowing Rock provides resort-style living, Valle Crucis delivers rural charm, and Banner Elk brings ski-country appeal.",
  },
  {
    title: "Cost of Living",
    description: "Lower than major metros with the lifestyle advantages of a mountain community. No city property tax in unincorporated areas.",
  },
];

const qualityOfLifeItems = [
  {
    title: "Education",
    description: "Watauga County Schools are consistently ranked among NC's best. App State provides university-level cultural and educational opportunities for all ages.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>,
  },
  {
    title: "Healthcare",
    description: "Appalachian Regional Healthcare System provides comprehensive medical care including a hospital, specialty clinics, and urgent care facilities.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>,
  },
  {
    title: "Outdoor Recreation",
    description: "100+ miles of trails, world-class skiing, mountain biking at Rocky Knob, fly fishing, rock climbing, and paddling — all within minutes of home.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 19l6-9 4 5 4-7 4 11H3z" /></svg>,
  },
  {
    title: "Arts & Culture",
    description: "App State's Schaefer Center, the Appalachian Theatre, Jones House Community Center, local galleries, and a thriving local music scene.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg>,
  },
];

const mountainLivingTips = [
  {
    title: "Four Distinct Seasons",
    description: "Stunning fall foliage, snowy winters perfect for skiing, wildflower springs, and cool summers when the rest of NC swelters. Average summer highs in the 70s.",
  },
  {
    title: "Elevation & Weather",
    description: "At 3,300–4,800 feet, expect cooler temperatures year-round. Winter brings snow — embrace it with skiing at App Ski Mountain and Sugar Mountain.",
  },
  {
    title: "Community Values",
    description: "Sustainability, local business support, and environmental stewardship are core values. Strong farmers markets, local food scene, and community events year-round.",
  },
  {
    title: "Getting Around",
    description: "Within 2 hours of Charlotte, Greensboro, and Asheville. Charlotte Douglas Airport (CLT) is about 2 hours away. Regional airports in nearby Hickory and Tri-Cities.",
  },
];
