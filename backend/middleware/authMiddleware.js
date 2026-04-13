import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization || req.headers.Authorization;

    // ❌ No token
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const parts = authHeader.split(" ");

    // ❌ Wrong format
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token format" });
    }

    const token = parts[1];

    // ❌ Missing secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not set in environment");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ IMPORTANT FIX
    req.user = {
      id: decoded.id, // 🔥 must match controller usage
    };

    next();
  } catch (err) {
    console.error("authMiddleware error:", err.message);

    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;