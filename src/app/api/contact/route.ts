import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validation
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid payload parameters.", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = validation.data;

    // 2. Initialize Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "hp22022005@gmail.com";

    if (!resendApiKey) {
      console.warn("RESEND_API_KEY environment variable is not configured.");
      // In development, fallback to mock logs so the form still functions for review
      if (process.env.NODE_ENV === "development") {
        console.log(`[MOCK EMAIL DISPATCH] To: ${receiverEmail} | Subject: ${subject} | From: ${name} <${email}>`);
        console.log(`[MESSAGE CONTENT]: ${message}`);
        return NextResponse.json({ success: true, message: "Mock message accepted in development mode." });
      }
      return NextResponse.json(
        { error: "Mail gateway configuration mismatch. Please try again later." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    // 3. Dispatch Email
    const emailResult = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: receiverEmail,
      subject: `[Portfolio Connection] ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; border: 1px solid #1e1e2f; padding: 20px; border-radius: 8px; background-color: #0c0c12; color: #f3f4f6;">
          <h2 style="color: #6366f1; border-bottom: 1px solid #1e1e2f; padding-bottom: 10px;">New Portfolio Contact Payload</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; background-color: #050508; border-radius: 4px; border: 1px dashed #1e1e2f;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error("Resend API Error:", emailResult.error);
      return NextResponse.json(
        { error: emailResult.error.message || "Failed to dispatch mail payload." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: emailResult.data?.id });
  } catch (error) {
    console.error("Unhandled contact API route error:", error);
    return NextResponse.json(
      { error: "Internal server registry error processing contact payload." },
      { status: 500 }
    );
  }
}
