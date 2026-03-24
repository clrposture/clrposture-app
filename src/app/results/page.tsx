"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  GapAnalyzer,
  CSF_FUNCTIONS,
  FINTECH_PROFILE,
  HEALTHCARE_PROFILE,
  FEDERAL_CONTRACTOR_PROFILE,
  DIB_PROFILE,
  MSSP_PROFILE,
} from "@clrposture/core";
import type { Profile } from "@clrposture/core";
import { useAssessment } from "@/lib/assessment-context";
import { FUNCTION_ORDER } from "@/lib/assessment-store";
import type { FunctionId, Tier } from "@clrposture/core";

const PROFILE_MAP: Record<string, Profile> = {
  fintech: FINTECH_PROFILE,
  healthcare: HEALTHCARE_PROFILE,
  "federal-contractor": FEDERAL_CONTRACTOR_PROFILE,
  dib: DIB_PROFILE,
  mssp: MSSP_PROFILE,
};

const FUNCTION_LABELS: Record<FunctionId, string> = {
  GV: "Govern",
  ID: "Identify",
  PR: "Protect",
  DE: "Detect",
  RS: "Respond",
  RC: "Recover",
};

// Build a flat subcategory description lookup from CSF_FUNCTIONS
const SUBCATEGORY_DESC: Record<string, string> = Object.fromEntries(
  CSF_FUNCTIONS.flatMap((fn) =>
    fn.categories.flatMap((cat) =>
      cat.subcategories.map((sc) => [sc.id, sc.description])
    )
  )
);

function tierColor(tier: number): string {
  if (tier < 1.5) return "bg-red-900 border-red-800";
  if (tier < 2.5) return "bg-orange-900 border-orange-800";
  if (tier < 3.5) return "bg-yellow-900 border-yellow-800";
  return "bg-green-900 border-green-800";
}

function tierTextColor(tier: number): string {
  if (tier < 1.5) return "text-red-300";
  if (tier < 2.5) return "text-orange-300";
  if (tier < 3.5) return "text-yellow-300";
  return "text-green-300";
}

const BUCKET_LABELS: Record<string, string> = {
  immediate: "Immediate  (gap ≥ 3 tiers)",
  shortTerm: "Short-term  (gap = 2 tiers)",
  strategic: "Strategic  (gap = 1 tier)",
};

const BUCKET_HEADER_COLORS: Record<string, string> = {
  immediate: "text-red-400 border-red-800",
  shortTerm: "text-orange-400 border-orange-800",
  strategic: "text-yellow-400 border-yellow-800",
};

export default function ResultsPage() {
  const { store, reset } = useAssessment();

  const report = useMemo(() => {
    if (!store.industry || Object.keys(store.answers).length === 0) return null;
    const profile = PROFILE_MAP[store.industry];
    if (!profile) return null;
    const answers = Object.entries(store.answers).map(([subcategoryId, tier]) => ({
      subcategoryId,
      tier: tier as Tier,
    }));
    const analyzer = new GapAnalyzer(CSF_FUNCTIONS);
    return analyzer.analyze(answers, profile, crypto.randomUUID());
  }, [store]);

  if (!report) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center gap-6 px-4">
        <p className="text-gray-400">No assessment data found.</p>
        <Link
          href="/assess"
          className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-semibold transition-colors"
        >
          Start Assessment
        </Link>
      </main>
    );
  }

  const buckets = [
    { key: "immediate", items: report.remediationPlan.immediate },
    { key: "shortTerm", items: report.remediationPlan.shortTerm },
    { key: "strategic", items: report.remediationPlan.strategic },
  ] as const;

  const totalGaps =
    report.remediationPlan.immediate.length +
    report.remediationPlan.shortTerm.length +
    report.remediationPlan.strategic.length;

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Assessment Complete
          </p>
          <h2 className="text-3xl font-bold">Your Gap Report</h2>
          <p className="text-gray-400">
            Industry:{" "}
            <span className="text-white capitalize">
              {store.industry?.replace(/-/g, " ")}
            </span>
            {" · "}
            {totalGaps} gap{totalGaps !== 1 ? "s" : ""} identified
          </p>
        </div>

        {/* Function scores */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold">Tier Scores by Function</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {FUNCTION_ORDER.map((fnId) => {
              const summary = report.byFunction[fnId];
              const avg = summary?.currentAvg ?? 0;
              const rounded = Math.round(avg);
              return (
                <div
                  key={fnId}
                  className={`rounded-xl p-4 border ${tierColor(avg)}`}
                >
                  <p className="text-xs text-gray-400 font-mono">{fnId}</p>
                  <p className="font-semibold mt-0.5">{FUNCTION_LABELS[fnId]}</p>
                  <p className={`text-2xl font-bold mt-2 ${tierTextColor(avg)}`}>
                    T{rounded > 0 ? rounded : "—"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Remediation plan */}
        {buckets.map(({ key, items }) =>
          items.length === 0 ? null : (
            <section key={key} className="space-y-3">
              <h3
                className={`text-base font-semibold border-b pb-2 ${BUCKET_HEADER_COLORS[key]}`}
              >
                {BUCKET_LABELS[key]}
              </h3>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.subcategoryId}
                    className="bg-gray-900 rounded-xl p-5 border border-gray-800 space-y-3"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-gray-500">
                        {item.subcategoryId}
                      </span>
                      <span className="text-xs text-gray-500">
                        T{item.currentTier} → T{item.targetTier}
                      </span>
                    </div>
                    <p className="text-sm font-medium">
                      {SUBCATEGORY_DESC[item.subcategoryId] ?? item.subcategoryId}
                    </p>
                    {item.steps.length > 0 && (
                      <ol className="space-y-1.5 list-none">
                        {item.steps.map((step, i) => (
                          <li key={i} className="flex gap-2 text-sm text-gray-400">
                            <span className="text-blue-500 shrink-0 font-semibold">
                              {i + 1}.
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800">
          <Link
            href="/assess/GV"
            className="flex-1 text-center px-6 py-3 rounded-xl border border-gray-700 text-gray-300 hover:border-gray-500 transition-colors"
          >
            Review answers
          </Link>
          <button
            onClick={() => {
              reset();
              window.location.href = "/";
            }}
            className="flex-1 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold transition-colors"
          >
            Start new assessment
          </button>
        </div>
      </div>
    </main>
  );
}
