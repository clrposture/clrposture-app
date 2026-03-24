import type { FunctionId, Tier } from "@clrposture/core";

export const FUNCTION_ORDER: FunctionId[] = ["GV", "ID", "PR", "DE", "RS", "RC"];

export type AssessmentStore = {
  industry: string | null;
  answers: Record<string, Tier>;
};

export function createAssessmentStore(): AssessmentStore {
  return { industry: null, answers: {} };
}

export function nextFunction(id: FunctionId): FunctionId | null {
  const idx = FUNCTION_ORDER.indexOf(id);
  return FUNCTION_ORDER[idx + 1] ?? null;
}

export function prevFunction(id: FunctionId): FunctionId | null {
  const idx = FUNCTION_ORDER.indexOf(id);
  return FUNCTION_ORDER[idx - 1] ?? null;
}

export function isComplete(store: AssessmentStore): boolean {
  return store.industry !== null && Object.keys(store.answers).length > 0;
}
