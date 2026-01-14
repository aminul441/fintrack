"use client";

import { useState } from "react";

export default function InsightsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  const run = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/insights", { method: "POST" });
      const json = await res.json().catch(() => ({}));
      setResult(json?.text || json?.error || "No response received.");
    } catch (e: any) {
      setResult(e?.message || "Request failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
            AI Insights (Local Ollama)
          </h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl">
            Generate quick financial insights from your recent transactions using your local
            LLM. No cloud calls — runs on your machine.
          </p>
        </div>

        {/* Card */}
        <div className="mt-6 bg-white border border-gray-200 shadow-sm rounded-2xl p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                AI
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Insight Generator</p>
                <p className="text-xs text-gray-500">
                  Uses <span className="font-medium">/api/insights</span> → Ollama (
                  <span className="font-medium">OLLAMA_MODEL</span>)
                </p>
              </div>
            </div>

            <button
              onClick={run}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-black text-white font-semibold
              hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Analyzing…
                </>
              ) : (
                "Generate Insights"
              )}
            </button>
          </div>

          {/* ✅ Professional Note */}
          <p className="mt-3 text-sm text-gray-600">
            <b>Note:</b> The first request may take a little longer while the model initializes.
            If it times out, please click <b>Generate Insights</b> again.
          </p>

          {/* Output box */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-900">Generated Output</p>
              <p className="text-xs text-gray-500">
                {result ? "Ready" : "Waiting for request"}
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:p-5 min-h-[180px]">
              <pre className="whitespace-pre-wrap text-sm leading-6 text-gray-800">
                {result ||
                  "No insights generated yet. Click “Generate Insights” to analyze your recent income and expenses and get actionable recommendations."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
