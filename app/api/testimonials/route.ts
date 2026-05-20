import { NextRequest, NextResponse } from "next/server";
import { testimonialSchema } from "@/lib/validations";
import { createAdminClient, createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: raw, error } = await (supabase as any)
      .from("testimonials")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    const data = (raw || []) as { rating: number }[];

    const avg =
      data.length > 0
        ? data.reduce((sum, t) => sum + t.rating, 0) / data.length
        : 0;

    return NextResponse.json({
      testimonials: data,
      averageRating: Math.round(avg * 10) / 10,
      totalReviews: data.length,
    });
  } catch (err: any) {
    console.error("Testimonials GET error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to fetch testimonials" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = testimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const supabase = await createAdminClient();
    const { error } = await (supabase as any)
      .from("testimonials")
      .insert({ ...parsed.data, is_approved: false });

    if (error) throw error;

    return NextResponse.json(
      { success: true, message: "Thank you! Your review is pending approval." },
      { status: 201 },
    );
  } catch (err: any) {
    console.error("Testimonials POST error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to submit review" },
      { status: 500 },
    );
  }
}
