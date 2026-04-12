import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function CategoryChart({ data = [], COLORS = [] }) {

  // ✅ EMPTY STATE
  if (!data || data.length === 0) {
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
            data={data}
            dataKey="value"
            nameKey="category"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={3}
            isAnimationActive={true} // ✅ smooth animation
          >
            {data.map((entry, index) => (
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
              color: "#fff"
            }}
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