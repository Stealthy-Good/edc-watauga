import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { industries } from "@/lib/content/industries";
import { IndustryCard } from "./industry-card";

export function TargetIndustriesSection() {
  return (
    <section className="bg-surface-muted py-20">
      <Container>
        <SectionHeading
          badge="Target Industries"
          title="Industries That Thrive Here"
          subtitle="Watauga County's unique combination of natural assets, university talent, and quality of life supports diverse industries."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => (
            <IndustryCard key={industry.id} industry={industry} />
          ))}
        </div>
      </Container>
    </section>
  );
}
