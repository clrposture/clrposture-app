import { describe, expect, it } from "vitest";
import { reportToMarkdown } from "../markdown";
import { makeReport } from "./fixtures";

describe("reportToMarkdown", () => {
  it("opens with an h1 containing the industry name", () => {
    const md = reportToMarkdown(makeReport(), "fintech");
    expect(md).toMatch(/^# Clrposture Gap Report/m);
    expect(md).toContain("fintech");
  });

  it("includes a function-score table with all 6 functions", () => {
    const md = reportToMarkdown(makeReport(), "fintech");
    for (const fn of ["GV", "ID", "PR", "DE", "RS", "RC"]) {
      expect(md).toContain(fn);
    }
    // Markdown table separator
    expect(md).toContain("| --- |");
  });

  it("includes the three urgency bucket headings", () => {
    const md = reportToMarkdown(makeReport(), "fintech");
    expect(md).toContain("## Immediate");
    expect(md).toContain("## Short-term");
    expect(md).toContain("## Strategic");
  });

  it("lists each gap with its subcategoryId and tier transition", () => {
    const md = reportToMarkdown(makeReport(), "fintech");
    expect(md).toContain("GV.OC-01");
    expect(md).toContain("T1 → T4");
    expect(md).toContain("PR.AA-01");
    expect(md).toContain("T2 → T4");
  });

  it("includes numbered remediation steps under each gap", () => {
    const md = reportToMarkdown(makeReport(), "fintech");
    expect(md).toContain("1. First immediate step");
    expect(md).toContain("2. Second immediate step");
  });

  it("includes an LLM context block at the top", () => {
    const md = reportToMarkdown(makeReport(), "fintech");
    expect(md).toContain("NIST CSF 2.0");
    // Should give the LLM enough context to act on
    expect(md).toContain("gap report");
  });

  it("omits empty bucket sections", () => {
    const report = makeReport({ shortTerm: [], strategic: [] });
    const md = reportToMarkdown(report, "fintech");
    expect(md).not.toContain("## Short-term");
    expect(md).not.toContain("## Strategic");
  });
});
