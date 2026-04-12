export default function SummaryCards({ data }) {

  const income = data
    .filter(t => t.type === "income")
    .reduce((a, t) => a + Number(t.amount || 0), 0);

  const expense = data
    .filter(t => t.type === "expense")
    .reduce((a, t) => a + Number(t.amount || 0), 0);

  const balance = income - expense;
  const savings = income ? ((balance / income) * 100).toFixed(1) : 0;

  const Card = ({ title, value, color }) => (
    <div className="bg-white/5 backdrop-blur p-5 rounded-xl border border-white/10">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-${color}-400 text-xl font-bold`}>
        ₹{value}
      </h2>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card title="Balance" value={balance} color="green" />
      <Card title="Income" value={income} color="green" />
      <Card title="Expenses" value={expense} color="red" />
      <Card title="Savings %" value={savings} color="blue" />
    </div>
  );
}