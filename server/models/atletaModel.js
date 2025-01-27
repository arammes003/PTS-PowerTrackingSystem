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
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
    enum: ["Masculino", "Femenino"],
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
  historial_resultados: [
    {
      competicion: {
        type: Schema.Types.ObjectId,
        ref: "Competicion",
      },
      nombre_competicion: String,
      fecha: Date,
      squat: Number,
      bench_press: Number,
      deadlift: Number,
      total: Number,
      peso_atleta: Number,
      gl_points: Number,
    },
  ],
});

// CREAMOS EL MODELO
export const Atleta = model("Atleta", AtletaSchema);
