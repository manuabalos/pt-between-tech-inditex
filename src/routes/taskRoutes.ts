import express from "express";
import { createTask, getTaskById } from "../controllers/taskController";

const router = express.Router();

router.post("/", createTask);        // POST /tasks         - Crea una tarea de procesado de imagen
router.get("/:taskId", getTaskById); // GET  /tasks/:taskId - Obtiene el estado y resultados de una tarea

export default router;