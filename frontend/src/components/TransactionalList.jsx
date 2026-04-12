export default function TransactionList({ data }) {

  if (!data.length) {
    return (
      <div className="bg-white/5 p-6 rounded-xl text-center text-gray-400">
        No transactions found
      </div>
    );
  }

  return (
    <div className="space-y-3 mb-6">

      <h3 className="text-white font-semibold mb-2">
        Recent Transactions
      </h3>

      {data.slice(0, 5).map((t, i) => (
        <div
          key={i}
          className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition shadow-sm"
        >
          <div>
            <p className="text-white font-medium">{t.title}</p>
            <p className="text-xs text-gray-400">
              {t.category} • {new Date(t.date).toLocaleDateString()}
            </p>
          </div>

          <p className={`font-semibold ${
            t.type === "income" ? "text-green-400" : "text-red-400"
          }`}>
            {t.type === "income" ? "+" : "-"}₹{t.amount}
          </p>
        </div>
      ))}

    </div>
  );
}