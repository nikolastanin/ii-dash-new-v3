type Props = {
  onStartForm: () => void;
  onStartChat: () => void;
};

const HOW_IT_WORKS = [
  {
    n: "1",
    title: "Tell us your goal",
    body: "A few quick questions, or just chat in your own words — whatever's easiest for you.",
  },
  {
    n: "2",
    title: "We match you with what matters",
    body: "Steps, tools and guides picked for your exact situation, not a generic list everyone gets.",
  },
  {
    n: "3",
    title: "Follow a clear path",
    body: "Tick things off as you go, and come back anytime — everything stays gathered in one place.",
  },
];

export default function Landing({ onStartForm, onStartChat }: Props) {
  return (
    <section className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-8 md:py-12">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-candy-light px-6 py-14 md:rounded-[3.5rem] md:px-12 md:py-20">
          <p className="text-xs uppercase tracking-[0.14em] font-display text-candy-ruby/60 mb-5">Your plan · 2 minutes</p>
          <h1 className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[1.04] text-candy-ruby mb-6 max-w-2xl">
            A UK money plan built around you, not a generic checklist.
          </h1>
          <p className="text-candy-ruby/70 text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
            Tell us what you&rsquo;re trying to do — retire comfortably, start investing, get out of debt — and
            we&rsquo;ll turn it into steps, tools and guides picked for your situation.
          </p>

          <div className="grid sm:grid-cols-2 gap-5">
            <button
              onClick={onStartForm}
              className="text-left bg-surface rounded-[2rem] p-8 hover:-translate-y-1 transition-transform group"
            >
              <div className="w-11 h-11 rounded-full bg-green-light flex items-center justify-center mb-7">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h10" stroke="#05593D" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="font-display text-2xl text-candy-ruby mb-2">Quick form</h2>
              <p className="text-sm text-candy-ruby/65 mb-6 leading-relaxed">Seven short questions. Tap your answers, no typing required.</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-woods">
                Start the form
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </button>

            <button
              onClick={onStartChat}
              className="text-left bg-surface rounded-[2rem] p-8 hover:-translate-y-1 transition-transform group"
            >
              <div className="w-11 h-11 rounded-full bg-banana-light flex items-center justify-center mb-7">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 20l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                    stroke="#540329"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl text-candy-ruby mb-2">Chat instead</h2>
              <p className="text-sm text-candy-ruby/65 mb-6 leading-relaxed">
                Type in your own words, like &ldquo;I want to retire at 65&rdquo;.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-candy-ruby">
                Start the chat
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] bg-green-light px-6 py-14 mt-8 md:rounded-[3.5rem] md:px-12 md:py-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby mb-3">How it works</h2>
            <p className="text-candy-ruby/70 text-lg">Quick and straightforward.</p>
          </div>

          <ol className="flex flex-col gap-4 max-w-2xl mx-auto">
            {HOW_IT_WORKS.map((step) => (
              <li key={step.n} className="flex gap-4 md:gap-7 rounded-[1.5rem] bg-creamy p-5 md:p-8">
                <span className="grid size-10 md:size-12 shrink-0 place-items-center rounded-full bg-green-woods font-display text-lg text-banana-med md:text-xl">
                  {step.n}
                </span>
                <div>
                  <h3 className="font-display text-xl md:text-2xl text-candy-ruby">{step.title}</h3>
                  <p className="mt-1.5 text-sm md:text-base text-candy-ruby/70 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>

      <footer className="max-w-5xl mx-auto w-full px-6 pb-8 text-xs text-inksoft">
        Prototype — every answer leads to the same demo plan below.
      </footer>
    </section>
  );
}
