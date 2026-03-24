import { describe, expect, it, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AssessmentProvider, useAssessment } from "../assessment-context.js";

beforeEach(() => {
  localStorage.clear();
});

function ReadIndustry() {
  const { store } = useAssessment();
  return <span data-testid="industry">{store.industry ?? "none"}</span>;
}

function SetIndustryButton() {
  const { setIndustry } = useAssessment();
  return (
    <button onClick={() => setIndustry("fintech")}>set industry</button>
  );
}

function RecordAnswerButton() {
  const { recordAnswer } = useAssessment();
  return (
    <button onClick={() => recordAnswer("GV.OC-01", 3)}>record answer</button>
  );
}

function ReadAnswer() {
  const { store } = useAssessment();
  return <span data-testid="answer">{store.answers["GV.OC-01"] ?? "none"}</span>;
}

function ResetButton() {
  const { reset } = useAssessment();
  return <button onClick={reset}>reset</button>;
}

describe("AssessmentProvider", () => {
  it("initialises with no industry and no answers", () => {
    render(
      <AssessmentProvider>
        <ReadIndustry />
      </AssessmentProvider>
    );
    expect(screen.getByTestId("industry").textContent).toBe("none");
  });

  it("setIndustry updates the store", async () => {
    render(
      <AssessmentProvider>
        <ReadIndustry />
        <SetIndustryButton />
      </AssessmentProvider>
    );
    await userEvent.click(screen.getByText("set industry"));
    expect(screen.getByTestId("industry").textContent).toBe("fintech");
  });

  it("recordAnswer adds an answer", async () => {
    render(
      <AssessmentProvider>
        <ReadAnswer />
        <RecordAnswerButton />
      </AssessmentProvider>
    );
    await userEvent.click(screen.getByText("record answer"));
    expect(screen.getByTestId("answer").textContent).toBe("3");
  });

  it("persists store to localStorage on change", async () => {
    render(
      <AssessmentProvider>
        <SetIndustryButton />
      </AssessmentProvider>
    );
    await userEvent.click(screen.getByText("set industry"));
    const saved = JSON.parse(localStorage.getItem("clrposture_assessment")!);
    expect(saved.industry).toBe("fintech");
  });

  it("rehydrates from localStorage on mount", () => {
    localStorage.setItem(
      "clrposture_assessment",
      JSON.stringify({ industry: "healthcare", answers: {} })
    );
    render(
      <AssessmentProvider>
        <ReadIndustry />
      </AssessmentProvider>
    );
    expect(screen.getByTestId("industry").textContent).toBe("healthcare");
  });

  it("reset clears the store and localStorage", async () => {
    render(
      <AssessmentProvider>
        <ReadIndustry />
        <SetIndustryButton />
        <ResetButton />
      </AssessmentProvider>
    );
    await userEvent.click(screen.getByText("set industry"));
    await userEvent.click(screen.getByText("reset"));
    expect(screen.getByTestId("industry").textContent).toBe("none");
    expect(localStorage.getItem("clrposture_assessment")).toBeNull();
  });
});
