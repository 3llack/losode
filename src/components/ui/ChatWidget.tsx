"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "bot"; text: string };

const QUICK = ["Track my order", "Return policy", "Size guide", "Contact support"];

const autoReply = (msg: string): string => {
  const m = msg.toLowerCase();
  if (m.includes("return")) return "Our return policy allows exchanges and amendments within 14 days of delivery. Visit the Returns page for details.";
  if (m.includes("track") || m.includes("order")) return "To track your order, head to your account dashboard or use the Track an Order link in the footer.";
  if (m.includes("size")) return "Each product page has a Size Guide link. We carry XS–XXL for most items.";
  if (m.includes("contact") || m.includes("support")) return "Reach our team at hello@losode.com or call 02013306011.";
  if (m.includes("delivery") || m.includes("shipping")) return "We offer free delivery on orders over $100. Standard delivery takes 3–7 business days.";
  return "Thanks for reaching out! Our team will get back to you shortly. You can also email hello@losode.com.";
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! Welcome to Losode 👋 How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMsgs(prev => [...prev, { role: "bot", text: autoReply(text) }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex flex-col items-end gap-3">
      {/* Chat window */}
      {open && (
        <div className="w-80 bg-white border border-gray-200 shadow-2xl flex flex-col" style={{ height: 420 }}>
          {/* Header */}
          <div className="bg-[#1A1A1A] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-white text-sm font-semibold">Losode Support</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white text-sm">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-[#FAFAF8]">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed ${
                  m.role === "user"
                    ? "bg-[#1A1A1A] text-white"
                    : "bg-white border border-gray-200 text-gray-700"
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          {msgs.length <= 1 && (
            <div className="px-3 py-2 flex flex-wrap gap-1.5 border-t border-gray-100">
              {QUICK.map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="text-xs border border-gray-300 px-2.5 py-1 text-gray-600 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 flex">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send(input)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 text-xs outline-none placeholder-gray-400"
            />
            <button
              onClick={() => send(input)}
              className="px-4 bg-[#1A1A1A] text-white text-xs font-semibold hover:bg-[#C8A96E] transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 bg-[#1A1A1A] text-white flex items-center justify-center hover:bg-[#C8A96E] transition-colors shadow-lg"
        aria-label="Chat"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  );
}