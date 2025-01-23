// MODELO ATLETA

// IMPORTAMOS MODEL Y SCHEMA DE MONGOOSE
import { Schema, model } from "mongoose";

// ESQUEMA DEL ATLETA
const AtletaSchema = new Schema({
  dni: {
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
    require: true,
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
  },
  categoria: {
    type: Number,
    require: true,
  },
  genero: {
    type: String,
    require: true,
  },
  victorias: {
    type: Number,
    require: false,
    default: 0,
  },
  podios: {
    type: Number,
    require: false,
    default: 0,
  },
  trayectoria: {
    type: String,
    require: true,
  },
  imagen: {
    type: String,
    require: true,
  },
  debut: {
    type: Date,
    require: false,
  },
  nacimiento: {
    type: Date,
    require: true,
  },
  ciudad: {
    type: String,
    require: true,
  },
  provincia: {
    type: String,
    require: true,
  },
  altura: {
    type: Number,
    require: true,
  },
  competiciones: [
    {
      type: Schema.Types.ObjectId,
      ref: "Competicion",
    },
  ],
});

// CREAMOS EL MODELO
export const Atleta = model("Atleta", AtletaSchema);
