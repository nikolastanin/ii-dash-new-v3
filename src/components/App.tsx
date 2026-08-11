"use client";

import { useEffect, useState } from "react";
import type { QuickFormState } from "@/lib/types";
import Header from "@/components/Header";
import Landing from "@/components/screens/Landing";
import QuickForm from "@/components/screens/QuickForm";
import Chat from "@/components/screens/Chat";
import Loading from "@/components/screens/Loading";
import Dashboard from "@/components/screens/Dashboard";
import StepDetail from "@/components/screens/StepDetail";
import ResourceLibrary from "@/components/screens/ResourceLibrary";

type Screen = "landing" | "quickform" | "chat" | "loading" | "dashboard" | "step-detail" | "library";

const EMPTY_FORM: QuickFormState = {
  name: "",
  goalLabel: "",
  timeframe: "",
  experience: "",
  investing: "",
  risk: "",
  worries: [],
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [previousScreen, setPreviousScreen] = useState<Screen>("landing");
  const [formState, setFormState] = useState<QuickFormState>(EMPTY_FORM);
  const [doneSteps, setDoneSteps] = useState<Set<number>>(new Set());
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [currentDetailStep, setCurrentDetailStep] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

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
    setTimeout(() => setScreen("dashboard"), 1200);
  }

  function toggleStepDone(n: number) {
    setDoneSteps((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
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
    setDoneSteps(new Set());
    setCurrentDetailStep(null);
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

  return (
    <>
      <Header onLogoClick={resetAll} onScrollToTools={scrollToTools} onStartOver={resetAll} onOpenLibrary={openLibrary} />

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

      {screen === "dashboard" && (
        <Dashboard
          formState={formState}
          doneSteps={doneSteps}
          savedIds={savedIds}
          onToggleSaved={toggleSaved}
          onOpenStep={(n) => {
            setCurrentDetailStep(n);
            setScreen("step-detail");
          }}
          onToggleStepDone={toggleStepDone}
        />
      )}

      {screen === "step-detail" && currentDetailStep !== null && (
        <StepDetail
          key={currentDetailStep}
          stepNumber={currentDetailStep}
          done={doneSteps.has(currentDetailStep)}
          doneSteps={doneSteps}
          savedIds={savedIds}
          onToggleSaved={toggleSaved}
          onBack={() => setScreen("dashboard")}
          onToggleDone={() => toggleStepDone(currentDetailStep)}
        />
      )}

      {screen === "library" && (
        <ResourceLibrary savedIds={savedIds} onToggleSaved={toggleSaved} onBack={() => setScreen(previousScreen)} />
      )}
    </>
  );
}
