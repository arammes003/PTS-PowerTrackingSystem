// FICHERO QUE TIENE EL CRUD DE LOS CLUBES

// IMPORTAMOS EL MODELO
import { Club } from "../models/clubModel.js";

<<<<<<< HEAD
// FUNCION QUE CREA UN NUEVO CLUB
export const createClub = async (req, res) => {
  let club = new Club();
  const { nombre } = req.body;

  try {
    club = await Club.findOne({
      nombre,
    });

    if (!nombre)
      return res.status(400).send({
        ok: false,
        mensaje: "Ya existe un club con ese nombre",
      });

    club = new Club(req.body);
    await club.save();

    return res.status(200).send({
      ok: true,
      mensaje: `Club con nombre ${nombre} añadido con éxito`,
      club,
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

=======
>>>>>>> 7afda207041dc1eaa774b641eef89a8c51a3e872
// FUNCION QUE DEVUELVE TODOS LOS CLUBES
export const getClubes = async (req, res) => {
  try {
    const club = await Club.find();
    if (!club) {
      res.status(400).send({
        ok: false,
        mensaje: "Error al recuperar los clubes",
      });
    }

    if (club) {
      res.status(200).send({
        ok: true,
        mensaje: "Obteniendo clubes...",
        club,
      });
    }
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
