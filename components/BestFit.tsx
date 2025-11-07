"use client";

import React from "react";

const BestFit = () => {
  return (
    <section className="w-full py-20">
      <h2 className="heading">
        Why I’m the <span className="text-purple">best fit</span>
      </h2>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div
          className="rounded-3xl border border-white/[0.1] p-6 lg:p-10"
          style={{
            background: "rgb(4,7,29)",
            backgroundColor:
              "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)",
          }}
        >
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Hi, I’m Dawn
          </h3>
          <p className="text-white-200 leading-7 mb-4">
            I turn ideas into scalable web experiences with beautiful, accessible,
            and responsive interfaces. I care deeply about clarity, usability, and
            performance—so what we ship isn’t just functional, it feels great to use.
          </p>
          <p className="text-white-200 leading-7 mb-4">
            I’m a strong communicator and love collaborating across design,
            product, and engineering. I thrive in teams where we share context,
            iterate quickly, and deliver value consistently.
          </p>
          <p className="text-white-200 leading-7">
            Teamwork makes the dream work—that’s what I believe in. Let’s build
            something impactful together.
          </p>
        </div>

        <div className="w-full">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] h-full">
            <img
              src="/dawn3.jpeg"
              alt="Dawn portrait"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestFit;
