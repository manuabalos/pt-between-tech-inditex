# pt-between-tech-inditex

Este proyecto es una API para la creación y gestión de tareas de procesamiento de imágenes. Permite crear tareas, procesar imágenes en segundo plano y obtener el estado y los resultados de las mismas.

### Instalación

1. Clona el repositorio:
  ```
  git clone https://github.com/manuabalos/pt-between-tech-inditex.git
  cd pt-between-tech-inditex
  ```

2. Instala las dependencias:

  ```
  npm install
  ```

3. Configura las variables de entorno. Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:

    ```
    MONGODB_URI=mongodb://localhost:27017/pt-between-tech-inditex
    PORT=3000
    ```

4. Ejecución.

    ```
    npm run dev
    ```

## Inicialización con datos de ejemplo de la base de datos (opcional).
Inicializa la base de datos con datos de ejemplo:

  ```
  npm run initdb
  ```

## Tests.
Ejecuta las pruebas definidas en el proyecto utilizando Jest.

  ```
  npm test
  ```

## Endpoints
URL: **/tasks**
Método: **POST**
Descripción: Crea una nueva tarea de procesamiento de imagen.

Cuerpo de la Solicitud:
```
    {
    "imageUrl": "https://example.com/imagen.jpg"
    }
```
Respuesta:
```
  {
    "taskId": "60c72b2f9b1e8b3f4c8e4d3b",
    "status": "pending",
    "price": 25.50
  }
```
------------
URL: **/tasks/:taskId**
Método: **GET**
Descripción: Obtiene el estado y los resultados de una tarea.

Respuesta:
  ```
  {
    "_id": "60c72b2f9b1e8b3f4c8e4d3b",
    "status": "completed",
    "price": 25.50,
    "imageUrl": "/Users/manuel_abalos/Developer/Projects/pt-between-tech-inditex/src/images/example.jpg",
   "images": [
        {
            "_id": "679e171c58302c68bf4cabf0",
            "path": "/Users/manuel_abalos/Developer/Projects/pt-between-tech-inditex/src/output/example/1024/8689dd334b4ef4a59408087f89fc5c93.jpg",
            "resolution": "1024",
            "md5": "8689dd334b4ef4a59408087f89fc5c93",
            "createdAt": "2025-02-01T12:44:12.458Z",
            "updatedAt": "2025-02-01T12:44:12.458Z",
            "__v": 0
        },
        {
            "_id": "679e171c58302c68bf4cabf3",
            "path": "/Users/manuel_abalos/Developer/Projects/pt-between-tech-inditex/src/output/example/800/8689dd334b4ef4a59408087f89fc5c93.jpg",
            "resolution": "800",
            "md5": "8689dd334b4ef4a59408087f89fc5c93",
            "createdAt": "2025-02-01T12:44:12.474Z",
            "updatedAt": "2025-02-01T12:44:12.474Z",
            "__v": 0
        }
    ],
  }
  ```

Estructura del proyecto
>
- src/config: contiene la configuración para la conexión a MongoDB.
- src/controllers: contiene los controladores de las rutas de la API.
- src/models: contiene los modelos de Mongoose para las colecciones de MongoDB.
- src/routes: contiene las definiciones de las rutas de la API.
- src/utils: contiene funciones de utilidad y helpers.
- src/images: carpeta donde se almacenan las imágenes que se desean ser procesadas (en caso de no usar una url).
- src/output: carpeta donde se almacenan las imagenes procesadas en diferentes resoluciones.

Notas Importantes
> 
- Si quieres subir una imagen en concreto desde local, asegurase que se encuentre dentro de la carpeta images y pases correctamente la ruta de ubicación del archivo. Hay una imagen de ejemplo dentro de esta carpeta.
- Las imagenes procesadas serán creadas dentro de la carpeta output.