// FICHERO QUE TIENE EL CRUD DE LOS CLUBES

// IMPORTAMOS EL MODELO
import { Club } from "../models/clubModel.js";

// FUNCION QUE CREA UN NUEVO CLUB
export const createClub = async (req, res) => {
  let club = new Club(); // CREAMOS UN CLUB
  const { nombre } = req.body; // OBTENEMOS EL NOMBRE DEL BODY

  try {
    club = await Club.findOne({
      nombre,
    }); // BUSCAMOS SI EL NOMBRE INTRODUCIDO YA EXISTE

    // SI EXISTE EL CLUB NO SE CREA
    if (!nombre)
      return res.status(400).send({
        ok: false,
        mensaje: "Ya existe un club con ese nombre",
      });

    club = new Club(req.body); // SI NO EXISTE, CREAMOS UN NUEVO CLUB CON LOS DATOS DEL BODY
    await club.save(); // GUARDAMOS EL CLUB

    // DEVOLVEMOS LOS DATOS
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

// FUNCION QUE DEVUELVE TODOS LOS CLUBES
export const getClubes = async (req, res) => {
  try {
    const club = await Club.find(); // BUSCAMOS TODOS LOS CLUBES

    // EN CASO DE QUE NO SE OBTENGAN CLUBES
    if (!club)
      res.status(400).send({
        ok: false,
        mensaje: "No existen clubes",
      });

    // SI SE OBTIENEN LOS MUESTRA
    if (club)
      res.status(200).send({
        ok: true,
        mensaje: "Obteniendo clubes...",
        club,
      });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// FUNCION QUE DEVUELVE UN CLUB EN ESPECIFICO
export const getClubById = async (req, res) => {
  const idClub = req.params.id; // OBTENEMOS EL ID DEL CLUB DE LOS PARAMETROS

  try {
    const club = await Club.findById(idClub); // BUSCAMOS EL CLUB EN NUESTRA BBDD

    // SI NO EXISTE
    if (!club)
      return res.status(404).send({
        ok: false,
        mensaje: `Ese club no existe`,
      });
    // SI EXISTE DEVOLVEMOS LOS DATOS DEL CLUB
    else
      res.status(200).send({
        ok: true,
        mensaje: `Datos del ${club.nombre} obtenidos con éxito`,
        club,
      });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// FUNCION QUE ACTUALIZA UN CLUB
export const updateClub = async (req, res) => {
  const idClub = req.params.id; // OBTENEMOS EL ID DEL CLUB DE LOS PARAMETROS
  const params = req.body; // COGEMOS LOS DATOS INTRODUCIDOS EN EL BODY

  try {
    const club = await Club.findByIdAndUpdate(idClub, params); // BUSCAMOS EL CLUB EN NUESTRA BBDD Y LE PASAMOS LOS CAMPOS QUE QUEREMOS CAMBIAR

    // SI NO EXISTE
    if (!club)
      return res.status(400).send({
        ok: false,
        mensaje: `Ese club no existe`,
      });
    // SI EXISTE Y SE MODIFICA CON EXITO
    else
      res.status(200).send({
        ok: true,
        mensaje: `El club ${club.nombre} ha sido actualizado con éxito`,
        club,
      });
  } catch {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// FUNCION QUE BORRA UN CLUB
export const deleteClub = async (req, res) => {
  const idClub = req.params.id; // OBTENEMOS EL ID DE LOS PARAMETROS

  try {
    const club = await Club.findByIdAndDelete(idClub); // BUSCAMOS EL CLUB A TRAVES DEL ID

    // SI NO EXISTE
    if (!club)
      return res.status(400).send({
        ok: false,
        mensaje: `El club con id ${idClub} no existe`,
      });
    // SI EXISTE SE ELIMINA Y DEVUELVE LOS DATOS DEL CLUB ELIMINADO
    else
      return res.status(200).send({
        ok: true,
        mensaje: `El club ${club.nombre} ha sido eliminado con éxito`,
        club,
      });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
