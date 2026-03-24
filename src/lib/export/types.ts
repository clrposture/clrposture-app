import type { FunctionId } from "@clrposture/core";

export type RemediationItem = {
  subcategoryId: string;
  currentTier: number;
  targetTier: number;
  delta: number;
  steps: string[];
};

export type FunctionSummary = {
  currentAvg: number;
  targetAvg: number;
  gapCount: number;
};

export type WeakestFunction = {
  id: FunctionId;
  currentAvg: number;
  gapCount: number;
};

export type AnalysisReport = {
  assessmentId: string;
  byFunction: Partial<Record<FunctionId, FunctionSummary>>;
  remediationPlan: {
    immediate: RemediationItem[];
    shortTerm: RemediationItem[];
    strategic: RemediationItem[];
    weakestFunction: WeakestFunction | null;
  };
};
