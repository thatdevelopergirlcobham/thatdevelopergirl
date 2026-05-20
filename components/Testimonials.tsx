"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa6";
import { testimonialSchema, type TestimonialInput } from "@/lib/validations";

interface Testimonial {
  id: string;
  name: string;
  title: string | null;
  quote: string;
  rating: number;
  created_at: string;
}

function StarRating({
  rating,
  onChange,
  interactive = false,
  size = "text-lg",
}: {
  rating: number;
  onChange?: (r: number) => void;
  interactive?: boolean;
  size?: string;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={`${size} transition-colors duration-150 ${
            star <= (interactive ? hovered || rating : rating)
              ? "text-yellow-400"
              : "text-white/10"
          } ${interactive ? "cursor-pointer" : ""}`}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          onClick={() => interactive && onChange?.(star)}
        />
      ))}
    </div>
  );
}

const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#4a4f6a] focus:outline-none focus:border-purple/60 focus:bg-white/[0.05] transition-all duration-200";

const labelClass =
  "block text-xs font-medium text-[#8a8fa8] uppercase tracking-widest mb-2";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TestimonialInput>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: { rating: 0 },
  });

  const selectedRating = watch("rating");

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        setTestimonials(data.testimonials || []);
        setAvgRating(data.averageRating || 0);
        setTotalReviews(data.totalReviews || 0);
      })
      .finally(() => setLoadingData(false));
  }, []);

  const onSubmit = async (data: TestimonialInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        const message =
          typeof json.error === "string"
            ? json.error
            : JSON.stringify(json.error || "Submission failed");
        throw new Error(message);
      }
      toast.success(json.message);
      reset();
      setShowForm(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  const hasRatings = !loadingData && totalReviews > 0;
  const noRatings = !loadingData && totalReviews === 0;

  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading font-display font-bold mb-4">
        What <span className="text-purple">Clients</span> Say
      </h1>

      {/* Real-time rating summary */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-4">
          {loadingData ? (
            <div className="h-4 w-40 bg-white/[0.06] rounded animate-pulse" />
          ) : noRatings ? (
            <div className="text-center">
              <p className="text-[#4a4f6a] text-sm font-medium">
                No rating yet
              </p>
              <p className="text-[#4a4f6a] text-xs mt-0.5">0 users rated</p>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <StarRating rating={Math.round(avgRating)} size="text-base" />
                  <span className="text-white font-bold text-lg">
                    {avgRating.toFixed(1)}
                  </span>
                </div>
                <p className="text-[#8a8fa8] text-xs mt-0.5">
                  {totalReviews} {totalReviews === 1 ? "user" : "users"} rated
                </p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setShowForm((s) => !s)}
          className="px-6 py-3 rounded-xl border border-purple/40 text-purple text-sm font-medium hover:bg-purple/10 active:scale-[0.97] transition-all duration-200"
        >
          {showForm ? "Cancel" : "Leave a Review"}
        </button>
      </div>

      {/* Review form */}
      {showForm && (
        <div className="max-w-xl mx-auto mb-14 px-4 sm:px-0">
          <div className="relative rounded-2xl border border-white/[0.07] bg-[#0c0e1a]/90 backdrop-blur-sm p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent rounded-t-2xl" />
            <h3 className="text-white font-bold text-base mb-5">
              Share Your Experience
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Your Name</label>
                  <input
                    {...register("name")}
                    placeholder="Jane Doe"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Role / Title</label>
                  <input
                    {...register("title")}
                    placeholder="Product Designer"
                    className={inputClass}
                  />
                </div>
              </div>
              <div>
                <label className={labelClass}>Your Rating</label>
                <StarRating
                  rating={selectedRating}
                  onChange={(r) => setValue("rating", r)}
                  interactive
                  size="text-xl"
                />
                {errors.rating && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.rating.message}
                  </p>
                )}
              </div>
              <div>
                <label className={labelClass}>Your Review</label>
                <textarea
                  {...register("quote")}
                  rows={4}
                  placeholder="Share your experience working with Dawn..."
                  className={`${inputClass} resize-none`}
                />
                {errors.quote && (
                  <p className="mt-1 text-xs text-red-400">
                    {errors.quote.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-purple text-white font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Testimonials grid */}
      {loadingData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.06] bg-[#0c0e1a] p-6 animate-pulse"
            >
              <div className="h-3 bg-white/[0.06] rounded mb-4 w-20" />
              <div className="h-3 bg-white/[0.06] rounded mb-2 w-full" />
              <div className="h-3 bg-white/[0.06] rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#4a4f6a] text-sm">No reviews yet.</p>
          <p className="text-[#4a4f6a] text-xs mt-1">
            Be the first to leave one!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="relative rounded-2xl border border-white/[0.07] bg-[#0c0e1a] p-6 hover:border-white/[0.14] transition-colors duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple/20 to-transparent rounded-t-2xl" />
              <StarRating rating={t.rating} size="text-sm" />
              <p className="mt-4 text-[#c1c2d3] text-sm leading-relaxed line-clamp-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-5 pt-4 border-t border-white/[0.05] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple/20 flex items-center justify-center text-purple font-bold text-xs flex-shrink-0">
                  {t.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  {t.title && (
                    <p className="text-[#8a8fa8] text-xs">{t.title}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
