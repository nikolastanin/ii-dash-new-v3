import type { TourStep } from "@/components/Tour";

export const DASHBOARD_TOUR_STEPS: TourStep[] = [
  {
    title: "Meet Dougy. Your guide inside your money goals.",
    description:
      "He gathers the best tools, guides and steps for whatever you're working toward, and ditches the jargon along the way.",
    visual: "doug",
  },
  {
    target: "#tour-progress",
    title: "Track your progress",
    description: "This ring fills up as you tick off checklist items — the more you complete, the closer to 100%.",
  },
  {
    target: "#tour-todays-tasks",
    title: "Start here",
    description: "We pull a couple of quick wins from your plan so you always know what to tackle first.",
  },
  {
    target: "#plan-section",
    title: "Your full plan",
    description: "Every step lives here as a checklist, with guides, tools and videos attached where useful.",
  },
  {
    target: "#tools-section",
    title: "Handpicked for your goal",
    description: "Tools and guides here are filtered to match whatever you're working toward.",
  },
  {
    target: "#tour-goals-btn",
    title: "Juggle multiple goals",
    description: "Create a goal for anything you're working toward — saving, debt, a home — and switch between them here.",
  },
  {
    target: "#tour-bell-btn",
    title: "Stay in the loop",
    description: "Ticking things off earns you points, and we'll notify you here if the rules change and your plan needs a refresh.",
  },
];
