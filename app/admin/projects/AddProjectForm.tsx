"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { X } from "lucide-react";
import type { Project } from "@/lib/supabase/types";

const TECH_OPTIONS = [
  { label: "React", value: "/re.svg" },
  { label: "Next.js", value: "/next.svg" },
  { label: "TypeScript", value: "/ts.svg" },
  { label: "Tailwind", value: "/tail.svg" },
  { label: "JavaScript", value: "/js.svg" },
  { label: "HTML", value: "/html.svg" },
  { label: "CSS", value: "/css.svg" },
  { label: "Three.js", value: "/three.svg" },
  { label: "Supabase", value: "/supabase.svg" },
  { label: "MongoDB", value: "/mongodb.svg" },
  { label: "Git", value: "/git.svg" },
  { label: "GitHub", value: "/github.svg" },
];

const inputClass =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#4a4f6a] focus:outline-none focus:border-purple/60 transition-all";
const labelClass =
  "block text-xs font-medium text-[#8a8fa8] uppercase tracking-widest mb-1.5";

interface AddProjectFormProps {
  project?: Project;
  onClose?: () => void;
  onSaved?: () => void;
}

export default function AddProjectForm({
  project,
  onClose,
  onSaved,
}: AddProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(project?.image_url ?? "");
  const [techStack, setTechStack] = useState<string[]>(
    project?.tech_stack ?? [],
  );
  const [form, setForm] = useState({
    title: project?.title ?? "",
    description: project?.description ?? "",
    image_url: project?.image_url ?? "",
    live_url: project?.live_url ?? "",
    github_url: project?.github_url ?? "",
    is_featured: project?.is_featured ?? false,
    is_draft: project?.is_draft ?? false,
    display_order: project?.display_order ?? 0,
  });

  useEffect(() => {
    setForm({
      title: project?.title ?? "",
      description: project?.description ?? "",
      image_url: project?.image_url ?? "",
      live_url: project?.live_url ?? "",
      github_url: project?.github_url ?? "",
      is_featured: project?.is_featured ?? false,
      is_draft: project?.is_draft ?? false,
      display_order: project?.display_order ?? 0,
    });
    setTechStack(project?.tech_stack ?? []);
    setImagePreview(project?.image_url ?? "");
    setImageFile(null);
  }, [project]);

  const toggle = (val: string) =>
    setTechStack((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );

  const handleSubmit = async (e: React.FormEvent, asDraft?: boolean) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      toast.error("Title and description are required");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = form.image_url;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("image", imageFile);

        const uploadRes = await fetch(
          "https://clean-cal-api.vercel.app/upload",
          {
            method: "POST",
            body: uploadData,
          },
        );

        let uploadJson: any = null;
        let uploadText = "";
        try {
          uploadJson = await uploadRes.json();
        } catch {
          uploadText = await uploadRes.text();
        }

        imageUrl =
          uploadJson?.url ||
          uploadJson?.image_url ||
          uploadJson?.data?.url ||
          uploadJson?.data?.image_url ||
          uploadText ||
          "";

        if (!uploadRes.ok || !imageUrl) {
          throw new Error("Image upload failed");
        }
      }

      const method = project?.id ? "PATCH" : "POST";
      const endpoint = "/api/projects";
      const payload = {
        ...form,
        is_draft: asDraft ?? form.is_draft,
        image_url: imageUrl,
        tech_stack: techStack,
        ...(project?.id ? { id: project.id } : {}),
      };

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(JSON.stringify(json.error));

      toast.success(project?.id ? "Project updated!" : "Project added!");
      onSaved?.();
      onClose?.();
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-xl rounded-2xl border border-white/[0.08] bg-[#0c0e1a] p-7 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">
            {project ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="text-[#8a8fa8] hover:text-white transition-colors"
            type="button"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={(e) => handleSubmit(e, false)} className="flex flex-col gap-5">
          <div>
            <label className={labelClass}>Project Title *</label>
            <input
              value={form.title}
              onChange={(e) =>
                setForm((f) => ({ ...f, title: e.target.value }))
              }
              placeholder="e.g. ZeroUp Partners"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Description *</label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              rows={4}
              placeholder="Describe what this project does, who it's for, and what makes it special..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className={labelClass}>Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                setImageFile(file);
                if (file) {
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              className={inputClass}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="mt-2 h-24 w-full object-cover rounded-lg border border-white/[0.06]"
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Live URL</label>
              <input
                value={form.live_url ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, live_url: e.target.value }))
                }
                placeholder="https://..."
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>GitHub URL</label>
              <input
                value={form.github_url ?? ""}
                onChange={(e) =>
                  setForm((f) => ({ ...f, github_url: e.target.value }))
                }
                placeholder="https://github.com/..."
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Display Order</label>
              <input
                type="number"
                value={form.display_order}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    display_order: parseInt(e.target.value) || 0,
                  }))
                }
                className={inputClass}
              />
            </div>
            <div className="flex flex-col justify-end pb-0.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, is_featured: e.target.checked }))
                  }
                  className="w-4 h-4 accent-purple"
                />
                <span className="text-sm text-[#8a8fa8]">Mark as featured</span>
              </label>
            </div>
          </div>

          <div>
            <label className={labelClass}>Tech Stack</label>
            <div className="flex flex-wrap gap-2">
              {TECH_OPTIONS.map((t) => {
                const selected = techStack.includes(t.value);
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => toggle(t.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      selected
                        ? "bg-purple/20 border-purple/40 text-purple"
                        : "bg-white/[0.03] border-white/[0.08] text-[#8a8fa8] hover:border-white/[0.2]"
                    }`}
                  >
                    <img
                      src={t.value}
                      alt={t.label}
                      className="w-3.5 h-3.5 object-contain"
                    />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 mt-1">
            <button
              type="button"
              disabled={loading}
              onClick={(e) => handleSubmit(e as any, true)}
              className="flex-1 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#8a8fa8] font-semibold text-sm hover:border-white/20 hover:text-white transition-all disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 rounded-xl bg-purple text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading
                ? "Publishing..."
                : project
                  ? "Save & Publish"
                  : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
