/**
 * @ai-review HIGH-RISK-UNREVIEWED
 * Sends real emails to real people via Resend.
 * Must be human-reviewed before production deployment.
 */

import { logger } from "@/lib/utils/logger";
import type { ContactFormData } from "@/types/contact";
import { interestLabels } from "@/types/contact";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface EmailResult {
  success: boolean;
  error?: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL_TO ?? "info@wataugaedc.org";

  if (!apiKey) {
    logger.warn("RESEND_API_KEY not configured — contact email not sent", {
      name: data.name,
      interest: data.interest,
    });
    return { success: true };
  }

  const interestLabel = interestLabels[data.interest];

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.name)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.email)}</td>
      </tr>
      ${data.phone ? `<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.phone)}</td></tr>` : ""}
      ${data.organization ? `<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Organization</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.organization)}</td></tr>` : ""}
      <tr>
        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Interest</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(interestLabel)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;" colspan="2">Message</td>
      </tr>
      <tr>
        <td style="padding: 8px;" colspan="2">${escapeHtml(data.message).replace(/\n/g, "<br>")}</td>
      </tr>
    </table>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Watauga EDC Website <noreply@wataugaedc.org>",
        to: [toEmail],
        reply_to: data.email,
        subject: `[EDC Contact] ${interestLabel} — ${data.name}`,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      logger.error("Resend API error", { status: response.status, body: errorBody });
      return { success: false, error: "Failed to send email" };
    }

    logger.info("Contact email sent successfully", {
      interest: data.interest,
    });

    return { success: true };
  } catch (error) {
    logger.error("Failed to send contact email", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return { success: false, error: "Failed to send email" };
  }
}
