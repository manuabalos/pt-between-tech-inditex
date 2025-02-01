import { Request, Response } from "express";
import Task from "../models/Task";
import Image from "../models/Image";

import mongoose from "mongoose";
import { generateRandomPrice, processImage } from "../utils/helpers";

export const createTask = async (req: any, res: any) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "El campo 'imageUrl' es obligatorio." });
  }

  try {
    // Genera un precio aleatorio entre 5 y 50.
    const price = generateRandomPrice();

    // Crea la tarea en estado "pending".
    const task = new Task({ status: "pending", price, imageUrl, images: [] });
    await task.save();

    res.status(201).json({
      taskId: task._id,
      status: task.status,
      price: task.price,
    });

    // Pprocesa en segundo plano las resoluciones de la imagen.
    processImage(task._id.toString(), imageUrl);

  } catch (error) {
    res.status(500).json({ error: "Error al crear la tarea" });
  }
};

export const getTaskById = async (req: any, res: any) => {
  try {
    const { taskId } = req.params;

    // Verifica si el taskId es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "ID de tarea no válido" });
    }

    const task = await Task.findById(taskId).populate({path: 'images', model: Image})

    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada." });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tarea: " + error });
  }
};