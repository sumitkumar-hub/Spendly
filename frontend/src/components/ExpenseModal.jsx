import { useState } from "react";

const expenseCategories = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Other",
];

export default function ExpenseModal({ onClose, onAdd }) {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      setError("Title and Amount are required");
      return;
    }

    onAdd({
      ...form,
      type: "expense",
      amount: Number(form.amount),
      date: form.date || new Date().toISOString()
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-3"
      onClick={onClose}
    >

      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-2xl w-full max-w-sm space-y-4 shadow-2xl"
      >

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold text-base sm:text-lg">
            Add Expense
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* TITLE */}
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 sm:p-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          className="w-full p-2 sm:p-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* CATEGORY */}
        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 sm:p-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {expenseCategories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* DATE */}
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="w-full p-2 sm:p-3 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* BUTTON */}
        <button className="bg-orange-500 w-full py-2 sm:py-3 text-sm sm:text-base rounded-lg text-white hover:bg-orange-600 transition">
          Add Expense
        </button>

      </form>
    </div>
  );
}