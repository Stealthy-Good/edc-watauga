import { z } from "zod";

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  interest: z.enum([
    "business-relocation",
    "business-expansion",
    "site-selection",
    "workforce-info",
    "relocating-residence",
    "visiting",
    "university-partnership",
    "other",
  ]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

export const interestLabels: Record<ContactFormData["interest"], string> = {
  "business-relocation": "Relocating a Business",
  "business-expansion": "Expanding a Business",
  "site-selection": "Site Selection",
  "workforce-info": "Workforce Information",
  "relocating-residence": "Moving to the Area",
  "visiting": "Planning a Visit",
  "university-partnership": "University Partnership",
  "other": "Other",
};
