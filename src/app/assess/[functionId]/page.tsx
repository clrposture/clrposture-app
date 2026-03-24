"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { CSF_FUNCTIONS } from "@clrposture/core";
import type { FunctionId, Tier } from "@clrposture/core";
import { FUNCTION_ORDER, nextFunction, prevFunction } from "@/lib/assessment-store";
import { usePostHog } from "posthog-js/react";
import { useAssessment } from "@/lib/assessment-context";
import { EVENTS, functionCompletedProps } from "@/lib/analytics";
import { ProgressBar } from "@/components/ProgressBar";
import { TierRadio } from "@/components/TierRadio";

const FUNCTION_LABELS: Record<FunctionId, string> = {
  GV: "Govern",
  ID: "Identify",
  PR: "Protect",
  DE: "Detect",
  RS: "Respond",
  RC: "Recover",
};

export default function FunctionPage({
  params,
}: {
  params: Promise<{ functionId: string }>;
}) {
  const { functionId } = use(params);
  const router = useRouter();
  const posthog = usePostHog();
  const { store, recordAnswer } = useAssessment();

  const fnId = functionId as FunctionId;
  if (!FUNCTION_ORDER.includes(fnId)) {
    router.replace("/assess");
    return null;
  }

  const csfFunction = CSF_FUNCTIONS.find((f) => f.id === fnId)!;
  const subcategories = csfFunction.categories.flatMap((c) => c.subcategories);

  const stepIndex = FUNCTION_ORDER.indexOf(fnId) + 2; // +2: step 1 is industry
  const totalSteps = FUNCTION_ORDER.length + 1;

  function handleNext() {
    posthog?.capture(EVENTS.FUNCTION_COMPLETED, functionCompletedProps(fnId, answeredCount));
    const next = nextFunction(fnId);
    if (next) {
      router.push(`/assess/${next}`);
    } else {
      router.push("/results");
    }
  }

  function handleBack() {
    const prev = prevFunction(fnId);
    if (prev) {
      router.push(`/assess/${prev}`);
    } else {
      router.push("/assess");
    }
  }

  const answeredCount = subcategories.filter(
    (sc) => store.answers[sc.id] !== undefined
  ).length;
  const allAnswered = answeredCount === subcategories.length;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-4">
          <ProgressBar current={fnId} />
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
                Step {stepIndex} of {totalSteps}
              </p>
              <h2 className="text-3xl font-bold mt-1">
                {fnId} — {FUNCTION_LABELS[fnId]}
              </h2>
            </div>
            <span className="text-sm text-gray-500">
              {answeredCount}/{subcategories.length} answered
            </span>
          </div>
        </div>

        <div className="space-y-10">
          {subcategories.map((sc) => (
            <div key={sc.id} className="space-y-3">
              <div>
                <span className="text-xs font-mono text-gray-500">{sc.id}</span>
                <p className="text-base font-medium mt-1">{sc.description}</p>
              </div>
              <TierRadio
                subcategoryId={sc.id}
                tiers={sc.tiers as [string, string, string, string]}
                selected={store.answers[sc.id] as Tier | undefined}
                onChange={(tier) => recordAnswer(sc.id, tier)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-800">
          <button
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!allAnswered}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {nextFunction(fnId) ? "Next function" : "See results"}
          </button>
        </div>
      </div>
    </main>
  );
}
