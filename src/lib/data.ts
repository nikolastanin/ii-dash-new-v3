import type { Phase, Resource, Step } from "./types";

// RESOURCES is a flat pool of everything that can back up a step: our own
// guides, YouTube videos, official (gov.uk/MoneyHelper) links, and
// sponsored/affiliate apps. STEPS never embeds resource content — it only
// points at resource ids, so a generated plan can pick ids from a known
// resource catalogue rather than inventing content.

export const PHASES: Phase[] = [
  { id: "foundations", label: "Foundations" },
  { id: "grow", label: "Grow & Invest" },
  { id: "protect", label: "Protect & Review" },
  { id: "retire", label: "Retirement" },
];

export const RESOURCES: Record<string, Resource> = {
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
};

export const STEPS: Step[] = [
  {
    id: "step-1",
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
    id: "step-2",
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
    id: "step-3",
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
    id: "step-4",
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
    id: "step-5",
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
    id: "step-6",
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
    id: "step-7",
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
    id: "step-8",
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

export const ALERT = {
  title: "ISA allowance resets 6 April",
  desc: "Unused ISA allowance doesn't roll over to next year — use it or lose it.",
};

export function phaseLabel(id: string) {
  const p = PHASES.find((p) => p.id === id);
  return p ? p.label : id;
}

export function currentPhaseIndex(doneSteps: Set<number>) {
  const firstIncomplete = STEPS.find((s) => !doneSteps.has(s.n));
  const phaseId = firstIncomplete ? firstIncomplete.phase : PHASES[PHASES.length - 1].id;
  return PHASES.findIndex((p) => p.id === phaseId);
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
