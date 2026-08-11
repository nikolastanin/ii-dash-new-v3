"use client";

import { GOAL_TEMPLATES } from "@/lib/data";
import type { GoalInstance } from "@/lib/types";
import ProgressBar from "@/components/ProgressBar";

type Props = {
  goals: GoalInstance[];
  onSelectGoal: (id: string) => void;
  onAddGoal: () => void;
  onBack: () => void;
};

const TEMPLATE_TONE: Record<string, { bg: string; text: string }> = {
  "grow-savings": { bg: "bg-green-light", text: "text-green-woods" },
  debt: { bg: "bg-banana-light", text: "text-candy-ruby" },
  home: { bg: "bg-candy-light", text: "text-candy-ruby" },
};

export default function Goals({ goals, onSelectGoal, onAddGoal, onBack }: Props) {
  return (
    <section className="min-h-screen">
      <div className="max-w-5xl mx-auto w-full px-6 pt-7 pb-3">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back
        </button>
      </div>

      <main className="max-w-5xl mx-auto w-full px-6 pb-24">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] text-candy-ruby mb-3">Your goals</h1>
        <p className="text-inksoft text-lg mb-10 max-w-xl">
          Each goal gets its own plan, checklist and set of resources. Switch between them any time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {goals.map((g) => {
            const template = GOAL_TEMPLATES[g.templateId];
            const total = template?.steps.length ?? 0;
            const done = g.doneSteps.size;
            const tone = TEMPLATE_TONE[g.templateId] ?? { bg: "bg-surface", text: "text-candy-ruby" };
            return (
              <button
                key={g.id}
                onClick={() => onSelectGoal(g.id)}
                className="text-left bg-surface rounded-[2rem] border-2 border-transparent hover:border-ink/40 transition-colors p-7"
              >
                <span className={`inline-block text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1 mb-4 ${tone.bg} ${tone.text}`}>
                  {template?.label ?? g.label}
                </span>
                <h2 className="font-display text-xl text-candy-ruby mb-4">{g.label}</h2>
                <div className="flex items-center justify-between text-xs font-semibold text-candy-ruby/70 mb-2">
                  <span>Progress</span>
                  <span>
                    {done} of {total} steps
                  </span>
                </div>
                <ProgressBar done={done} total={total} />
              </button>
            );
          })}

          <button
            onClick={onAddGoal}
            className="text-left rounded-[2rem] border-2 border-dashed border-ink/25 hover:border-ink/50 transition-colors p-7 flex flex-col items-start justify-center gap-2 min-h-[10rem]"
          >
            <span className="w-9 h-9 rounded-full bg-green-light text-green-woods flex items-center justify-center font-display text-lg">+</span>
            <span className="font-display text-lg text-candy-ruby">Add a goal</span>
            <span className="text-sm text-inksoft">Answer a few quick questions to build a new plan.</span>
          </button>
        </div>
      </main>
    </section>
  );
}
