import React, { useEffect, useState, useMemo } from "react";
import { getExpenses, deleteExpense } from "../api/expense.js";
import toast from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Trash2, Pencil } from "lucide-react";

export default function Transactions() {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // FETCH
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch {
        toast.error("Failed to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // NAVBAR SEARCH
  useEffect(() => {
    const handleSearch = (e) => {
      setSearch(e.detail.toLowerCase());
    };

    window.addEventListener("search", handleSearch);
    return () => window.removeEventListener("search", handleSearch);
  }, []);

  // DELETE WITH CONFIRM
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await deleteExpense(id);
      setExpenses(prev => prev.filter(e => e._id !== id));
      toast.success("Deleted successfully");
    } catch {
      toast.error("Delete failed");
    }
  };

  // FILTER
  const filteredExpenses = useMemo(() => {
    return expenses.filter((tx) =>
      tx.category?.toLowerCase().includes(search) ||
      tx.amount?.toString().includes(search) ||
      new Date(tx.date).toLocaleDateString().includes(search)
    );
  }, [expenses, search]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <Sidebar />

      <div className="flex-1 p-4 sm:p-6">

        <Navbar />

        <h2 className="text-white text-3xl font-bold mb-6">
          All Transactions
        </h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : filteredExpenses.length === 0 ? (
          <p className="text-gray-400">No matching transactions</p>
        ) : (

          <div className="grid gap-4">

            {filteredExpenses.map((tx) => (

              <div
                key={tx._id}
                className="flex justify-between items-center p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition shadow-md"
              >

                {/* LEFT */}
                <div>
                  <p className="text-white font-semibold text-lg">
                    {tx.title}
                  </p>

                  <p className="text-sm text-gray-400">
                    {tx.category} • {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">

                  <p className={`text-lg font-bold ${
                    tx.type === "income" ? "text-green-400" : "text-red-400"
                  }`}>
                    {tx.type === "income" ? "+" : "-"}₹{tx.amount}
                  </p>

                  {/* EDIT (UI only for now) */}
                  <button className="text-gray-400 hover:text-blue-400">
                    <Pencil size={18} />
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}