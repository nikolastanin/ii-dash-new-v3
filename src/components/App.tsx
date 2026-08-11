"use client";

import { useEffect, useState } from "react";
import type { GoalInstance, NotificationItem, QuickFormState } from "@/lib/types";
import { GOAL_TEMPLATES, matchTemplateId } from "@/lib/data";
import Header from "@/components/Header";
import Toast from "@/components/Toast";
import Landing from "@/components/screens/Landing";
import QuickForm from "@/components/screens/QuickForm";
import Chat from "@/components/screens/Chat";
import Loading from "@/components/screens/Loading";
import Dashboard from "@/components/screens/Dashboard";
import StepDetail from "@/components/screens/StepDetail";
import ResourceLibrary from "@/components/screens/ResourceLibrary";
import Goals from "@/components/screens/Goals";

type Screen = "landing" | "quickform" | "chat" | "loading" | "dashboard" | "step-detail" | "library" | "goals";

const EMPTY_FORM: QuickFormState = {
  name: "",
  goalLabel: "",
  timeframe: "",
  experience: "",
  investing: "",
  risk: "",
  worries: [],
};

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// Flat bonus for finishing onboarding and creating a goal. Fake/hardcoded
// for now — this is just a prototype gamification hook, not a real points
// economy (no anti-abuse, no server-side accounting, etc).
const GOAL_CREATION_POINTS = 5;

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [previousScreen, setPreviousScreen] = useState<Screen>("landing");
  const [formState, setFormState] = useState<QuickFormState>(EMPTY_FORM);
  const [goals, setGoals] = useState<GoalInstance[]>([]);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [currentDetailStepId, setCurrentDetailStepId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [toast, setToast] = useState<{ id: string; text: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast((t) => (t?.id === toast.id ? null : t));
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const activeGoal = goals.find((g) => g.id === activeGoalId) ?? null;
  const activeTemplate = activeGoal ? GOAL_TEMPLATES[activeGoal.templateId] : null;

  function updateField(field: keyof QuickFormState, value: string) {
    setFormState((s) => ({ ...s, [field]: value }));
  }

  function toggleChip(label: string) {
    setFormState((s) => ({
      ...s,
      worries: s.worries.includes(label) ? s.worries.filter((w) => w !== label) : [...s.worries, label],
    }));
  }

  function buildPlan() {
    setScreen("loading");
    setTimeout(() => {
      const templateId = matchTemplateId(formState.goalLabel || "");
      const newGoal: GoalInstance = {
        id: makeId(templateId),
        templateId,
        label: formState.goalLabel || GOAL_TEMPLATES[templateId].label,
        formState,
        doneSteps: new Set(),
        doneItems: new Set(),
      };
      setGoals((prev) => [...prev, newGoal]);
      setActiveGoalId(newGoal.id);
      setScreen("dashboard");
      pushPointsNotification(GOAL_CREATION_POINTS, "new goal created!");
    }, 1200);
  }

  function toggleStepDone(stepId: string) {
    const steps = activeTemplate?.steps;
    const step = steps?.find((s) => s.id === stepId);
    if (!step || !steps || !activeGoal) return;

    const turningOn = !activeGoal.doneSteps.has(stepId);
    const itemKeys = step.checklist.map((_, idx) => `${stepId}-${idx}`);

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== activeGoalId) return g;
        const doneSteps = new Set(g.doneSteps);
        const doneItems = new Set(g.doneItems);
        if (doneSteps.has(stepId)) {
          doneSteps.delete(stepId);
          itemKeys.forEach((k) => doneItems.delete(k));
        } else {
          doneSteps.add(stepId);
          itemKeys.forEach((k) => doneItems.add(k));
        }
        return { ...g, doneSteps, doneItems };
      })
    );

    if (turningOn) pushPointsNotification(Math.round(100 / steps.length));
  }

  function toggleItemDone(itemKey: string, points: number) {
    const turningOn = !!activeGoal && !activeGoal.doneItems.has(itemKey);
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== activeGoalId) return g;
        const next = new Set(g.doneItems);
        if (next.has(itemKey)) next.delete(itemKey);
        else next.add(itemKey);
        return { ...g, doneItems: next };
      })
    );
    if (turningOn) pushPointsNotification(points);
  }

  function pushPointsNotification(points: number, message = "nice work!") {
    const notification: NotificationItem = {
      id: makeId("note"),
      text: `+${points} pts — ${message}`,
      read: false,
    };
    setNotifications((prev) => [notification, ...prev].slice(0, 20));
    setToast({ id: notification.id, text: notification.text });
  }

  function markNotificationsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function toggleSaved(id: string) {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function resetAll() {
    setFormState(EMPTY_FORM);
    setGoals([]);
    setActiveGoalId(null);
    setSavedIds(new Set());
    setCurrentDetailStepId(null);
    setNotifications([]);
    setToast(null);
    setScreen("landing");
  }

  function scrollToTools() {
    if (screen !== "dashboard") return;
    document.getElementById("tools-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function openLibrary() {
    setPreviousScreen(screen);
    setScreen("library");
  }

  function openGoals() {
    setPreviousScreen(screen);
    setScreen("goals");
  }

  function selectGoal(goalId: string) {
    setActiveGoalId(goalId);
    setScreen("dashboard");
  }

  function startAddGoal() {
    setFormState(EMPTY_FORM);
    setScreen("landing");
  }

  return (
    <>
      <Header
        onLogoClick={resetAll}
        onScrollToTools={scrollToTools}
        onStartOver={resetAll}
        onOpenLibrary={openLibrary}
        onOpenGoals={openGoals}
        notifications={notifications}
        onMarkNotificationsRead={markNotificationsRead}
      />
      <Toast toast={toast} />

      {screen === "landing" && <Landing onStartForm={() => setScreen("quickform")} onStartChat={() => setScreen("chat")} />}

      {screen === "quickform" && (
        <QuickForm
          formState={formState}
          onBack={() => setScreen("landing")}
          onSubmitName={(name) => updateField("name", name)}
          onSelectSingle={updateField}
          onToggleChip={toggleChip}
          onBuildPlan={buildPlan}
        />
      )}

      {screen === "chat" && <Chat onBack={() => setScreen("landing")} onUpdateField={updateField} onBuildPlan={buildPlan} />}

      {screen === "loading" && <Loading name={formState.name} />}

      {screen === "dashboard" && activeGoal && activeTemplate && (
        <Dashboard
          goalLabel={activeGoal.formState.goalLabel}
          userName={activeGoal.formState.name}
          pills={[activeGoal.formState.timeframe, activeGoal.formState.experience, activeGoal.formState.risk]}
          templateId={activeGoal.templateId}
          phases={activeTemplate.phases}
          steps={activeTemplate.steps}
          doneSteps={activeGoal.doneSteps}
          doneItems={activeGoal.doneItems}
          savedIds={savedIds}
          onToggleSaved={toggleSaved}
          onOpenStep={(id) => {
            setCurrentDetailStepId(id);
            setScreen("step-detail");
          }}
          onToggleStepDone={toggleStepDone}
        />
      )}

      {screen === "step-detail" && activeGoal && activeTemplate && currentDetailStepId !== null && (
        <StepDetail
          key={currentDetailStepId}
          steps={activeTemplate.steps}
          phases={activeTemplate.phases}
          stepId={currentDetailStepId}
          done={activeGoal.doneSteps.has(currentDetailStepId)}
          doneSteps={activeGoal.doneSteps}
          doneItems={activeGoal.doneItems}
          onToggleItemDone={toggleItemDone}
          savedIds={savedIds}
          onToggleSaved={toggleSaved}
          onBack={() => setScreen("dashboard")}
          onToggleDone={() => toggleStepDone(currentDetailStepId)}
        />
      )}

      {screen === "library" && (
        <ResourceLibrary savedIds={savedIds} onToggleSaved={toggleSaved} onBack={() => setScreen(previousScreen)} />
      )}

      {screen === "goals" && (
        <Goals goals={goals} onSelectGoal={selectGoal} onAddGoal={startAddGoal} onBack={() => setScreen(previousScreen)} />
      )}
    </>
  );
}
