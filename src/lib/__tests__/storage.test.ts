import { describe, expect, it, beforeEach } from "vitest";
import { saveAssessment, loadAssessment, clearAssessment } from "../storage.js";
import { createAssessmentStore } from "../assessment-store.js";

beforeEach(() => {
  localStorage.clear();
});

describe("saveAssessment / loadAssessment", () => {
  it("round-trips the store through localStorage", () => {
    const store = {
      ...createAssessmentStore(),
      industry: "fintech",
      answers: { "GV.OC-01": 3 as const },
    };
    saveAssessment(store);
    expect(loadAssessment()).toEqual(store);
  });

  it("returns null when nothing is stored", () => {
    expect(loadAssessment()).toBeNull();
  });

  it("returns null when stored value is corrupt JSON", () => {
    localStorage.setItem("clrposture_assessment", "not-json{");
    expect(loadAssessment()).toBeNull();
  });
});

describe("clearAssessment", () => {
  it("removes the stored assessment", () => {
    saveAssessment({ ...createAssessmentStore(), industry: "fintech", answers: {} });
    clearAssessment();
    expect(loadAssessment()).toBeNull();
  });
});
