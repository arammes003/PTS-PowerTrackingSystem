// FICHERO QUE TIENE EL CRUD DE LAS COMPETICIONES

// IMPORTAMOS EL MODELO
import { Atleta } from "../models/atletaModel.js";
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

// FUNCION QUE BORRA UN CLUB
export const deleteCompeticion = async (req, res) => {
  const idCompeticion = req.params.id; // OBTENEMOS EL ID DE LOS PARAMETROS

  try {
    const competicion = await Competicion.findByIdAndDelete(idCompeticion); // BUSCAMOS LA COMPETICION A TRAVES DEL ID

    // SI NO EXISTE
    if (!competicion)
      return res.status(400).send({
        ok: false,
        mensaje: `La competición con id ${idCompeticion} no existe`,
      });
    // SI EXISTE SE ELIMINA Y DEVUELVE LOS DATOS DE LA COMPETICIÓN ELIMINADO
    else
      return res.status(200).send({
        ok: true,
        mensaje: `La competición ${competicion.nombre} ha sido eliminado con éxito`,
        competicion,
      });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// METODO ACTUALIZAR COMPETICION
export const updateCompeticion = async (req, res) => {
  const idCompeticion = req.params.id; // ID de la competición obtenido de los parámetros
  const params = req.body; // Datos enviados en el body

  try {
    // Buscamos la competición y actualizamos con los datos obtenidos
    const competicion = await Competicion.findByIdAndUpdate(
      idCompeticion,
      params,
      { new: true }
    );

    // Si no existe, devolvemos error
    if (!competicion) {
      return res.status(404).send({
        ok: false,
        mensaje: `Esa competición no existe`,
      });
    }

    // Si hay resultados en el body, actualizamos el historial de los atletas
    if (params.resultados && Array.isArray(params.resultados)) {
      // Creamos un array de promesas para actualizar los atletas
      const actualizaciones = params.resultados.map(async (resultado) => {
        return Atleta.findByIdAndUpdate(
          resultado.atleta,
          {
            $push: {
              historial_resultados: {
                competicion: idCompeticion,
                squat: resultado.squat,
                bench_press: resultado.bench_press,
                deadlift: resultado.deadlift,
                total: resultado.total,
                peso_atleta: resultado.peso_atleta,
                gl_points: resultado.gl_points,
              },
            },
          },
          { new: true }
        );
      });

      // Esperamos a que todas las actualizaciones se completen antes de continuar
      await Promise.all(actualizaciones);
    }

    // Enviamos la respuesta después de actualizar todos los atletas
    res.status(200).send({
      ok: true,
      mensaje: `Se ha actualizado correctamente ${competicion.nombre} y los resultados de los atletas`,
      competicion,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
