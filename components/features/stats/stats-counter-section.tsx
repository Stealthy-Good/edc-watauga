import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { stats } from "@/lib/content/stats";
import { AnimatedNumber } from "./animated-number";

export function StatsCounterSection() {
  return (
    <section className="bg-primary py-20">
      <Container>
        <SectionHeading
          title="Watauga County By the Numbers"
          subtitle="A snapshot of what makes the High Country special."
          className="[&_h2]:text-white [&_p]:text-white/80"
        />
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-accent sm:text-4xl">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 text-sm font-medium text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
