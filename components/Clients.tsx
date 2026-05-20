"use client";

import { tools } from "@/data";

const Clients = () => {
  return (
    <section className="py-16">
      <h2 className="text-center text-xs font-medium uppercase tracking-widest text-[#8a8fa8] mb-10">
        Technologies I work with
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
        {tools.map((tool, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 group">
            <img
              src={tool.icon}
              alt={tool.name}
              className="w-8 h-8 md:w-10 md:h-10 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
            />
            <span className="text-[#4a4f6a] group-hover:text-[#8a8fa8] text-xs transition-colors duration-200">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Clients;
