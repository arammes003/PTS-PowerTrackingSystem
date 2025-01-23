// FICHERO QUE CONTIENE TODAS LAS RUTAS DE LOS ATLETAS

// IMPORTAMOS EXPRESS
import express from "express";

// IMPORTAMOS LAS FUNCIONES DEL CONTROLADOR
import { createAtleta } from "../controllers/atletaController.js";

// ROUTER
export const atletaRouter = express.Router();

// ENDPOINTS
atletaRouter.post("/atletas", createAtleta); // ENDPOINT CREAR ATLETA
