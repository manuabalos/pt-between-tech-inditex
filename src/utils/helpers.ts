import fs from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import axios from "axios";

import Task from "../models/Task";
import Image from "../models/Image";

const OUTPUT_DIR = path.join(__dirname, "..", "output");

// Si el directorio de salida no exite, se genera.
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

export const processImage = async (taskId: string, imageUrl: string) => {
  try {
      // Se comprueba que la tarea existe.
      const task = await Task.findById(taskId);
      if (!task) return;

      //Se almacena el buffer de la imagen.
      let imageBuffer: Buffer;
      // Se obtiene el nombre base del archivo de imagen sin la extensión.
      const originalName = path.basename(imageUrl, path.extname(imageUrl));
      // Se obtiene la extensión del archivo de imagen.
      const imageExt = path.extname(imageUrl);

      const resolutions = [1024, 800];

      // Se verifica si imageUrl es una URL o un path local.
      if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        const response = await axios.get<ArrayBuffer>(imageUrl, {
          responseType: "arraybuffer",
        });
        imageBuffer = Buffer.from(response.data);
      } else {
        imageBuffer = fs.readFileSync(imageUrl);
      }

      // Se procesa la imagen para cada resolucion, y se guarda en la carpeta correspondiente.
      for (const res of resolutions) {
          // Se genera un hash MD5 único para identificar la imagen.
          const md5Hash = crypto.createHash("md5").update(imageBuffer).digest("hex");
          const outputPath = path.join(__dirname, "../output", originalName, `${res}`, `${md5Hash}${imageExt}`);

          // Se crea la carpeta si no existe (para cada resolución).
          if (!fs.existsSync(path.dirname(outputPath))) {
            fs.mkdirSync(path.dirname(outputPath), { recursive: true });
          }

          // Se redimensiona y se guardar la imagen con sharp.
          await sharp(imageBuffer)
                .resize({ width: res })
                .toFile(outputPath);

          // Se guarda la información de la imagen procesada.
          const image = new Image({ path: outputPath, resolution: res.toString(), md5: md5Hash });
          await image.save();

          // Se asocia  la imagen a la tarea correspondiente.
          task.images = task.images || [];
          task.images.push(image._id);
          task.status = "completed";
          await task.save();
      }

      console.log(`Tarea ${taskId} completada con éxito.`);
  } catch (error) {
      console.error("Error procesando la imagen:", error);
      // Si se produce un error, actualizar la tarea con estado "failed".
      await Task.findByIdAndUpdate(taskId, { status: "failed" });
  }
};

export const generateRandomPrice = (min: number = 5, max: number = 50): number => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};