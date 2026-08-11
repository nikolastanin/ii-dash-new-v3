"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ALERT, PHASES, RESOURCES, STEPS, currentPhaseIndex } from "@/lib/data";
import type { GuideResource, QuickFormState, ToolResource } from "@/lib/types";
import { HighlightCard, ResourceBubbleStack, ToolCard } from "@/components/resources";
import { Scallop } from "@/components/shapes";
import SaveButton from "@/components/SaveButton";
import StickyProgress from "@/components/StickyProgress";

type Props = {
  formState: QuickFormState;
  doneSteps: Set<number>;
  savedIds: Set<string>;
  onToggleSaved: (id: string) => void;
  onOpenStep: (n: number) => void;
  onToggleStepDone: (n: number) => void;
};

const DONUT_R = 78;
const DONUT_CIRC = 2 * Math.PI * DONUT_R;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function collectStepResourceIds(step: (typeof STEPS)[number]) {
  const ids = new Set<string>();
  step.checklist.forEach((item) => {
    if (typeof item === "object" && item.resourceIds) {
      item.resourceIds.forEach((id) => ids.add(id));
    }
  });
  return [...ids];
}

export default function Dashboard({ formState, doneSteps, savedIds, onToggleSaved, onOpenStep, onToggleStepDone }: Props) {
  const [alertDismissed, setAlertDismissed] = useState(false);

  const pills = [formState.timeframe, formState.experience, formState.risk].filter(Boolean);

  const progressPct = STEPS.length ? doneSteps.size / STEPS.length : 0;

  const currentIndex = useMemo(() => currentPhaseIndex(doneSteps), [doneSteps]);

  // Guides already get their own dedicated showcase further down the page,
  // so Highlights sticks to tools and videos — the resources that otherwise
  // only surface buried inside a step's checklist.
  const featured = Object.values(RESOURCES).filter((r) => r.featured && r.type !== "guide");
  const tools = Object.values(RESOURCES).filter((r): r is ToolResource => r.type === "tool");
  const guides = Object.values(RESOURCES).filter((r): r is GuideResource => r.type === "guide");

  return (
    <section className="min-h-screen">
      <main className="max-w-5xl mx-auto w-full px-6 pb-24">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-green-woods px-8 py-12 md:rounded-[3.5rem] md:px-12 md:py-16 text-creamy mt-6 mb-8">
          <Scallop
            fill="var(--color-green-med)"
            className="pointer-events-none absolute -bottom-16 -right-16 w-64 opacity-25"
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.14em] font-display text-banana-med mb-4">Your plan</p>
              <h1 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] text-banana-med mb-3">
                Hi {formState.name || "there"}, we&rsquo;ve gathered everything you need.
              </h1>
              <p className="text-creamy/80 mb-4">
                <span className="font-semibold text-creamy">You told us:</span> {formState.goalLabel || "Building a stronger financial future"}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-creamy/90 mb-4">
                <button onClick={() => scrollToSection("plan-section")} className="hover:text-creamy transition-colors">
                  <span className="font-display text-banana-med">{STEPS.length}</span> steps
                </button>
                <button onClick={() => scrollToSection("tools-section")} className="hover:text-creamy transition-colors">
                  <span className="font-display text-banana-med">{tools.length}</span> tools
                </button>
                <button onClick={() => scrollToSection("guides-section")} className="hover:text-creamy transition-colors">
                  <span className="font-display text-banana-med">{guides.length}</span> guides
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {pills.map((p) => (
                  <span key={p} className="text-xs font-semibold bg-creamy/15 rounded-full px-4 py-1.5">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto md:mx-0 w-full max-w-[9rem] md:max-w-[11rem] flex-shrink-0">
              <svg viewBox="0 0 200 200" className="w-full -rotate-90">
                <circle cx="100" cy="100" r="78" fill="none" stroke="var(--color-candy-med)" strokeWidth="22" />
                <circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="none"
                  stroke="var(--color-green-med)"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeDasharray={`${progressPct * DONUT_CIRC} ${DONUT_CIRC}`}
                  className="transition-[stroke-dasharray] duration-300 ease-out"
                />
              </svg>
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="font-sans text-xs font-semibold text-creamy/70">PROGRESS</p>
                  <p className="font-display text-[clamp(1.5rem,4vw,2rem)] text-banana-med">
                    {Math.round(progressPct * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alert */}
        {!alertDismissed && (
          <div className="relative flex flex-col overflow-hidden rounded-[2rem] bg-aqua-light text-aqua-teal p-8 md:p-10 mb-10">
            <div className="flex items-start gap-4">
              <span className="w-9 h-9 rounded-full bg-aqua-teal text-aqua-light flex items-center justify-center font-display flex-shrink-0">!</span>
              <div className="flex-1">
                <p className="font-display text-lg mb-1">{ALERT.title}</p>
                <p className="text-sm text-aqua-teal/80 leading-relaxed">{ALERT.desc}</p>
              </div>
              <button onClick={() => setAlertDismissed(true)} className="text-aqua-teal/60 hover:text-aqua-teal text-sm flex-shrink-0" aria-label="Dismiss">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Journey */}
        <div className="rounded-t-[2rem] bg-banana-light p-8 pb-2 md:p-10 md:pb-2">
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] text-candy-ruby mb-8">Your journey</h2>
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {PHASES.map((p, i) => {
              const status = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
              return (
                <div key={p.id} className="contents">
                  <div className="flex flex-col items-center flex-shrink-0 w-24">
                    <span className={`phase-circle w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${status}`}>
                      {status === "done" ? "✓" : i + 1}
                    </span>
                    <span className={`text-xs font-semibold mt-2.5 text-center ${status === "upcoming" ? "text-candy-ruby/50" : "text-candy-ruby"}`}>{p.label}</span>
                  </div>
                  {i < PHASES.length - 1 && <div className={`phase-line h-[2px] flex-1 min-w-[24px] ${i < currentIndex ? "done" : "bg-candy-ruby/15"}`} />}
                </div>
              );
            })}
          </div>
        </div>

        <StickyProgress doneSteps={doneSteps} />

        {/* Plan + Highlights */}
        <div className="md:grid md:grid-cols-3 md:gap-9 md:items-start mb-12">
          <div className="md:col-span-2 mb-12 md:mb-0" id="plan-section">
            <SectionHeading icon="plan" label="Your plan" />
            <div className="flex flex-col gap-3.5">
              {STEPS.map((s) => {
                const resources = collectStepResourceIds(s)
                  .map((id) => RESOURCES[id])
                  .filter(Boolean);
                const done = doneSteps.has(s.n);
                return (
                  <div
                    key={s.id}
                    className={`step-card flex gap-4 bg-surface rounded-20 border-2 border-transparent hover:border-ink/40 transition-colors p-5 md:p-6 cursor-pointer ${done ? "done" : ""}`}
                    onClick={() => onOpenStep(s.n)}
                  >
                    <button
                      className="step-check grid size-10 shrink-0 place-items-center rounded-full bg-green-woods mt-0.5 md:size-12"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStepDone(s.n);
                      }}
                      aria-label={`Mark step ${s.n} as done`}
                    >
                      <span className="step-num font-display text-lg text-banana-med md:text-xl">{s.n}</span>
                      <span className="step-tick font-display text-lg text-banana-med md:text-xl">✓</span>
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2.5 mb-1.5">
                        <h3 className="step-title font-semibold">{s.title}</h3>
                        <span className={`tag tag-${s.tag.toLowerCase()}`}>{s.tag}</span>
                      </div>
                      <p className="text-sm text-inksoft mb-3 leading-relaxed">{s.desc}</p>
                      <div className="flex items-center gap-3.5">
                        <ResourceBubbleStack resources={resources} />
                        <span className="text-sm font-semibold">View details →</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-1 md:sticky md:top-28 md:self-start">
            <SectionHeading icon="highlights" label="Highlights" />
            <p className="text-sm text-inksoft mb-5 -mt-3">A preview of what we&rsquo;ve already gathered for you — no digging required.</p>
            <div className="columns-2 md:columns-1 gap-5">
              {featured.slice(0, 4).map((r) => (
                <HighlightCard
                  key={r.id}
                  resource={r}
                  className="mb-5"
                  saved={savedIds.has(r.id)}
                  onToggleSaved={() => onToggleSaved(r.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="mb-12 rounded-[2rem] bg-candy-light p-8 md:p-10" id="tools-section">
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] text-candy-ruby mb-2">Tools for you</h2>
          <p className="text-sm text-candy-ruby/65 mb-8 max-w-xl">
            Calculators and tools we&rsquo;ve picked out, so you don&rsquo;t have to compare a dozen options yourself.
          </p>
          <div className="-mx-8 md:-mx-10 px-8 md:px-10 flex gap-5 overflow-x-auto scrollbar-hide pb-2">
            {tools.map((t) => (
              <ToolCard key={t.id} tool={t} saved={savedIds.has(t.id)} onToggleSaved={() => onToggleSaved(t.id)} />
            ))}
          </div>
        </div>

        {/* Guides */}
        <div className="mb-12 relative overflow-hidden rounded-[2.5rem] bg-green-light px-6 py-14 md:rounded-[3.5rem] md:px-10 md:py-16" id="guides-section">
          <Scallop
            fill="var(--color-green-med)"
            className="pointer-events-none absolute -bottom-20 -left-24 w-96 opacity-40"
          />
          <div className="relative">
            <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] text-green-woods mb-2">Guides</h2>
            <p className="text-sm text-green-woods/70 mb-10 max-w-xl">
              Everything we think is worth reading for this goal — gathered here instead of scattered across the
              internet.
            </p>
            <ul className="grid gap-5 md:grid-cols-2">
              {guides.map((g) => (
                <li key={g.id} className="relative">
                  <a
                    href={g.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full flex-col justify-between rounded-[2rem] bg-creamy p-8 transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div>
                      <span className="font-sans text-xs font-semibold text-green-woods pr-8">
                        by {g.author}
                      </span>
                      <h3 className="mt-4 font-display text-[clamp(1.3rem,2.2vw,1.6rem)] text-candy-ruby">{g.title}</h3>
                      <p className="mt-3 text-sm text-candy-ruby/65 leading-relaxed line-clamp-3">{g.description}</p>
                    </div>
                    <p className="mt-8 font-sans text-sm text-candy-ruby/65">{g.readTimeMins} min read</p>
                  </a>
                  <SaveButton
                    saved={savedIds.has(g.id)}
                    onToggle={() => onToggleSaved(g.id)}
                    className="absolute top-8 right-8 w-8 h-8 bg-surface"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-inksoft pt-2">
          Prototype note — this dashboard is hardcoded for the demo. In the live product every section above is generated from your
          actual answers, pulling from a live JSON set of steps, tools and guides.
        </p>
      </main>
    </section>
  );
}

const ICONS: Record<string, ReactNode> = {
  plan: (
    <>
      <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  highlights: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="3" width="7" height="5" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="12" width="7" height="9" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="3" y="16" width="7" height="5" rx="2" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
};

function SectionHeading({ icon, label }: { icon: keyof typeof ICONS; label: string }) {
  return (
    <div className="flex items-center mb-5">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-brand flex-shrink-0">
        {ICONS[icon]}
      </svg>
      <h2 className="font-display uppercase text-xl ml-3">{label}</h2>
    </div>
  );
}
