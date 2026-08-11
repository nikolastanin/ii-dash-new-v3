import Image from "next/image";

const STEPS = [
  {
    n: "1",
    title: "3 Simple Questions",
    body: "Just your deposit, income, and mortgage term. Takes less than 60 seconds.",
  },
  {
    n: "2",
    title: "See Your Results",
    body: "Get your estimated budget instantly. Refine with extra details for more accuracy.",
  },
  {
    n: "3",
    title: "Get A Personalised Quote",
    body: "Connect with an FCA-regulated advisor. Get personalised quotes from a panel of 100+ lenders.",
  },
];

/** Cards pick up the tone of the calculator they sit under. */
const TONES = {
  green: { card: "bg-green-light", badge: "bg-green-woods", text: "text-green-woods", body: "text-green-woods/90" },
  aqua: { card: "bg-aqua-light", badge: "bg-aqua-teal", text: "text-aqua-teal", body: "text-aqua-teal/85" },
} as const;

type Props = {
  tone?: keyof typeof TONES;
};

export default function HowItWorks({ tone = "green" }: Props) {
  const t = TONES[tone];
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-creamy px-6 py-12 md:rounded-[3.5rem] md:px-12 md:py-16">
      <div className="mx-auto max-w-[60rem]">
        <div className="text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] text-candy-ruby">How it works</h2>
          <p className="mt-3 font-sans text-lg text-candy-ruby/70">Quick and straightforward</p>
        </div>

        <ol className="mt-10 space-y-4">
          {STEPS.map((s) => (
            <li key={s.n} className={`flex gap-4 rounded-[1.5rem] ${t.card} p-5 pl-4 md:gap-7 md:p-8`}>
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-full ${t.badge} font-display text-lg text-banana-med md:size-12 md:text-xl`}
                aria-hidden="true"
              >
                {s.n}
              </span>
              <div>
                <h3 className={`font-display text-2xl ${t.text} md:text-3xl`}>{s.title}</h3>
                <p className={`mt-2 font-sans text-base leading-snug ${t.body} md:leading-relaxed`}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Image src="/felt/star-yellow.webp" alt="" width={50} height={50} className="w-6" />
          <p className="font-sans text-sm font-semibold text-candy-ruby/70">Free to use, no commitment required</p>
        </div>
      </div>
    </div>
  );
}
