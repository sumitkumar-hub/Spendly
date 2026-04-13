import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-4 sm:p-6">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        {children}

      </div>
    </div>
  );
}