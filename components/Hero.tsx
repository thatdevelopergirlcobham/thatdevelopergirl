"use client";

import { useEffect, useState } from "react";
import { FaLocationArrow, FaStar } from "react-icons/fa6";
import MagicButton from "./MagicButton";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const COLORS = [
  "bg-purple/30 text-purple",
  "bg-blue-400/20 text-blue-400",
  "bg-green-400/20 text-green-400",
  "bg-yellow-400/20 text-yellow-400",
];

interface RatingData {
  averageRating: number;
  totalReviews: number;
  initials: string[];
}

export default function Hero() {
  const greeting = getGreeting();
  const [rating, setRating] = useState<RatingData | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        const reviews: { name: string; rating: number }[] =
          data.testimonials || [];
        const initials = reviews
          .slice(0, 4)
          .map((r: { name: string }) =>
            r.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)
          );
        setRating({
          averageRating: data.averageRating || 0,
          totalReviews: data.totalReviews || 0,
          initials,
        });
      })
      .catch(() => setRating({ averageRating: 0, totalReviews: 0, initials: [] }));
  }, []);

  const hasRatings = rating && rating.totalReviews > 0;

  return (
    <div className="relative h-screen flex items-center justify-center">
      {/* Background grid */}
      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2] absolute top-0 left-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="flex justify-center relative z-10 mt-16">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">

          {/* Rating pill */}
          <div className="flex items-center gap-3 mb-6 px-4 py-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.07]">
            {rating === null ? (
              /* Loading skeleton */
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/[0.08] animate-pulse border-2 border-[#000319]" />
                  ))}
                </div>
                <div className="h-3 w-24 bg-white/[0.08] rounded animate-pulse" />
              </div>
            ) : hasRatings ? (
              <>
                {/* Initials avatars */}
                <div className="flex -space-x-2">
                  {rating.initials.map((init, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-[#000319] flex items-center justify-center text-[10px] font-bold ${COLORS[i % COLORS.length]}`}
                    >
                      {init}
                    </div>
                  ))}
                </div>

                {/* Stars + score */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FaStar
                        key={s}
                        className={`text-xs ${s <= Math.round(rating.averageRating) ? "text-yellow-400" : "text-white/10"}`}
                      />
                    ))}
                    <span className="text-white font-bold text-xs ml-1">
                      {rating.averageRating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-[#8a8fa8] text-[10px]">
                    {rating.totalReviews} {rating.totalReviews === 1 ? "client" : "clients"} rated
                  </p>
                </div>
              </>
            ) : (
              /* No ratings yet */
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <FaStar key={s} className="text-xs text-white/10" />
                  ))}
                </div>
                <p className="text-[#4a4f6a] text-xs">No rating yet · 0 users rated</p>
              </div>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-center text-3xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight dark:text-white text-black leading-snug my-4">
            {greeting}, I&apos;m Dawn Cobham
            <br />
            <span className="text-purple">
              the Frontend Engineer you&apos;ve been looking for.
            </span>
          </h1>

          <p className="text-center md:tracking-wide mb-4 text-sm md:text-base font-sans mt-3 text-blue-100 max-w-xl">
            I build, maintain, and ship polished web applications — working
            closely with teams to turn designs into fast, accessible products
            people actually use.
          </p>

          <div className="flex flex-col md:flex-row gap-4 items-center">
            <a href="#projects">
              <MagicButton
                title="Show my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
            <a href="/Dawn_Cobham_Front_End_Engineer.pdf" download>
              <MagicButton
                title="Download CV"
                icon={<FaLocationArrow className="rotate-0" />}
                position="right"
                otherClasses="!bg-[#161a31]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
