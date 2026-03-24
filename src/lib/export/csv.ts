import type { AnalysisReport, RemediationItem } from "./types";

const HEADER = "subcategoryId,functionId,currentTier,targetTier,delta,bucket,steps";

// Extract the FunctionId prefix from a subcategoryId (e.g. "GV.OC-01" → "GV").
function functionIdOf(subcategoryId: string): string {
  return subcategoryId.split(".")[0];
}

// Always quote and pipe-join the steps cell so multi-step and comma-containing
// values round-trip through any CSV parser without ambiguity.
function stepsCell(steps: string[]): string {
  return `"${steps.join("|")}"`;
}

function toRow(item: RemediationItem, bucket: string): string {
  return [
    item.subcategoryId,
    functionIdOf(item.subcategoryId),
    item.currentTier,
    item.targetTier,
    item.delta,
    bucket,
    stepsCell(item.steps),
  ].join(",");
}

export function reportToCsv(report: AnalysisReport): string {
  const rows: string[] = [HEADER];
  for (const item of report.remediationPlan.immediate)
    rows.push(toRow(item, "immediate"));
  for (const item of report.remediationPlan.shortTerm)
    rows.push(toRow(item, "short-term"));
  for (const item of report.remediationPlan.strategic)
    rows.push(toRow(item, "strategic"));
  return rows.join("\n");
}
