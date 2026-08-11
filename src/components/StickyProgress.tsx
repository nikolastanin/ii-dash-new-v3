"use client";

import { useEffect, useRef } from "react";
import { currentPhaseIndex, goalProgressPct } from "@/lib/data";
import type { Phase, Step } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import ProgressDonut from "./ProgressDonut";

type Props = {
  phases: Phase[];
  steps: Step[];
  doneSteps: Set<string>;
  doneItems: Set<string>;
  // Stickiness creates its own stacking context, which can end up painting
  // above a fixed-position overlay (e.g. the intro tour) regardless of
  // z-index. Simplest fix: drop out of sticky positioning entirely while
  // one of those overlays is active.
  disableSticky?: boolean;
};

export default function StickyProgress({ phases, steps, doneSteps, doneItems, disableSticky = false }: Props) {
  const label = phases[currentPhaseIndex(phases, steps, doneSteps)]?.label ?? "Your journey";
  const pct = goalProgressPct(steps, doneItems);
  const barRef = useRef<HTMLDivElement>(null);

  // This bar stays stuck for the rest of the page below it, so anything
  // else that sticks near the top (e.g. the Highlights sidebar) needs to
  // know its real height, not just the header's, to avoid sitting behind it.
  useEffect(() => {
    if (disableSticky) {
      document.documentElement.style.setProperty("--sticky-progress-h", "0px");
      return;
    }
    const el = barRef.current;
    if (!el) return;
    const setHeight = () => document.documentElement.style.setProperty("--sticky-progress-h", `${el.offsetHeight}px`);
    setHeight();
    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [disableSticky]);

  return (
    <div
      ref={barRef}
      className={`${disableSticky ? "relative" : "sticky"} z-40 rounded-b-[2rem] bg-banana-light px-8 py-4 md:px-10 mb-8 flex items-center gap-5`}
      style={disableSticky ? undefined : { top: "var(--header-h)" }}
    >
      <div className="flex-1">
        <div className="flex items-center justify-between gap-4 text-xs font-semibold text-candy-ruby/80 mb-2">
          <span>{label}</span>
          <span>
            {doneSteps.size} of {steps.length} steps
          </span>
        </div>
        <ProgressBar done={doneSteps.size} total={steps.length} />
      </div>
      <ProgressDonut
        pct={pct}
        strokeWidth={12}
        className="w-14 h-14 md:w-16 md:h-16"
        valueClassName="font-display text-xs md:text-sm text-candy-ruby"
      />
    </div>
  );
}
