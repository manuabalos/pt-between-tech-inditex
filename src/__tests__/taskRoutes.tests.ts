import request from 'supertest';
import { app } from '../index';
import Task from '../models/Task';
import mongoose from 'mongoose';

beforeAll(async () => {
  const url = `mongodb://localhost:27017/pt-betweeen-tech-inditex`;
  await mongoose.connect(url, {
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);
});

afterAll(async () => {
  if (mongoose.connection.db) {
    await mongoose.connection.db.dropDatabase();
  }
  await mongoose.connection.close();
});

describe('POST /tasks', () => {
  it('debería crear una nueva tarea', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ imageUrl: 'https://www.dzoom.org.es/wp-content/uploads/2013/04/manzana-equilibrio-734x486.jpg' })
      .expect(201);

    expect(response.body).toHaveProperty('taskId');
    expect(response.body).toHaveProperty('status', 'pending');
    expect(response.body).toHaveProperty('price');
  });

  it('debería devolver un error si falta imageUrl', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({})
      .expect(400);

    expect(response.body).toHaveProperty('error', "El campo 'imageUrl' es obligatorio.");
  });
});

describe('GET /tasks/:taskId', () => {
  it('debería obtener una tarea por ID', async () => {
    const task = new Task({ status: 'pending', price: 25.50, imageUrl: 'https://www.dzoom.org.es/wp-content/uploads/2013/04/manzana-equilibrio-734x486.jpg', images: [] });
    await task.save();

    const response = await request(app)
      .get(`/tasks/${task._id}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', task._id.toString());
    expect(response.body).toHaveProperty('status', 'pending');
    expect(response.body).toHaveProperty('price', 25.50);
    expect(response.body).toHaveProperty('imageUrl', 'https://www.dzoom.org.es/wp-content/uploads/2013/04/manzana-equilibrio-734x486.jpg');
  });

  it('debería devolver un error si el ID de la tarea no es válido', async () => {
    const response = await request(app)
      .get('/tasks/invalid_id')
      .expect(400);

    expect(response.body).toHaveProperty('error', 'ID de tarea no válido');
  });

  it('debería devolver un error si la tarea no se encuentra', async () => {
    const response = await request(app)
      .get(`/tasks/${new mongoose.Types.ObjectId()}`)
      .expect(404);

    expect(response.body).toHaveProperty('error', 'Tarea no encontrada.');
  });
});