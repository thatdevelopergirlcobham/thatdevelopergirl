"use client";

import React from "react";
import { Button } from "./ui/MovingBorders";

const Certifications = () => {
  const certifications = [
    {
      id: 1,
      title: "Ongoing Software Engineering Degree",
      institution: "University of Cross River",
      duration: "2024 - 2028",
      desc: "Currently pursuing a comprehensive degree in Software Engineering, focusing on advanced algorithms, system architecture, and software development lifecycles.",
    },
    {
      id: 2,
      title: "Fundamentals Principles of Javascript",
      institution: "Alison",
      duration: "Completed",
      desc: "Certified proficiency in core JavaScript concepts, including ES6+ features, asynchronous programming, and DOM manipulation.",
    },
  ];

  return (
    <div className="py-20 w-full">
      <h1 className="heading font-display font-bold">
        My <span className="text-purple">Certifications</span>
      </h1>

      <div className="w-full mt-12 grid lg:grid-cols-2 grid-cols-1 gap-10">
        {certifications.map((card) => (
          <Button
            key={card.id}
            duration={Math.floor(Math.random() * 10000) + 10000}
            borderRadius="1.75rem"
            style={{
              background: "rgb(4,7,29)",
              backgroundColor:
                "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
              borderRadius: `calc(1.75rem* 0.96)`,
            }}
            className="flex-1 text-black dark:text-white border-neutral-200 dark:border-slate-800"
          >
            <div className="flex flex-col p-3 py-6 md:p-5 lg:p-10 gap-2">
              <h1 className="text-start text-xl md:text-2xl font-bold font-display tracking-wide">
                {card.title}
              </h1>
              <h2 className="text-start text-lg font-sans font-semibold text-purple">
                {card.institution}
              </h2>
              <p className="text-start text-white-100 mt-3 font-medium text-sm md:text-base leading-relaxed opacity-90 font-sans">
                {card.desc}
              </p>
              <span className="text-start text-xs text-gray-400 font-sans mt-2">
                {card.duration}
              </span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
