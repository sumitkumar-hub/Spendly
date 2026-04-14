import api from "./axios";

// ================= GET =================
export const getExpenses = async () => {
  try {
    const res = await api.get("/transactions");
    return res.data?.data || [];
  } catch (err) {
    console.error("GET EXPENSE ERROR:", err);
    return []; // ✅ prevent crash
  }
};

// ================= ADD =================
export const addExpense = async (payload) => {
  try {
    const res = await api.post("/transactions", payload);
    return res.data?.data;
  } catch (err) {
    console.error("ADD EXPENSE ERROR:", err);
    throw err; // allow UI to show error
  }
};

// ================= DELETE =================
export const deleteExpense = async (id) => {
  try {
    const res = await api.delete(`/transactions/${id}`);
    return res.data;
  } catch (err) {
    console.error("DELETE ERROR:", err);
    throw err;
  }
};

// ================= UPDATE =================
export const updateExpense = async (id, data) => {
  try {
    const res = await api.put(`/transactions/${id}`, data);
    return res.data?.data;
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    throw err;
  }
};