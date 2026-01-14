"use client";

import { useState } from "react";

export default function TransactionForm({ onDone }: { onDone: () => void }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"income" | "expense">("income");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const num = Number(amount);

    if (!title.trim()) return alert("Title required");
    if (!amount || Number.isNaN(num) || num <= 0) return alert("Amount must be > 0");

    try {
      setLoading(true);
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), amount: num, type }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || "Failed");
      }

      setTitle("");
      setAmount("");
      setType("income");
      onDone();
    } catch (e: any) {
      alert(e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border shadow-sm rounded-2xl p-4 space-y-3">
      <div className="space-y-2">
        <input
          className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          placeholder="e.g. Salary / Rent / Food"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType("income")}
            className={`py-2 rounded-xl border ${type === "income" ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}
          >
            Income
          </button>
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`py-2 rounded-xl border ${type === "expense" ? "bg-black text-white" : "bg-white hover:bg-gray-50"}`}
          >
            Expense
          </button>
        </div>
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full py-2.5 rounded-xl bg-black text-white hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </div>
  );
}
