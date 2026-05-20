"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";

export type ProjectItem = {
  id: number | string;
  title: string;
  des: string;
  img: string;
  iconLists: string[];
  link?: string;
  github?: string;
};

const TECH_LABELS: Record<string, string> = {
  "/re.svg": "React",
  "/next.svg": "Next.js",
  "/ts.svg": "TypeScript",
  "/tail.svg": "Tailwind",
  "/js.svg": "JavaScript",
  "/html.svg": "HTML",
  "/css.svg": "CSS",
  "/three.svg": "Three.js",
  "/supabase.svg": "Supabase",
  "/mongodb.svg": "MongoDB",
  "/git.svg": "Git",
  "/github.svg": "GitHub",
  "/cloud.svg": "Cloudinary",
};

function getTechLabel(icon: string) {
  return TECH_LABELS[icon] ?? icon.replace(/^\//, "").replace(/\.svg$/, "");
}

function TechBadge({ icon }: { icon: string }) {
  const label = getTechLabel(icon);
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-full bg-white/[0.06] border border-white/[0.08] text-[11px] font-medium text-[#a0a5be] whitespace-nowrap leading-none">
      <img
        src={icon}
        alt={label}
        draggable={false}
        className="w-3 h-3 object-contain opacity-75 flex-shrink-0"
      />
      {label}
    </span>
  );
}

function ProjectCard({
  item,
  onClick,
}: {
  item: ProjectItem;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="group relative flex-shrink-0 rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0b0d1e] cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/[0.14]"
      style={{ width: 400, height: 460 }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden flex-shrink-0"
        style={{ height: 230 }}
      >
        <img
          src={item.img}
          alt={item.title}
          draggable={false}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Subtle bottom-only gradient — top of image stays fully clear */}
        <div
          className="absolute inset-x-0 bottom-0 pointer-events-none"
          style={{
            height: "48%",
            background:
              "linear-gradient(to top, #0b0d1e 0%, rgba(11,13,30,0.45) 50%, transparent 100%)",
          }}
        />
        {/* Hover hint */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-white text-xs font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            View details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col px-5 pt-4 pb-5" style={{ height: 230 }}>
        <h3 className="text-white font-bold text-[17px] leading-snug tracking-tight line-clamp-1 mb-2">
          {item.title}
        </h3>
        <p className="text-[#7a7f9a] text-[13px] leading-relaxed line-clamp-2 mb-3 flex-shrink-0">
          {item.des}
        </p>
        {item.iconLists.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.iconLists.slice(0, 4).map((icon, i) => (
              <TechBadge key={i} icon={icon} />
            ))}
            {item.iconLists.length > 4 && (
              <span className="inline-flex items-center px-2.5 py-[5px] rounded-full bg-white/[0.04] border border-white/[0.06] text-[11px] text-[#4a4f6a] leading-none">
                +{item.iconLists.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export const ProjectScroll = ({
  items,
  onCardClick,
  className,
  isLoading,
}: {
  items: ProjectItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  isLoading?: boolean;
  onCardClick: (item: ProjectItem) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!isMobile && containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        "forwards",
      );
      containerRef.current.style.setProperty("--animation-duration", "60s");
      setStart(true);
    }
  }, [isMobile]);

  /* Mobile: native swipe scroll */
  if (isMobile) {
    return (
      <div
        className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
        style={
          {
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties
        }
      >
        <ul className="flex gap-4 px-6 py-4 w-max">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <li key={`skeleton-${i}`} className="snap-start">
                  <div className="w-80 h-[460px] rounded-2xl bg-white/3 animate-pulse" />
                </li>
              ))
            : items.map((item) => (
                <li key={item.id} className="snap-start">
                  <ProjectCard item={item} onClick={() => onCardClick(item)} />
                </li>
              ))}
        </ul>
      </div>
    );
  }

  /* Desktop: infinite CSS animation */
  return (
    <div
      ref={containerRef}
      className={cn("relative w-screen overflow-hidden", className)}
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 h-full w-28 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #000319 20%, transparent 100%)",
        }}
      />
      <ul
        className={cn(
          "flex min-w-full shrink-0 gap-5 py-6 w-max flex-nowrap",
          start && "animate-scroll",
        )}
      >
        {/* Duplicate items for seamless loop */}
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <li key={`skeleton-${i}`} className="flex-shrink-0">
                <div className="w-[400px] h-[460px] rounded-2xl bg-white/3 animate-pulse" />
              </li>
            ))
          : [...items, ...items].map((item, i) => (
              <li key={`${item.id}-${i}`} className="flex-shrink-0">
                <ProjectCard item={item} onClick={() => onCardClick(item)} />
              </li>
            ))}
      </ul>
    </div>
  );
};
