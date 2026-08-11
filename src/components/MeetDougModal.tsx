"use client";

import DougIllustration from "@/components/DougIllustration";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MeetDougModal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/40 px-6 cursor-pointer" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl cursor-auto bg-candy-med rounded-[2.5rem] px-7 py-10 md:px-10 md:py-12"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 grid size-9 place-items-center rounded-full bg-surface text-candy-ruby text-sm font-semibold"
        >
          ✕
        </button>

        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <div>
            <h2 className="font-display text-candy-ruby text-[clamp(1.8rem,5vw,2.75rem)] leading-tight mb-4">
              Meet Dougy. Your guide inside your money goals.
            </h2>
            <p className="text-candy-ruby/80 text-base md:text-lg leading-relaxed mb-3">
              He gathers the best tools, guides and steps for whatever you&rsquo;re working toward, and ditches the jargon along
              the way.
            </p>
            <p className="text-sm text-candy-ruby/60">Free to use. No credit check, ever.</p>
          </div>

          <DougIllustration className="mx-auto w-full max-w-[220px]" />
        </div>
      </div>
    </div>
  );
}
