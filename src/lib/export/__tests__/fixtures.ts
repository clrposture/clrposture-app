import type { RemediationItem, AnalysisReport } from "../types";

type BucketOverride = {
  immediate?: RemediationItem[];
  shortTerm?: RemediationItem[];
  strategic?: RemediationItem[];
};

export function makeReport(override: BucketOverride = {}): AnalysisReport {
  const immediate: RemediationItem[] = override.immediate ?? [
    {
      subcategoryId: "GV.OC-01",
      currentTier: 1,
      targetTier: 4,
      delta: 3,
      steps: ["First immediate step", "Second immediate step", "Third step"],
    },
  ];

  const shortTerm: RemediationItem[] = override.shortTerm ?? [
    {
      subcategoryId: "PR.AA-01",
      currentTier: 2,
      targetTier: 4,
      delta: 2,
      steps: ["First short-term step", "Second short-term step"],
    },
  ];

  const strategic: RemediationItem[] = override.strategic ?? [
    {
      subcategoryId: "PR.AA-02",
      currentTier: 3,
      targetTier: 4,
      delta: 1,
      steps: ["One strategic step"],
    },
  ];

  return {
    assessmentId: "test-123",
    byFunction: {
      GV: { currentAvg: 1.5, targetAvg: 3, gapCount: 5 },
      ID: { currentAvg: 2.0, targetAvg: 3, gapCount: 3 },
      PR: { currentAvg: 2.5, targetAvg: 4, gapCount: 4 },
      DE: { currentAvg: 3.0, targetAvg: 3, gapCount: 0 },
      RS: { currentAvg: 1.0, targetAvg: 3, gapCount: 6 },
      RC: { currentAvg: 2.0, targetAvg: 3, gapCount: 2 },
    },
    remediationPlan: {
      immediate,
      shortTerm,
      strategic,
      weakestFunction: { id: "RS", currentAvg: 1.0, gapCount: 6 },
    },
  };
}
