/* FICHERO QUE SE ENCARGARA DE MANEJAR LA CONEXION CON EXPRESS Y 
MANEJA LOS ENDPOINTS */

// IMPORTAMOS EXPRESS
import express from "express";

// CREAMOS UNA INSTANCIA DE EXPRESS
const router = express();

// ENDPOINTS
// ENDPOINT INICIAL DE PRUEBA
function endpointInicial() {
  console.log("Bienvenido a PowerTrackinSystem");
}

// RUTAS BASE
router.use("/api", endpointInicial);

// EXPORTAMOS EL ROUTER
export default router;
