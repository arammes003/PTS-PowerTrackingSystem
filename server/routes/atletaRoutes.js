// FICHERO QUE CONTIENE TODAS LAS RUTAS DE LOS ATLETAS

// IMPORTAMOS EXPRESS
import express from "express";

// IMPORTAMOS LAS FUNCIONES DEL CONTROLADOR
import {
  createAtleta,
  deleteAtleta,
  getAtletaById,
  getAtletas,
  updateAtleta,
} from "../controllers/atletaController.js";

// IMPORTAMOS MIDDLEWARES
import { upload } from "../middlewares/upload.js"; // MIDDLEWARE SUBIDA IMAGENES

// ROUTER
export const atletaRouter = express.Router();

// ENDPOINTS
atletaRouter.post("/atletas", createAtleta); // ENDPOINT CREAR ATLETA
atletaRouter.get("/atletas", getAtletas); // ENDPOINT CREAR ATLETA
atletaRouter.get("/atletas/:id", getAtletaById); // ENDPOINT CREAR ATLETA
atletaRouter.put(
  "/atletas/:id",
  upload.fields([{ name: "imagen", maxCount: 1 }]),
  updateAtleta
); // ENDPOINT ACTUALIZAR ATLETA
atletaRouter.delete("/atletas/:id", deleteAtleta); // ENDPOINT ACTUALIZAR ATLETA
