"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FolderOpen,
  MessageSquare,
  Star,
  LogOut,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-60 min-h-screen bg-[#0c0e1a] border-r border-white/[0.06] flex flex-col">
      <div className="px-6 py-6 border-b border-white/[0.06]">
        <p className="text-xs text-[#8a8fa8] uppercase tracking-widest font-medium">Portfolio</p>
        <h2 className="text-white font-bold text-lg font-display mt-0.5">Admin</h2>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                active
                  ? "bg-purple/10 text-purple border border-purple/20"
                  : "text-[#8a8fa8] hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/[0.06]">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#8a8fa8] hover:text-red-400 hover:bg-red-400/5 transition-all duration-150 w-full"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
