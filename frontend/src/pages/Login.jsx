import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../api/auth.js';
import { setToken } from '../utils/auth.js';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);

    try {
      const data = await loginUser(form);

      console.log("LOGIN DATA:", data); // debug

      const token =
        data?.token ||
        data?.accessToken ||
        data?.data?.token;

      if (!token) {
        toast.error("Login failed (token missing)");
        return;
      }

      // ✅ SAVE TOKEN
      setToken(token);

      if (remember) {
        localStorage.setItem("rememberUser", JSON.stringify(form.email));
      }

      toast.success("Login successful");

      // 🔥 FORCE REDIRECT (FINAL FIX)
      window.location.href = "/dashboard";

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 text-center mb-6">
          Login to manage your expenses
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-300">Email</label>

            <div className="flex items-center gap-2 mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <Mail size={18} className="text-gray-400" />

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />
            </div>

            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm text-gray-300">Password</label>

            <div className="flex items-center gap-2 mt-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
              <Lock size={18} className="text-gray-400" />

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* REMEMBER + FORGOT */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-indigo-500"
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-indigo-400 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}