"use client";

import { useEffect, useState } from "react";
import { ProjectScroll, type ProjectItem } from "./ui/ProjectScroll";
import ProjectModal from "./ui/ProjectModal";
import { projects as staticProjects } from "@/data";

const FALLBACK: ProjectItem[] = staticProjects.map((p) => ({
  id: p.id,
  title: p.title,
  des: p.des,
  img: p.img,
  iconLists: p.iconLists,
  link: p.link,
  github: "",
}));

export default function RecentProjects() {
  const [items, setItems] = useState<ProjectItem[]>(FALLBACK);
  const [selected, setSelected] = useState<ProjectItem | null>(null);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
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
        // if no real projects, keep showing the static fallback
      })
      .catch(() => {
        // keep fallback on network error
      });
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
        onCardClick={(item) => setSelected(item)}
      />

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
