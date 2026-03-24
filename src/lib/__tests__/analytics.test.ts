import { describe, expect, it } from "vitest";
import {
  EVENTS,
  assessmentStartedProps,
  functionCompletedProps,
  assessmentCompletedProps,
  exportClickedProps,
} from "../analytics";

describe("EVENTS", () => {
  it("defines all required event names as string constants", () => {
    expect(EVENTS.ASSESSMENT_STARTED).toBe("assessment_started");
    expect(EVENTS.FUNCTION_COMPLETED).toBe("function_completed");
    expect(EVENTS.ASSESSMENT_COMPLETED).toBe("assessment_completed");
    expect(EVENTS.EXPORT_CLICKED).toBe("export_clicked");
  });
});

describe("assessmentStartedProps", () => {
  it("returns industry", () => {
    expect(assessmentStartedProps("fintech")).toEqual({ industry: "fintech" });
  });
});

describe("functionCompletedProps", () => {
  it("returns functionId and answeredCount", () => {
    expect(functionCompletedProps("GV", 30)).toEqual({
      function_id: "GV",
      answered_count: 30,
    });
  });
});

describe("assessmentCompletedProps", () => {
  it("returns industry, gap counts, and weakest function", () => {
    const props = assessmentCompletedProps("healthcare", {
      immediate: 2,
      shortTerm: 5,
      strategic: 10,
      weakestFunction: "RS",
    });
    expect(props).toEqual({
      industry: "healthcare",
      gaps_immediate: 2,
      gaps_short_term: 5,
      gaps_strategic: 10,
      gaps_total: 17,
      weakest_function: "RS",
    });
  });
});

describe("exportClickedProps", () => {
  it("returns the export format", () => {
    expect(exportClickedProps("csv")).toEqual({ format: "csv" });
    expect(exportClickedProps("markdown")).toEqual({ format: "markdown" });
    expect(exportClickedProps("pdf")).toEqual({ format: "pdf" });
  });
});
