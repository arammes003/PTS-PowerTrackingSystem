// FICHERO QUE CONTIENE TODAS LAS RUTAS DEL USUARIO

// IMPORTAMOS EXPRESS
import express from "express";

// IMPORTAMOS EL CONTROLADOR
import { signup, login } from "../controllers/usuarioController.js";

// ROUTER
export const userRouter = express.Router();

// ENDPOINTS
userRouter.post("/signup", signup); // ENDPOINT REGISTRO
userRouter.post("/login", login); // ENDPOINT LOGIN
