import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Task, { ITask } from '../models/Task';
import Image, { IImage } from '../models/Image';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pt-betweeen-tech-inditex');
    console.log('MongoDB: Conexión exitosa.');
  } catch (error) {
    console.log('MongoDB: Se ha producido un error al intentar realizar la conexión.');
    throw new Error('Error al conectar a MongoDB');
  }
};

const seedDB = async () => {
  await connectDB();

  // Se elimina los datos existentes.
  await Task.deleteMany({});
  await Image.deleteMany({});

  // Ejemplos para Task.
  const tasks: Partial<ITask>[] = [
    {
      status: 'pending',
      price: 25.50,
      imageUrl: 'http://images.com/example1.jpg',
      images: [],
    },
    {
      status: 'completed',
      price: 30.00,
      imageUrl: 'http://images.com/example2.jpg',
      images: [],
    },
  ];

  // Se inserta las tasks de ejemplo en la base de datos.
  const createdTasks = await Task.insertMany(tasks);

   // Ejemplos para Image.
  const images: Partial<IImage>[] = [
    {
      path: '/output/example1/800/8689dd334b4ef4a59408087f89fc5c93.jpg',
      resolution: '800x600',
      md5: 'a76f8efb42eb34da724aa283b9c0a79a',
    },
    {
      path: '/output/example1/1024/8689dd334b4ef4a59408087f89fc5c93.jpg',
      resolution: '1024x768',
      md5: 'b76f8efb42eb34da724aa283b9c0a79b',
    },
  ];

    // Asocia cada imagen a la tarea correspondiente y se inserta en la base de datos.
    for (const image of images) {
      const img = new Image({ path: image.path, resolution: image.resolution, md5: image.md5 });
      await img.save();

      const task = await Task.findById(createdTasks[1]._id);
      if (task) {
        task.images = task.images || [];
        task.images.push(img._id);
        task.status = "completed";
        await task.save();
      }
    }

  console.log('Base de datos inicializada con datos de ejemplo.');
  mongoose.connection.close();
};

seedDB().catch((error) => {
  console.error('Error inicializando la base de datos:', error);
  mongoose.connection.close();
});