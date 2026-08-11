import type { GoalAlert, GoalTemplate, Phase, Resource, Step } from "./types";

// RESOURCES is a flat pool of everything that can back up a step: our own
// guides, YouTube videos, official (gov.uk/MoneyHelper) links, and
// sponsored/affiliate apps. Steps never embed resource content — they only
// point at resource ids, shared across every goal template, so a generated
// plan can pick ids from a known resource catalogue rather than inventing
// content.

export const RESOURCES: Record<string, Resource> = {
  "tool-mortgage-calculator": {
    id: "tool-mortgage-calculator",
    type: "tool",
    sponsored: false,
    featured: true,
    category: "Mortgages",
    disclosure: "",
    provider: "Investing Insiders",
    title: "Mortgage Calculator",
    description: "Answer 3 quick questions to see roughly what you could borrow and your monthly payment.",
    cta: "Try it",
    url: "#",
    internalScreen: "mortgage-calculator",
  },
  "tool-remortgage-calculator": {
    id: "tool-remortgage-calculator",
    type: "tool",
    sponsored: false,
    featured: true,
    category: "Mortgages",
    disclosure: "",
    provider: "Investing Insiders",
    title: "Re-mortgage Calculator",
    description: "See what you could save by switching, compared to sitting on your current rate.",
    cta: "Try it",
    url: "#",
    internalScreen: "remortgage-calculator",
  },
  "tool-ajbell": {
    id: "tool-ajbell",
    type: "tool",
    sponsored: false,
    featured: true,
    category: "ISAs",
    disclosure: "",
    provider: "Investing Insiders",
    title: "ISA Calculator",
    description: "See how much your ISA could grow if you keep contributing every year.",
    cta: "Try it",
    url: "#",
  },
  "tool-pensionbee": {
    id: "tool-pensionbee",
    type: "tool",
    sponsored: false,
    category: "Pensions",
    disclosure: "",
    provider: "Investing Insiders",
    title: "Pension Calculator",
    description: "Estimate what your pension could be worth by the time you retire.",
    cta: "Try it",
    url: "#",
  },
  "tool-moneybox": {
    id: "tool-moneybox",
    type: "tool",
    sponsored: false,
    category: "Mortgages",
    disclosure: "",
    provider: "Investing Insiders",
    title: "Mortgage Calculator",
    description: "Work out your monthly repayments and see roughly what you could borrow.",
    cta: "Try it",
    url: "#",
  },
  "tool-vanguard": {
    id: "tool-vanguard",
    type: "tool",
    sponsored: false,
    featured: true,
    category: "Investing",
    disclosure: "",
    provider: "Investing Insiders",
    title: "Investment Growth Calculator",
    description: "Project how your portfolio could grow over time at different return rates.",
    cta: "Try it",
    url: "#",
  },
  "tool-investengine": {
    id: "tool-investengine",
    type: "tool",
    sponsored: false,
    category: "Investing",
    disclosure: "",
    provider: "Investing Insiders",
    title: "Compound Interest Calculator",
    description: "See how compounding turns small, regular contributions into real growth.",
    cta: "Try it",
    url: "#",
  },
  "tool-debt-payoff": {
    id: "tool-debt-payoff",
    type: "tool",
    sponsored: false,
    featured: true,
    category: "Debt",
    disclosure: "",
    provider: "Investing Insiders",
    title: "Debt Payoff Calculator",
    description: "See how much faster you could be debt-free with a bit extra each month.",
    cta: "Try it",
    url: "#",
  },
  "guide-state-pension-forecast": {
    id: "guide-state-pension-forecast",
    type: "guide",
    sponsored: false,
    category: "Pensions",
    title: "How to check your State Pension forecast",
    author: "Investing Insiders Team",
    readTimeMins: 6,
    description: "Your forecast shows what you're on track to receive, and whether you need more qualifying years to get it.",
    url: "https://investinginsiders.co.uk",
  },
  "guide-isas-explained": {
    id: "guide-isas-explained",
    type: "guide",
    sponsored: false,
    featured: true,
    category: "ISAs",
    title: "ISAs explained: which one is right for you?",
    author: "Investing Insiders Team",
    readTimeMins: 8,
    description: "Cash, Stocks & Shares, Lifetime or Innovative Finance — the right ISA depends on what you're saving for.",
    url: "https://investinginsiders.co.uk",
  },
  "guide-index-funds": {
    id: "guide-index-funds",
    type: "guide",
    sponsored: false,
    featured: true,
    category: "Investing",
    title: "A beginner's guide to index funds",
    author: "Investing Insiders Team",
    readTimeMins: 7,
    description: "One fund, thousands of companies. Here's why index investing is the default choice for most new investors.",
    url: "https://investinginsiders.co.uk",
  },
  "guide-snowball-avalanche": {
    id: "guide-snowball-avalanche",
    type: "guide",
    sponsored: false,
    featured: true,
    category: "Debt",
    title: "Snowball vs avalanche: which payoff method wins?",
    author: "Investing Insiders Team",
    readTimeMins: 6,
    description: "One clears small debts fast for momentum, the other saves you the most interest. Here's how to pick.",
    url: "https://investinginsiders.co.uk",
  },
  "guide-lisa-explained": {
    id: "guide-lisa-explained",
    type: "guide",
    sponsored: false,
    featured: true,
    category: "Mortgages",
    title: "Lifetime ISA vs regular savings: which gets you there faster?",
    author: "Investing Insiders Team",
    readTimeMins: 6,
    description: "A LISA adds a 25% government bonus on what you save for your first home — here's how it stacks up.",
    url: "https://investinginsiders.co.uk",
  },
  "video-gov-gateway": {
    id: "video-gov-gateway",
    type: "video",
    sponsored: false,
    featured: true,
    category: "Pensions",
    title: "How to set up Government Gateway in 2 minutes",
    channel: "Investing Insiders",
    url: "#",
  },
  "video-forecast-explained": {
    id: "video-forecast-explained",
    type: "video",
    sponsored: false,
    featured: true,
    category: "Pensions",
    title: "Reading your State Pension forecast, explained",
    channel: "Investing Insiders",
    url: "#",
  },
  "link-gov-gateway-signin": {
    id: "link-gov-gateway-signin",
    type: "link",
    sponsored: false,
    category: "Pensions",
    title: "gov.uk sign-in",
    source: "gov.uk",
    url: "https://www.gov.uk/log-in-register-hmrc-online-services",
  },
  "link-check-state-pension": {
    id: "link-check-state-pension",
    type: "link",
    sponsored: false,
    category: "Pensions",
    title: "Check your State Pension forecast",
    source: "gov.uk",
    url: "https://www.gov.uk/check-state-pension",
  },
  "link-moneyhelper-forecast": {
    id: "link-moneyhelper-forecast",
    type: "link",
    sponsored: false,
    category: "Pensions",
    title: "MoneyHelper: understanding your forecast",
    source: "moneyhelper.org.uk",
    url: "https://www.moneyhelper.org.uk/",
  },
  "link-check-ni-record": {
    id: "link-check-ni-record",
    type: "link",
    sponsored: false,
    category: "Pensions",
    title: "Check your National Insurance record",
    source: "gov.uk",
    url: "https://www.gov.uk/check-national-insurance-record",
  },
  "link-moneyhelper-debt": {
    id: "link-moneyhelper-debt",
    type: "link",
    sponsored: false,
    category: "Debt",
    title: "Free, confidential debt advice",
    source: "moneyhelper.org.uk",
    url: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt",
  },
  "link-lisa-gov": {
    id: "link-lisa-gov",
    type: "link",
    sponsored: false,
    category: "Mortgages",
    title: "Lifetime ISA: the official rules",
    source: "gov.uk",
    url: "https://www.gov.uk/lifetime-isa",
  },
};

const GROW_SAVINGS_PHASES: Phase[] = [
  { id: "foundations", label: "Foundations" },
  { id: "grow", label: "Grow & Invest" },
  { id: "protect", label: "Protect & Review" },
  { id: "retire", label: "Retirement" },
];

const GROW_SAVINGS_STEPS: Step[] = [
  {
    id: "grow-step-1",
    n: 1,
    phase: "foundations",
    title: "Check your State Pension forecast",
    desc: "See what you're on track to receive, and whether you have gaps in your National Insurance record.",
    detail:
      "Your State Pension forecast tells you how much you're on track to get, at what age, and whether gaps in your National Insurance record are holding that number down. It only takes a few minutes to check, and it's the foundation everything else in your plan builds on.",
    why: "You can't plan for retirement without knowing your starting point. Most people underestimate their State Pension income — or don't realise they have gaps they could still fill.",
    checklist: [
      { text: "Create a Government Gateway account", resourceIds: ["link-gov-gateway-signin", "video-gov-gateway"] },
      { text: "Check your forecast on gov.uk", resourceIds: ["link-check-state-pension", "guide-state-pension-forecast", "link-moneyhelper-forecast", "video-forecast-explained"] },
      { text: "Note any gaps in your National Insurance record", resourceIds: ["guide-state-pension-forecast", "link-check-ni-record"] },
    ],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: null,
    relatedResourceId: "guide-state-pension-forecast",
  },
  {
    id: "grow-step-2",
    n: 2,
    phase: "foundations",
    title: "Get your full workplace pension match",
    desc: "Most employers match extra contributions up to a limit — it's free money if you're not already claiming it.",
    detail:
      "Many workplace pensions match your contributions above the legal minimum — often up to 5–8% of salary. If you're only paying in the minimum, you could be leaving free money on the table every single payday.",
    why: "Employer matching is an instant, guaranteed return on your money that no investment can beat. It's usually the highest-priority move in any financial plan.",
    checklist: ["Find your pension scheme handbook or ask HR", "Check the maximum contribution your employer will match", "Increase your contribution to meet it, if you can"],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: "tool-pensionbee",
    relatedResourceId: null,
  },
  {
    id: "grow-step-3",
    n: 3,
    phase: "grow",
    title: "Use this year's £20,000 ISA allowance",
    desc: "Any unused allowance disappears on 6 April — it doesn't carry over to next year.",
    detail:
      "Every UK adult gets a £20,000 ISA allowance each tax year, letting you save or invest without paying tax on the growth. Whatever you don't use by 6 April is gone for good — it never rolls over.",
    why: "Tax-free growth compounds over decades. Missing a year's allowance is a permanent loss of tax-free capacity, not something you can make up later.",
    checklist: ["Check how much of this year's allowance you've used", "Decide between Cash, Stocks & Shares, or a mix", "Transfer or top up before 6 April"],
    tag: "Alert",
    href: "https://investinginsiders.co.uk",
    toolResourceId: "tool-ajbell",
    relatedResourceId: "guide-isas-explained",
  },
  {
    id: "grow-step-4",
    n: 4,
    phase: "grow",
    title: "Compare low-cost Stocks & Shares ISA platforms",
    desc: "Fees compound just like returns do. See a few platforms our readers rate highest below.",
    detail:
      "Platform fees, fund fees and trading charges all eat into your returns quietly, year after year. A 1% difference in fees can mean tens of thousands of pounds less by retirement on a long-term portfolio.",
    why: "You can't control the market, but you can control what you pay to access it. Choosing a low-cost platform is one of the few guaranteed ways to improve your long-term returns.",
    checklist: ["List the platforms you're considering", "Compare platform fees, not just fund fees", "Check if your existing ISA can be transferred without a penalty"],
    tag: "Tool",
    href: "#",
    toolResourceId: "tool-investengine",
    relatedResourceId: "guide-isas-explained",
  },
  {
    id: "grow-step-5",
    n: 5,
    phase: "grow",
    title: "Build a simple, diversified portfolio",
    desc: "A handful of low-cost index funds can cover global markets without you having to pick stocks.",
    detail:
      "You don't need to pick individual stocks to invest well. A small number of low-cost, globally diversified index funds can give you exposure to thousands of companies across dozens of countries in one purchase.",
    why: "Diversification reduces the damage any single company or market can do to your portfolio, without meaningfully reducing your long-term expected returns.",
    checklist: ["Decide your target mix of shares vs. bonds", "Pick one or two global index funds", "Set up a regular monthly contribution"],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: "tool-vanguard",
    relatedResourceId: "guide-index-funds",
  },
  {
    id: "grow-step-6",
    n: 6,
    phase: "protect",
    title: "Check you're on the right tax code",
    desc: "An incorrect tax code is one of the most common reasons people overpay on their income.",
    detail:
      "Tax codes change jobs, benefits and pension income — and mistakes are common. An incorrect code can mean you're overpaying income tax every month without realising it.",
    why: "This is a five-minute check that can put money back in your pocket immediately, with no risk and no decisions to make.",
    checklist: ["Find your tax code on a recent payslip", "Compare it against HMRC's online checker", "Contact HMRC if it looks wrong"],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: null,
    relatedResourceId: null,
  },
  {
    id: "grow-step-7",
    n: 7,
    phase: "protect",
    title: "Review your pension charges once a year",
    desc: "Old workplace pensions often carry higher fees than a modern SIPP or personal pension.",
    detail:
      "Pensions from old jobs are easy to forget about, and older schemes often carry higher annual charges than a modern SIPP or personal pension. A yearly check keeps your money working as hard as possible.",
    why: "Fees are one of the few things about your pension you can actually control. A small annual review can save thousands over a working lifetime.",
    checklist: ["List every pension you've ever paid into", "Check the annual charge on each one", "Consider combining old pensions into one modern plan"],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: "tool-pensionbee",
    relatedResourceId: null,
  },
  {
    id: "grow-step-8",
    n: 8,
    phase: "retire",
    title: "Book a free Pension Wise appointment",
    desc: "Free, impartial guidance from MoneyHelper if you're 50 or over and have a pension.",
    detail:
      "Pension Wise is a free, government-backed service offering impartial guidance on your options once you're within reach of retirement — including how and when to take your pension, and the tax implications of each choice.",
    why: "Retirement decisions are often irreversible. A free, unbiased conversation before you commit can prevent costly mistakes.",
    checklist: ["Check you're 50 or over with a pension pot", "Book a free appointment with MoneyHelper", "Bring a list of questions about your specific pensions"],
    tag: "Guide",
    href: "https://www.moneyhelper.org.uk/",
    toolResourceId: null,
    relatedResourceId: null,
  },
];

const DEBT_PHASES: Phase[] = [
  { id: "assess", label: "Assess" },
  { id: "reduce", label: "Reduce" },
  { id: "protect", label: "Protect" },
];

const DEBT_STEPS: Step[] = [
  {
    id: "debt-step-1",
    n: 1,
    phase: "assess",
    title: "List everything you owe",
    desc: "You can't tackle debt you can't see clearly — get every balance in one place first.",
    detail:
      "Gather every debt you have — credit cards, overdrafts, loans, buy-now-pay-later — along with its balance, interest rate and minimum payment. Most people underestimate how much they owe until they actually add it up.",
    why: "A clear, complete picture is the foundation for every decision that follows. You can't prioritise what you can't see.",
    checklist: ["List every debt with its balance and interest rate", "Note the minimum payment for each", "Add them all up to see the full picture"],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: null,
    relatedResourceId: "guide-snowball-avalanche",
  },
  {
    id: "debt-step-2",
    n: 2,
    phase: "reduce",
    title: "Choose your payoff method: snowball or avalanche",
    desc: "Snowball clears small debts fast for momentum. Avalanche saves you the most interest.",
    detail:
      "The snowball method pays off your smallest balance first for quick wins and motivation. The avalanche method targets your highest-interest debt first, saving you the most money overall. Either beats no plan at all.",
    why: "Having a defined method keeps you consistent instead of paying off whichever debt feels most urgent that month.",
    checklist: [
      { text: "Read how snowball vs avalanche compares", resourceIds: ["guide-snowball-avalanche"] },
      "Pick the method that fits how you stay motivated",
      "Order your debts to match",
    ],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: "tool-debt-payoff",
    relatedResourceId: null,
  },
  {
    id: "debt-step-3",
    n: 3,
    phase: "reduce",
    title: "Put any extra money toward your priority debt",
    desc: "Even a modest overpayment on top of minimums can cut years off your payoff timeline.",
    detail:
      "Once your priority debt is chosen, direct any spare money there while paying the minimum on everything else. Small, regular overpayments compound the same way savings do — just in your favour this time.",
    why: "Paying only the minimum on high-interest debt can mean paying it off over decades. A little extra, consistently, changes that math dramatically.",
    checklist: [{ text: "See how much faster extra payments could clear your debt", resourceIds: ["tool-debt-payoff"] }, "Set up a standing order for the extra amount", "Keep paying minimums on everything else"],
    tag: "Tool",
    href: "#",
    toolResourceId: "tool-debt-payoff",
    relatedResourceId: null,
  },
  {
    id: "debt-step-4",
    n: 4,
    phase: "protect",
    title: "Get free, impartial advice if it feels unmanageable",
    desc: "MoneyHelper's debt advice service is free, confidential, and not there to judge you.",
    detail:
      "If your debts feel out of control, free and impartial debt advice is available from MoneyHelper — a government-backed service, not a lender. They can talk through options you might not know exist, like debt management plans.",
    why: "Debt problems very rarely get better by being ignored, and advice this early costs you nothing but a conversation.",
    checklist: [{ text: "Contact MoneyHelper for free debt advice", resourceIds: ["link-moneyhelper-debt"] }, "Bring a list of your debts and income", "Ask about all the options, not just the first one offered"],
    tag: "Guide",
    href: "https://www.moneyhelper.org.uk/en/money-troubles/dealing-with-debt",
    toolResourceId: null,
    relatedResourceId: null,
  },
];

const HOME_PHASES: Phase[] = [
  { id: "save", label: "Save" },
  { id: "check", label: "Check" },
  { id: "borrow", label: "Borrow" },
];

const HOME_STEPS: Step[] = [
  {
    id: "home-step-1",
    n: 1,
    phase: "save",
    title: "Work out how big a deposit you need",
    desc: "Most mortgages want at least 5–10% of the property price as a deposit — bigger usually means better rates.",
    detail:
      "Deposit size drives almost everything else: which mortgage rates you qualify for, your monthly repayments, and how much you can borrow overall. Start with a realistic target property price and work backwards.",
    why: "Knowing your target deposit turns 'save for a home' from a vague goal into a specific number with a specific timeline.",
    checklist: ["Pick a realistic target property price for your area", "Work out 5%, 10% and 15% of that price", "Decide which deposit size you're aiming for"],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: "tool-moneybox",
    relatedResourceId: null,
  },
  {
    id: "home-step-2",
    n: 2,
    phase: "save",
    title: "Open a Lifetime ISA to get the 25% government bonus",
    desc: "Save up to £4,000 a year and the government adds 25% on top — free money toward your first home.",
    detail:
      "A Lifetime ISA (LISA) adds a 25% bonus on whatever you save, up to £4,000 a year, as long as it goes toward a first home (or retirement, after 60). On a full year's contribution that's an extra £1,000 for nothing.",
    why: "This is one of the few genuinely free-money offers available to first-time buyers — but only if you use it in time, since funds need 12 months in before they can go toward a purchase.",
    checklist: [
      { text: "See how a LISA compares to regular savings", resourceIds: ["guide-lisa-explained", "link-lisa-gov"] },
      "Check you're eligible (18–39, first-time buyer)",
      "Open a LISA and set up a regular contribution",
    ],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: null,
    relatedResourceId: "guide-lisa-explained",
  },
  {
    id: "home-step-3",
    n: 3,
    phase: "check",
    title: "See what you could borrow",
    desc: "Lenders typically offer 4–4.5x your income, but it depends on your outgoings and credit history too.",
    detail:
      "Getting a realistic borrowing estimate early stops you falling for a property you can't actually get a mortgage for. It also shows how much your deposit and income together add up to.",
    why: "Knowing your realistic budget before you start looking saves a lot of wasted time and disappointment later.",
    checklist: [{ text: "Estimate what you could borrow", resourceIds: ["tool-moneybox"] }, "Add your deposit to see your total budget", "Factor in other debts that could reduce what lenders offer"],
    tag: "Tool",
    href: "#",
    toolResourceId: "tool-moneybox",
    relatedResourceId: null,
  },
  {
    id: "home-step-4",
    n: 4,
    phase: "borrow",
    title: "Compare mortgage types before you commit",
    desc: "Fixed-rate gives certainty, tracker can be cheaper — the right choice depends on your risk appetite.",
    detail:
      "A fixed-rate mortgage locks in your repayment for a set period, protecting you from rate rises. A tracker mortgage moves with the Bank of England base rate — often cheaper to start, but less predictable.",
    why: "Mortgage type affects your monthly budget for years, not just your interest rate — worth comparing properly rather than taking whatever's offered first.",
    checklist: ["List fixed and tracker deals from a few lenders", "Compare the total cost over the deal period, not just the headline rate", "Check early repayment charges before you sign"],
    tag: "Guide",
    href: "https://investinginsiders.co.uk",
    toolResourceId: null,
    relatedResourceId: null,
  },
];

export const GOAL_TEMPLATES: Record<string, GoalTemplate> = {
  "grow-savings": { id: "grow-savings", label: "Grow my savings", phases: GROW_SAVINGS_PHASES, steps: GROW_SAVINGS_STEPS },
  debt: { id: "debt", label: "Get out of debt", phases: DEBT_PHASES, steps: DEBT_STEPS },
  home: { id: "home", label: "Save for a home", phases: HOME_PHASES, steps: HOME_STEPS },
};

export const GOAL_ALERTS: Record<string, GoalAlert | undefined> = {
  "grow-savings": {
    id: "isa-allowance",
    title: "ISA allowance resets 6 April",
    desc: "Unused ISA allowance doesn't roll over to next year — use it or lose it.",
  },
  debt: {
    id: "min-payments",
    title: "Minimum payments keep you in debt longer",
    desc: "Paying only the minimum can mean years of extra interest — even a small overpayment adds up fast.",
  },
};

// Alerts that apply to every goal regardless of template — the mechanism
// for keeping plans current when the outside world changes (a new tax
// rule, a rate change). Add an entry here and every user's dashboard picks
// it up on next render, prompting them to revisit their plan.
export const GLOBAL_ALERTS: GoalAlert[] = [
  {
    id: "tax-rule-2026",
    title: "New tax rule announced",
    desc: "Do you want us to **update your plan** to match the new tax rules?",
  },
];

// Maps a free-text or fixed-option goal label to a template id. Only "debt"
// and "home" get genuinely distinct content right now — everything else
// (including free-text chat answers with no obvious match) falls back to
// "grow-savings", whose existing pensions/ISA/investing content already
// substantively overlaps "retire comfortably" and "start investing".
export function matchTemplateId(goalLabel: string): string {
  const q = goalLabel.toLowerCase();
  if (q.includes("debt")) return "debt";
  if (q.includes("home") || q.includes("house") || q.includes("mortgage")) return "home";
  return "grow-savings";
}

export function phaseLabel(phases: Phase[], id: string) {
  const p = phases.find((p) => p.id === id);
  return p ? p.label : id;
}

export function currentPhaseIndex(phases: Phase[], steps: Step[], doneSteps: Set<string>) {
  const firstIncomplete = steps.find((s) => !doneSteps.has(s.id));
  const phaseId = firstIncomplete ? firstIncomplete.phase : phases[phases.length - 1].id;
  return phases.findIndex((p) => p.id === phaseId);
}

// A goal is worth 100 points total, split evenly across its steps, and each
// step's share split evenly across its own checklist items.
export function pointsForItem(steps: Step[], step: Step): number {
  if (!step.checklist.length) return 0;
  return 100 / steps.length / step.checklist.length;
}

// Fraction (0-1) of the goal's 100 points earned so far — the sum of every
// checked-off checklist item's point share. Drives the circular progress
// rings so checking items (not just marking whole steps done) visibly moves
// the needle.
export function goalProgressPct(steps: Step[], doneItems: Set<string>): number {
  let earned = 0;
  steps.forEach((s) => {
    s.checklist.forEach((_, idx) => {
      if (doneItems.has(`${s.id}-${idx}`)) earned += pointsForItem(steps, s);
    });
  });
  return earned / 100;
}

export const RESOURCE_COLORS: Record<string, string> = {
  tool: "#c98a2b",
  guide: "#5cc296",
  link: "#05593d",
  video: "#005252",
};

export const RESOURCE_TYPE_LABELS: Record<string, string> = {
  tool: "Tool",
  guide: "Guide",
  link: "Official link",
  video: "Video",
};

// guide's brand green is light, so its icon needs to stay dark to remain
// visible; every other type is dark enough for a white icon.
export const RESOURCE_ICON_TEXT: Record<string, string> = {
  guide: "text-black",
};
