"use client";

import { useState } from "react";
import { phaseLabel, pointsForItem, RESOURCES } from "@/lib/data";
import { GuideCard, ResourceBubbleStack, ResourceRow, ToolCard } from "@/components/resources";
import type { GuideResource, Phase, Resource, Step, ToolResource } from "@/lib/types";
import Button from "@/components/ui/Button";
import StickyProgress from "@/components/StickyProgress";
import ConfirmDialog from "@/components/ConfirmDialog";

type Props = {
  steps: Step[];
  phases: Phase[];
  stepId: string;
  done: boolean;
  doneSteps: Set<string>;
  doneItems: Set<string>;
  onToggleItemDone: (key: string, points: number) => void;
  savedIds: Set<string>;
  onToggleSaved: (id: string) => void;
  onOpenResource: (resource: Resource) => void;
  onOpenInternal: (screen: string) => void;
  onBack: () => void;
  onToggleDone: () => void;
  disableSticky?: boolean;
};

export default function StepDetail({
  steps,
  phases,
  stepId,
  done,
  doneSteps,
  doneItems,
  onToggleItemDone,
  savedIds,
  onToggleSaved,
  onOpenResource,
  onOpenInternal,
  onBack,
  onToggleDone,
  disableSticky = false,
}: Props) {
  const step = steps.find((s) => s.id === stepId);
  const [expanded, setExpanded] = useState<number | null>(0);
  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!step) return null;

  const tool = step.toolResourceId ? (RESOURCES[step.toolResourceId] as ToolResource) : null;
  const relatedGuide = step.relatedResourceId ? (RESOURCES[step.relatedResourceId] as GuideResource) : null;

  return (
    <section className="min-h-screen">
      <div className="max-w-5xl mx-auto w-full px-6 pt-7 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back to plan
        </button>
        <span className="text-xs uppercase tracking-wide font-semibold text-inksoft">{phaseLabel(phases, step.phase)}</span>
      </div>

      <main className="max-w-5xl mx-auto w-full px-6 pb-24">
        <StickyProgress phases={phases} steps={steps} doneSteps={doneSteps} doneItems={doneItems} disableSticky={disableSticky} />

        <div className="flex items-center gap-3.5 mt-6 mb-3">
          <span className="w-11 h-11 rounded-full bg-brand text-black flex items-center justify-center font-display flex-shrink-0">{step.n}</span>
          <span className={`tag tag-${step.tag.toLowerCase()}`}>{step.tag}</span>
        </div>
        <h1 className="font-display uppercase text-2xl md:text-4xl mb-8 max-w-3xl">{step.title}</h1>

        <div className="md:grid md:grid-cols-3 md:gap-11 md:items-start">
          <aside className="order-1 md:order-2 md:col-span-1 mb-10 md:mb-0 md:sticky md:top-28 flex flex-col gap-5">
            <Button
              fullWidth
              variant={done ? "green" : "maroon"}
              className="md:self-start"
              onClick={() => (done ? onToggleDone() : setConfirmOpen(true))}
            >
              {done ? "Completed" : "Mark as done"}
            </Button>

            {tool && (
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-inksoft mb-3">Recommended tool</p>
                <ToolCard
                  tool={tool}
                  saved={savedIds.has(tool.id)}
                  onToggleSaved={() => onToggleSaved(tool.id)}
                  onOpenResource={onOpenResource}
                  onOpenInternal={onOpenInternal}
                />
              </div>
            )}

            {relatedGuide && (
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-inksoft mb-3">Read next</p>
                <GuideCard
                  guide={relatedGuide}
                  saved={savedIds.has(relatedGuide.id)}
                  onToggleSaved={() => onToggleSaved(relatedGuide.id)}
                  onOpenResource={onOpenResource}
                />
              </div>
            )}
          </aside>

          <div className="order-2 md:order-1 md:col-span-2">
            <p className="text-inksoft text-lg leading-relaxed mb-7">{step.detail}</p>

            <div className="rounded-[1.5rem] bg-aqua-light p-6 md:p-7 mb-9">
              <div className="flex items-center gap-2.5 mb-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-aqua-teal flex-shrink-0">
                  <path
                    d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.5.4.9 1 1 1.7l.1.5h5l.1-.5c.1-.7.5-1.3 1-1.7A6 6 0 0 0 12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="font-display uppercase text-sm text-aqua-teal">Why this matters</p>
              </div>
              <p className="text-[15px] leading-relaxed text-aqua-teal/80">{step.why}</p>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-wide font-semibold text-inksoft mb-4">Do this</h2>
              <ul className="flex flex-col gap-2.5">
                {step.checklist.map((item, idx) => {
                  const isObj = typeof item === "object";
                  const text = isObj ? item.text : item;
                  const resourceIds = isObj ? item.resourceIds : [];
                  const resources = resourceIds.map((id) => RESOURCES[id]).filter(Boolean);
                  const itemKey = `${step.id}-${idx}`;
                  const itemDone = doneItems.has(itemKey);
                  const points = Math.round(pointsForItem(steps, step));

                  const checkbox = (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleItemDone(itemKey, points);
                      }}
                      aria-label={itemDone ? "Mark task as not done" : "Mark task as done"}
                      className={`grid size-6 shrink-0 place-items-center rounded-full text-xs font-bold transition-colors ${
                        itemDone ? "bg-green-woods text-banana-med" : "bg-aqua-light text-aqua-teal"
                      }`}
                    >
                      {itemDone ? "✓" : idx + 1}
                    </button>
                  );

                  if (!resources.length) {
                    return (
                      <li
                        key={idx}
                        className="flex items-start gap-3.5 bg-surface rounded-20 border-2 border-ink/15 hover:border-ink/25 transition-colors px-5 py-4"
                      >
                        <span className="mt-0.5">{checkbox}</span>
                        <span className={`text-sm ${itemDone ? "line-through opacity-50" : ""}`}>{text}</span>
                      </li>
                    );
                  }

                  const isExpanded = expanded === idx;

                  return (
                    <li
                      key={idx}
                      className="bg-surface rounded-20 border-2 border-ink/15 hover:border-ink/25 transition-colors overflow-hidden"
                    >
                      <div className="group w-full flex items-center gap-3.5 px-5 py-4 hover:bg-canvas/60 transition-colors">
                        {checkbox}
                        <button
                          type="button"
                          className="flex-1 flex items-center gap-3.5 text-left"
                          onClick={() => setExpanded(isExpanded ? null : idx)}
                          aria-expanded={isExpanded}
                        >
                          <span className={`text-sm flex-1 ${itemDone ? "line-through opacity-50" : ""}`}>{text}</span>
                          {!isExpanded && <ResourceBubbleStack resources={resources} />}
                          <svg
                            className={`chevron flex-shrink-0 text-inksoft ${isExpanded ? "rotate-180" : ""}`}
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="px-5 pb-5 flex flex-col gap-2.5">
                          {resources.map((r) => (
                            <ResourceRow
                              key={r.id}
                              resource={r}
                              saved={savedIds.has(r.id)}
                              onToggleSaved={() => onToggleSaved(r.id)}
                              onOpenResource={onOpenResource}
                              onOpenInternal={onOpenInternal}
                            />
                          ))}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={confirmOpen}
        title="Mark this step as done?"
        description="This will tick off every item in this step's checklist."
        confirmLabel="Yes, mark as done"
        onConfirm={() => {
          setConfirmOpen(false);
          onToggleDone();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </section>
  );
}
