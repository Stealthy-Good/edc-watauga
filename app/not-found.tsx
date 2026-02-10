import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface-muted pt-20">
      <Container className="text-center">
        <p className="font-display text-8xl font-bold text-primary/20">404</p>
        <h1 className="mt-4 font-display text-3xl font-bold text-text-primary">Page Not Found</h1>
        <p className="mt-3 text-text-secondary">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/">Back to Home</Button>
          <Button variant="secondary" href="/contact">Contact Us</Button>
        </div>
      </Container>
    </div>
  );
}
