import { describe, expect, it, beforeEach } from "vitest";
import {
  createAssessmentStore,
  FUNCTION_ORDER,
  nextFunction,
  prevFunction,
  isComplete,
} from "../assessment-store.js";

describe("FUNCTION_ORDER", () => {
  it("contains all 6 CSF function IDs in framework order", () => {
    expect(FUNCTION_ORDER).toEqual(["GV", "ID", "PR", "DE", "RS", "RC"]);
  });
});

describe("createAssessmentStore", () => {
  it("initialises with no industry and no answers", () => {
    const store = createAssessmentStore();
    expect(store.industry).toBeNull();
    expect(store.answers).toEqual({});
  });

  it("sets industry", () => {
    const store = createAssessmentStore();
    const updated = { ...store, industry: "fintech" };
    expect(updated.industry).toBe("fintech");
  });

  it("records an answer", () => {
    const store = createAssessmentStore();
    const updated = {
      ...store,
      answers: { ...store.answers, "GV.OC-01": 3 as const },
    };
    expect(updated.answers["GV.OC-01"]).toBe(3);
  });

  it("overwrites an existing answer", () => {
    const store = createAssessmentStore();
    let updated = { ...store, answers: { "GV.OC-01": 2 as const } };
    updated = { ...updated, answers: { ...updated.answers, "GV.OC-01": 4 as const } };
    expect(updated.answers["GV.OC-01"]).toBe(4);
  });
});

describe("nextFunction", () => {
  it("returns the next function ID", () => {
    expect(nextFunction("GV")).toBe("ID");
    expect(nextFunction("ID")).toBe("PR");
    expect(nextFunction("RC")).toBeNull();
  });
});

describe("prevFunction", () => {
  it("returns the previous function ID", () => {
    expect(prevFunction("ID")).toBe("GV");
    expect(prevFunction("RC")).toBe("RS");
    expect(prevFunction("GV")).toBeNull();
  });
});

describe("isComplete", () => {
  it("returns false when no industry is set", () => {
    const store = createAssessmentStore();
    expect(isComplete(store)).toBe(false);
  });

  it("returns false when industry is set but no answers", () => {
    const store = { ...createAssessmentStore(), industry: "fintech" };
    expect(isComplete(store)).toBe(false);
  });

  it("returns true when industry and at least one answer are present", () => {
    const store = {
      ...createAssessmentStore(),
      industry: "fintech",
      answers: { "GV.OC-01": 2 as const },
    };
    expect(isComplete(store)).toBe(true);
  });
});
