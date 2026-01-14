"use client";

export default function TransactionList({
  data,
  onDone,
}: {
  data: any[];
  onDone: () => void;
}) {
  const del = async (id: string) => {
    const ok = confirm("Delete this transaction?");
    if (!ok) return;

    const res = await fetch(`/api/transactions?id=${id}`, { method: "DELETE" });
    if (res.ok) onDone();
  };

  return (
    <div className="bg-white border shadow-sm rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">Transactions</h3>
        <span className="text-xs text-gray-500">{data.length} items</span>
      </div>

      {data.length === 0 ? (
        <div className="text-sm text-gray-400">No transactions yet.</div>
      ) : (
        <ul className="space-y-2">
          {data.map((tx) => (
            <li key={tx._id} className="flex items-center justify-between border rounded-xl px-3 py-2">
              <div>
                <p className="font-medium">{tx.title}</p>
                <p className="text-xs text-gray-500">{new Date(tx.createdAt).toLocaleString()}</p>
              </div>

              <div className="flex items-center gap-3">
                <span className={`font-bold ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {tx.type === "income" ? "+" : "-"}£{Number(tx.amount).toFixed(2)}
                </span>
                <button
                  onClick={() => del(tx._id)}
                  className="text-xs px-2 py-1 rounded-lg border hover:bg-gray-50"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
