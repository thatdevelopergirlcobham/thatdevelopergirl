import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const { full_name, email, subject, message } = parsed.data;

    // Save to Supabase
    const supabase = await createAdminClient();
    const { error: dbError } = await (supabase as any)
      .from("contacts")
      .insert({ full_name, email, subject, message });

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again." },
        { status: 500 },
      );
    }

    // Send email via NodeMailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO,
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d0f1a;color:#fff;border-radius:12px;overflow:hidden;">
            <div style="background:linear-gradient(135deg,#1a1f3c,#0d0f1a);padding:32px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <h1 style="margin:0;font-size:22px;color:#fff;">New Contact Message</h1>
              <p style="margin:6px 0 0;color:#8a8fa8;font-size:14px;">From your portfolio</p>
            </div>
            <div style="padding:32px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;color:#8a8fa8;font-size:13px;width:100px;">Name</td>
                  <td style="padding:10px 0;color:#fff;font-size:14px;font-weight:600;">${full_name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#8a8fa8;font-size:13px;">Email</td>
                  <td style="padding:10px 0;color:#60A5FA;font-size:14px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#8a8fa8;font-size:13px;">Subject</td>
                  <td style="padding:10px 0;color:#fff;font-size:14px;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top:20px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;padding:20px;">
                <p style="margin:0;color:#8a8fa8;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</p>
                <p style="margin:12px 0 0;color:#fff;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</p>
              </div>
            </div>
          </div>
        `,
      });
    } catch (emailErr) {
      // Message is already saved — log the failure but don't fail the request
      console.error("Email send failed:", emailErr);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err?.message || "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
