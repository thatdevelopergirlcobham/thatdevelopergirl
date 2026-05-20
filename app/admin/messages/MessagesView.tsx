"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Mail, MailOpen, X, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Contact } from "@/lib/supabase/types";

const inputClass =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-[#4a4f6a] focus:outline-none focus:border-purple/60 transition-all";
const labelClass =
  "block text-xs font-medium text-[#8a8fa8] uppercase tracking-widest mb-1.5";

interface ComposeState {
  open: boolean;
  to: string;
  recipientName: string;
  subject: string;
  body: string;
}

const defaultCompose: ComposeState = {
  open: false,
  to: "",
  recipientName: "",
  subject: "",
  body: "",
};

export default function MessagesView({ messages }: { messages: Contact[] }) {
  const router = useRouter();
  const supabase = createClient();
  const [compose, setCompose] = useState<ComposeState>(defaultCompose);
  const [sending, setSending] = useState(false);

  const openReply = (msg: Contact) => {
    setCompose({
      open: true,
      to: msg.email,
      recipientName: msg.full_name,
      subject: `Re: ${msg.subject}`,
      body: "",
    });
  };

  const closeCompose = () => setCompose(defaultCompose);

  const markRead = async (id: string) => {
    const { error } = await (supabase as any)
      .from("contacts")
      .update({ is_read: true })
      .eq("id", id);
    if (error) return toast.error("Failed to update");
    toast.success("Marked as read");
    router.refresh();
  };

  const handleSend = async () => {
    if (!compose.subject.trim() || !compose.body.trim()) {
      toast.error("Subject and message are required");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: compose.to,
          subject: compose.subject,
          body: compose.body,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to send");
      toast.success(`Email sent to ${compose.recipientName}`);
      closeCompose();
    } catch (err: any) {
      toast.error(err.message || "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  if (!messages.length) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-[#0c0e1a] p-12 text-center">
        <Mail size={32} className="text-[#4a4f6a] mx-auto mb-3" />
        <p className="text-[#4a4f6a] text-sm">No messages yet</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`rounded-2xl border bg-[#0c0e1a] p-6 transition-colors ${
              msg.is_read ? "border-white/[0.05]" : "border-purple/30"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Left: message content */}
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`mt-0.5 flex-shrink-0 ${msg.is_read ? "text-[#4a4f6a]" : "text-purple"}`}>
                  {msg.is_read ? <MailOpen size={16} /> : <Mail size={16} />}
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{msg.full_name}</span>
                    <span className="text-[#4a4f6a] text-xs">·</span>
                    <span className="text-purple text-xs">{msg.email}</span>
                    {!msg.is_read && (
                      <span className="px-2 py-0.5 rounded-full bg-purple/15 text-purple text-[10px] font-medium">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-[#8a8fa8] text-xs mb-3 font-medium">{msg.subject}</p>
                  <p className="text-[#c1c2d3] text-sm leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                </div>
              </div>

              {/* Right: actions */}
              <div className="flex flex-col items-end gap-3 flex-shrink-0">
                <p className="text-[#4a4f6a] text-xs whitespace-nowrap">
                  {new Date(msg.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <button
                  onClick={() => openReply(msg)}
                  className="flex items-center gap-1.5 text-xs text-purple hover:text-white border border-purple/30 hover:border-purple/60 hover:bg-purple/10 px-3 py-1 rounded-lg transition-all"
                >
                  <Send size={11} />
                  Reply
                </button>
                {!msg.is_read && (
                  <button
                    onClick={() => markRead(msg.id)}
                    className="text-xs text-[#8a8fa8] hover:text-white border border-white/[0.08] hover:border-white/[0.2] px-3 py-1 rounded-lg transition-all"
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Compose modal */}
      {compose.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={closeCompose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-lg rounded-2xl border border-white/[0.08] bg-[#0c0e1a] p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-white font-bold text-base">Compose Email</h2>
                <p className="text-[#8a8fa8] text-xs mt-0.5">
                  To:{" "}
                  <span className="text-purple">
                    {compose.recipientName} &lt;{compose.to}&gt;
                  </span>
                </p>
              </div>
              <button
                onClick={closeCompose}
                className="text-[#8a8fa8] hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClass}>Subject</label>
                <input
                  value={compose.subject}
                  onChange={(e) =>
                    setCompose((c) => ({ ...c, subject: e.target.value }))
                  }
                  placeholder="Email subject..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <textarea
                  value={compose.body}
                  onChange={(e) =>
                    setCompose((c) => ({ ...c, body: e.target.value }))
                  }
                  rows={8}
                  placeholder={`Hi ${compose.recipientName},\n\n`}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex gap-3 mt-1">
                <button
                  onClick={closeCompose}
                  className="flex-1 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#8a8fa8] text-sm font-medium hover:text-white hover:border-white/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send size={14} />
                  {sending ? "Sending..." : "Send Email"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
