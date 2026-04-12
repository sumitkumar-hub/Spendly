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

  // 💰 Currency formatter
  const formatCurrency = (v) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(v);

  // ✅ FIXED MONTHLY DATA (IMPORTANT)
  const monthlyData = useMemo(() => {
    const map = new Map();

    expenses.forEach((tx) => {
      const d = new Date(tx.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      const label = d.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      const amount = Number(tx.amount || 0);

      if (!map.has(key)) {
        map.set(key, {
          month: label,
          income: 0,
          expense: 0,
          count: 0,
          ts: d.getTime(),
        });
      }

      const entry = map.get(key);

      entry.count += 1;

      if (tx.type === "income") {
        entry.income += amount;
      } else {
        entry.expense += amount;
      }
    });

    return Array.from(map.values())
      .sort((a, b) => a.ts - b.ts)
      .map(({ month, income, expense, count }) => ({
        month,
        income,
        expense,
        count,
      }));
  }, [expenses]);

  // 📊 CATEGORY DATA
  const categoryData = useMemo(() => {
    const map = new Map();

    expenses.forEach((tx) => {
      if (tx.type !== "expense") return;

      const cat = tx.category || "General";
      map.set(cat, (map.get(cat) || 0) + Number(tx.amount || 0));
    });

    return Array.from(map.entries()).map(([category, value]) => ({
      category,
      value,
    }));
  }, [expenses]);

  const COLORS = ["#10b981", "#ef4444", "#3b82f6", "#f97316"];

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />

      <div className="flex-1 p-6">
        <Navbar />

        <h2 className="text-white text-2xl mb-6">Reports</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MonthlyChart 
            data={monthlyData} 
            formatCurrency={formatCurrency} 
          />
          <CategoryChart data={categoryData} COLORS={COLORS} />
        </div>
      </div>
    </div>
  );
}