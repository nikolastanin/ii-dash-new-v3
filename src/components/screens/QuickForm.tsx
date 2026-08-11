"use client";

import { useState } from "react";
import type { QuickFormState } from "@/lib/types";
import Button from "@/components/ui/Button";

const TOTAL_STEPS = 7;

const SINGLE_SELECT_STEPS: {
  step: number;
  field: keyof QuickFormState;
  question: string;
  options: { label: string; value: string }[];
}[] = [
  {
    step: 2,
    field: "goalLabel",
    question: "What's your main goal right now?",
    options: [
      { label: "Retire comfortably", value: "Retire comfortably" },
      { label: "Start investing for the first time", value: "Start investing for the first time" },
      { label: "Grow my savings", value: "Grow my savings" },
      { label: "Get out of debt", value: "Get out of debt" },
      { label: "Save for a home", value: "Save for a home" },
    ],
  },
  {
    step: 3,
    field: "timeframe",
    question: "When would you like to reach it?",
    options: [
      { label: "Within 1 year", value: "Within 1 year" },
      { label: "1–5 years", value: "1–5 years" },
      { label: "5–15 years", value: "5–15 years" },
      { label: "15+ years", value: "15+ years" },
    ],
  },
  {
    step: 4,
    field: "experience",
    question: "How confident do you feel with money and investing?",
    options: [
      { label: "Beginner — still learning the basics", value: "Beginner" },
      { label: "Some experience", value: "Some experience" },
      { label: "Confident", value: "Confident" },
    ],
  },
  {
    step: 5,
    field: "investing",
    question: "Do you already invest or save regularly?",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
      { label: "Not sure", value: "Not sure" },
    ],
  },
  {
    step: 6,
    field: "risk",
    question: "How much risk are you comfortable taking?",
    options: [
      { label: "Low — I'd rather not see it drop", value: "Low" },
      { label: "Medium — some ups and downs are fine", value: "Medium" },
      { label: "High — I'm playing the long game", value: "High" },
    ],
  },
];

const WORRIES = ["Tax", "Pension", "Debt", "ISA allowance rules", "Nothing specific"];

type Props = {
  formState: QuickFormState;
  onBack: () => void;
  onSubmitName: (name: string) => void;
  onSelectSingle: (field: keyof QuickFormState, value: string) => void;
  onToggleChip: (label: string) => void;
  onBuildPlan: () => void;
};

export default function QuickForm({ formState, onBack, onSubmitName, onSelectSingle, onToggleChip, onBuildPlan }: Props) {
  const [step, setStep] = useState(1);
  const [nameInput, setNameInput] = useState("");

  function selectAndAdvance(field: keyof QuickFormState, value: string) {
    onSelectSingle(field, value);
    setTimeout(() => setStep((s) => Math.min(s + 1, TOTAL_STEPS)), 300);
  }

  const singleStep = SINGLE_SELECT_STEPS.find((s) => s.step === step);

  return (
    <section className="min-h-screen flex flex-col">
      <div className="max-w-5xl mx-auto w-full px-6 pt-7 pb-3">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back
        </button>
      </div>

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pb-10 flex flex-col">
        <div className="rounded-[2.5rem] bg-aqua-light px-6 py-10 md:rounded-[3rem] md:px-10 md:py-12">
          <div className="flex items-baseline justify-between font-sans text-sm font-semibold text-aqua-teal">
            <span>Your plan</span>
            <span>
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-aqua-teal/15">
            <div
              className="h-full rounded-full bg-green-woods transition-[width] duration-300 ease-out"
              style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            />
          </div>

          <div className="mt-8 rounded-[2rem] bg-creamy p-7 md:p-10">
            {step === 1 && (
              <div>
                <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-candy-ruby mb-3">What should we call you?</h2>
                <p className="text-candy-ruby/70 mb-8">We&rsquo;ll use this on your plan — nothing else.</p>
                <div className="flex items-center gap-3 rounded-full border-2 border-ink/15 px-6 focus-within:border-green-woods transition-colors mb-9">
                  <input
                    type="text"
                    placeholder="Your first name"
                    autoComplete="given-name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="h-16 w-full bg-transparent font-display text-2xl text-candy-ruby placeholder:text-candy-ruby/40 outline-none"
                  />
                </div>
                <Button
                  onClick={() => {
                    onSubmitName(nameInput.trim() || "there");
                    setStep(2);
                  }}
                >
                  Continue
                </Button>
              </div>
            )}

            {singleStep && (
              <div>
                <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-candy-ruby mb-8">{singleStep.question}</h2>
                <div className="flex flex-col gap-3.5">
                  {singleStep.options.map((opt) => (
                    <button
                      key={opt.value}
                      className={`option-pill text-left bg-surface border-2 border-ink/15 rounded-20 px-6 py-4 hover:border-ink/40 transition-colors ${
                        formState[singleStep.field] === opt.value ? "selected" : ""
                      }`}
                      onClick={() => selectAndAdvance(singleStep.field, opt.value)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 7 && (
              <div>
                <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-candy-ruby mb-3">Anything you&rsquo;re specifically worried about?</h2>
                <p className="text-candy-ruby/70 mb-8">Pick as many as apply.</p>
                <div className="flex flex-wrap gap-3 mb-10">
                  {WORRIES.map((w) => (
                    <button
                      key={w}
                      className={`chip bg-surface border-2 border-ink/15 rounded-full h-12 px-6 font-display text-lg hover:border-ink/40 transition-colors ${
                        formState.worries.includes(w) ? "selected" : ""
                      }`}
                      onClick={() => onToggleChip(w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
                <Button onClick={onBuildPlan}>Build my plan</Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </section>
  );
}
