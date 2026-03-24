import type { FunctionId } from "@clrposture/core";

export const EVENTS = {
  ASSESSMENT_STARTED: "assessment_started",
  FUNCTION_COMPLETED: "function_completed",
  ASSESSMENT_COMPLETED: "assessment_completed",
  EXPORT_CLICKED: "export_clicked",
} as const;

export type ExportFormat = "csv" | "markdown" | "pdf";

// Pure property-builder functions — keep event shape in one place so
// every call site stays in sync and tests can validate the contract.

export function assessmentStartedProps(industry: string) {
  return { industry };
}

export function functionCompletedProps(functionId: FunctionId, answeredCount: number) {
  return { function_id: functionId, answered_count: answeredCount };
}

export function assessmentCompletedProps(
  industry: string,
  gaps: {
    immediate: number;
    shortTerm: number;
    strategic: number;
    weakestFunction: string | null;
  }
) {
  return {
    industry,
    gaps_immediate: gaps.immediate,
    gaps_short_term: gaps.shortTerm,
    gaps_strategic: gaps.strategic,
    gaps_total: gaps.immediate + gaps.shortTerm + gaps.strategic,
    weakest_function: gaps.weakestFunction,
  };
}

export function exportClickedProps(format: ExportFormat) {
  return { format };
}
