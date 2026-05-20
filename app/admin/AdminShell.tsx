"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/admin/login";

  return (
    <div className="flex min-h-screen bg-[#0c0e1a]/20">
      {showSidebar && <Sidebar />}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
