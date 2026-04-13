import api from "./axios.js";

export const getCategoryBudgets = async (month) => {
  const res = await api.get(`/category-budget?month=${month}`);
  return res.data;
};

export const setCategoryBudget = async (payload) => {
  const res = await api.post("/category-budget", payload);
  return res.data;
};