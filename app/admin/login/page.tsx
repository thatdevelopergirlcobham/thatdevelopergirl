"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { loginSchema, type LoginInput } from "@/lib/validations";

const inputClass =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#4a4f6a] focus:outline-none focus:border-purple focus:bg-white/[0.06] transition-all duration-200";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async ({ email, password }: LoginInput) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Welcome back!");
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#000319] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white font-display">
            Admin Portal
          </h1>
          <p className="text-[#8a8fa8] text-sm mt-2">
            Sign in to manage your portfolio
          </p>
        </div>

        <div className="relative rounded-2xl border border-white/[0.07] bg-[#0c0e1a] p-8 shadow-[0_0_60px_rgba(96,165,250,0.05)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent rounded-t-2xl" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div>
              <label className="block text-xs font-medium text-[#8a8fa8] uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="admin@dev.com"
                className={inputClass}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-[#8a8fa8] uppercase tracking-widest mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass} pr-12`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-[#8a8fa8] hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-purple text-white font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
