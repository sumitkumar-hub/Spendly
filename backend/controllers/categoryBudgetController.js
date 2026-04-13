import CategoryBudget from "../models/CategoryBudget.js";

// SET / UPDATE
export const setCategoryBudget = async (req, res) => {
  try {
    const { category, amount, month } = req.body;

    const existing = await CategoryBudget.findOne({
      userId: req.user.id,
      category,
      month,
    });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.json(existing);
    }

    const budget = await CategoryBudget.create({
      userId: req.user.id,
      category,
      amount,
      month,
    });

    res.json(budget);
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};

// GET ALL
export const getCategoryBudgets = async (req, res) => {
  try {
    const { month } = req.query;

    const budgets = await CategoryBudget.find({
      userId: req.user.id,
      month,
    });

    res.json(budgets);
  } catch {
    res.status(500).json({ message: "Failed" });
  }
};