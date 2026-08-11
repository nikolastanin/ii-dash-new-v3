"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { GLOBAL_ALERTS, GOAL_ALERTS, RESOURCES, currentPhaseIndex, goalProgressPct } from "@/lib/data";
import type { ChecklistItem, GuideResource, Phase, Resource, Step, ToolResource } from "@/lib/types";
import { HighlightCard, ResourceBubbleStack, ToolCard } from "@/components/resources";
import { Scallop } from "@/components/shapes";
import SaveButton from "@/components/SaveButton";
import StickyProgress from "@/components/StickyProgress";
import ProgressDonut from "@/components/ProgressDonut";

type Props = {
  goalLabel: string;
  userName: string;
  pills: string[];
  templateId: string;
  phases: Phase[];
  steps: Step[];
  doneSteps: Set<string>;
  doneItems: Set<string>;
  savedIds: Set<string>;
  onToggleSaved: (id: string) => void;
  onOpenStep: (id: string) => void;
  onToggleStepDone: (id: string) => void;
  onOpenInternal: (screen: string) => void;
  onOpenResource: (resource: Resource) => void;
  disableSticky?: boolean;
};

const TASK_TONES = ["bg-banana-light", "bg-candy-light", "bg-green-light", "bg-aqua-light"];

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function checklistItemText(item: ChecklistItem) {
  return typeof item === "string" ? item : item.text;
}

// Lightweight **bold** markup so alert copy can emphasize a phrase (e.g. a
// call to action) without needing per-alert JSX.
function renderEmphasis(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-bold underline">
        {part}
      </strong>
    ) : (
      part
    )
  );
}

function collectStepResourceIds(step: Step) {
  const ids = new Set<string>();
  step.checklist.forEach((item) => {
    if (typeof item === "object" && item.resourceIds) {
      item.resourceIds.forEach((id) => ids.add(id));
    }
  });
  return ids;
}

// Every resource "in play" for this goal — checklist references plus each
// step's recommended tool/related guide — used to scope the Tools/Guides/
// Highlights sections to only what's actually relevant to the active goal.
function collectGoalResourceIds(steps: Step[]) {
  const ids = new Set<string>();
  steps.forEach((s) => {
    collectStepResourceIds(s).forEach((id) => ids.add(id));
    if (s.toolResourceId) ids.add(s.toolResourceId);
    if (s.relatedResourceId) ids.add(s.relatedResourceId);
  });
  return ids;
}

export default function Dashboard({
  goalLabel,
  userName,
  pills: rawPills,
  templateId,
  phases,
  steps,
  doneSteps,
  doneItems,
  savedIds,
  onToggleSaved,
  onOpenStep,
  onToggleStepDone,
  onOpenInternal,
  onOpenResource,
  disableSticky = false,
}: Props) {
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [activeAlertIndex, setActiveAlertIndex] = useState(0);

  const pills = rawPills.filter(Boolean);

  const progressPct = useMemo(() => goalProgressPct(steps, doneItems), [steps, doneItems]);

  const currentIndex = useMemo(() => currentPhaseIndex(phases, steps, doneSteps), [phases, steps, doneSteps]);

  // Goal-specific alert (if any) plus every global alert — global ones are
  // how the app stays "dynamic": drop a new tax-rule notice into
  // GLOBAL_ALERTS and it shows up for every goal without touching this
  // component. Shuffles through all of them so nothing gets buried.
  const goalAlert = GOAL_ALERTS[templateId];
  const alerts = useMemo(() => [...(goalAlert ? [goalAlert] : []), ...GLOBAL_ALERTS], [goalAlert]);
  const alert = alerts[activeAlertIndex % alerts.length];

  useEffect(() => {
    if (alerts.length < 2 || alertDismissed) return;
    const id = setInterval(() => {
      setActiveAlertIndex((i) => (i + 1) % alerts.length);
    }, 6000);
    return () => clearInterval(id);
  }, [alerts.length, alertDismissed]);

  // MVP scope: today's tasks are just the first couple of checklist items
  // from the first two steps, so there's always something concrete to
  // start with regardless of progress.
  const todaysTasks = useMemo(() => {
    const tasks: { key: string; text: string; step: Step }[] = [];
    steps.slice(0, 2).forEach((s) => {
      s.checklist.slice(0, 2).forEach((item, idx) => {
        tasks.push({ key: `${s.id}-${idx}`, text: checklistItemText(item), step: s });
      });
    });
    return tasks;
  }, [steps]);

  const goalResourceIds = useMemo(() => collectGoalResourceIds(steps), [steps]);
  const goalResources = useMemo(() => Object.values(RESOURCES).filter((r) => goalResourceIds.has(r.id)), [goalResourceIds]);

  // Guides already get their own dedicated showcase further down the page,
  // so Highlights sticks to tools and videos — the resources that otherwise
  // only surface buried inside a step's checklist.
  const featured = goalResources.filter((r) => r.featured && r.type !== "guide");
  // The two calculators are universally useful, not goal-specific, so they
  // always lead the list regardless of which goal is active.
  const CALCULATOR_IDS = ["tool-mortgage-calculator", "tool-remortgage-calculator"];
  const tools = [
    ...(CALCULATOR_IDS.map((id) => RESOURCES[id]) as ToolResource[]),
    ...goalResources.filter((r): r is ToolResource => r.type === "tool" && !CALCULATOR_IDS.includes(r.id)),
  ];
  const guides = goalResources.filter((r): r is GuideResource => r.type === "guide");

  return (
    <section className="min-h-screen">
      <main className="max-w-5xl mx-auto w-full px-6 pt-6 pb-24">
        {/* Alert */}
        {alert && !alertDismissed && (
          <div className="relative flex flex-col overflow-hidden rounded-[2rem] bg-aqua-light text-aqua-teal p-8 md:p-10 mb-8">
            <div key={alert.id} className="animate-alert-fade flex items-start gap-4">
              <span className="w-9 h-9 rounded-full bg-aqua-teal text-aqua-light flex items-center justify-center font-display flex-shrink-0">!</span>
              <div className="flex-1">
                <p className="font-display text-lg mb-1">{alert.title}</p>
                <p className="text-sm text-aqua-teal/80 leading-relaxed">{renderEmphasis(alert.desc)}</p>
              </div>
              <button onClick={() => setAlertDismissed(true)} className="text-aqua-teal/60 hover:text-aqua-teal text-sm flex-shrink-0" aria-label="Dismiss">
                ✕
              </button>
            </div>
            {alerts.length > 1 && (
              <div className="flex items-center gap-1.5 mt-5 pl-[52px]">
                {alerts.map((a, i) => (
                  <button
                    key={a.id}
                    onClick={() => setActiveAlertIndex(i)}
                    aria-label={`Show notification ${i + 1} of ${alerts.length}`}
                    className={`h-1.5 rounded-full transition-all ${i === activeAlertIndex % alerts.length ? "w-6 bg-aqua-teal" : "w-1.5 bg-aqua-teal/30"}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hero */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-green-woods px-8 py-12 md:rounded-[3.5rem] md:px-12 md:py-16 text-creamy mb-8">
          <Scallop
            fill="var(--color-green-med)"
            className="pointer-events-none absolute -bottom-16 -right-16 w-64 opacity-25"
          />
          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.14em] font-display text-banana-med mb-4">Your plan</p>
              <h1 className="font-display text-[clamp(1.9rem,4.5vw,3rem)] text-banana-med mb-3">
                Hi {userName || "there"}, we&rsquo;ve gathered everything you need.
              </h1>
              <p className="text-creamy/80 mb-4">
                <span className="font-semibold text-creamy">You told us:</span> {goalLabel || "Building a stronger financial future"}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-creamy/90 mb-4">
                <button onClick={() => scrollToSection("plan-section")} className="hover:text-creamy transition-colors">
                  <span className="font-display text-banana-med">{steps.length}</span> steps
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

            <ProgressDonut
              id="tour-progress"
              pct={progressPct}
              className="mx-auto md:mx-0 w-full max-w-[9rem] md:max-w-[11rem] aspect-square"
              caption="PROGRESS"
              captionClassName="text-creamy/70"
              valueClassName="font-display text-[clamp(1.5rem,4vw,2rem)] text-banana-med"
            />
          </div>
        </div>

        {/* Today's tasks */}
        {todaysTasks.length > 0 && (
          <div className="mb-8" id="tour-todays-tasks">
            <div className="flex items-center justify-between gap-4 mb-5">
              <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] text-candy-ruby">Today&rsquo;s tasks</h2>
              <button
                onClick={() => scrollToSection("plan-section")}
                className="text-sm font-semibold text-candy-ruby hover:underline flex-shrink-0"
              >
                See all →
              </button>
            </div>
            <div className="-mx-6 md:mx-0 px-6 md:px-0 flex gap-5 overflow-x-auto scrollbar-hide pb-2">
              {todaysTasks.map((task, i) => {
                const isDone = doneItems.has(task.key);
                return (
                  <button
                    key={task.key}
                    onClick={() => onOpenStep(task.step.id)}
                    className={`group relative text-left w-64 flex-shrink-0 rounded-[1.5rem] ${TASK_TONES[i % TASK_TONES.length]} border-2 border-transparent hover:border-ink/40 transition-colors pt-11 px-6 pb-6`}
                  >
                    <span className="absolute top-3 left-3 grid size-7 place-items-center rounded-full bg-white shadow-sm">
                      <span className="font-display text-xs text-candy-ruby">{i + 1}.</span>
                    </span>
                    <span
                      className={`absolute top-3 right-3 grid size-7 place-items-center rounded-full bg-white shadow-sm border-2 transition-colors ${
                        isDone ? "border-transparent" : "border-transparent group-hover:border-candy-ruby"
                      }`}
                    >
                      {isDone ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-green-woods">
                          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-candy-ruby">
                          <path
                            d="M7 2h10M7 22h10M8 2c0 4.5 3 6.2 4 6.2S16 6.5 16 2M8 22c0-4.5 3-6.2 4-6.2s4 1.7 4 6.2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span className={`tag tag-${task.step.tag.toLowerCase()} inline-block mb-3`}>{task.step.tag}</span>
                    <p className={`font-semibold text-sm text-candy-ruby leading-relaxed mb-3 ${isDone ? "line-through opacity-60" : ""}`}>
                      {task.text}
                    </p>
                    <p className="text-xs text-candy-ruby/55">
                      Step {task.step.n} · {task.step.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Journey */}
        <div className="rounded-t-[2rem] bg-banana-light p-8 pb-2 md:p-10 md:pb-2">
          <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] text-candy-ruby mb-8">Your journey</h2>
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {phases.map((p, i) => {
              const status = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
              return (
                <div key={p.id} className="contents">
                  <div className="flex flex-col items-center flex-shrink-0 w-24">
                    <span className={`phase-circle w-9 h-9 rounded-full grid place-items-center font-display text-sm flex-shrink-0 ${status}`}>
                      {status === "done" ? "✓" : i + 1}
                    </span>
                    <span className={`text-xs font-semibold mt-2.5 text-center ${status === "upcoming" ? "text-candy-ruby/50" : "text-candy-ruby"}`}>{p.label}</span>
                  </div>
                  {i < phases.length - 1 && <div className={`phase-line h-[2px] flex-1 min-w-[24px] ${i < currentIndex ? "done" : "bg-candy-ruby/15"}`} />}
                </div>
              );
            })}
          </div>
        </div>

        <StickyProgress phases={phases} steps={steps} doneSteps={doneSteps} doneItems={doneItems} disableSticky={disableSticky} />

        {/* Plan + Highlights */}
        <div className="md:grid md:grid-cols-3 md:gap-9 md:items-start mb-12">
          <div className="md:col-span-2 mb-12 md:mb-0" id="plan-section">
            <SectionHeading icon="plan" label="Your plan" />
            <div className="flex flex-col gap-3.5">
              {steps.map((s) => {
                const resources = [...collectStepResourceIds(s)].map((id) => RESOURCES[id]).filter(Boolean);
                const done = doneSteps.has(s.id);
                return (
                  <div
                    key={s.id}
                    className={`step-card flex gap-4 bg-surface rounded-20 border-2 border-transparent hover:border-ink/40 transition-colors p-5 md:p-6 cursor-pointer ${done ? "done" : ""}`}
                    onClick={() => onOpenStep(s.id)}
                  >
                    <button
                      className="step-check grid size-10 shrink-0 place-items-center rounded-full bg-green-woods mt-0.5 md:size-12"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleStepDone(s.id);
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
                  onOpenResource={onOpenResource}
                  onOpenInternal={onOpenInternal}
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
          {tools.length ? (
            <div className="-mx-8 md:-mx-10 px-8 md:px-10 flex gap-5 overflow-x-auto scrollbar-hide pb-2">
              {tools.map((t) => (
                <ToolCard
                  key={t.id}
                  tool={t}
                  saved={savedIds.has(t.id)}
                  onToggleSaved={() => onToggleSaved(t.id)}
                  onOpenInternal={onOpenInternal}
                  onOpenResource={onOpenResource}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-candy-ruby/65">No tools for this goal yet.</p>
          )}
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
            {guides.length ? (
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
            ) : (
              <p className="text-sm text-green-woods/70">No guides for this goal yet.</p>
            )}
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
