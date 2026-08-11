import { PHASES, STEPS, currentPhaseIndex } from "@/lib/data";
import ProgressBar from "./ProgressBar";

export default function StickyProgress({ doneSteps }: { doneSteps: Set<number> }) {
  const label = PHASES[currentPhaseIndex(doneSteps)]?.label ?? "Your journey";
  return (
    <div className="sticky z-40 rounded-b-[2rem] bg-banana-light px-8 py-4 md:px-10 mb-8" style={{ top: "var(--header-h)" }}>
      <div className="flex items-center justify-between gap-4 text-xs font-semibold text-candy-ruby/80 mb-2">
        <span>{label}</span>
        <span>
          {doneSteps.size} of {STEPS.length} steps
        </span>
      </div>
      <ProgressBar done={doneSteps.size} total={STEPS.length} />
    </div>
  );
}
