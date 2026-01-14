"use client";

import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function DashboardClient() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Insights state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiText, setAiText] = useState<string>("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/transactions");
    const json = await res.json().catch(() => []);
    setData(Array.isArray(json) ? json : []);
    setLoading(false);
  };

  const runInsights = async () => {
    try {
      setAiLoading(true);
      setAiText("");
      const res = await fetch("/api/insights", { method: "POST" });
      const json = await res.json().catch(() => ({}));
      setAiText(json?.text || json?.error || "No response");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Transaction Section */}
      <section className="bg-white border rounded-2xl p-4 space-y-4">
        <h2 className="text-lg font-bold">Add Transaction</h2>
        <TransactionForm onDone={load} />
      </section>

      <section className="bg-white border rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Transactions</h2>
          <button
            onClick={load}
            className="px-3 py-2 rounded-xl border text-sm hover:bg-gray-50"
          >
            Refresh
          </button>
        </div>

        {loading ? <p>Loading...</p> : <TransactionList data={data} onDone={load} />}
      </section>

      {/* AI Insights Section */}
      <section className="bg-white border rounded-2xl p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">AI Insights (Local Ollama)</h2>

          <button
            onClick={runInsights}
            disabled={aiLoading}
            className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60"
          >
            {aiLoading ? "Analyzing..." : "Generate Insights"}
          </button>
        </div>

        <pre className="bg-white border rounded-2xl p-4 whitespace-pre-wrap min-h-[120px]">
          {aiText || "Generate Insights..."}
        </pre>

        <p className="text-xs text-gray-500">
          Note: প্রথমবার model load হতে সময় লাগতে পারে (timeout হলে আবার চাপ দাও)।
        </p>
      </section>
    </main>
  );
}
