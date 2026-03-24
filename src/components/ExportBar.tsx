"use client";

import { reportToCsv } from "@/lib/export/csv";
import { reportToMarkdown } from "@/lib/export/markdown";
import { downloadBlob } from "@/lib/export/download";
import type { AnalysisReport } from "@/lib/export/types";

type Props = {
  report: AnalysisReport;
  industry: string;
};

export function ExportBar({ report, industry }: Props) {
  const slug = industry.toLowerCase().replace(/\s+/g, "-");
  const date = new Date().toISOString().slice(0, 10);
  const base = `clrposture-${slug}-${date}`;

  function handleCsv() {
    downloadBlob(reportToCsv(report), `${base}.csv`, "text/csv");
  }

  function handleMarkdown() {
    downloadBlob(
      reportToMarkdown(report, industry),
      `${base}.md`,
      "text/markdown"
    );
  }

  function handlePdf() {
    window.print();
  }

  return (
    <div className="flex flex-wrap gap-2 no-print">
      <button
        onClick={handleCsv}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
        title="Download gap report as CSV — suitable for spreadsheets and data analysis"
      >
        <span>⬇</span> CSV
      </button>
      <button
        onClick={handleMarkdown}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
        title="Download as Markdown — optimised for pasting into Claude, ChatGPT, or any LLM"
      >
        <span>⬇</span> Markdown <span className="text-xs text-blue-400 ml-1">for LLMs</span>
      </button>
      <button
        onClick={handlePdf}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
        title="Print or save as PDF using your browser's print dialog"
      >
        <span>🖨</span> PDF
      </button>
    </div>
  );
}
