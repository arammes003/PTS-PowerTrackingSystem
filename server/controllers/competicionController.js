// FICHERO QUE TIENE EL CRUD DE LAS COMPETICIONES

// IMPORTAMOS EL MODELO
import { Competicion } from "../models/competicionModel.js";

// IMPORTAMOS SERVICIO PARA SUBIR ARCHIVOS
import { uploadFile } from "../services/files.js";

// FUNCION QUE CREA UNA NUEVA COMPETICION
export const createCompeticion = async (req, res) => {
  const { nombre } = req.body; // OBTENEMOS EL NOMBRE DEL BODY
  const imagen = req.file || (req.files?.imagen ? req.files.imagen[0] : null); // OBTENEMOS LA IMAGEN

  try {
    const competicionExiste = await Competicion.findOne({
      nombre,
    }); // BUSCAMOS SI EL NOMBRE INTRODUCIDO YA EXISTE

    // SI EXISTE ESA COMPETICION NO SE CREA
    if (competicionExiste)
      return res.status(400).send({
        ok: false,
        mensaje: "Ya existe una competición con ese nombre",
      });

    if (!imagen)
      // DEVOLVEMOS UN ERROR
      return res.status(400).send({
        ok: false,
        mensaje: `No se puede crear una competición sin imagen`,
      });

    const imagenUrl = await uploadFile(imagen, "compImagen"); // LLAMAMOS A NUESTRO SERVICIO PARA ALMACENAR LA IMAGEN EN SUPABASE

    const competicion = new Competicion(req.body);

    // SI SE GUARDA CORRECTAMENTE EN SUPABASE
    if (imagenUrl) competicion.imagen = imagenUrl; // ASIGNAMOS LA URL CREADA DE SUPABASE A NUESTRA BBDD DE MONGO

    await competicion.save(); // GUARDAMOS LA COMPETICION

    // DEVOLVEMOS LA INFORMACIÓN DE LA COMPETICION
    return res.status(200).send({
      ok: true,
      mensaje: "Competición registrada con éxito",
      imagen: imagenUrl,
      competicion,
    });
  } catch (error) {
    return res.status(500).send({
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// FUNCION QUE DEVUELVE TODAS LAS COMPETICIONES
export const getCompeticiones = async (req, res) => {
  try {
    const competiciones = await Competicion.find(); // BUSCAMOS TODAS LAS COMPETICIONES

    // EN CASO DE QUE NO SE OBTENGAN COMPETICIONES
    if (!competiciones)
      res.status(404).send({
        ok: false,
        mensaje: "No existen competiciones",
      });

    // SI SE OBTIENEN LAS MUESTRA
    if (competiciones)
      res.status(200).send({
        ok: true,
        mensaje: "Obteniendo competiciones...",
        competiciones,
      });
  } catch (error) {
    res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
