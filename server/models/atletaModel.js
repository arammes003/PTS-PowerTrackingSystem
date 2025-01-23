// MODELO ATLETA

// IMPORTAMOS MODEL Y SCHEMA DE MONGOOSE
import { Schema, model } from "mongoose";

// ESQUEMA DEL ATLETA
const AtletaSchema = new Schema({
  dni: {
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
    required: true,
  },
  club: {
    type: Schema.Types.ObjectId,
    ref: "Club",
    required: true,
  },
  categoria: {
    type: Number,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  victorias: {
    type: Number,
    required: false,
    default: 0,
  },
  podios: {
    type: Number,
    required: false,
    default: 0,
  },
  trayectoria: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: false,
  },
  debut: {
    type: Date,
    required: false,
  },
  nacimiento: {
    type: Date,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  provincia: {
    type: String,
    required: true,
  },
  altura: {
    type: Number,
    required: true,
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
