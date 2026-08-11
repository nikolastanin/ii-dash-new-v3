"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import DougIllustration from "@/components/DougIllustration";

export type TourStep = {
  // CSS selector for the real element to highlight. Omit for a full-screen
  // intro step (e.g. "Meet Dougy") that isn't tied to any real element.
  target?: string;
  title: string;
  description: string;
  visual?: "doug";
};

type Props = {
  steps: TourStep[];
  active: boolean;
  onFinish: () => void;
};

const PAD = 8;
const TOOLTIP_WIDTH = 320;
const TOOLTIP_EST_HEIGHT = 220;

export default function Tour({ steps, active, onFinish }: Props) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [prevActive, setPrevActive] = useState(active);

  // Reset to the first step whenever the tour (re)starts. Adjusted during
  // render (React's documented pattern for resetting state on a prop
  // change) rather than in an effect, so it doesn't chain an extra render.
  if (active !== prevActive) {
    setPrevActive(active);
    if (active) setIndex(0);
  }

  const step = steps[index];
  const hasTarget = !!step?.target;

  // Measures the current step's real target once per step. If it isn't
  // present (or is zero-size — e.g. a desktop-only nav item on a narrow
  // screen), skip straight past it instead of highlighting nothing. Uses a
  // rAF loop rather than scroll/resize listeners so the spotlight tracks
  // smoothly while `scrollIntoView`'s own animation is still settling.
  // Intro steps (no target) skip all of this — nothing to measure.
  useEffect(() => {
    // Nothing to measure for an intro step — the render gate below never
    // reads `rect` when hasTarget is false, so there's no need to clear it.
    if (!active || !step || !hasTarget) {
      return;
    }

    const el = document.querySelector(step.target!);
    const initial = el?.getBoundingClientRect();
    if (!el || !initial || initial.width === 0 || initial.height === 0) {
      const timer = setTimeout(() => {
        if (index < steps.length - 1) setIndex((i) => i + 1);
        else onFinish();
      }, 0);
      return () => clearTimeout(timer);
    }

    // Only scroll if the target genuinely needs it. Calling scrollIntoView
    // unconditionally fights with App's own scroll-to-top-on-screen-change
    // effect for step 1 (whose target is already on screen right after
    // onboarding finishes) — that tug-of-war, worsened by React Strict
    // Mode double-invoking both effects in dev, is what made the highlight
    // take a couple of seconds to settle into place.
    const alreadyInView = initial.top >= 0 && initial.bottom <= window.innerHeight;
    if (!alreadyInView) el.scrollIntoView({ behavior: "smooth", block: "center" });

    let frame: number;
    const tick = () => {
      setRect(el.getBoundingClientRect());
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, index, steps, onFinish, hasTarget, step]);

  if (!active || !step) return null;
  if (hasTarget && !rect) return null;

  function goNext() {
    if (index < steps.length - 1) setIndex((i) => i + 1);
    else onFinish();
  }

  function goBack() {
    setIndex((i) => Math.max(0, i - 1));
  }

  // Portaled straight to <body> so this overlay's stacking is never at the
  // mercy of an ancestor's own position:sticky (which — as with the sticky
  // progress bar and the header — can end up painting above a higher
  // z-index fixed element despite the numbers saying otherwise.

  if (!hasTarget) {
    return createPortal(
      <div className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/55 backdrop-blur-sm px-6">
        <div className="relative w-full max-w-2xl bg-candy-med rounded-[2.5rem] px-7 py-10 md:px-10 md:py-12">
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-end">
            <div>
              <h2 className="font-display text-candy-ruby text-[clamp(1.8rem,5vw,2.75rem)] leading-tight mb-4">{step.title}</h2>
              <p className="text-candy-ruby/80 text-base md:text-lg leading-relaxed">{step.description}</p>
            </div>
            {step.visual === "doug" && <DougIllustration className="mx-auto w-full max-w-[220px]" />}
          </div>
          <div className="flex items-center justify-between gap-3 mt-8">
            <button onClick={onFinish} className="text-sm font-semibold text-candy-ruby/70 hover:text-candy-ruby">
              Skip
            </button>
            <button
              onClick={goNext}
              className="bg-candy-ruby text-banana-med rounded-full px-6 py-3 text-sm font-display uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              Next
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  const spot = {
    top: rect!.top - PAD,
    left: rect!.left - PAD,
    width: rect!.width + PAD * 2,
    height: rect!.height + PAD * 2,
  };

  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const GAP = 20;
  // Placing "above" used to just nudge 16px above spot.top without
  // accounting for the tooltip's own height, so the box — which grows
  // downward from its `top` — landed right back on top of the spotlight.
  // Use the same estimated height for both the placement decision and the
  // actual offset so the two stay consistent.
  const placeBelow = spot.top + spot.height + GAP + TOOLTIP_EST_HEIGHT < vh;
  const tooltipTop = placeBelow ? spot.top + spot.height + GAP : Math.max(16, spot.top - TOOLTIP_EST_HEIGHT - GAP);
  const tooltipLeft = Math.min(Math.max(16, spot.left + spot.width / 2 - TOOLTIP_WIDTH / 2), vw - TOOLTIP_WIDTH - 16);

  const panelClass = "fixed bg-ink/55 backdrop-blur-sm";

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <div className={panelClass} style={{ top: 0, left: 0, right: 0, height: Math.max(0, spot.top) }} />
      <div className={panelClass} style={{ top: spot.top + spot.height, left: 0, right: 0, bottom: 0 }} />
      <div className={panelClass} style={{ top: spot.top, left: 0, width: Math.max(0, spot.left), height: spot.height }} />
      <div className={panelClass} style={{ top: spot.top, left: spot.left + spot.width, right: 0, height: spot.height }} />

      {/* Blocks real interaction with the highlighted element — this is a
          guided walkthrough, not free-roam clicking. */}
      <div className="fixed" style={{ top: spot.top, left: spot.left, width: spot.width, height: spot.height }} />

      <div
        className="fixed rounded-2xl border-[3px] border-banana-med pointer-events-none"
        style={{ top: spot.top, left: spot.left, width: spot.width, height: spot.height, boxShadow: "0 0 0 4px rgba(0,0,0,0.15)" }}
      />

      <div
        className="fixed bg-surface rounded-30 p-6 shadow-xl"
        style={{ top: tooltipTop, left: tooltipLeft, width: TOOLTIP_WIDTH }}
      >
        <p className="text-xs font-semibold text-inksoft mb-2">
          {index + 1} of {steps.length}
        </p>
        <p className="font-display text-lg text-candy-ruby mb-2">{step.title}</p>
        <p className="text-sm text-inksoft leading-relaxed mb-5">{step.description}</p>
        <div className="flex items-center justify-between gap-3">
          <button onClick={onFinish} className="text-sm font-semibold text-inksoft hover:text-ink">
            Skip
          </button>
          <div className="flex items-center gap-2">
            {index > 0 && (
              <button onClick={goBack} className="text-sm font-semibold text-ink px-3 py-2.5">
                Back
              </button>
            )}
            <button
              onClick={goNext}
              className="bg-candy-ruby text-banana-med rounded-full px-5 py-2.5 text-sm font-display uppercase tracking-wide hover:opacity-90 transition-opacity"
            >
              {index === steps.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
