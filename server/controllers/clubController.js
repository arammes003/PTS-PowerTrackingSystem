// FICHERO QUE TIENE EL CRUD DE LOS CLUBES

// IMPORTAMOS EL MODELO
import { Club } from "../models/clubModel.js";

// FUNCION QUE DEVUELVE TODOS LOS CLUBES
export const getClubes = async (req, res) => {
  try {
    const club = await Club.find();
    if (!club) {
      res.status(400).send({
        mensaje: "Error al recuperar los clubes",
      });
    }

    if (club) {
      res.status(200).send({
        mensaje: "Obteniendo clubes...",
        club,
      });
    }
  } catch (error) {
    res.status(500).send({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
