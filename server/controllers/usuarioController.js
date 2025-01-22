// CONTROLADOR QUE MANEJA LAS FUNCIONES DEL USUARIO

// IMPORTAMOS BCRYPTJS PARA ENCRIPTAR LA CONTRASEÑA
import bcrypt from "bcryptjs";

// IMPORTAMOS EL MODELO DEL USUARIO
import { Usuario } from "../models/usuarioModel.js";

// IMPORTAMOS SERVICIO GENERAR TOKEN
import { generarJWT } from "../services/jwt.js";

// FUNCION REGISTRAR USUARIO
export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario)
      return res.status(400).send({
        ok: false,
        mensaje: "Ese correo electrónico ya está en uso.",
      });

    usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();

    return res.status(201).send({
      ok: true,
      mensaje: "Usuario registrado con éxito",
      usuario,
    });
  } catch (error) {
    return res.status(500).send({
      ok: false,
      mensaje: "Error en el servidor",
      error: error.message, // Opcional: Enviar mensaje de error en la respuesta
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
