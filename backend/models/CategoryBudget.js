import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categoryBudgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: String, // "2026-04"
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("CategoryBudget", categoryBudgetSchema);