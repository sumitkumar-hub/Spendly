import { useState } from "react";

export default function IncomeModal({ onClose, onAdd }) {

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!form.title || !form.amount) {
      setError("Title and Amount are required");
      return;
    }

    onAdd({
      ...form,
      type: "income",
      amount: Number(form.amount),
      date: form.date || new Date().toISOString()
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={onClose}
    >

      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-white/10 backdrop-blur-xl p-6 rounded-2xl w-80 space-y-4 shadow-2xl animate-fadeIn"
      >

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold text-lg">
            Add Income
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-sm">{error}</p>
        )}

        {/* INPUTS */}
        <input
          placeholder="Title"
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="w-full p-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="number"
          placeholder="Amount"
          onChange={e => setForm({ ...form, amount: e.target.value })}
          className="w-full p-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          placeholder="Category"
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="w-full p-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="date"
          onChange={e => setForm({ ...form, date: e.target.value })}
          className="w-full p-2 rounded-lg bg-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* BUTTON */}
        <button className="bg-green-500 w-full py-2 rounded-lg text-white hover:bg-green-600 transition">
          Add Income
        </button>

      </form>
    </div>
  );
}