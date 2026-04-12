import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
} from "lucide-react";

export default function Sidebar() {

  const linkClasses =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative";

  return (
    <div className="h-screen w-64 bg-slate-900 text-white flex flex-col p-4 border-r border-white/10">

      {/* 🔥 LOGO */}
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center font-bold">
          S
        </div>
        <h1 className="text-xl font-semibold tracking-wide">
          Spendly
        </h1>
      </div>

      {/* NAV */}
      <nav className="flex flex-col gap-2 flex-1">

        {/* DASHBOARD */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive
                ? "bg-white/10 text-white shadow-md"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {/* ACTIVE INDICATOR */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r"></span>
              )}

              <LayoutDashboard size={20} />
              Dashboard
            </>
          )}
        </NavLink>

        {/* TRANSACTIONS */}
        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive
                ? "bg-white/10 text-white shadow-md"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r"></span>
              )}

              <Receipt size={20} />
              Transactions
            </>
          )}
        </NavLink>

        {/* REPORTS */}
        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${linkClasses} ${
              isActive
                ? "bg-white/10 text-white shadow-md"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r"></span>
              )}

              <BarChart3 size={20} />
              Reports
            </>
          )}
        </NavLink>

      </nav>

      {/* FOOTER (OPTIONAL) */}
      <div className="text-xs text-gray-500 text-center mt-6">
        © 2026 Spendly
      </div>

    </div>
  );
}