"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface ProjectActionsProps {
  id: string;
  onEdit: () => void;
}

export default function ProjectActions({ id, onEdit }: ProjectActionsProps) {
  const router = useRouter();
  const supabase = createClient();

  const remove = async () => {
    if (!confirm("Delete this project permanently?")) return;
    const { error } = await (supabase as any)
      .from("projects")
      .delete()
      .eq("id", id);
    if (error) return toast.error("Failed to delete");
    toast.success("Project deleted");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-2 flex-shrink-0">
      <button
        type="button"
        onClick={onEdit}
        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/[0.12] text-white/80 hover:bg-white/5 transition-all"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={remove}
        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
      >
        Delete
      </button>
    </div>
  );
}
