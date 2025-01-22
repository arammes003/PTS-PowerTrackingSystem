// SERVICIO QUE MANEJARA LA CREACION DE TOKENS DE USUARIO

// IMPORTAMOS JWT
import jwt from "jsonwebtoken";

// CARGAMOS LA CONFIGURACIÓN DEL FICHERO .env
process.loadEnvFile();

const SECRET_KEY = process.env.SECRET_KEY;

// FUNCION QUE GENERA EL TOKEN DEL USUARIO
export const generarJWT = (id, email) => {
  return new Promise((resolve, reject) => {
    const payload = { id, email };

    jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }),
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se puede general el token");
        }
        resolve(token);
      };
  });
};
