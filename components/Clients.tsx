"use client";

import React from "react";

import { testimonials, tools } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div
          // remove bg-white dark:bg-black dark:bg-grid-white/[0.05], h-[40rem] to 30rem , md:h-[30rem] are for the responsive design
          className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased  items-center justify-center relative overflow-hidden"
        >
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 max-lg:mt-10">
          {/* <h1 className="text-3xl text-white">Tools I am frequent with</h1> */}
          {tools.map((tool, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <img
                src={tool.icon}
                alt={tool.name}
                className="w-8 h-8 md:w-12 md:h-12"
              />
              <span className="text-white-200 text-xs md:text-sm">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
