// MODELO USUARIO

// IMPORTAMOS MODEL Y SCHEMA DE MONGOOSE
import { Schema, model } from "mongoose";

// ESQUEMA DEL USUARIO
const UsuarioSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellidos: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
});

// CREAMOS EL MODELO
export const Usuario = model("Usuario", UsuarioSchema);
