export type ResourceType = "tool" | "guide" | "link" | "video";

interface ResourceBase {
  id: string;
  type: ResourceType;
  sponsored: boolean;
  featured?: boolean;
  category?: string;
  title: string;
  url: string;
}

export interface ToolResource extends ResourceBase {
  type: "tool";
  disclosure: string;
  provider: string;
  description: string;
  cta: string;
  // When set, the tool card opens this in-app screen instead of `url`.
  internalScreen?: "mortgage-calculator" | "remortgage-calculator";
}

export interface GuideResource extends ResourceBase {
  type: "guide";
  author: string;
  readTimeMins: number;
  description: string;
}

export interface VideoResource extends ResourceBase {
  type: "video";
  channel: string;
}

export interface LinkResource extends ResourceBase {
  type: "link";
  source: string;
}

export type Resource = ToolResource | GuideResource | VideoResource | LinkResource;

export type ChecklistItem = string | { text: string; resourceIds: string[] };

export type StepTag = "Guide" | "Tool" | "Alert";

export interface Step {
  id: string;
  n: number;
  phase: string;
  title: string;
  desc: string;
  detail: string;
  why: string;
  checklist: ChecklistItem[];
  tag: StepTag;
  href: string;
  toolResourceId: string | null;
  relatedResourceId: string | null;
}

export interface Phase {
  id: string;
  label: string;
}

export interface GoalTemplate {
  id: string;
  label: string;
  phases: Phase[];
  steps: Step[];
}

export interface GoalAlert {
  id: string;
  title: string;
  desc: string;
}

export interface NotificationItem {
  id: string;
  text: string;
  read: boolean;
}

export interface QuickFormState {
  name: string;
  goalLabel: string;
  timeframe: string;
  experience: string;
  investing: string;
  risk: string;
  worries: string[];
}

export interface GoalInstance {
  id: string;
  templateId: string;
  label: string;
  formState: QuickFormState;
  doneSteps: Set<string>;
  // Independent from doneSteps — a step can be checklist-item-complete
  // without being manually marked done, and vice versa. Keyed by
  // `${step.id}-${itemIndex}`.
  doneItems: Set<string>;
}
