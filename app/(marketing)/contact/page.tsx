import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/features/contact/contact-form";
import { siteConfig } from "@/lib/content/site-config";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Watauga County Economic Development Commission. Business inquiries, relocation questions, and partnership opportunities.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Contact"
        title="Let's Talk"
        subtitle="Whether you're exploring business opportunities, planning a move, or just want to learn more — we'd love to hear from you."
        backgroundImage="/images/downtown-boone.jpg"
        backgroundAlt="Bustling mountain town main street with American flag"
      />

      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Contact form */}
            <div className="lg:col-span-3">
              <h2 className="font-display text-2xl font-bold text-text-primary">Send Us a Message</h2>
              <p className="mt-2 mb-8 text-sm text-text-secondary">
                Fill out the form below and our team will respond within 1-2 business days.
              </p>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <div className="rounded-dashboard bg-surface-muted p-8">
                <h3 className="font-display text-lg font-bold text-text-primary">Contact Information</h3>

                <div className="mt-6 space-y-5">
                  <ContactDetail
                    icon={<LocationIcon />}
                    label="Address"
                    value={`${siteConfig.contact.address}\n${siteConfig.contact.city}, ${siteConfig.contact.state} ${siteConfig.contact.zip}`}
                  />
                  <ContactDetail
                    icon={<PhoneIcon />}
                    label="Phone"
                    value={siteConfig.contact.phone}
                    href={`tel:${siteConfig.contact.phone}`}
                  />
                  <ContactDetail
                    icon={<EmailIcon />}
                    label="Email"
                    value={siteConfig.contact.email}
                    href={`mailto:${siteConfig.contact.email}`}
                  />
                </div>

                <div className="mt-8 border-t border-border-light pt-6">
                  <h4 className="text-sm font-semibold text-text-primary">Office Hours</h4>
                  <div className="mt-3 space-y-1 text-sm text-text-secondary">
                    <p>Monday - Friday: 8:30 AM - 5:00 PM</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="mt-8 overflow-hidden rounded-card bg-primary-light">
                  <div className="flex h-48 items-center justify-center text-center">
                    <div>
                      <svg className="mx-auto h-8 w-8 text-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <p className="mt-2 text-xs text-primary/60">Map Coming Soon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card bg-primary-light text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs font-medium text-text-muted">{label}</p>
        {href ? (
          <a href={href} className="text-sm text-text-primary hover:text-primary transition-colors">
            {value}
          </a>
        ) : (
          <p className="whitespace-pre-line text-sm text-text-primary">{value}</p>
        )}
      </div>
    </div>
  );
}

function LocationIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}
