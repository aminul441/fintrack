import mongoose, { Schema, models, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
  },
  { timestamps: true }
);

const Transaction =
  models.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
