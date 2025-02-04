/* FICHERO QUE SE ENCARGARA DE MANEJAR LA CONEXION CON EXPRESS Y 
MANEJA LOS ENDPOINTS */

// IMPORTAMOS EXPRESS
import express from "express";

// CREAMOS UNA INSTANCIA DE EXPRESS
export const router = express();

// IMPORTAMOS RUTAS
import { userRouter } from "./routes/usuarioRoutes.js";
import { clubRouter } from "./routes/clubRoutes.js";
import { atletaRouter } from "./routes/atletaRoutes.js";
import { compRouter } from "./routes/competicionRoutes.js";

// IMPORTAMOS CORS PARA PERMITIR PETICIONES EXTERNAS
import cors from "cors";
router.use(cors());

// PERMITIMOS EL USO DE JSON
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// ENDPOINTS

// RUTAS USUARIO
router.use("/api", userRouter);
router.use("/api", clubRouter);
router.use("/api", atletaRouter);
router.use("/api", compRouter);
