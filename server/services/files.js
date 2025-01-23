// FICHERO QUE VA A PERMITIR LA INTERACCIÓN CON ARCHIVOS EN SUPABASE

// IMPORTAMOS NUESTRA CONFIGURACIÓN DE SUPABASE
import { supabase } from "../config/supabase.js";

// FUNCIÓN QUE PERMITE SUBIR ARCHIVOS
export const uploadFile = async (file, bucket) => {
  try {
    const fileName = `${Date.now()}-${file.originalname}`; // GUARDAMOS EL FICHERO CON LA FECHA DEL MOMENTO Y EL NOMBRE ORIGINAL

    // SUBIMOS EL ARCHIVO A SUPABASE
    const { data, error } = await supabase.storage
      .from(bucket) //  NOMBRE DEL BUCKET
      .upload(fileName, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    // SI HAY CUALQUIER ERROR
    if (error) throw new Error(`Error al subir archivo: ${error.message}`);

    // OBTENEMOS LA URL PUBLICA DE LA FOTO
    const { data: publicData, error: urlError } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    // SI HAY CUALQUIER ERROR AL OBTENER LA URL
    if (urlError)
      throw new Error(`Error al obtener URL pública: ${urlError.message}`);

    // SI NO SE PUEDE OBTENER LA URL
    if (!publicData || !publicData.publicUrl)
      throw new Error("No se pudo obtener la URL pública del archivo");

    // MENSAJE INFORMATIVO SI OBTENEMOS CORRECTAMENTE LA URL
    console.log("URL obtenida:", publicData.publicUrl);

    return publicData.publicUrl; // DEVOLVEMOS LA URL
  } catch (error) {
    console.error("Error al subir archivo a Supabase:", error.message); // ERROR SI NO SE PUEDE SUBIR LA IMAGEN
    throw error;
  }
};
