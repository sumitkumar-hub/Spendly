import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { removeToken } from "../utils/auth.js";
import { Search, Bell } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Sumit",
    email: "sumit@gmail.com",
  };

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const showSearch = location.pathname === "/transactions";

  // 👉 Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex justify-between items-center mb-8 p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-md">

      {/* LEFT */}
      <div className="flex items-center gap-6">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-bold text-white">
            S
          </div>
          <span className="text-white font-semibold text-lg">
            Spendly
          </span>
        </div>

        {/* SEARCH */}
        {showSearch && (
          <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-80 backdrop-blur-md transition focus-within:ring-2 focus-within:ring-indigo-500">
            <Search size={18} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search transactions..."
              className="bg-transparent outline-none text-white ml-2 w-full placeholder-gray-500"
              onChange={(e) => {
                window.dispatchEvent(
                  new CustomEvent("search", { detail: e.target.value })
                );
              }}
            />
          </div>
        )}

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>

        {/* 🔔 NOTIFICATION ICON */}
        <div className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition cursor-pointer">
          <Bell size={18} className="text-gray-300" />
        </div>

        {/* USER INFO */}
        <div className="text-right hidden sm:block">
          <p className="text-sm text-gray-400">Welcome back</p>
          <p className="text-white font-semibold">{user.name}</p>
        </div>

        {/* AVATAR (CLICKABLE) */}
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg cursor-pointer"
        >
          {user.name?.charAt(0).toUpperCase()}
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 top-14 w-56 bg-[#1f2937] border border-white/10 rounded-xl shadow-xl p-2 z-50">

            {/* USER INFO */}
            <div className="px-3 py-2 border-b border-white/10">
              <p className="text-white font-semibold">{user.name}</p>
              <p className="text-gray-400 text-sm">{user.email}</p>
            </div>

            {/* PROFILE */}
            <button
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-white/10 rounded-md"
            >
              Profile
            </button>

            {/* SUPPORT */}
            <button
              className="w-full text-left px-3 py-2 text-gray-300 hover:bg-white/10 rounded-md"
            >
              Support
            </button>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-md"
            >
              Logout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}