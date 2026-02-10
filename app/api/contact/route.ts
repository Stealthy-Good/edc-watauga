import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/types/contact";
import { sendContactEmail } from "@/lib/api/email";
import { logger } from "@/lib/utils/logger";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const parsed = ContactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    // Check honeypot field for spam
    if (parsed.data.honeypot) {
      logger.info("Honeypot triggered — likely spam", { name: parsed.data.name });
      // Return success to not reveal the honeypot
      return NextResponse.json({ success: true });
    }

    const result = await sendContactEmail(parsed.data);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error ?? "Failed to send message" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    logger.error("Contact form handler error");
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
