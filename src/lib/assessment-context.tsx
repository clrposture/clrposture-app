"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { Tier } from "@clrposture/core";
import {
  type AssessmentStore,
  createAssessmentStore,
} from "./assessment-store";
import {
  clearAssessment,
  loadAssessment,
  saveAssessment,
} from "./storage";

type AssessmentContextValue = {
  store: AssessmentStore;
  setIndustry: (industry: string) => void;
  recordAnswer: (subcategoryId: string, tier: Tier) => void;
  reset: () => void;
};

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

export function AssessmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // SSR-safe: start with empty store, hydrate from localStorage after mount.
  const [store, setStore] = useState<AssessmentStore>(createAssessmentStore);

  const isHydrated = useRef(false);
  // When true, the next save effect clears localStorage instead of saving.
  const clearOnNextSave = useRef(false);

  // Persist to localStorage after every state change — declared BEFORE hydration
  // effect so it runs first on mount (isHydrated is still false → skipped).
  useEffect(() => {
    if (!isHydrated.current) return;
    if (clearOnNextSave.current) {
      clearAssessment();
      clearOnNextSave.current = false;
    } else {
      saveAssessment(store);
    }
  }, [store]);

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    const saved = loadAssessment();
    if (saved) setStore(saved);
    isHydrated.current = true;
  }, []);

  const setIndustry = useCallback((industry: string) => {
    setStore((prev) => ({ ...prev, industry }));
  }, []);

  const recordAnswer = useCallback((subcategoryId: string, tier: Tier) => {
    setStore((prev) => ({
      ...prev,
      answers: { ...prev.answers, [subcategoryId]: tier },
    }));
  }, []);

  const reset = useCallback(() => {
    clearOnNextSave.current = true;
    setStore(createAssessmentStore());
  }, []);

  return (
    <AssessmentContext.Provider value={{ store, setIndustry, recordAnswer, reset }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment(): AssessmentContextValue {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment must be used within AssessmentProvider");
  return ctx;
}
