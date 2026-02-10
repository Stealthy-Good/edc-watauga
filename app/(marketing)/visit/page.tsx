import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTABanner } from "@/components/ui/cta-banner";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export const metadata: Metadata = {
  title: "Visit",
  description:
    "Plan your visit to Watauga County. Outdoor adventure, downtown Boone, breweries, hiking trails, skiing, and the best of the Blue Ridge Mountains.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visit" }]} />
      <PageHero
        badge="Visit"
        title="Experience the High Country"
        subtitle="From Blue Ridge trails to downtown Boone, discover why visitors keep coming back to the mountains."
        backgroundImage="/images/mountain-activity.jpg"
        backgroundAlt="Couple enjoying outdoor activities in the mountains"
      />

      {/* Outdoor Adventure */}
      <AnimateOnScroll>
        <section id="outdoor-adventure" className="py-20">
          <Container>
            <SectionHeading
              badge="Adventure Awaits"
              title="Outdoor Adventure"
              subtitle="Four seasons of outdoor recreation in one of the most beautiful settings in the eastern United States."
            />
            <div className="mb-10 overflow-hidden rounded-card">
              <Image
                src="/images/mountain-biking.jpg"
                alt="Mountain biking on singletrack trails in the Blue Ridge Mountains"
                width={1200}
                height={480}
                className="h-60 w-full object-cover md:h-80"
                priority={false}
              />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {adventures.map((adventure) => (
                <Card key={adventure.title} className="p-8">
                  <div className="mb-4 text-3xl">{adventure.emoji}</div>
                  <h3 className="font-display text-lg font-bold text-text-primary">{adventure.title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{adventure.description}</p>
                </Card>
              ))}
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      {/* Downtown Boone */}
      <AnimateOnScroll>
        <section id="downtown-boone" className="bg-surface-muted py-20">
          <Container>
            <SectionHeading
              badge="Downtown"
              title="Downtown Boone"
              subtitle="A vibrant college town with independent shops, farm-to-table restaurants, live music, and Appalachian culture."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {downtownHighlights.map((item) => (
                <div key={item.title} className="flex gap-5 rounded-card bg-white p-6 shadow-soft">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-accent-light text-accent">
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

      {/* Dining */}
      <AnimateOnScroll>
        <section id="dining" className="py-20">
          <Container>
            <SectionHeading
              badge="Food & Drink"
              title="Breweries, Dining & Local Flavors"
              subtitle="From craft breweries to farm-to-table restaurants, Watauga County's food scene punches well above its weight."
            />
            <div className="rounded-dashboard border border-border-light bg-surface-warm p-8 text-center">
              <p className="text-lg font-medium text-text-primary">15+ Breweries & Distilleries</p>
              <p className="mt-2 text-sm text-text-secondary">
                Explore the High Country Brewery Trail featuring local craft breweries, cideries, and distilleries.
                Pair with farm-to-table dining featuring locally sourced Appalachian cuisine.
              </p>
            </div>
          </Container>
        </section>
      </AnimateOnScroll>

      <CTABanner
        title="Plan Your Mountain Adventure"
        description="From weekend getaways to extended stays, Watauga County has something for everyone. Contact us to start planning."
        primaryAction={{ label: "Contact Us", href: "/contact" }}
        secondaryAction={{ label: "Learn About Living Here", href: "/live-here" }}
      />
    </>
  );
}

const adventures = [
  {
    emoji: "\u26F7\uFE0F",
    title: "Skiing & Snowboarding",
    description: "App Ski Mountain and Sugar Mountain offer downhill skiing, snowboarding, and tubing from November through March.",
  },
  {
    emoji: "\uD83E\uDD7E",
    title: "Hiking & Trails",
    description: "100+ miles of trails including the Blue Ridge Parkway, Grandfather Mountain, and the Appalachian Trail access points.",
  },
  {
    emoji: "\uD83D\uDEB5",
    title: "Mountain Biking",
    description: "Rocky Knob Mountain Bike Park and surrounding trail systems offer world-class singletrack for all skill levels.",
  },
  {
    emoji: "\uD83C\uDFA3",
    title: "Fishing & Paddling",
    description: "Watauga River, New River, and mountain streams offer fly fishing, kayaking, canoeing, and tubing.",
  },
  {
    emoji: "\uD83E\uDDD7",
    title: "Rock Climbing",
    description: "Numerous climbing areas with routes for beginners to experts. Indoor climbing available at local gyms.",
  },
  {
    emoji: "\uD83C\uDF3F",
    title: "Nature & Wildlife",
    description: "Elk viewing, bird watching, wildflower hikes, and scenic drives along the Blue Ridge Parkway.",
  },
];

const downtownHighlights = [
  {
    title: "Shopping & Galleries",
    description: "Independent boutiques, outdoor gear shops, art galleries, and the historic Mast General Store in Valle Crucis.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>,
  },
  {
    title: "Live Music & Events",
    description: "Year-round live music at local venues, the Appalachian Theatre, seasonal festivals, and App State athletic events.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" /></svg>,
  },
  {
    title: "Farmers Market",
    description: "The Watauga County Farmers Market runs April through October with local produce, artisan goods, and mountain crafts.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>,
  },
  {
    title: "App State Campus",
    description: "Explore Appalachian State University's beautiful campus, attend athletic events, visit museums, and enjoy cultural performances.",
    icon: <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" /></svg>,
  },
];
