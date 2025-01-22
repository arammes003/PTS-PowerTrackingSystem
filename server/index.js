// FICHERO QUE LEVANTA LA CONEXIÓN DEL SERVIDOR

// IMPORTAMOS MONGOOSE
import mongoose from "mongoose";

// CREAMOS UNA INSTANCIA DEL ROUTER CON LOS ENDPOINTS
import router from "./router.js";

// CARGAMOS LA CONFIGURACIÓN DEL FICHERO .env
process.loadEnvFile();

// OBTENEMOS LA CONFIGURACIÓN DE LA URL DE LA BBDD
const {
  DB_NAME = DB_NAME,
  DB_USER = DB_USER,
  DB_PASSWORD = DB_PASSWORD,
  PORT = PORT,
} = process.env;

// CREAMOS LA URL DE CONEXIÓN
export const urlMongoDb = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@powertrackingsystem.co4fi.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`;

// CREAMOS UNA CONEXIÓN A MONGOOSE
mongoose
  .connect(urlMongoDb)
  .then(() => {
    console.log("Conectado correctamente a la BBDD");

    // HACEMOS UN LISTEN DE LA APP PARA QUE ESCUCHE PETICIONES
    router.listen(PORT, () => {
      console.log(
        `Servidor corriendo correctamente en http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
