import mongoose, { Schema, Document } from "mongoose";

export interface IImage extends Document {
  _id: string;
  path: string;
  resolution: string;
  md5: string;
  task: mongoose.Types.ObjectId;
}

const ImageSchema: Schema = new mongoose.Schema(
  {
    path: { type: String, required: true, unique: true },
    resolution: { type: String, required: true },
    md5: { type: String, required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' }
  },
  { timestamps: true }
);

const Image = mongoose.model<IImage>('Image', ImageSchema);
export default Image;