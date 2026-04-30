"use client";

import { projects } from "@/data";
import { ProjectScroll } from "./ui/ProjectScroll";

const RecentProjects = () => {
  return (
    <div className="py-20">
      <h1 className="heading font-display font-bold">
        My <span className="text-purple">works</span>
      </h1>

      <div className="mt-10">
        <ProjectScroll items={projects} direction="left" speed="slow" pauseOnHover={true} />
      </div>
    </div>
  );
};

export default RecentProjects;
