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
      <div className="max-w-xl mx-auto w-full px-6 pt-7 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back
        </button>
        <span className="text-xs text-inksoft">
          Step {step} of {TOTAL_STEPS}
        </span>
      </div>

      <main className="flex-1 max-w-xl mx-auto w-full px-6 py-10 flex flex-col">
        <div className="flex items-center gap-2.5 mb-12">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((i) => (
            <span key={i} className={`dot ${i === step ? "active" : i < step ? "filled" : ""}`} />
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="font-display uppercase text-2xl mb-3">What should we call you?</h2>
            <p className="text-inksoft mb-8">We&rsquo;ll use this on your plan — nothing else.</p>
            <input
              type="text"
              placeholder="Your first name"
              autoComplete="given-name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full bg-surface rounded-20 border-2 border-ink/15 px-5 py-4 text-lg outline-none mb-9 focus:border-green-woods transition-colors"
            />
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
            <h2 className="font-display uppercase text-2xl mb-8">{singleStep.question}</h2>
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
            <h2 className="font-display uppercase text-2xl mb-3">Anything you&rsquo;re specifically worried about?</h2>
            <p className="text-inksoft mb-8">Pick as many as apply.</p>
            <div className="flex flex-wrap gap-2.5 mb-10">
              {WORRIES.map((w) => (
                <button
                  key={w}
                  className={`chip bg-surface border-2 border-ink/15 rounded-full px-5 py-2.5 text-sm hover:border-ink/40 transition-colors ${
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
      </main>
    </section>
  );
}
