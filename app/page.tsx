import { HeroSection } from "@/components/features/hero/hero-section";
import { QuickAccessTiles } from "@/components/features/quick-access/quick-access-tiles";
import { StatsCounterSection } from "@/components/features/stats/stats-counter-section";
import { TargetIndustriesSection } from "@/components/features/industries/target-industries-section";
import { CommunityShowcase } from "@/components/features/map/map-placeholder";
import { TestimonialsSection } from "@/components/features/testimonials/testimonials-section";
import { WhyWataugaSection } from "@/components/features/why-watauga/why-watauga-section";
import { CTABanner } from "@/components/ui/cta-banner";
import { AnimateOnScroll } from "@/components/ui/animate-on-scroll";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnimateOnScroll>
        <StatsCounterSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <WhyWataugaSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <QuickAccessTiles />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <TargetIndustriesSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <TestimonialsSection />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CommunityShowcase />
      </AnimateOnScroll>
      <AnimateOnScroll>
        <CTABanner
          title="Ready to Discover Watauga County?"
          description="Whether you're looking to grow your business, find your next home, or plan an unforgettable mountain adventure — we're here to help."
          primaryAction={{ label: "Contact Us", href: "/contact" }}
          secondaryAction={{ label: "Explore Resources", href: "/data-center" }}
        />
      </AnimateOnScroll>
    </>
  );
}
