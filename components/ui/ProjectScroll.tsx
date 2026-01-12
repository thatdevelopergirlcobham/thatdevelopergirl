"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa6";

export const ProjectScroll = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    id: number;
    title: string;
    des: string;
    img: string;
    iconLists: string[];
    link: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-screen overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_5%,white_95%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-16 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={item.id}
            className="relative rounded-3xl border border-white/[0.1] flex-shrink-0 w-[80vw] md:w-[50vw] xl:w-[30vw] p-5 md:p-8 bg-[#13162d]"
          >
            <div className="relative flex items-center justify-center w-full overflow-hidden h-[20vh] lg:h-[30vh] mb-6 md:mb-10 lg:rounded-2xl">
              {/* Background SVG Pattern instead of Image */}
              <div className="absolute inset-0 w-full h-full bg-[#13162D] opacity-50 pointer-events-none">
                <svg
                  width="100%"
                  height="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="grid-pattern"
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
                  <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>
              </div>

              <img
                src={item.img}
                alt="cover"
                className="z-10 absolute bottom-0 rotate-2 hover:rotate-0 transition-all duration-300 rounded-lg shadow-2xl"
              />
            </div>

            <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1 mb-2">
              {item.title}
            </h1>

            <p className="lg:text-lg lg:font-normal font-light text-sm line-clamp-2 text-[#BEC1DD]">
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
                    <img src={icon} alt="icon" className="p-2" />
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex lg:text-xl md:text-xs text-sm text-purple items-center cursor-pointer hover:text-white transition-colors"
                >
                  Check Live Site
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
