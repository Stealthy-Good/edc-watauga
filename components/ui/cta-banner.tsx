import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface CTABannerProps {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}

export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CTABannerProps) {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-dark py-16">
      <Container className="text-center">
        <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{description}</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button variant="accent" size="lg" href={primaryAction.href}>
            {primaryAction.label}
          </Button>
          {secondaryAction && (
            <Button
              variant="outline"
              size="lg"
              href={secondaryAction.href}
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
