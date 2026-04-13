import api from "./axios.js";

export const getBudget = async (month) => {
  const res = await api.get(`/budget?month=${month}`);
  return res.data;
};

export const setBudget = async (payload) => {
  const res = await api.post("/budget", payload);
  return res.data;
};