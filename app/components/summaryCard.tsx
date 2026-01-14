export default function SummaryCard({
  title,
  amount,
  tone = "neutral",
}: {
  title: string;
  amount: number;
  tone?: "good" | "bad" | "neutral";
}) {
  const color =
    tone === "good"
      ? "text-emerald-600"
      : tone === "bad"
      ? "text-rose-600"
      : "text-gray-900";

  const sign = amount < 0 ? "-" : "";
  const abs = Math.abs(amount);

  return (
    <div className="bg-white border shadow-sm rounded-2xl p-4">
      <p className="text-xs text-gray-500">{title}</p>
      <h2 className={`text-2xl font-extrabold mt-1 ${color}`}>
        {sign}£{abs.toFixed(2)}
      </h2>
    </div>
  );
}
