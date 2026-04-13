import mongoose from "mongoose";

const { Schema, model } = mongoose;

const budgetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: String, // format: "2026-04"
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Budget", budgetSchema);