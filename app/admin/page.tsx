import { createClient } from "@/lib/supabase/server";
import { MessageSquare, Star, FolderOpen, Eye } from "lucide-react";

async function getStats() {
  const supabase = await createClient();
  const [contacts, testimonials, projects] = await Promise.all([
    supabase.from("contacts").select("id, is_read", { count: "exact" }),
    supabase.from("testimonials").select("id, is_approved, rating", { count: "exact" }),
    supabase.from("projects").select("id", { count: "exact" }),
  ]);

  type C = { id: string; is_read: boolean };
  type T = { id: string; is_approved: boolean; rating: number };
  const contactData = (contacts.data || []) as C[];
  const testimonialData = (testimonials.data || []) as T[];

  const unread = contactData.filter((c) => !c.is_read).length;
  const pending = testimonialData.filter((t) => !t.is_approved).length;
  const ratings = testimonialData.filter((t) => t.is_approved);
  const avg =
    ratings.length > 0
      ? (ratings.reduce((s, t) => s + t.rating, 0) / ratings.length).toFixed(1)
      : "—";

  return {
    totalMessages: contacts.count || 0,
    unread,
    totalTestimonials: testimonials.count || 0,
    pendingApproval: pending,
    totalProjects: projects.count || 0,
    avgRating: avg,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Total Messages",
      value: stats.totalMessages,
      sub: `${stats.unread} unread`,
      icon: MessageSquare,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      label: "Testimonials",
      value: stats.totalTestimonials,
      sub: `${stats.pendingApproval} pending`,
      icon: Star,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      label: "Projects",
      value: stats.totalProjects,
      sub: "in portfolio",
      icon: FolderOpen,
      color: "text-purple",
      bg: "bg-purple/10",
    },
    {
      label: "Avg Rating",
      value: stats.avgRating,
      sub: "from approved reviews",
      icon: Eye,
      color: "text-green-400",
      bg: "bg-green-400/10",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-white">Dashboard</h1>
        <p className="text-[#8a8fa8] text-sm mt-1">Overview of your portfolio activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/[0.07] bg-[#0c0e1a] p-6"
          >
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-[#8a8fa8] text-xs uppercase tracking-widest font-medium">{label}</p>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
            <p className="text-[#4a4f6a] text-xs mt-1">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
