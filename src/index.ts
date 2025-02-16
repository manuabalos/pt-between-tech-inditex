import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

export const app = express();

// Middleware para parsear JSON.
app.use(express.json());

app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
connectDB();
