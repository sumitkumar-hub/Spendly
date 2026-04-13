import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

export default function CategoryChart({ data = [] }) {

  // 🔥 CONVERT RAW DATA → CATEGORY TOTALS
  const chartData = useMemo(() => {
    const map = new Map();

    data.forEach((tx) => {
      if (tx.type !== "expense") return;

      const cat = tx.category || "Other";
      map.set(cat, (map.get(cat) || 0) + Number(tx.amount || 0));
    });

    return Array.from(map.entries())
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  // ✅ EMPTY STATE
  if (!chartData || chartData.length === 0) {
    return (
      <div className="bg-white/5 p-4 rounded-xl h-[300px] flex items-center justify-center text-gray-400">
        No category data available
      </div>
    );
  }

  return (
    <div className="bg-white/5 p-4 rounded-xl h-[300px]">

      <h2 className="text-white mb-3 font-semibold">
        Spending by Category
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
                stroke="#0f172a"
                strokeWidth={1}
              />
            ))}
          </Pie>

          {/* TOOLTIP */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#0f172a",
              borderRadius: "8px",
              border: "1px solid #334155",
              color: "#fff",
            }}
            formatter={(value) => `₹${value}`}
          />

          {/* LEGEND */}
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{
              fontSize: "12px",
              color: "#ccc",
            }}
          />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}