type Props = {
  onStartForm: () => void;
  onStartChat: () => void;
};

export default function Landing({ onStartForm, onStartChat }: Props) {
  return (
    <section className="min-h-screen flex flex-col">
      <main className="flex-1 max-w-3xl mx-auto w-full px-6 py-14 md:py-24">
        <p className="text-xs uppercase tracking-[0.14em] font-display text-green-woods mb-5">Your plan · 2 minutes</p>
        <h1 className="font-display uppercase text-4xl md:text-6xl leading-[1.04] mb-6 max-w-2xl">
          A UK money plan built around you, not a generic checklist.
        </h1>
        <p className="text-inksoft text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
          Tell us what you&rsquo;re trying to do — retire comfortably, start investing, get out of debt — and
          we&rsquo;ll turn it into steps, tools and guides picked for your situation.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">
          <button
            onClick={onStartForm}
            className="text-left bg-surface rounded-28 border-2 border-ink/10 p-8 hover:border-ink/25 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-brandlight flex items-center justify-center mb-7">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M4 12h16M4 18h10" stroke="#05593D" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="font-display uppercase text-xl mb-2">Quick form</h2>
            <p className="text-sm text-inksoft mb-6 leading-relaxed">Seven short questions. Tap your answers, no typing required.</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
              Start the form
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </button>

          <button
            onClick={onStartChat}
            className="text-left bg-surface rounded-28 border-2 border-ink/10 p-8 hover:border-ink/25 transition-colors group"
          >
            <div className="w-11 h-11 rounded-full bg-accentlight flex items-center justify-center mb-7">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 20l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
                  stroke="#C98A2B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="font-display uppercase text-xl mb-2">Chat instead</h2>
            <p className="text-sm text-inksoft mb-6 leading-relaxed">
              Type in your own words, like &ldquo;I want to retire at 65&rdquo;.
            </p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              Start the chat
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </button>
        </div>
      </main>

      <footer className="max-w-3xl mx-auto w-full px-6 pb-10 text-xs text-inksoft">
        Prototype — every answer leads to the same demo plan below.
      </footer>
    </section>
  );
}
