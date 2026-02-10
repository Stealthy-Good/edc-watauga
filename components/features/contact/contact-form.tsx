"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactFormSchema, interestLabels } from "@/types/contact";
import type { ContactFormData } from "@/types/contact";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data: Record<string, unknown> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    const parsed = ContactFormSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field && typeof field === "string") {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-dashboard bg-success-light p-8 text-center" role="status" aria-live="polite">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-bold text-text-primary">Message Sent!</h3>
        <p className="mt-2 text-sm text-text-secondary">
          Thank you for your interest in Watauga County. Our team will respond within 1-2 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="honeypot"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required error={errors.name} placeholder="Your full name" />
        <Field label="Email" name="email" type="email" required error={errors.email} placeholder="you@example.com" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" error={errors.phone} placeholder="(828) 555-1234" />
        <Field label="Organization" name="organization" error={errors.organization} placeholder="Company name" />
      </div>

      <div>
        <label htmlFor="interest" className="mb-1.5 block text-sm font-medium text-text-primary">
          I&apos;m interested in... <span className="text-error">*</span>
        </label>
        <select
          id="interest"
          name="interest"
          required
          className="w-full rounded-card border border-border-default bg-surface-muted px-4 py-3 text-sm text-text-primary outline-none transition-all duration-fast focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-light"
        >
          <option value="">Select an option</option>
          {Object.entries(interestLabels).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
        {errors.interest && <p className="mt-1 text-xs text-error">{errors.interest}</p>}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text-primary">
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="w-full rounded-card border border-border-default bg-surface-muted px-4 py-3 text-sm text-text-primary outline-none transition-all duration-fast focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-light resize-y"
          placeholder="Tell us about your interest in Watauga County..."
        />
        {errors.message && <p className="mt-1 text-xs text-error">{errors.message}</p>}
      </div>

      {errorMessage && (
        <div className="rounded-card bg-error-light p-4 text-sm text-error" role="alert" aria-live="assertive">{errorMessage}</div>
      )}

      <Button type="submit" variant="accent" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-text-primary">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-card border border-border-default bg-surface-muted px-4 py-3 text-sm text-text-primary outline-none transition-all duration-fast focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary-light"
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
