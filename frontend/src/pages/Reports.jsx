import React, { useEffect, useState, useMemo } from "react";
import { getExpenses } from "../api/expense";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MonthlyChart from "../components/MonthlyChart";
import CategoryChart from "../components/CategoryChart";

export default function Reports() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getExpenses();
      setExpenses(data || []);
    };
    fetchData();
  }, []);

  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(v);

  // 🔥 TOTALS
  const totalIncome = useMemo(() => {
    return expenses
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  }, [expenses]);

  const totalExpense = useMemo(() => {
    return expenses
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  }, [expenses]);

  const savings = totalIncome - totalExpense;

  // 🔥 TOP CATEGORY
  const topCategory = useMemo(() => {
    const map = new Map();

    expenses.forEach((tx) => {
      if (tx.type !== "expense") return;
      const cat = tx.category || "Other";
      map.set(cat, (map.get(cat) || 0) + tx.amount);
    });

    let max = 0;
    let top = "None";

    map.forEach((value, key) => {
      if (value > max) {
        max = value;
        top = key;
      }
    });

    return top;
  }, [expenses]);

  // 🔥 MONTHLY TREND
  const monthlyTotals = useMemo(() => {
    const map = new Map();

    expenses.forEach((tx) => {
      const d = new Date(tx.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;

      if (!map.has(key)) {
        map.set(key, { income: 0, expense: 0, ts: d.getTime() });
      }

      const entry = map.get(key);

      if (tx.type === "income") entry.income += tx.amount;
      else entry.expense += tx.amount;
    });

    return Array.from(map.values()).sort((a, b) => a.ts - b.ts);
  }, [expenses]);

  // 🔥 SMART INSIGHTS
  const insights = useMemo(() => {
    const list = [];

    if (topCategory !== "None") {
      list.push(`You spent most on ${topCategory} 💸`);
    }

    if (monthlyTotals.length >= 2) {
      const last = monthlyTotals[monthlyTotals.length - 1];
      const prev = monthlyTotals[monthlyTotals.length - 2];

      if (last.expense > prev.expense) {
        list.push("Your expenses increased this month 📈");
      } else {
        list.push("Your expenses decreased this month 📉");
      }
    }

    if (savings < 0) {
      list.push("You are spending more than you earn ⚠️");
    } else if (savings > 0) {
      list.push("Good job! You are saving money 🎉");
    }

    return list;
  }, [topCategory, monthlyTotals, savings]);

  // 📊 MONTHLY DATA
  const monthlyData = useMemo(() => {
    return monthlyTotals.map((m, i) => ({
      month: `M${i + 1}`,
      income: m.income,
      expense: m.expense,
    }));
  }, [monthlyTotals]);

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        <h2 className="text-white text-2xl mb-6">Reports</h2>

        {/* SUMMARY */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <Card title="Income" value={formatCurrency(totalIncome)} color="green" />
          <Card title="Expense" value={formatCurrency(totalExpense)} color="red" />
          <Card title="Savings" value={formatCurrency(savings)} color="blue" />
        </div>

        {/* 🔥 INSIGHTS */}
        <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl mb-6">
          <h3 className="text-indigo-400 font-semibold mb-2">Insights</h3>

          {insights.map((text, i) => (
            <p key={i} className="text-gray-300 text-sm mb-1">
              • {text}
            </p>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyChart data={monthlyData} />
          <CategoryChart data={expenses} />
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="p-5 rounded-xl bg-slate-900/80 border border-white/10 shadow-lg">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className={`text-${color}-400 text-xl font-bold`}>
        {value}
      </h2>
    </div>
  );
}