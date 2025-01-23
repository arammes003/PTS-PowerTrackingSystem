// FICHERO QUE CONTIENE TODAS LAS RUTAS DEL USUARIO

// IMPORTAMOS EXPRESS
import express from "express";

// IMPORTAMOS EL CONTROLADOR
import { signup, login } from "../controllers/usuarioController.js";

// IMPORTAMOS MIDDLEWARES
import { upload } from "../middlewares/upload.js"; // MIDDLEWARE SUBIDA IMAGENES

// ROUTER
export const userRouter = express.Router();

// ENDPOINTS
userRouter.post(
  "/signup",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  signup
); // ENDPOINT REGISTRO
userRouter.post("/login", login); // ENDPOINT LOGIN
