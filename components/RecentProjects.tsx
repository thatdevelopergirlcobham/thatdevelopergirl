"use client";

import { useState, useEffect, useRef } from "react";
import { FaLocationArrow, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { projects } from "@/data";

const PROJECTS_PER_PAGE = 3;

const RecentProjects = () => {
  const [page, setPage] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const start = page * PROJECTS_PER_PAGE;
  const visible = projects.slice(start, start + PROJECTS_PER_PAGE);

  const changePage = (next: number) => {
    setDirection(next > page ? "right" : "left");
    setAnimating(true);
    setTimeout(() => {
      setPage(next);
      setAnimating(false);
    }, 300);
  };

  return (
    <div className="py-20">
      <h1 className="heading font-display font-bold">
        My <span className="text-purple">works</span>
      </h1>

      {/* Project Cards */}
      <div
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 transition-all duration-300"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "-40px" : "40px"})`
            : "translateX(0)",
        }}
      >
        {visible.map((item) => (
          <div
            key={item.id}
            className="relative rounded-3xl border border-white/[0.1] flex flex-col bg-[#13162d] p-5 md:p-8"
          >
            {/* Image area */}
            <div className="relative flex items-center justify-center w-full overflow-hidden h-[20vh] lg:h-[28vh] mb-6 lg:rounded-2xl">
              <div className="absolute inset-0 w-full h-full bg-[#13162D] opacity-50 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern
                      id={`grid-${item.id}`}
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M0 40 L40 0 H20 L0 20 M40 40 V20 L20 40"
                        stroke="#2a2e5a"
                        strokeWidth="2"
                        fill="none"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${item.id})`} />
                </svg>
              </div>
              <img
                src={item.img}
                alt="cover"
                className="z-10 absolute bottom-0 rotate-2 hover:rotate-0 transition-all duration-300 rounded-lg shadow-2xl"
              />
            </div>

            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 mb-2 font-display">
              {item.title}
            </h1>

            <p className="lg:text-lg lg:font-normal font-light text-sm line-clamp-2 text-[#BEC1DD] flex-1">
              {item.des}
            </p>

            <div className="flex items-center justify-between mt-7 mb-3">
              <div className="flex items-center">
                {item.iconLists.map((icon, index) => (
                  <div
                    key={index}
                    className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                    style={{ transform: `translateX(-${5 * index + 2}px)` }}
                  >
                    <img src={icon} alt="icon" className="p-2" />
                  </div>
                ))}
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="flex lg:text-xl md:text-xs text-sm text-purple items-center hover:text-white transition-colors"
              >
                Check Live Site
                <FaLocationArrow className="ms-3" color="#60A5FA" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-10">
          <button
            onClick={() => changePage(Math.max(page - 1, 0))}
            disabled={page === 0}
            className="w-10 h-10 rounded-full border border-white/[0.2] flex items-center justify-center text-white disabled:opacity-30 hover:border-purple transition-colors"
          >
            <FaChevronLeft size={14} />
          </button>

          {/* Dot indicators */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => changePage(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-6 h-2 bg-purple"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => changePage(Math.min(page + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 rounded-full border border-white/[0.2] flex items-center justify-center text-white disabled:opacity-30 hover:border-purple transition-colors"
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentProjects;
