import { NextRequest, NextResponse } from "next/server";
import { createClient, createAdminClient } from "@/lib/supabase/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1).max(100).trim(),
  description: z.string().min(1).max(2000).trim(),
  image_url: z.string().optional(),
  tech_stack: z.array(z.string()).default([]),
  live_url: z.string().optional(),
  github_url: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_draft: z.boolean().default(false),
  display_order: z.number().default(0),
});

const projectUpdateSchema = projectSchema.extend({
  id: z.string().min(1),
});

export async function GET() {
  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from("projects")
      .select("*")
      .eq("is_draft", false)
      .order("display_order", { ascending: true });

    if (error) throw error;
    return NextResponse.json({ projects: data || [] });
  } catch (err: any) {
    console.error("Projects GET error:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const supabase = await createAdminClient();
    const { data, error } = await (supabase as any)
      .from("projects")
      .insert(parsed.data)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ project: data }, { status: 201 });
  } catch (err: any) {
    console.error("Projects POST error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to add project" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = projectUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const supabase = await createAdminClient();
    const { data, error } = await (supabase as any)
      .from("projects")
      .update(parsed.data)
      .eq("id", parsed.data.id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ project: data }, { status: 200 });
  } catch (err: any) {
    console.error("Projects PATCH error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update project" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const supabase = await createAdminClient();
    const { error } = await (supabase as any)
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Projects DELETE error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to delete project" },
      { status: 500 },
    );
  }
}
