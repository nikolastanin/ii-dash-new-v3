"use client";

import { useState } from "react";
import { phaseLabel, RESOURCES, STEPS } from "@/lib/data";
import { GuideCard, ResourceBubbleStack, ResourceRow, ToolCard } from "@/components/resources";
import type { GuideResource, ToolResource } from "@/lib/types";
import Button from "@/components/ui/Button";
import StickyProgress from "@/components/StickyProgress";

type Props = {
  stepNumber: number;
  done: boolean;
  doneSteps: Set<number>;
  onBack: () => void;
  onToggleDone: () => void;
};

export default function StepDetail({ stepNumber, done, doneSteps, onBack, onToggleDone }: Props) {
  const step = STEPS.find((s) => s.n === stepNumber);
  const [expanded, setExpanded] = useState<number | null>(0);

  if (!step) return null;

  const tool = step.toolResourceId ? (RESOURCES[step.toolResourceId] as ToolResource) : null;
  const relatedGuide = step.relatedResourceId ? (RESOURCES[step.relatedResourceId] as GuideResource) : null;

  return (
    <section className="min-h-screen">
      <div className="max-w-5xl mx-auto w-full px-6 pt-7 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back to plan
        </button>
        <span className="text-xs uppercase tracking-wide font-semibold text-inksoft">{phaseLabel(step.phase)}</span>
      </div>

      <div className="max-w-5xl mx-auto w-full px-6">
        <StickyProgress doneSteps={doneSteps} />
      </div>

      <main className="max-w-5xl mx-auto w-full px-6 pb-24">
        <div className="flex items-center gap-3.5 mt-6 mb-3">
          <span className="w-11 h-11 rounded-full bg-brand text-black flex items-center justify-center font-display flex-shrink-0">{step.n}</span>
          <span className={`tag tag-${step.tag.toLowerCase()}`}>{step.tag}</span>
        </div>
        <h1 className="font-display uppercase text-2xl md:text-4xl mb-8 max-w-3xl">{step.title}</h1>

        <div className="md:grid md:grid-cols-3 md:gap-11 md:items-start">
          <aside className="order-1 md:order-2 md:col-span-1 mb-10 md:mb-0 md:sticky md:top-28 flex flex-col gap-5">
            <Button fullWidth variant={done ? "green" : "maroon"} className="md:self-start" onClick={onToggleDone}>
              {done ? "Completed" : "Mark as done"}
            </Button>

            {tool && (
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-inksoft mb-3">Recommended tool</p>
                <ToolCard tool={tool} />
              </div>
            )}

            {relatedGuide && (
              <div>
                <p className="text-xs uppercase tracking-wide font-semibold text-inksoft mb-3">Read next</p>
                <GuideCard guide={relatedGuide} />
              </div>
            )}
          </aside>

          <div className="order-2 md:order-1 md:col-span-2">
            <p className="text-inksoft text-lg leading-relaxed mb-7">{step.detail}</p>

            <div className="bg-surface rounded-20 border-2 border-ink/10 p-6 mb-9">
              <div className="flex items-center gap-2.5 mb-2.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-brand flex-shrink-0">
                  <path
                    d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.5.4.9 1 1 1.7l.1.5h5l.1-.5c.1-.7.5-1.3 1-1.7A6 6 0 0 0 12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="font-display uppercase text-sm">Why this matters</p>
              </div>
              <p className="text-[15px] leading-relaxed">{step.why}</p>
            </div>

            <div>
              <h2 className="text-xs uppercase tracking-wide font-semibold text-inksoft mb-4">Do this</h2>
              <ul className="flex flex-col gap-2.5">
                {step.checklist.map((item, idx) => {
                  const isObj = typeof item === "object";
                  const text = isObj ? item.text : item;
                  const resourceIds = isObj ? item.resourceIds : [];
                  const resources = resourceIds.map((id) => RESOURCES[id]).filter(Boolean);

                  if (!resources.length) {
                    return (
                      <li key={idx} className="flex items-start gap-3.5 bg-surface rounded-20 border-2 border-ink/10 px-5 py-4">
                        <span className="w-5 h-5 rounded-full bg-canvas flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{text}</span>
                      </li>
                    );
                  }

                  const isExpanded = expanded === idx;

                  return (
                    <li key={idx} className="bg-surface rounded-20 border-2 border-ink/10 overflow-hidden">
                      <button
                        type="button"
                        className="group w-full flex items-center gap-3.5 px-5 py-4 text-left hover:bg-canvas/60 transition-colors"
                        onClick={() => setExpanded(isExpanded ? null : idx)}
                        aria-expanded={isExpanded}
                      >
                        <span className="w-5 h-5 rounded-full bg-canvas border-2 border-transparent flex-shrink-0 transition-colors group-hover:border-green-woods" />
                        <span className="text-sm flex-1">{text}</span>
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
                      {isExpanded && (
                        <div className="px-5 pb-5 flex flex-col gap-2.5">
                          {resources.map((r) => (
                            <ResourceRow key={r.id} resource={r} />
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
    </section>
  );
}
