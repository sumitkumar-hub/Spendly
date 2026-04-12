import React, { useState } from "react";
import toast from "react-hot-toast";
import { Mail } from "lucide-react";
import { forgotPassword } from "../api/auth"; // ✅ IMPORTANT

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Enter email");
      return;
    }

    try {
      setLoading(true);

      // ✅ REAL API CALL
      await forgotPassword(email);

      toast.success("Reset link sent to your email");

    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8">

        <h2 className="text-3xl text-white text-center mb-2">
          Forgot Password 🔐
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL INPUT */}
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">

            <Mail size={18} className="text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

        </form>

      </div>
    </div>
  );
}