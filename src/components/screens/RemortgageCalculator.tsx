"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import HowItWorks from "@/components/calculator/HowItWorks";
import { gbp, monthlyRepayment } from "@/lib/mortgage-math";

/* ---------------------------------------------------------------
   Four steps, mirroring the mortgageinsiders remortgage flow.

   PLACEHOLDER ASSUMPTIONS — the two rates decide what saving a user
   is shown, so both need sourcing and dating before launch.
--------------------------------------------------------------- */
const NEW_RATE = 4.35;
const SVR_FALLBACK = 7.99;

const VALUE_CHIPS = [200_000, 300_000, 400_000, 500_000];

const STAGES = [
  { icon: "🔍", label: "Just exploring options" },
  { icon: "🏠", label: "My fixed rate ends in the next year" },
  { icon: "⚡", label: "My fixed rate ends in the next 3 months" },
];

const LENDERS = [
  "Nationwide",
  "Halifax",
  "HSBC",
  "Barclays",
  "Santander",
  "NatWest",
  "Lloyds Bank",
  "TSB",
  "First Direct",
  "Virgin Money",
  "Metro Bank",
  "Skipton Building Society",
  "Yorkshire Building Society",
  "Coventry Building Society",
  "Newcastle Building Society",
  "Other",
];

const WHAT_NEXT = [
  "See remortgage options from our market scan on the next page",
  "Compare rates and see your potential savings",
  "We'll reach out via WhatsApp to match you with an FCA-regulated remortgage specialist",
  "Your information is secure and handled in accordance with our privacy policy",
];

const inputShell = "flex items-center gap-3 rounded-full border-2 border-candy-ruby/15 px-6 focus-within:border-green-woods";
const inputField = "h-16 w-full bg-transparent font-display text-2xl text-candy-ruby focus:outline-none md:text-3xl";
const rangeStyle =
  "h-3 w-full cursor-pointer appearance-none rounded-full bg-candy-light " +
  "[&::-webkit-slider-thumb]:size-7 [&::-webkit-slider-thumb]:appearance-none " +
  "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-woods " +
  "[&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-creamy " +
  "[&::-moz-range-thumb]:size-7 [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-creamy " +
  "[&::-moz-range-thumb]:bg-green-woods";

type Step = 1 | 2 | 3 | 4 | "results";

type Props = {
  onBack: () => void;
};

export default function RemortgageCalculator({ onBack }: Props) {
  const valueId = useId();
  const balanceId = useId();
  const termId = useId();
  const rateId = useId();
  const paymentId = useId();
  const lenderId = useId();
  const equityId = useId();
  const optInId = useId();
  const consentId = useId();

  const [step, setStep] = useState<Step>(1);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const prevStep = useRef(step);
  useEffect(() => {
    if (prevStep.current === step) return;
    prevStep.current = step;
    headingRef.current?.focus();
  }, [step]);

  const [value, setValue] = useState(450_000);
  const [balance, setBalance] = useState(350_000);
  const [stage, setStage] = useState<number | null>(null);
  const [term, setTerm] = useState(20);
  const [currentRate, setCurrentRate] = useState("");
  const [currentPayment, setCurrentPayment] = useState("");
  const [lender, setLender] = useState("");
  const [releaseEquity, setReleaseEquity] = useState(false);

  const ltv = value > 0 ? (balance / value) * 100 : 0;

  const newMonthly = useMemo(() => monthlyRepayment(balance, NEW_RATE, term), [balance, term]);
  const comparisonRate = currentRate ? Number(currentRate) : SVR_FALLBACK;
  const currentMonthly = currentPayment ? Number(currentPayment.replace(/[^\d.]/g, "")) : monthlyRepayment(balance, comparisonRate, term);
  const saving = currentMonthly - newMonthly;

  const stepNumber = step === "results" ? 4 : step;
  const progress = step === "results" ? 100 : (stepNumber / 4) * 100;

  return (
    <section className="min-h-screen">
      <div className="max-w-5xl mx-auto w-full px-6 pt-7 pb-3 flex items-center justify-between">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back to plan
        </button>
      </div>

      <main className="max-w-5xl mx-auto w-full px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-aqua-light px-6 py-12 md:rounded-[3.5rem] md:px-12 md:py-16">
          {step !== "results" && (
            <>
              <div className="flex items-baseline justify-between font-sans text-sm font-semibold text-aqua-teal">
                <span>Remortgage Calculator</span>
                <span>Step {stepNumber} of 4</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={stepNumber}
                aria-valuemin={1}
                aria-valuemax={4}
                aria-label={`Step ${stepNumber} of 4`}
                className="mt-3 h-2 w-full overflow-hidden rounded-full bg-aqua-teal/15"
              >
                <div className="h-full rounded-full bg-green-woods transition-[width] duration-300 ease-out" style={{ width: `${progress}%` }} />
              </div>
              <p aria-live="polite" className="sr-only">
                Step {stepNumber} of 4
              </p>

              <div className="mt-8 rounded-[2rem] bg-creamy p-7 md:p-12">
                {step === 1 && (
                  <>
                    <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby focus:outline-none">
                      Property details
                    </h1>
                    <p className="mt-3 font-sans text-base text-candy-ruby/70">Let&rsquo;s start with your property value and outstanding balance.</p>

                    <label htmlFor={valueId} className="mt-8 block font-sans text-sm font-semibold text-candy-ruby">
                      Property value
                    </label>
                    <div className={`mt-2 ${inputShell}`}>
                      <span className="font-display text-2xl text-candy-ruby/65">£</span>
                      <input
                        id={valueId}
                        type="text"
                        inputMode="numeric"
                        value={value.toLocaleString("en-GB")}
                        onChange={(e) => setValue(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
                        className={inputField}
                      />
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {VALUE_CHIPS.map((v) => (
                        <button
                          key={v}
                          type="button"
                          onClick={() => setValue(v)}
                          className={`h-12 rounded-full border-2 px-6 font-display text-lg transition-colors ${
                            value === v ? "border-green-woods bg-green-woods text-banana-med" : "border-candy-ruby/15 text-candy-ruby hover:border-candy-ruby/40"
                          }`}
                        >
                          £{v / 1000}k
                        </button>
                      ))}
                    </div>

                    <label htmlFor={balanceId} className="mt-8 block font-sans text-sm font-semibold text-candy-ruby">
                      Outstanding mortgage balance
                    </label>
                    <div className={`mt-2 ${inputShell}`}>
                      <span className="font-display text-2xl text-candy-ruby/65">£</span>
                      <input
                        id={balanceId}
                        type="text"
                        inputMode="numeric"
                        value={balance.toLocaleString("en-GB")}
                        onChange={(e) => setBalance(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
                        className={inputField}
                      />
                    </div>
                    <p className="mt-2 font-sans text-xs text-candy-ruby/65">Check your latest mortgage statement</p>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby focus:outline-none">
                      Where are you in the process?
                    </h1>
                    <p className="mt-3 font-sans text-base text-candy-ruby/70">This helps us prioritise your enquiry appropriately.</p>

                    <div className="mt-8 grid gap-3">
                      {STAGES.map((s, i) => (
                        <button
                          key={s.label}
                          type="button"
                          onClick={() => {
                            setStage(i);
                            setStep(3);
                          }}
                          className={`flex items-center gap-4 rounded-[1.5rem] border-2 p-6 text-left transition-colors ${
                            stage === i ? "border-green-woods bg-green-light" : "border-candy-ruby/15 hover:border-candy-ruby/40"
                          }`}
                        >
                          <span className="text-3xl" aria-hidden="true">
                            {s.icon}
                          </span>
                          <span className="font-display text-xl text-candy-ruby md:text-2xl">{s.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby focus:outline-none">
                      Your current mortgage
                    </h1>
                    <p className="mt-3 font-sans text-base text-candy-ruby/70">Help us understand your existing deal.</p>

                    <div className="mt-8 flex items-baseline justify-between">
                      <label htmlFor={termId} className="font-sans text-sm font-semibold text-candy-ruby">
                        Remaining term (years)
                      </label>
                      <output htmlFor={termId} className="font-display text-2xl text-candy-ruby">
                        {term} years
                      </output>
                    </div>
                    <input
                      id={termId}
                      type="range"
                      min={5}
                      max={35}
                      step={1}
                      value={term}
                      onChange={(e) => setTerm(Number(e.target.value))}
                      className={`mt-3 ${rangeStyle}`}
                    />
                    <div className="mt-2 flex justify-between font-sans text-xs text-candy-ruby/65">
                      <span>5 years</span>
                      <span>35 years</span>
                    </div>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                      <div>
                        <label htmlFor={rateId} className="block font-sans text-sm font-semibold text-candy-ruby">
                          Current rate (optional)
                        </label>
                        <div className={`mt-2 ${inputShell}`}>
                          <input
                            id={rateId}
                            type="text"
                            inputMode="decimal"
                            placeholder="5.5"
                            value={currentRate}
                            onChange={(e) => setCurrentRate(e.target.value.replace(/[^\d.]/g, ""))}
                            className={inputField}
                          />
                          <span className="font-display text-2xl text-candy-ruby/65">%</span>
                        </div>
                      </div>

                      <div>
                        <label htmlFor={paymentId} className="block font-sans text-sm font-semibold text-candy-ruby">
                          Current monthly payment (optional)
                        </label>
                        <div className={`mt-2 ${inputShell}`}>
                          <span className="font-display text-2xl text-candy-ruby/65">£</span>
                          <input
                            id={paymentId}
                            type="text"
                            inputMode="numeric"
                            placeholder="2,200"
                            value={currentPayment}
                            onChange={(e) => setCurrentPayment(e.target.value.replace(/[^\d]/g, ""))}
                            className={inputField}
                          />
                        </div>
                      </div>
                    </div>

                    <label htmlFor={lenderId} className="mt-6 block font-sans text-sm font-semibold text-candy-ruby">
                      Current lender (optional)
                    </label>
                    <select
                      id={lenderId}
                      value={lender}
                      onChange={(e) => setLender(e.target.value)}
                      className="mt-2 h-16 w-full rounded-full border-2 border-candy-ruby/15 bg-creamy px-6 font-sans text-base text-candy-ruby focus:border-green-woods focus:outline-none"
                    >
                      <option value="">Select your lender</option>
                      {LENDERS.map((l) => (
                        <option key={l}>{l}</option>
                      ))}
                    </select>
                    <p className="mt-2 font-sans text-xs text-candy-ruby/65">
                      Helps us show your potential Standard Variable Rate (SVR) if you don&rsquo;t switch
                    </p>

                    <div className="mt-7 flex items-start gap-3 rounded-[1.5rem] bg-green-light p-6">
                      <input
                        id={equityId}
                        type="checkbox"
                        checked={releaseEquity}
                        onChange={(e) => setReleaseEquity(e.target.checked)}
                        className="mt-1 size-5 shrink-0 rounded border-2 border-green-woods/30 accent-green-woods"
                      />
                      <label htmlFor={equityId}>
                        <span className="block font-sans text-base font-semibold text-green-woods">I want to release equity (borrow more)</span>
                        <span className="mt-1 block font-sans text-sm text-aqua-teal">For home improvements, debt consolidation, or other purposes</span>
                      </label>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <>
                    <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby focus:outline-none">
                      Contact details
                    </h1>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {["First name", "Last name"].map((p) => (
                        <input
                          key={p}
                          type="text"
                          placeholder={p}
                          aria-label={p}
                          className="h-16 rounded-full border-2 border-candy-ruby/15 bg-creamy px-6 font-sans text-base text-candy-ruby placeholder:text-candy-ruby/65 focus:border-green-woods focus:outline-none"
                        />
                      ))}
                      <input
                        type="email"
                        placeholder="Email address"
                        aria-label="Email address"
                        className="h-16 rounded-full border-2 border-candy-ruby/15 bg-creamy px-6 font-sans text-base text-candy-ruby placeholder:text-candy-ruby/65 focus:border-green-woods focus:outline-none sm:col-span-2"
                      />
                      <input
                        type="tel"
                        placeholder="Phone number"
                        aria-label="Phone number"
                        className="h-16 rounded-full border-2 border-candy-ruby/15 bg-creamy px-6 font-sans text-base text-candy-ruby placeholder:text-candy-ruby/65 focus:border-green-woods focus:outline-none sm:col-span-2"
                      />
                    </div>

                    <div className="mt-6 flex items-start gap-3">
                      <input id={optInId} type="checkbox" className="mt-1 size-5 shrink-0 rounded border-2 border-candy-ruby/30 accent-green-woods" />
                      <label htmlFor={optInId} className="font-sans text-sm text-candy-ruby/70">
                        I&rsquo;d like to receive mortgage tips and rate updates (optional)
                      </label>
                    </div>

                    <p id={consentId} className="mt-5 font-sans text-xs leading-relaxed text-candy-ruby/65">
                      By submitting this form, I consent to being contacted by our partner team who will discuss my requirements and
                      match me with a suitable FCA-regulated financial adviser. My information will be handled in accordance with our
                      Privacy Policy. I understand there is no obligation to proceed.
                    </p>
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

                  {step !== 2 && (
                    <Button variant="green" onClick={() => setStep(step === 4 ? "results" : (((step as number) + 1) as Step))}>
                      {step === 4 ? "See My Results" : "Next"}
                    </Button>
                  )}
                </div>
              </div>

              {step === 4 && (
                <div className="mt-6 rounded-[2rem] bg-creamy/70 p-7 md:p-8">
                  <h2 className="font-display text-2xl text-candy-ruby">What happens next</h2>
                  <ul className="mt-4 space-y-3">
                    {WHAT_NEXT.map((line) => (
                      <li key={line} className="flex gap-3 font-sans text-sm text-candy-ruby/80">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-green-woods text-[0.7rem] text-banana-med">✓</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {step === "results" && (
            <>
              <h1 ref={headingRef} tabIndex={-1} className="font-display text-[clamp(2.25rem,6vw,4.5rem)] text-candy-ruby focus:outline-none">
                Here&rsquo;s what you could save.
              </h1>

              <div className="mt-8 grid gap-8 rounded-[2rem] bg-creamy p-7 md:p-10 lg:grid-cols-2">
                <div className="rounded-[1.5rem] bg-candy-light p-7">
                  <p className="font-sans text-sm font-semibold text-candy-ruby/70">{currentPayment ? "YOUR CURRENT PAYMENT" : "IF YOU DO NOTHING"}</p>
                  <p className="mt-2 font-display text-[clamp(2rem,6vw,3rem)] leading-none text-candy-ruby">
                    {gbp.format(currentMonthly)}
                    <span className="font-sans text-base font-semibold text-candy-ruby/65">/month</span>
                  </p>
                  <p className="mt-3 font-sans text-xs text-candy-ruby/65">{currentPayment ? "As entered" : `Based on an assumed SVR of ${comparisonRate}%`}</p>
                </div>

                <div className="rounded-[1.5rem] bg-green-woods p-7">
                  <p className="font-sans text-sm font-semibold text-creamy/70">IF YOU SWITCH</p>
                  <p className="mt-2 font-display text-[clamp(2rem,6vw,3rem)] leading-none text-banana-med">
                    {gbp.format(newMonthly)}
                    <span className="font-sans text-base font-semibold text-creamy/60">/month</span>
                  </p>
                  <p className="mt-3 font-sans text-xs text-creamy/60">Based on a market rate of {NEW_RATE}%</p>
                </div>

                <div className="lg:col-span-2">
                  <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-candy-ruby/10 pt-6">
                    <p className="font-sans text-sm font-semibold text-candy-ruby/70">POTENTIAL MONTHLY SAVING</p>
                    <p className="font-display text-[clamp(2rem,6vw,3rem)] leading-none text-green-woods">{saving > 0 ? gbp.format(saving) : gbp.format(0)}</p>
                  </div>
                  <dl className="mt-6 grid grid-cols-2 gap-4 font-sans text-sm sm:grid-cols-4">
                    {[
                      ["Property value", gbp.format(value)],
                      ["Balance", gbp.format(balance)],
                      ["Loan to value", `${ltv.toFixed(0)}%`],
                      ["Remaining term", `${term} years`],
                    ].map(([k, v]) => (
                      <div key={k}>
                        <dt className="text-candy-ruby/65">{k}</dt>
                        <dd className="mt-1 font-semibold text-candy-ruby">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  {releaseEquity && (
                    <p className="mt-5 inline-flex rounded-full bg-green-light px-4 py-2 font-sans text-sm font-semibold text-green-woods">
                      You asked about releasing equity, so an adviser will cover that too
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button variant="green">Get matched with an advisor</Button>
                <button type="button" onClick={() => setStep(1)} className="font-sans text-sm font-semibold text-candy-ruby underline underline-offset-4">
                  Start again
                </button>
              </div>
            </>
          )}

          <p className="mt-8 font-sans text-xs leading-relaxed text-aqua-teal">
            This is an estimate, not mortgage advice, an offer of credit or a decision in principle. Switching may involve early
            repayment charges, exit fees and arrangement fees, which this does not account for.{" "}
            <strong className="font-semibold">Your home may be repossessed if you do not keep up repayments on your mortgage.</strong>
            <br />
            <span className="text-aqua-teal">Placeholder wording and rates. To be signed off by compliance before launch.</span>
          </p>
        </div>

        <div className="mt-8">
          <HowItWorks tone="aqua" />
        </div>
      </main>
    </section>
  );
}
