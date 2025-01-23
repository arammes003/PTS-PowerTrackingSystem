// FICHERO QUE CONTIENE TODAS LAS RUTAS DE LOS CLUBES

// IMPORTAMOS EXPRESS
import express from "express";

// IMPORTAMOS EL CONTROLADOR
import { getClubes, createClub } from "../controllers/clubController.js";

// ROUTER
export const clubRouter = express.Router();

// ENDPOINTS
clubRouter.get("/clubes", getClubes); // ENDPOINT GETCLUBES
clubRouter.post("/clubes", createClub); // ENDPOINT CREAR CLUB
