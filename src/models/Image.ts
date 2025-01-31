import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  {
    path: { type: String, required: true, unique: true },
    resolution: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    md5: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("Image", ImageSchema);