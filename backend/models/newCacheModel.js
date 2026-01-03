import mongoose from "mongoose";

const newsCacheSchema = new mongoose.Schema(
  {
    source: { type: String, default: "gnews", unique: true },
    articles: { type: Array, required: true },
    lastUpdatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("NewsCache", newsCacheSchema);
