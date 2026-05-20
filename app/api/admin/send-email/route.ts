import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const sendSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(200).trim(),
  body: z.string().min(1).max(10000).trim(),
});

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    const parsed = sendSchema.safeParse(raw);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 },
      );
    }

    const { to, subject, body } = parsed.data;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Dawn Cobham" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d0f1a;color:#fff;border-radius:12px;overflow:hidden;">
          <div style="background:linear-gradient(135deg,#1a1f3c,#0d0f1a);padding:32px;border-bottom:1px solid rgba(255,255,255,0.08);">
            <h1 style="margin:0;font-size:20px;color:#fff;">${subject}</h1>
            <p style="margin:6px 0 0;color:#8a8fa8;font-size:13px;">From Dawn Cobham · thatdevelopergirl</p>
          </div>
          <div style="padding:32px;">
            <p style="margin:0;color:#c1c2d3;font-size:15px;line-height:1.8;white-space:pre-wrap;">${body}</p>
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;color:#4a4f6a;font-size:12px;">
                Dawn Cobham — Frontend Engineer
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Send email error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to send email" },
      { status: 500 },
    );
  }
}
