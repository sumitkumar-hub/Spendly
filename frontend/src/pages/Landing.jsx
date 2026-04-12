import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">

      {/* 🔥 NAVBAR */}
      <div className="flex justify-between items-center px-10 py-6">
        <div className="flex items-center gap-2">
          <img src="/logo.png" className="w-8 h-8" />
          <h1 className="text-xl font-bold">Spendly</h1>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* 🚀 HERO SECTION */}
      <div className="flex flex-1 flex-col justify-center items-center text-center px-6">

        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Manage Your Money <br />
          <span className="text-indigo-400">Smartly 💸</span>
        </h1>

        <p className="text-gray-400 max-w-xl mb-8">
          Track your expenses, monitor your income, and take full control of your
          finances with Spendly.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-lg shadow-lg hover:scale-105 transition"
        >
          Start Tracking Now
        </button>
      </div>

      {/* 📊 FEATURES */}
      <div className="grid md:grid-cols-3 gap-6 px-10 pb-16">

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">📈 Smart Analytics</h3>
          <p className="text-gray-400">
            Visualize your income and expenses with clean charts.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">💳 Easy Tracking</h3>
          <p className="text-gray-400">
            Add and manage transactions effortlessly.
          </p>
        </div>

        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-2">🔒 Secure</h3>
          <p className="text-gray-400">
            Your financial data is safe and protected.
          </p>
        </div>

      </div>

    </div>
  );
}