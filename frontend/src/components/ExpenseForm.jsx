import React, { useState } from "react";

export default function ExpenseForm({ onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Please fill required fields");
      return;
    }

    onSubmit({
      ...form,
      amount: Number(form.amount),
      date: form.date || new Date().toISOString(), // ✅ SAFE DATE
    });

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "",
      date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/5 p-4 rounded-xl mt-6 space-y-3"
    >
      <h3 className="text-white font-semibold">Add Transaction</h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 rounded bg-white/10 text-white"
      />

      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full p-2 rounded bg-white/10 text-white"
      />

      <select
        name="type"
        value={form.type}
        onChange={handleChange}
        className="w-full p-2 rounded bg-white/10 text-white"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-2 rounded bg-white/10 text-white"
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 rounded bg-white/10 text-white"
      />

      <button
        type="submit"
        className="w-full bg-indigo-500 py-2 rounded text-white"
      >
        Add
      </button>
    </form>
  );
}