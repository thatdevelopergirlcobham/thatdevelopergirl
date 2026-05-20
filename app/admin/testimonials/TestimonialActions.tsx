"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function TestimonialActions({
  id,
  isApproved,
}: {
  id: string;
  isApproved: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();

  const toggle = async () => {
    const { error } = await (supabase as any)
      .from("testimonials")
      .update({ is_approved: !isApproved })
      .eq("id", id);
    if (error) return toast.error("Failed to update");
    toast.success(isApproved ? "Review hidden" : "Review approved and published");
    router.refresh();
  };

  const remove = async () => {
    if (!confirm("Delete this testimonial permanently?")) return;
    const { error } = await (supabase as any).from("testimonials").delete().eq("id", id);
    if (error) return toast.error("Failed to delete");
    toast.success("Testimonial deleted");
    router.refresh();
  };

  return (
    <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.05]">
      <button
        onClick={toggle}
        className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-all ${
          isApproved
            ? "border border-white/[0.08] text-[#8a8fa8] hover:text-white hover:border-white/[0.2]"
            : "bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20"
        }`}
      >
        {isApproved ? "Hide" : "Approve"}
      </button>
      <button
        onClick={remove}
        className="flex-1 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
      >
        Delete
      </button>
    </div>
  );
}
