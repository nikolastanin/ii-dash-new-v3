import { currentPhaseIndex, goalProgressPct } from "@/lib/data";
import type { Phase, Step } from "@/lib/types";
import ProgressBar from "./ProgressBar";
import ProgressDonut from "./ProgressDonut";

type Props = {
  phases: Phase[];
  steps: Step[];
  doneSteps: Set<string>;
  doneItems: Set<string>;
};

export default function StickyProgress({ phases, steps, doneSteps, doneItems }: Props) {
  const label = phases[currentPhaseIndex(phases, steps, doneSteps)]?.label ?? "Your journey";
  const pct = goalProgressPct(steps, doneItems);
  return (
    <div
      className="sticky z-40 rounded-b-[2rem] bg-banana-light px-8 py-4 md:px-10 mb-8 flex items-center gap-5"
      style={{ top: "var(--header-h)" }}
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
