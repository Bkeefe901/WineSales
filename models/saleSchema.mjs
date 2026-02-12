import mongoose from "mongoose";

const saleSchema = new mongoose.Schema(
  {
    saleDate: {
      type: Date,
      default: Date.now,
    },
    shopName: {
      type: String,
      required: true,
      lowercase: true,
    },
    total: {
      type: Number,
      required: true,
    },
    wines: {
      type: [String],
      lowercase: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Sale", saleSchema);
