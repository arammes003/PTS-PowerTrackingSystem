// FICHERO QUE LEVANTA LA CONEXIÓN DEL SERVIDOR

// IMPORTAMOS EXPRESS
import express from "express";

// IMPORTAMOS MONGOOSE
import mongoose from "mongoose";

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
const urlMongoDb = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@powertrackingsystem.co4fi.mongodb.net/?retryWrites=true&w=majority&appName=${DB_NAME}`;

// CREAMOS UNA INSTRANCIA DE EXPRESS
const app = express();

// ENDPOINT INICIAL
app.get("/", (req, res) => {
  console.log("Hola PTS");
});

// CREAMOS UNA CONEXIÓN A MONGOOSE
mongoose
  .connect(urlMongoDb)
  .then(() => {
    console.log("Conectado correctamente a la BBDD");

    // HACEMOS UN LISTEN DE LA APP PARA QUE ESCUCHE PETICIONES
    app.listen(PORT, () => {
      console.log(
        `Servidor corriendo correctamente en http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => console.log(err));
