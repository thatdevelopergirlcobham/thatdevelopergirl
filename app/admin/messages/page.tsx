import { createAdminClient } from "@/lib/supabase/server";
import type { Contact } from "@/lib/supabase/types";
import MessagesView from "./MessagesView";

export default async function MessagesPage() {
  const supabase = await createAdminClient();
  const { data: raw } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  const messages = (raw || []) as Contact[];

  const unread = messages.filter((m) => !m.is_read).length;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-display text-white">Messages</h1>
        <p className="text-[#8a8fa8] text-sm mt-1">
          {unread} unread message{unread !== 1 ? "s" : ""}
        </p>
      </div>
      <MessagesView messages={messages} />
    </div>
  );
}
