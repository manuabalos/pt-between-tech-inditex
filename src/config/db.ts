import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB: La conexión se ha realizado correctamente.");
  } catch (error) {
    console.log("MongoDB: Se ha producido un error al intentar realizar la conexión.");
    process.exit(1);
  }
};

export default connectDB;