import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

export function MapPlaceholder() {
  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          badge="Discover the Region"
          title="Explore Watauga County"
          subtitle="From the university town of Boone to the ski slopes of Sugar Mountain, discover what each community has to offer."
        />
        {/* TODO: Replace with interactive Mapbox/Google Maps component */}
        <div className="relative overflow-hidden rounded-dashboard border border-border-light bg-gradient-to-br from-primary/5 via-sky-custom/5 to-accent/5">
          <div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-primary">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
            </div>
            <h3 className="font-display text-xl font-bold text-text-primary">
              Interactive Map Coming Soon
            </h3>
            <p className="mt-2 max-w-md text-sm text-text-secondary">
              Explore Boone, Blowing Rock, Valle Crucis, Sugar Mountain, and Seven Devils.
              Toggle trails, breweries, tech companies, parks, and more.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {["Boone", "Blowing Rock", "Valle Crucis", "Sugar Mountain", "Seven Devils"].map(
                (town) => (
                  <span
                    key={town}
                    className="rounded-full bg-primary-light px-4 py-1.5 text-sm font-medium text-primary"
                  >
                    {town}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
