import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Transactions from "./pages/Transactions.jsx";
import Reports from "./pages/Reports.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>

        {/* 🔥 LANDING (FIRST PAGE) */}
        <Route path="/" element={<Landing />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* RESET + VERIFY */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />

        <Route
          path="/transactions"
          element={<ProtectedRoute><Transactions /></ProtectedRoute>}
        />

        <Route
          path="/reports"
          element={<ProtectedRoute><Reports /></ProtectedRoute>}
        />
        <Route
  path="/profile"
  element={<ProtectedRoute><Profile /></ProtectedRoute>}
/>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
}