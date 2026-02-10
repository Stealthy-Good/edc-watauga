import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.string().url().default("https://wataugaedc.org"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Watauga County EDC"),
});

const serverEnvSchema = clientEnvSchema.extend({
  RESEND_API_KEY: z.string().optional(),
  CONTACT_EMAIL_TO: z.string().email().default("info@wataugaedc.org"),
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;

export function getClientEnv(): ClientEnv {
  return clientEnvSchema.parse({
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  });
}

export function getServerEnv(): ServerEnv {
  return serverEnvSchema.parse({
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    CONTACT_EMAIL_TO: process.env.CONTACT_EMAIL_TO,
    LOG_LEVEL: process.env.LOG_LEVEL,
  });
}
