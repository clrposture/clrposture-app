import type { AssessmentStore } from "./assessment-store.js";

const KEY = "clrposture_assessment";

export function saveAssessment(store: AssessmentStore): void {
  localStorage.setItem(KEY, JSON.stringify(store));
}

export function loadAssessment(): AssessmentStore | null {
  const raw = localStorage.getItem(KEY);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as AssessmentStore;
  } catch {
    return null;
  }
}

export function clearAssessment(): void {
  localStorage.removeItem(KEY);
}
