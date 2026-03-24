"use client";

import { useRouter } from "next/navigation";
import { useAssessment } from "@/lib/assessment-context";

const INDUSTRIES = [
  {
    id: "fintech",
    label: "Fintech / Financial Services",
    description: "SOC 2, PCI DSS, investor due diligence",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    description: "HIPAA compliance and PHI protection",
  },
  {
    id: "federal-contractor",
    label: "Federal Contractor",
    description: "EO 14144, federal procurement requirements",
  },
  {
    id: "dib",
    label: "Defense Industrial Base",
    description: "CMMC 2.0 Level 2/3, CUI handling",
  },
  {
    id: "mssp",
    label: "IT Consultant / MSSP",
    description: "Neutral baseline for client assessments",
  },
];

export default function IndustryPage() {
  const router = useRouter();
  const { store, setIndustry } = useAssessment();

  function handleSelect(industryId: string) {
    setIndustry(industryId);
    router.push("/assess/GV");
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full space-y-8">
        <div className="space-y-2">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            Step 1 of 7
          </p>
          <h2 className="text-3xl font-bold">Select your industry</h2>
          <p className="text-gray-400">
            This selects the target compliance profile for your gap report.
          </p>
        </div>

        <ul className="space-y-3">
          {INDUSTRIES.map((industry) => {
            const selected = store.industry === industry.id;
            return (
              <li key={industry.id}>
                <button
                  onClick={() => handleSelect(industry.id)}
                  className={`w-full text-left rounded-xl px-5 py-4 border transition-colors ${
                    selected
                      ? "border-blue-500 bg-blue-950"
                      : "border-gray-700 bg-gray-900 hover:border-gray-500"
                  }`}
                >
                  <p className="font-semibold">{industry.label}</p>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {industry.description}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
