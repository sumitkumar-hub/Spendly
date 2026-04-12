import api from "./axios";

// ✅ REGISTER
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// ✅ LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// 🔥 FORGOT PASSWORD (STEP 1 already used)
export const forgotPassword = async (email) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

// 🔥 RESET PASSWORD (NEW)
export const resetPassword = async (token, password) => {
  const res = await api.post(`/auth/reset-password/${token}`, {
    password,
  });
  return res.data;
};

// 🔥 EMAIL VERIFICATION (NEW)
export const verifyEmail = async (token) => {
  const res = await api.get(`/auth/verify-email/${token}`);
  return res.data;
};