"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import HowItWorks from "@/components/calculator/HowItWorks";
import { gbp, monthlyRepayment } from "@/lib/mortgage-math";

/* ---------------------------------------------------------------
   Three questions, then an estimated budget.

   PLACEHOLDER ASSUMPTIONS — all four need signing off before launch.
   Income multiples vary by lender and by case, and the rate has to be
   sourced and dated, not hardcoded. Ported as-is from mortgageinsiders.
--------------------------------------------------------------- */
const MULTIPLE_MIN = 2;
const MULTIPLE_COMFORTABLE = 4;
const MULTIPLE_MAX = 5.5;
const MARKET_RATE = 4.85;

const DEPOSIT_CHIPS = [20_000, 40_000, 60_000, 80_000];

const RANGE_CLASS =
  "h-3 w-full cursor-pointer appearance-none rounded-full bg-candy-light " +
  "[&::-webkit-slider-thumb]:size-7 [&::-webkit-slider-thumb]:appearance-none " +
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-woods " +
  "[&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-creamy " +
  "[&::-moz-range-thumb]:size-7 [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-creamy " +
  "[&::-moz-range-thumb]:bg-green-woods";

type Step = 1 | 2 | 3 | "results";

type Props = {
  onBack: () => void;
};

export default function MortgageCalculator({ onBack }: Props) {
  const depositId = useId();
  const incomeId = useId();
  const termId = useId();
  const borrowId = useId();

  const [step, setStep] = useState<Step>(1);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const prevStep = useRef(step);
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    headingRef.current?.focus();
  }, [step]);

  const [deposit, setDeposit] = useState(40_000);
  const [income, setIncome] = useState(75_000);
  const [term, setTerm] = useState(25);

  const floor = Math.round(income * MULTIPLE_MIN);
  const comfortable = Math.round(income * MULTIPLE_COMFORTABLE);
  const ceiling = Math.round(income * MULTIPLE_MAX);

  const [borrowing, setBorrowing] = useState<number | null>(null);
  const loan = borrowing ?? comfortable;

  const budget = loan + deposit;
  const ltv = budget > 0 ? (loan / budget) * 100 : 0;
  const monthly = useMemo(() => monthlyRepayment(loan, MARKET_RATE, term), [loan, term]);

  const stepNumber = step === "results" ? 3 : step;
  const progress = step === "results" ? 100 : (stepNumber / 3) * 100;

  const R = 78;
  const CIRC = 2 * Math.PI * R;
  const depositShare = budget > 0 ? deposit / budget : 0;

  return (
    <section className="min-h-screen">
      <div className="max-w-5xl mx-auto w-full px-6 pt-7 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back to plan
        </button>
      </div>

      <main className="max-w-5xl mx-auto w-full px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-green-light px-6 py-12 md:rounded-[3.5rem] md:px-12 md:py-16">
          {step !== "results" && (
            <>
              <div className="flex items-baseline justify-between font-sans text-sm font-semibold text-green-woods">
                <span>Mortgage Calculator</span>
                <span>Step {stepNumber} of 3</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={stepNumber}
                aria-valuemin={1}
                aria-valuemax={3}
                aria-label={`Step ${stepNumber} of 3`}
                className="mt-3 h-2 w-full overflow-hidden rounded-full bg-green-woods/15"
              >
                <div className="h-full rounded-full bg-green-woods transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
              </div>
              <p aria-live="polite" className="sr-only">
                Step {stepNumber} of 3
              </p>

              <div className="mt-8 rounded-[2rem] bg-creamy p-7 md:p-12">
                {step === 1 && (
                  <>
                    <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby focus:outline-none">
                      Your deposit?
                    </h1>
                    <p className="mt-3 font-sans text-base text-candy-ruby/70">Keep savings back for moving costs, fees and stamp duty.</p>

                    <label htmlFor={depositId} className="sr-only">
                      Deposit
                    </label>
                    <div className="mt-7 flex items-center gap-3 rounded-full border-2 border-candy-ruby/15 px-6 focus-within:border-green-woods">
                      <span className="font-display text-2xl text-candy-ruby/65">£</span>
                      <input
                        id={depositId}
                        type="text"
                        inputMode="numeric"
                        value={deposit.toLocaleString("en-GB")}
                        onChange={(e) => {
                          const n = Number(e.target.value.replace(/[^\d]/g, ""));
                          setDeposit(Number.isFinite(n) ? n : 0);
                          setBorrowing(null);
                        }}
                        className="h-16 w-full bg-transparent font-display text-2xl text-candy-ruby focus:outline-none md:text-3xl"
                      />
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      {DEPOSIT_CHIPS.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => {
                            setDeposit(v);
                            setBorrowing(null);
                          }}
                          className={`h-12 rounded-full border-2 px-6 font-display text-lg transition-colors ${
                            deposit === v ? "border-green-woods bg-green-woods text-banana-med" : "border-candy-ruby/15 text-candy-ruby hover:border-candy-ruby/40"
                          }`}
                        >
                          £{v / 1000}k
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby focus:outline-none">
                      Household income?
                    </h1>
                    <p className="mt-3 font-sans text-base text-candy-ruby/70">Annual salary before tax. With a partner? Add both.</p>

                    <label htmlFor={incomeId} className="sr-only">
                      Household income
                    </label>
                    <div className="mt-7 flex items-center gap-3 rounded-full border-2 border-candy-ruby/15 px-6 focus-within:border-green-woods">
                      <span className="font-display text-2xl text-candy-ruby/65">£</span>
                      <input
                        id={incomeId}
                        type="text"
                        inputMode="numeric"
                        value={income.toLocaleString("en-GB")}
                        onChange={(e) => {
                          const n = Number(e.target.value.replace(/[^\d]/g, ""));
                          setIncome(Number.isFinite(n) ? n : 0);
                          setBorrowing(null);
                        }}
                        className="h-16 w-full bg-transparent font-display text-2xl text-candy-ruby focus:outline-none md:text-3xl"
                      />
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby focus:outline-none">
                      What mortgage term?
                    </h1>
                    <p className="mt-3 font-sans text-base text-candy-ruby/70">Longer term = lower payments but more interest. Most choose 25-30 years.</p>

                    <div className="mt-9 flex items-baseline justify-between">
                      <label htmlFor={termId} className="font-sans text-sm font-semibold text-candy-ruby/70">
                        Mortgage term
                      </label>
                      <output htmlFor={termId} className="font-display text-3xl text-candy-ruby">
                        {term} years
                      </output>
                    </div>
                    <input
                      id={termId}
                      type="range"
                      min={10}
                      max={35}
                      step={1}
                      value={term}
                      onChange={(e) => setTerm(Number(e.target.value))}
                      className={`mt-4 ${RANGE_CLASS}`}
                    />
                    <div className="mt-2 flex justify-between font-sans text-xs text-candy-ruby/65">
                      <span>10 years</span>
                      <span>35 years</span>
                    </div>
                  </>
                )}

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-candy-ruby/10 pt-7">
                  {step > 1 ? (
                    <button type="button" onClick={() => setStep((s) => ((s as number) - 1) as Step)} className="font-sans text-sm font-semibold text-candy-ruby/70 underline underline-offset-4">
                      ← Back
                    </button>
                  ) : (
                    <span />
                  )}

                  <Button variant="green" onClick={() => setStep(step === 3 ? "results" : (((step as number) + 1) as Step))}>
                    {step === 3 ? "See My Results" : "Next"}
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === "results" && (
            <>
              <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2.25rem,6vw,4.5rem)] text-candy-ruby focus:outline-none">
                Here&rsquo;s how much you could borrow.
              </h1>

              <div className="mt-8 grid gap-8 rounded-[2rem] bg-creamy p-7 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
                <div>
                  <div className="relative mx-auto w-full max-w-[16rem]">
                    <svg viewBox="0 0 200 200" className="w-full -rotate-90">
                      <circle cx="100" cy="100" r={R} fill="none" stroke="var(--color-candy-med)" strokeWidth="22" />
                      <circle
                        cx="100"
                        cy="100"
                        r={R}
                        fill="none"
                        stroke="var(--color-green-med)"
                        strokeWidth="22"
                        strokeLinecap="round"
                        strokeDasharray={`${depositShare * CIRC} ${CIRC}`}
                        className="transition-[stroke-dasharray] duration-300 ease-out"
                      />
                    </svg>
                    <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                      <div>
                        <p className="font-sans text-xs font-semibold text-candy-ruby/65">PROPERTY BUDGET</p>
                        <p className="font-display text-[clamp(1.75rem,4vw,2.5rem)] text-candy-ruby">{gbp.format(budget)}</p>
                      </div>
                    </div>
                  </div>

                  <dl className="mt-6 space-y-2 font-sans text-sm">
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-2 text-candy-ruby/70">
                        <span className="size-3 rounded-full bg-candy-med" />
                        Mortgage
                      </dt>
                      <dd className="font-semibold text-candy-ruby">{gbp.format(loan)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-2 text-candy-ruby/70">
                        <span className="size-3 rounded-full bg-green-med" />
                        Your deposit
                      </dt>
                      <dd className="font-semibold text-candy-ruby">{gbp.format(deposit)}</dd>
                    </div>
                  </dl>
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <label htmlFor={borrowId} className="font-sans text-sm font-semibold text-candy-ruby/70">
                      ADJUST YOUR BORROWING
                    </label>
                    <span className="font-sans text-sm font-semibold text-candy-ruby">{ltv.toFixed(0)}% LTV</span>
                  </div>
                  <input
                    id={borrowId}
                    type="range"
                    min={floor}
                    max={ceiling}
                    step={1000}
                    value={loan}
                    onChange={(e) => setBorrowing(Number(e.target.value))}
                    className={`mt-4 ${RANGE_CLASS}`}
                  />
                  <div className="mt-2 flex items-start justify-between font-sans text-xs text-candy-ruby/65">
                    <span>{gbp.format(floor)}</span>
                    <span className="text-center font-semibold text-green-woods">
                      COMFORTABLE
                      <span className="block font-normal text-candy-ruby/65">{gbp.format(comfortable)}</span>
                    </span>
                    <span>{gbp.format(ceiling)}</span>
                  </div>

                  <div className="mt-7 rounded-[1.5rem] bg-green-woods p-7 text-center">
                    <p className="font-sans text-sm text-creamy/70">ESTIMATED MONTHLY PAYMENT</p>
                    <p className="mt-2 font-display text-[clamp(2.5rem,8vw,4rem)] leading-none text-banana-med" aria-live="polite">
                      {Number.isFinite(monthly) ? gbp.format(monthly) : "—"}
                      <span className="font-sans text-lg font-semibold text-creamy/70">/month</span>
                    </p>
                    <p className="mt-3 font-sans text-xs text-creamy/60">Based on a market rate of {MARKET_RATE}%</p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <p
                      className={`inline-flex rounded-full px-4 py-2 font-sans text-sm font-semibold ${
                        loan <= comfortable ? "bg-green-light text-green-woods" : "bg-candy-light text-candy-ruby"
                      }`}
                    >
                      {loan <= comfortable ? "Within your comfortable range" : "Above your comfortable range"}
                    </p>
                    <button type="button" className="font-sans text-sm font-semibold text-candy-ruby underline underline-offset-4">
                      Make this more accurate →
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button variant="green">Get matched with an advisor</Button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setBorrowing(null);
                  }}
                  className="font-sans text-sm font-semibold text-candy-ruby underline underline-offset-4"
                >
                  Start again
                </button>
              </div>
            </>
          )}

          <p className="mt-8 font-sans text-xs leading-relaxed text-green-woods">
            This is an estimate, not mortgage advice, an offer of credit or a decision in principle. What you can actually borrow
            depends on your income, spending, credit history and each lender&rsquo;s own criteria.{" "}
            <strong className="font-semibold">Your home may be repossessed if you do not keep up repayments on your mortgage.</strong>
            <br />
            <span className="text-green-woods">Placeholder wording, income multiples and rate. All four to be signed off by compliance before launch.</span>
          </p>
        </div>

        <div className="mt-8">
          <HowItWorks tone="green" />
        </div>
      </main>
    </section>
  );
}
