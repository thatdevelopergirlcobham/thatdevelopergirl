"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { contactSchema, type ContactInput } from "@/lib/validations";

const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#4a4f6a] focus:outline-none focus:border-purple/60 focus:bg-white/[0.05] transition-all duration-200";

const labelClass =
  "block text-xs font-medium text-[#8a8fa8] uppercase tracking-widest mb-2";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast.success("Message sent! I'll get back to you soon.");
      reset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Grid background — sits behind everything via z-0 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url('/footer-grid.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content sits above the grid */}
      <div className="relative z-10">
        <h1 className="heading font-display font-bold mb-4">
          Get in <span className="text-purple">Touch</span>
        </h1>
        <p className="text-center text-[#8a8fa8] text-sm md:text-base mb-14 max-w-xl mx-auto">
          Have a project in mind, a question, or just want to say hi? Fill out
          the form below and I&apos;ll get back to you as soon as possible.
        </p>

        <div className="max-w-2xl mx-auto px-4 sm:px-0">
          <div className="relative rounded-2xl border border-white/[0.07] bg-[#0c0e1a]/90 backdrop-blur-sm p-8 md:p-10">
            {/* Accent line */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent rounded-t-2xl" />

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input
                    {...register("full_name")}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                  {errors.full_name && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.full_name.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="hello@example.com"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className={labelClass}>Subject</label>
                <input
                  {...register("subject")}
                  placeholder="Project inquiry, collaboration..."
                  className={inputClass}
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project or what you have in mind..."
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-purple text-white font-semibold text-sm tracking-wide hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
