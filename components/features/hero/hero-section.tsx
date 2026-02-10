import Image from "next/image";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      <Image
        src="/images/mountain-sunset-couple.jpg"
        alt="Couple standing on mountain summit at sunset overlooking Blue Ridge Mountains"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Warm gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-white/80">
          Watauga County, North Carolina
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Where Mountains Meet{" "}
          <span className="text-accent">Innovation</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 sm:text-xl">
          The High Country&apos;s modern mountain community: Outdoor adventure.
          Academic excellence. Economic opportunity.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="accent" size="lg" href="/do-business">
            Grow Your Business
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/live-here"
            className="border-white text-white hover:bg-white hover:text-primary"
          >
            Explore Living Here
          </Button>
        </div>
      </div>

    </section>
  );
}
