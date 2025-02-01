import mongoose, { Schema, Document } from 'mongoose';

interface ITask extends Document {
  _id: string;
  status: string;
  price: number;
  imageUrl: string;
  images:string[];
}

const TaskSchema: Schema = new mongoose.Schema(
  {
    status: { type: String, enum: ["pending", "completed", "failed"], required: true, index: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    images: [{ type: Schema.Types.ObjectId, ref: 'Image' }]
  },
  { timestamps: true }
);

const Task = mongoose.model<ITask>('Task', TaskSchema);
export default Task;