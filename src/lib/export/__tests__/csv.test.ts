import { describe, expect, it } from "vitest";
import { reportToCsv } from "../csv";
import { makeReport } from "./fixtures";

describe("reportToCsv", () => {
  it("emits a header row as the first line", () => {
    const lines = reportToCsv(makeReport()).split("\n");
    expect(lines[0]).toBe(
      "subcategoryId,functionId,currentTier,targetTier,delta,bucket,steps"
    );
  });

  it("emits one data row per gap across all buckets", () => {
    const report = makeReport();
    const totalGaps =
      report.remediationPlan.immediate.length +
      report.remediationPlan.shortTerm.length +
      report.remediationPlan.strategic.length;
    const lines = reportToCsv(report).split("\n");
    expect(lines.length).toBe(totalGaps + 1); // +1 for header
  });

  it("labels bucket correctly for each row", () => {
    const csv = reportToCsv(makeReport());
    expect(csv).toContain(",immediate,");
    expect(csv).toContain(",short-term,");
    expect(csv).toContain(",strategic,");
  });

  it("quotes and pipe-joins multi-step cells", () => {
    const csv = reportToCsv(makeReport());
    // steps cell is always quoted and uses | as separator
    expect(csv).toMatch(/"[^|].*\|.*"/);
  });

  it("escapes commas inside step text by quoting the cell", () => {
    const report = makeReport({
      immediate: [
        {
          subcategoryId: "GV.OC-01",
          currentTier: 1,
          targetTier: 4,
          delta: 3,
          steps: ["Step one, with a comma", "Step two"],
        },
      ],
    });
    const csv = reportToCsv(report);
    expect(csv).toContain('"Step one, with a comma|Step two"');
  });

  it("writes functionId derived from subcategoryId prefix", () => {
    const csv = reportToCsv(makeReport());
    expect(csv).toContain(",GV,");
    expect(csv).toContain(",PR,");
  });
});
