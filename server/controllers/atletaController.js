// FICHERO QUE TIENE EL CRUD DE LOS ATLETAS

// IMPORTAMOS EL MODELO
import { Atleta } from "../models/atletaModel.js";
import { Club } from "../models/clubModel.js";
import { uploadFile } from "../services/files.js";

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

// FUNCION QUE DEVUELVE TODOS LOS ATLETAS
export const getAtletas = async (req, res) => {
  try {
    const atletas = await Atleta.find(); // BUSCAMOS TODOS LOS ATELTAS

    // EN CASO DE QUE NO SE OBTENGAN ATLETAS
    if (!atletas)
      res.status(400).send({
        ok: false,
        mensaje: "No existen atletas",
      });

    // SI SE OBTIENEN LOS MUESTRA
    if (atletas)
      res.status(200).send({
        ok: true,
        mensaje: "Obteniendo atletas...",
        atletas,
      });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// FUNCION QUE DEVUELVE UN ATLETA EN ESPECIFICO
export const getAtletaById = async (req, res) => {
  const idAtleta = req.params.id; // OBTENEMOS EL ID DEL ATLETA DE LOS PARAMETROS

  try {
    const atleta = await Atleta.findById(idAtleta); // BUSCAMOS EL ATLETA EN NUESTRA BBDD

    // SI NO EXISTE
    if (!atleta)
      return res.status(404).send({
        ok: false,
        mensaje: `Ese atleta no existe`,
      });
    // SI EXISTE DEVOLVEMOS LOS DATOS DEL ATLETA
    else
      res.status(200).send({
        ok: true,
        mensaje: `Datos de ${atleta.nombre} con dni ${atleta.dni} obtenidos con éxito`,
        atleta,
      });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// FUNCION QUE ACTUALIZA UN ATLETA
export const updateAtleta = async (req, res) => {
  const idAtleta = req.params.id; // OBTENEMOS EL ID DEL ATLETA DE LOS PARAMETROS
  const params = req.body; // GUARDAMOS LOS DATOS INTRODUCIDOS EN EL BODY
  const { idNuevoClub } = req.body; // COGEMOS EL ID DEL NUEVO CLUB EN CASO DE QUE VAYA A CAMBIAR
  const imagen = req.file || (req.files?.imagen ? req.files.imagen[0] : null); // OBTENEMOS LA IMAGEN

  try {
    const atleta = await Atleta.findById(idAtleta); // BUSCAMOS EL ATLETA EN LA BBDD

    // SI NO EXISTE
    if (!atleta) {
      return res.status(400).send({
        ok: false,
        mensaje: `El atleta con id ${atleta} no existe`,
      });
    }

    // SI EL ATLETA VA A CAMBIAR DE CLUB
    if (idNuevoClub) {
      // BUSCAMOS EL ANTIGUO CLUB Y ELIMINAMOS EL ATLETA
      const antiguoClub = await Club.findById(atleta.club); // BUSCAMOS EL ANTIGUO CLUB
      if (antiguoClub) {
        antiguoClub.atletas.pull(atleta._id); // ELIMINAMOS EL ATLETA DEL ARRAY DE ATLETAS DEL CLUB
        await antiguoClub.save(); // GUARDAMOS LOS CAMBIOS
      }

      const nuevoClub = await Club.findById(idNuevoClub); // BUSCAMOS EL NUEVO CLUB
      // SI NO EXISTE
      if (!nuevoClub)
        return res.status(404).send({
          ok: false,
          mensaje: "El club al que deseas cambiar no existe",
        });

      if (imagen) {
        const imagenUrl = await uploadFile(imagen, "imagenAtleta"); // LLAMAMOS A NUESTRO SERVICIO PARA ALMACENAR LA IMAGEN EN SUPABASE
        atleta.imagen = imagenUrl;
      }

      // SI EXISTE
      atleta.club = nuevoClub._id; // ASIGNAMOS AL ATLETA EL ID DEL NUEVO CLUB
      nuevoClub.atletas.push(atleta._id); // INTRODUCIMOS EN EL ARRAY DE ATLETAS DEL CLUB EL NUEVO ATLETA
      await nuevoClub.save(); // GUARDAMOS LOS CAMBIOS DEL CLUB
    }

    if (imagen) {
      const imagenUrl = await uploadFile(imagen, "imagenAtleta"); // LLAMAMOS A NUESTRO SERVICIO PARA ALMACENAR LA IMAGEN EN SUPABASE
      atleta.imagen = imagenUrl; //
    }

    // ACTUALIZAMOS LOS DEMAS CAMPOS DEL USUARIO SI HAY
    Object.assign(atleta, params); // ASIGNAMOS AL ATLETA LOS DEMAS CAMBIOS
    await atleta.save(); // GUARDAMOS LOS CAMBIOS DEL ATLETA

    return res.status(200).send({
      ok: true,
      mensaje: `Atleta con dni ${atleta.dni} ha sido actualizado con éxito`,
      club: atleta.club,
      atleta,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensaje: "Error del servidor",
      error: error.message,
    });
  }
};

// FUNCION QUE BORRA UN ATLETA
export const deleteAtleta = async (req, res) => {
  const idAtleta = req.params.id; // OBTENEMOS EL ID DEL ATLETA DE LOS PARAMETROS

  try {
    const atleta = await Atleta.findByIdAndDelete(idAtleta); // BUSCAMOS EL ATLETA A TRAVES DEL ID OBTENIDO

    // SI NO EXISTE
    if (!atleta) {
      res.status(400).send({
        ok: false,
        mensaje: `EL atleta con id ${idAtleta} no existe`,
      });
    }

    // PARA BORRAR UN ATLETA TAMBIEN TENEMOS QUE ELIMINARLO DEL CLUB
    const club = await Club.findById(atleta.club); // BUSCAMOS EL CLUB

    if (club) {
      club.atletas.pull(atleta._id); // ELIMINAMOS EL ATLETA DEL ARRAY DE ATLERAS
      await club.save(); // GUARDAMOS LOS CAMBIOS DEL CLUB
    }

    await Atleta.findByIdAndDelete(idAtleta); // BUSCAMOS Y ELIMINAMOS EL ATLETA

    return res.status(200).send({
      ok: true,
      mensaje: `El atleta con dni ${atleta.dni} ha sido eliminado correctamente`,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error al eliminar el atleta",
      error: error.message,
    });
  }
};
