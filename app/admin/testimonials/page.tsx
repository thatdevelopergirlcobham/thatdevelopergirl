import { createAdminClient } from "@/lib/supabase/server";
import { Star } from "lucide-react";
import TestimonialActions from "./TestimonialActions";
import type { Testimonial } from "@/lib/supabase/types";

export default async function TestimonialsPage() {
  const supabase = await createAdminClient();
  const { data: raw } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });
  const testimonials = (raw || []) as Testimonial[];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-white">Testimonials</h1>
        <p className="text-[#8a8fa8] text-sm mt-1">
          {testimonials?.filter((t) => !t.is_approved).length || 0} pending approval
        </p>
      </div>

      {!testimonials || testimonials.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0e1a] p-12 text-center">
          <Star size={32} className="text-[#4a4f6a] mx-auto mb-3" />
          <p className="text-[#4a4f6a] text-sm">No testimonials yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`rounded-2xl border bg-[#0c0e1a] p-6 ${
                t.is_approved ? "border-white/[0.06]" : "border-yellow-500/30"
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">{t.name}</span>
                    {!t.is_approved && (
                      <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 text-[10px] font-medium">
                        Pending
                      </span>
                    )}
                  </div>
                  {t.title && <p className="text-[#8a8fa8] text-xs mt-0.5">{t.title}</p>}
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        className={s <= t.rating ? "text-yellow-400 fill-yellow-400" : "text-white/10"}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-[#4a4f6a] text-xs whitespace-nowrap">
                  {new Date(t.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="text-[#c1c2d3] text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <TestimonialActions id={t.id} isApproved={t.is_approved} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
