// CONTROLADOR QUE MANEJA LAS FUNCIONES DEL USUARIO

// IMPORTAMOS BCRYPTJS PARA ENCRIPTAR LA CONTRASEÑA
import bcrypt from "bcryptjs";

// IMPORTAMOS EL MODELO DEL USUARIO
import { Usuario } from "../models/usuarioModel.js";

// IMPORTAMOS SERVICIO GENERAR TOKEN
import { generarJWT } from "../services/jwt.js";

// IMPORTAMOS SERVICIO PARA SUBIR ARCHIVOS
import { uploadFile } from "../services/files.js";

// FUNCION REGISTRAR USUARIO
export const signup = async (req, res) => {
  const { email, password } = req.body; // OBTENEMOS EL EMAIL Y LA CONTRASEÑA DEL BODY DE LA PETICIÓN
  const avatar = req.file || (req.files?.avatar ? req.files.avatar[0] : null); // OBTENEMOS EL AVATAR EN CASO DE QUE HAYA

  try {
    let usuario = await Usuario.findOne({ email }); // BUSCAMOS SI EL EMAIL YA ESTÁ EN USO
    // EN CASO DE ESTAR EN USO, DEVUELVE UN ERROR YA QUE EL EMAIL ES UNICO
    if (usuario)
      return res.status(400).send({
        ok: false,
        mensaje: "Ese correo electrónico ya está en uso.",
      });

    usuario = new Usuario(req.body); // CREAMOS UN NUEVO USUARIO CON LOS DATOS DEL BODY DE LA PETICION
    const salt = bcrypt.genSaltSync(10); // CREAMOS UN SALT PARA ENCRIPTAR LA CONTRASEÑA
    usuario.password = bcrypt.hashSync(password, salt); // ASIGNAMOS A LA CONTRASEÑA DEL USUARIO ESA SAL PARA ENCRIPTAR SU CONTRASEÑA

    // SI EL USUARIO INTRODUCE UN AVATAR
    if (avatar) {
      const avatarUrl = await uploadFile(avatar, "userAvatar"); // LLAMAMOS A NUESTRO SERVICIO PARA ALMACENAR EL AVATAR EN SUPABASE

      // SI SE GUARDA CORRECTAMENTE EN SUPABASE
      if (avatarUrl) usuario.avatar = avatarUrl; // ASIGNAMOS LA URL CREADA DE SUPABASE A NUESTRA BBDD DE MONGO

      await usuario.save(); // GUARDAMOS EL USUARIO

      // DEVOLVEMOS LA INFORMACIÓN DEL USUARIO
      return res.status(200).send({
        ok: true,
        mensaje: "Usuario registrado con éxito",
        avatar: avatarUrl,
        usuario,
      });
      // SI EL USUARIO NO INTRODUCE UN AVATAR O NO ES UN AVATAR VÁLIDO
    } else {
      await usuario.save(); // GUARDAMOS EL USUARIO

      // DEVUELVE EL MENSAJE CON LA INFORMACIÓN
      return res.status(200).send({
        ok: true,
        mensaje: "Usuario registrado con éxito",
        usuario,
      });
    }
    // EN CASO DE CUALQUIER ERROR EN LA CREACIÓN DEL USUARIO
  } catch (error) {
    // DEVOLVEMOS EL ERROR
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// FUNCION LOGIN USUARIO
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario)
      return res.status(400).send({
        ok: false,
        mensaje: "Ese correo electrónico no existe",
      });

    if (!bcrypt.compareSync(password, usuario.password))
      return res.status(400).send({
        ok: false,
        mensaje: "Credenciales incorrectas",
      });

    const token = await generarJWT(usuario.id, usuario.email);
    return res.send({
      ok: true,
      mensaje: "Sesión iniciada con éxito",
      token,
      avatar: usuario.avatar,
      usuario,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};

// MANEJADOR QUE  SUBE UN ARCVHIVO A SUPABASE
const handleAvatarUpload = async (avatar) => {
  if (!avatar) return null; // SI NO SE PUEDE OBTENER EL AVATAR DEVUELVE NULL Y NO SE ACTUALIZA
  return await uploadFile(avatar, "userAvatar"); // SI SE PUEDE, LLAMAMOS AL SERVICIO Y LE PASAMOS EL ARCHIVO Y EL NOMBRE DEL BUCKET
};

// FUNCION QUE ACTUALIZA EL USUARIO
export const updateUser = async (req, res) => {
  const { id } = req.params; // OBTENEMOS EL ID DEL USUARIO DE LOS PARÁMETROS
  const params = { ...req.body }; // OBTENEMOS EL BODY CON LOS DATOS QUE QUIERE MODIFICAR EL USUARIO
  const avatar = req.file || (req.files?.avatar ? req.files.avatar[0] : null); // AVATAR SI EL USUARIO QUIERE MODIFICARLO

  try {
    let usuario = await Usuario.findById(id); // BUSCAMOS EL USUARIO A TRAVÉS DEL ID PASADO POR PARÁMETROS
    // SI NO SE ENCUENTRA EL USUARIO
    if (!usuario) {
      return res.status(404).send({
        ok: false,
        mensaje: "Usuario no encontrado",
      });
    }

    // SI EL USUARIO INTRODUCE UNA IMAGEN
    if (avatar) {
      const avatarUrl = await handleAvatarUpload(avatar); // OBTENEMOS LA URL CREADA POR EL MANEJADOR QUE LLAMA AL SERVICIO DE UPLOADFILE
      if (avatarUrl) params.avatar = avatarUrl; // AGREGAMOS LA URL CREADA AL OBJETO
    }

    usuario = await Usuario.findByIdAndUpdate(id, params, { new: true }); // ACTUALIZAMOS EL USUARIO CON LOS DATOS OBTENIDOS

    // MENSAJE INFORMATIVO
    return res.status(200).send({
      ok: true,
      mensaje: "Usuario actualizado con éxito",
      usuario,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message,
    });
  }
};
