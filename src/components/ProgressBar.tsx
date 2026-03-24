import type { FunctionId } from "@clrposture/core";
import { FUNCTION_ORDER } from "@/lib/assessment-store";

const FUNCTION_LABELS: Record<FunctionId, string> = {
  GV: "Govern",
  ID: "Identify",
  PR: "Protect",
  DE: "Detect",
  RS: "Respond",
  RC: "Recover",
};

export function ProgressBar({ current }: { current: FunctionId }) {
  const currentIndex = FUNCTION_ORDER.indexOf(current);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs text-gray-500 font-medium">
        {FUNCTION_ORDER.map((id, i) => (
          <span
            key={id}
            className={
              i <= currentIndex ? "text-blue-400" : "text-gray-600"
            }
          >
            {FUNCTION_LABELS[id]}
          </span>
        ))}
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / FUNCTION_ORDER.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
