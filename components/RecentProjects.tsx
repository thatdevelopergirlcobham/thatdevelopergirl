"use client";

import { useEffect, useState } from "react";
import { ProjectScroll, type ProjectItem } from "./ui/ProjectScroll";
import ProjectModal from "./ui/ProjectModal";

export default function RecentProjects() {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (!mounted) return;
        if (data.projects && data.projects.length > 0) {
          const mapped: ProjectItem[] = data.projects.map((p: any) => ({
            id: p.id,
            title: p.title,
            des: p.description,
            img: p.image_url || "",
            iconLists: p.tech_stack || [],
            link: p.live_url || "",
            github: p.github_url || "",
          }));
          setItems(mapped);
        }
      })
      .catch(() => {
        // ignore network error; keep items empty
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="projects" className="py-24">
      {/* Heading */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-4xl sm:text-5xl font-bold font-display text-white tracking-tight">
          My <span className="text-purple">Works</span>
        </h2>
        <p className="text-[#7a7f9a] text-sm mt-3 max-w-xs mx-auto leading-relaxed">
          Selected projects — from SaaS tools to creative builds.
        </p>
      </div>

      <ProjectScroll
        items={items}
        isLoading={loading}
        onCardClick={(item) => setSelected(item)}
      />

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
