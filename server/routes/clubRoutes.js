// FICHERO QUE CONTIENE TODAS LAS RUTAS DE LOS CLUBES

// IMPORTAMOS EXPRESS
import express from "express";

// IMPORTAMOS EL CONTROLADOR
import {
  getClubes,
  createClub,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/clubController.js";

// ROUTER
export const clubRouter = express.Router();

// ENDPOINTS
clubRouter.get("/clubes", getClubes); // ENDPOINT GETCLUBES
clubRouter.get("/clubes/:id", getClubById); // ENDPOINT GETCLUBBYID
clubRouter.post("/clubes", createClub); // ENDPOINT CREAR CLUB
clubRouter.put("/clubes/:id", updateClub); // ENDPOINT ACTUALIZAR CLUB
clubRouter.delete("/clubes/:id", deleteClub); // ENDPOINT ELIMINAR CLUB
