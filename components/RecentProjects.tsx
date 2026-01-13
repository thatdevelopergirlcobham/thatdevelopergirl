"use client";

import { FaLocationArrow } from "react-icons/fa6";

import { projects } from "@/data";
import { ProjectScroll } from "./ui/ProjectScroll";

const RecentProjects = () => {
  return (
    <div className="py-20">
      <h1 className="heading font-display font-bold">
        My <span className="text-purple">works</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {/* Mobile View: Stacked */}
        <div className="md:hidden flex flex-wrap items-center justify-center gap-16">
          {projects.map((item) => (
            <div
              className="lg:min-h-[32.5rem] md:min-h-[26rem] min-h-[22rem] flex items-center justify-center sm:w-96 w-[80vw]"
              key={item.id}
            >
              <div className="w-full">
                <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-40 md:h-56 lg:h-[30vh] mb-6 md:mb-10">
                  <div
                    className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                    style={{ backgroundColor: "#13162D" }}
                  >
                    <div className="absolute inset-0 w-full h-full bg-[#13162D] opacity-50 pointer-events-none">
                      <svg
                        width="100%"
                        height="100%"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern
                            id="grid-pattern-mobile"
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
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#grid-pattern-mobile)"
                        />
                      </svg>
                    </div>
                  </div>
                  <img
                    src={item.img}
                    alt="cover"
                    className="z-10 absolute bottom-0"
                  />
                </div>

                <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 font-display">
                  {item.title}
                </h1>

                <p
                  className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                  style={{
                    color: "#BEC1DD",
                    margin: "1vh 0",
                  }}
                >
                  {item.des}
                </p>

                <div className="flex items-center justify-between mt-7 mb-3">
                  <div className="flex items-center">
                    {item.iconLists.map((icon, index) => (
                      <div
                        key={index}
                        className="border border-white/[.2] rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                        style={{
                          transform: `translateX(-${5 * index + 2}px)`,
                        }}
                      >
                        <img src={icon} alt="icon5" className="p-2" />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center items-center">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex lg:text-xl md:text-xs text-sm text-purple items-center"
                    >
                      Check Live Site
                      <FaLocationArrow className="ms-3" color="#CBACF9" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View: Horizontal Scroll */}
        <div className="hidden md:block w-full">
          <ProjectScroll items={projects} direction="left" speed="normal" />
        </div>
      </div>
    </div>
  );
};

export default RecentProjects;
