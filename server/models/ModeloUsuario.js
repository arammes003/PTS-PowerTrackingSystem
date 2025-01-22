// MODELO USUARIO

// IMPORTAMOS MODEL Y SCHEMA DE MONGOOSE
import { Schema, model } from "mongoose";

// ESQUEMA DEL USUARIO
const UsuarioSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  nombre: {
    type: String,
    require: true,
  },
  apellidos: {
    type: String,
    require: false,
  },
  password: {
    type: String,
    require: true,
  },
  avatar: {
    type: String,
    require: false,
  },
});

// CREAMOS EL MODELO 
export const Usuario = model("Usuario", UsuarioSchema);
