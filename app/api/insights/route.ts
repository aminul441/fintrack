import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import Transaction from "../../models/Transaction";

export async function POST() {
  try {
    await connectDB();

    const tx = await Transaction.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    const income = tx
      .filter((t: any) => t.type === "income")
      .reduce((a: number, b: any) => a + Number(b.amount || 0), 0);

    const expense = tx
      .filter((t: any) => t.type === "expense")
      .reduce((a: number, b: any) => a + Number(b.amount || 0), 0);

    const prompt = `You are a finance assistant. Analyze the user's transactions and provide:
- 5 short insights
- 3 actionable tips

User summary:
Total income: ${income}
Total expense: ${expense}
Net: ${income - expense}

Recent transactions:
${tx.map((t: any) => `${t.type}: ${t.title} £${t.amount}`).join(" | ")}
`;

    const base = process.env.OLLAMA_URL || "http://localhost:11434";
    const model = process.env.OLLAMA_MODEL || "llama3.1:8b";

    // ✅ Increase timeout to 60s
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 60000);

    const r = await fetch(`${base}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, prompt, stream: false }),
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));

    const data = await r.json().catch(() => ({}));

    return NextResponse.json({
      text: data?.response || "No response received from Ollama.",
    });
  } catch (e: any) {
    const msg =
      e?.name === "AbortError"
        ? "Ollama request timed out (60s). Model may be loading — try again."
        : e?.message || "Failed";

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
