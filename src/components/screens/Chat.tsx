"use client";

import { useEffect, useRef, useState } from "react";
import type { QuickFormState } from "@/lib/types";

type Message = { text: string; who: "assistant" | "user" };

type Props = {
  onBack: () => void;
  onUpdateField: (field: keyof QuickFormState, value: string) => void;
  onBuildPlan: () => void;
};

export default function Chat({ onBack, onUpdateField, onBuildPlan }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const stepRef = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  const chatScript: ((text: string) => string)[] = [
    (text) => {
      onUpdateField("goalLabel", text);
      return "Got it — what should I call you?";
    },
    (text) => {
      onUpdateField("name", text || "there");
      return `Nice to meet you, ${text || "there"}. Roughly how many years away is that — under 1, 1–5, 5–15, or 15+?`;
    },
    (text) => {
      onUpdateField("timeframe", text);
      return "Last one — how confident do you feel with money and investing? Beginner, some experience, or confident?";
    },
    (text) => {
      onUpdateField("experience", text);
      return "Perfect — give me a moment to put your plan together…";
    },
  ];

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    setMessages([
      {
        who: "assistant",
        text: "Hi! Tell me what you're trying to do with your money — for example \"I want to retire at 65\" or \"I want to start investing\".",
      },
    ]);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages]);

  function sendChat() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { text, who: "user" }]);
    setInput("");

    const step = stepRef.current;
    if (step < chatScript.length) {
      const reply = chatScript[step](text);
      const isLast = step === chatScript.length - 1;
      stepRef.current++;
      setTimeout(() => {
        setMessages((m) => [...m, { text: reply, who: "assistant" }]);
        if (isLast) {
          setTimeout(() => onBuildPlan(), 700);
        }
      }, 500);
    }
  }

  return (
    <section className="min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-6 pt-7 pb-5 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back
        </button>
        <span className="text-xs text-inksoft">Chat with our assistant</span>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 flex flex-col">
        <div ref={logRef} className="flex-1 flex flex-col gap-3.5 py-2 overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.who === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`${m.who === "user" ? "chat-bubble-user" : "chat-bubble-assistant"} max-w-[80%] rounded-20 px-5 py-3.5 text-[15px] leading-snug`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-canvas pt-4 pb-10">
          <div className="flex items-center gap-2 bg-surface border-2 border-ink/15 rounded-30 pl-6 pr-2.5 py-2.5">
            <input
              type="text"
              placeholder="Type your answer…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendChat();
              }}
              className="flex-1 bg-transparent outline-none py-2 text-base"
            />
            <button
              onClick={sendChat}
              aria-label="Send"
              className="w-11 h-11 rounded-full bg-green-woods text-banana-med flex items-center justify-center hover:opacity-90 transition-opacity flex-shrink-0"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </section>
  );
}
