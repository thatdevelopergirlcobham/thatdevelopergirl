"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderOpen } from "lucide-react";
import AddProjectForm from "./AddProjectForm";
import ProjectActions from "./ProjectActions";
import type { Project } from "@/lib/supabase/types";

interface ProjectManagerProps {
  projects: Project[];
}

export default function ProjectManager({ projects }: ProjectManagerProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const openCreate = () => {
    setEditingProject(null);
    setOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setOpen(true);
  };

  const closeForm = () => setOpen(false);

  const onSaved = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">
            Projects
          </h1>
          <p className="text-[#8a8fa8] text-sm mt-1">
            {projects?.length || 0} projects in portfolio
          </p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple text-white text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <span className="text-lg font-bold">+</span>
          Add Project
        </button>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="rounded-2xl border border-white/[0.06] bg-[#0c0e1a] p-12 text-center">
          <FolderOpen size={32} className="text-[#4a4f6a] mx-auto mb-3" />
          <p className="text-[#4a4f6a] text-sm">No projects added yet.</p>
          <p className="text-[#4a4f6a] text-xs mt-1">
            Click &quot;Add Project&quot; above to add your first project.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border border-white/[0.06] bg-[#0c0e1a] p-5 flex items-start gap-4 ${
                p.is_draft ? "opacity-80" : ""
              }`}
            >
              {p.image_url && (
                <img
                  src={p.image_url}
                  alt={p.title}
                  className="w-20 h-14 rounded-lg object-cover flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-white font-semibold text-sm">
                    {p.title}
                  </h3>
                  {p.is_featured && (
                    <span className="px-2 py-0.5 rounded-full bg-purple/15 text-purple text-[10px] font-medium">
                      Featured
                    </span>
                  )}
                  {p.is_draft && (
                    <span className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[#8a8fa8] text-[10px] font-medium">
                      Draft
                    </span>
                  )}
                </div>
                <p className="text-[#8a8fa8] text-xs line-clamp-2">
                  {p.description}
                </p>
                {p.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.tech_stack.map((t: string) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-white/[0.04] rounded text-[10px] text-[#8a8fa8]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ProjectActions id={p.id} onEdit={() => openEdit(p)} />
            </div>
          ))}
        </div>
      )}

      {open && (
        <AddProjectForm
          project={editingProject || undefined}
          onClose={closeForm}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
