// FICHERO QUE CONTIENE TODAS LAS RUTAS DE LAS COMPETICIONES

// IMPORTAMOS EXPRESS
import express from "express";

// IMPORTAMOS LAS FUNCIONES DEL CONTROLADOR
import {
  createCompeticion,
  getCompeticiones,
  deleteCompeticion,
  updateCompeticion,
} from "../controllers/competicionController.js";

// IMPORTAMOS MIDDLEWARES
import { upload } from "../middlewares/upload.js"; // MIDDLEWARE SUBIDA IMAGENES

// ROUTER
export const compRouter = express.Router();

// ENDPOINTS
compRouter.post(
  "/competiciones",
  upload.fields([{ name: "imagen", maxCount: 1 }]),
  createCompeticion
);
compRouter.get("/competiciones", getCompeticiones);
compRouter.delete("/competiciones/:id", deleteCompeticion);
compRouter.put("/competiciones/:id", updateCompeticion);
