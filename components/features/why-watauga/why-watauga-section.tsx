import Image from "next/image";
import { Container } from "@/components/ui/container";

export function WhyWataugaSection() {
  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Photo */}
          <div className="relative overflow-hidden rounded-card">
            <Image
              src="/images/couple-celebrating-bridge.jpg"
              alt="Couple enjoying mountain views from a scenic overlook in the High Country"
              width={720}
              height={480}
              className="h-80 w-full object-cover lg:h-[28rem]"
            />
          </div>

          {/* Content */}
          <div>
            <span className="mb-4 inline-block border-l-4 border-accent pl-3 text-sm font-semibold uppercase tracking-wider text-accent">
              Why Watauga County
            </span>
            <h2 className="font-heading text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
              A place where you can build a life,{" "}
              <span className="text-primary">not just a career.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Nestled in the Blue Ridge Mountains of North Carolina, Watauga County offers
              something rare: a thriving economy surrounded by world-class natural beauty.
              Home to Appalachian State University, a growing tech and outdoor industry
              ecosystem, and communities that welcome newcomers with open arms.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <p className="font-display text-2xl font-bold text-primary">56,000+</p>
                <p className="text-sm text-text-secondary">County residents</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary">20,000+</p>
                <p className="text-sm text-text-secondary">University students</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary">100+</p>
                <p className="text-sm text-text-secondary">Miles of trails</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-primary">#1</p>
                <p className="text-sm text-text-secondary">NC mountain county</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
