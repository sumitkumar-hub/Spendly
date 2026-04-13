import Budget from "../models/Budget.js";

// 🔥 SET / UPDATE BUDGET
export const setBudget = async (req, res) => {
  try {
    const { amount, month } = req.body;

    const existing = await Budget.findOne({
      userId: req.user.id,
      month,
    });

    if (existing) {
      existing.amount = amount;
      await existing.save();
      return res.json(existing);
    }

    const budget = await Budget.create({
      userId: req.user.id,
      month,
      amount,
    });

    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: "Failed to set budget" });
  }
};

// 🔥 GET BUDGET
export const getBudget = async (req, res) => {
  try {
    const { month } = req.query;

    const budget = await Budget.findOne({
      userId: req.user.id,
      month,
    });

    res.json(budget || {});
  } catch {
    res.status(500).json({ message: "Failed to fetch budget" });
  }
};