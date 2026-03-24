import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-3">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest">
            NIST CSF 2.0
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight">
            Clrposture
          </h1>
          <p className="text-xl text-gray-400">
            Cybersecurity compliance for SMEs — simple, free, and actionable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-2xl mb-2">⏱</p>
            <p className="font-semibold">Under 30 min</p>
            <p className="text-sm text-gray-400 mt-1">
              Walk through all 106 NIST CSF 2.0 subcategories at your own pace
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-2xl mb-2">📊</p>
            <p className="font-semibold">Gap report</p>
            <p className="text-sm text-gray-400 mt-1">
              See your tier scores and prioritized remediation steps by function
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
            <p className="text-2xl mb-2">🔒</p>
            <p className="font-semibold">No account needed</p>
            <p className="text-sm text-gray-400 mt-1">
              Everything runs in your browser — nothing is sent to any server
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/assess"
            className="inline-block bg-blue-600 hover:bg-blue-500 text-white font-semibold px-10 py-4 rounded-xl text-lg transition-colors"
          >
            Start Assessment
          </Link>
          <p className="text-xs text-gray-600">
            Aligned with NIST CSF 2.0 (February 2024) · MIT licensed · Open source
          </p>
        </div>
      </div>
    </main>
  );
}
