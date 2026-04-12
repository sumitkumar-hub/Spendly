import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPassword } from "../api/auth";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      toast.error("Enter new password");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, password);
      toast.success("Password updated");
      navigate("/login");
    } catch {
      toast.error("Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <div className="bg-white/10 backdrop-blur-xl p-8 rounded-xl w-96">

        <h2 className="text-white text-2xl mb-4 text-center">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-white/10 text-white"
          />

          <button className="w-full bg-indigo-500 py-2 rounded text-white">
            {loading ? "Updating..." : "Reset Password"}
          </button>

        </form>

      </div>
    </div>
  );
}