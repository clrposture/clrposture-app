import type { Tier } from "@clrposture/core";

type Props = {
  subcategoryId: string;
  tiers: [string, string, string, string];
  selected: Tier | undefined;
  onChange: (tier: Tier) => void;
};

const TIER_LABELS: Record<Tier, string> = {
  1: "Tier 1 — Partial",
  2: "Tier 2 — Risk Informed",
  3: "Tier 3 — Repeatable",
  4: "Tier 4 — Adaptive",
};

export function TierRadio({ subcategoryId, tiers, selected, onChange }: Props) {
  return (
    <fieldset className="space-y-2">
      {([1, 2, 3, 4] as Tier[]).map((tier) => {
        const isSelected = selected === tier;
        return (
          <label
            key={tier}
            className={`flex items-start gap-3 rounded-lg px-4 py-3 border cursor-pointer transition-colors ${
              isSelected
                ? "border-blue-500 bg-blue-950"
                : "border-gray-700 bg-gray-900 hover:border-gray-500"
            }`}
          >
            <input
              type="radio"
              name={subcategoryId}
              value={tier}
              checked={isSelected}
              onChange={() => onChange(tier)}
              className="mt-0.5 accent-blue-500 shrink-0"
            />
            <span>
              <span className="block text-xs font-semibold text-blue-400 mb-0.5">
                {TIER_LABELS[tier]}
              </span>
              <span className="text-sm text-gray-300">{tiers[tier - 1]}</span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
