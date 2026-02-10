import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/lib/content/testimonials";

export function TestimonialsSection() {
  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <SectionHeading
          badge="Why Watauga"
          title="Why Businesses Choose the High Country"
          subtitle="What local business leaders say about growing their companies in Watauga County."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.attribution} hover={false} className="p-8">
              <svg
                className="mb-4 h-8 w-8 text-accent/30"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
              </svg>
              <p className="text-sm leading-relaxed text-text-secondary">
                {testimonial.quote}
              </p>
              <div className="mt-6 border-t border-border-light pt-4">
                <p className="font-display text-sm font-bold text-text-primary">
                  — {testimonial.attribution}
                </p>
                <p className="text-xs text-text-muted">
                  {testimonial.industry}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
