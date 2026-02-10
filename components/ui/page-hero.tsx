import Image from "next/image";
import { Container } from "@/components/ui/container";

interface PageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

export function PageHero({ title, subtitle, badge, backgroundImage, backgroundAlt }: PageHeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-primary-dark via-primary to-primary/90 pt-28 pb-16">
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={backgroundAlt ?? ""}
          fill
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
      <Container className="relative text-center">
        {badge && (
          <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-white/90">
            {badge}
          </span>
        )}
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{subtitle}</p>
      </Container>
    </section>
  );
}
