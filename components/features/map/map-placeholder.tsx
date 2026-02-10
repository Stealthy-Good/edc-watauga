import Image from "next/image";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { communities } from "@/lib/content/communities";

export function CommunityShowcase() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          badge="Discover the Region"
          title="Explore Watauga County"
          subtitle="From the university town of Boone to the ski slopes of Sugar Mountain, discover what each community has to offer."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <div
              key={community.name}
              className="group overflow-hidden rounded-card border border-border-light bg-white transition-all duration-fast hover:-translate-y-0.5 hover:border-primary hover:shadow-medium"
            >
              {community.image && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={community.image}
                    alt={community.imageAlt ?? community.name}
                    fill
                    className="object-cover transition-transform duration-normal group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="mb-2 inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-medium text-primary">
                  {community.tagline}
                </div>
                <h3 className="font-display text-xl font-bold text-text-primary">
                  {community.name}
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  {community.description}
                </p>
                <p className="mt-4 text-sm font-medium text-primary">
                  {community.highlight}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
