import React, { useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";

export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  const [form, setForm] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: form.name,
        email: form.email,
      })
    );

    toast.success("Profile updated successfully");
  };

  return (
    <Layout>

      <div className="max-w-lg mx-auto mt-10 bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg text-white">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-3 rounded bg-transparent border border-white/10"
            required
          />

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 rounded bg-transparent border border-white/10"
            required
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="New Password"
            className="w-full p-3 rounded bg-transparent border border-white/10"
          />

          <button className="w-full bg-indigo-500 py-3 rounded-lg hover:bg-indigo-600 transition">
            Update Profile
          </button>

        </form>

      </div>

    </Layout>
  );
}