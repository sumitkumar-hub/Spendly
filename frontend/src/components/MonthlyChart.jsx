import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export default function MonthlyChart({ data = [], formatCurrency }) {

  // ✅ EMPTY STATE FIX
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/5 p-4 rounded-xl h-[300px] flex items-center justify-center text-gray-400">
        No monthly data available
      </div>
    );
  }

  return (
    <div className="bg-white/5 p-4 rounded-xl h-[300px]">

      <h2 className="text-white mb-3 font-semibold">
        Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          {/* GRID */}
          <CartesianGrid stroke="#ffffff10" strokeDasharray="3 3" />

          {/* X AXIS */}
          <XAxis
            dataKey="month"
            stroke="#aaa"
            tick={{ fontSize: 12 }}
          />

          {/* Y AXIS */}
          <YAxis
            stroke="#aaa"
            tick={{ fontSize: 12 }}
            tickFormatter={(v) =>
              formatCurrency ? formatCurrency(v) : v
            }
          />

          {/* TOOLTIP */}
          <Tooltip
            formatter={(v) =>
              formatCurrency ? formatCurrency(v) : v
            }
            contentStyle={{
              backgroundColor: "#0f172a",
              borderRadius: "8px",
              border: "1px solid #334155",
              color: "#fff"
            }}
          />

          {/* LEGEND */}
          <Legend />

          {/* INCOME LINE */}
          <Line
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />

          {/* EXPENSE LINE */}
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}