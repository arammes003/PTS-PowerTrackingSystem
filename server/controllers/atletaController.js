// FICHERO QUE TIENE EL CRUD DE LOS ATLETAS

// IMPORTAMOS EL MODELO
import { Atleta } from "../models/atletaModel.js";
import { Club } from "../models/clubModel.js";

// FUNCION QUE CREA UN NUEVO ATLETA
export const createAtleta = async (req, res) => {
  const { dni, idCLub } = req.body; // OBTENEMOS EL DNI Y EL ID DEL CLUB DEL BODY

  try {
    // PRIMERO TENEMOS QUE COMPROBAR QUE EL CLUB AL QUE SE QUIERE INSCRIBIR EXISTA
    const club = await Club.findById(idCLub);
    if (!club)
      return res.status(404).send({
        ok: false,
        mensaje: "Club no encontrado",
      });

    // VERIFICAMOS SI YA EXISTE UN ATLETA CON EL DNI DADO
    const atletaExistente = await Atleta.findOne({ dni });
    if (atletaExistente) {
      return res.status(400).send({
        ok: false,
        mensaje: "Ya existe un atleta con ese dni",
      });
    }

    // CREAMOS UN NUEVO ATLETA Y LE ASIGNAMOS EL CLUB
    const atleta = new Atleta({
      ...req.body,
      club: club._id, // ASIGNAMOS EL CLUB AL ATLETA
    });

    // GUARDAMOS EL ATLETA EN LA BASE DE DATOS
    await atleta.save();

    // AGREGAMOS EL ID DEL ATLETA AL CLUB
    club.atletas.push(atleta._id);
    await club.save();

    // DEVOLVEMOS LA RESPUESTA CON EL NUEVO ATLETA Y EL CLUB
    return res.status(201).send({
      ok: true,
      mensaje: `Atleta con dni ${dni} añadido con éxito al club ${club.nombre}`,
      atleta,
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
