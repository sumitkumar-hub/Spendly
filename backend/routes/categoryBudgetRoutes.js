import express from "express";
import {
  setCategoryBudget,
  getCategoryBudgets,
} from "../controllers/categoryBudgetController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, setCategoryBudget);
router.get("/", authMiddleware, getCategoryBudgets);

export default router;