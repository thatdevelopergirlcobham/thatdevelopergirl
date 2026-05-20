"use client";

import { useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";

interface Project {
  id: number | string;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link?: string;
  github?: string;
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0c0e1a] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#0c0e1a] flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X size={15} className="text-white" />
        </button>

        {/* Image */}
        <div className="relative w-full h-52 sm:h-64 overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e1a] via-black/30 to-transparent" />
        </div>

        {/* Content */}
        <div className="px-6 pb-7 pt-5">
          {/* Title */}
          <h2 className="text-white font-bold text-xl font-display mb-3">
            {project.title}
          </h2>

          {/* Description */}
          <p className="text-[#c1c2d3] text-sm leading-relaxed mb-6">
            {project.des}
          </p>

          {/* Tech stack */}
          {project.iconLists.length > 0 && (
            <div className="mb-6">
              <p className="text-[#4a4f6a] text-[10px] uppercase tracking-widest font-medium mb-3">
                Built with
              </p>
              <div className="flex flex-wrap gap-2">
                {project.iconLists.map((icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.08] p-1.5"
                  >
                    <img
                      src={icon}
                      alt=""
                      className="w-full h-full object-contain opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-3">
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={14} />
                Live Preview
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/[0.1] text-white text-sm font-medium hover:bg-white/[0.05] transition-colors"
              >
                <Github size={14} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
