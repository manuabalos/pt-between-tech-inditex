import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    status: { type: String, enum: ["pending", "processing", "completed"], required: true, index: true },
    price: { type: Number, required: true },
    originalPath: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Task", TaskSchema);