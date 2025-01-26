// MODELO COMPETICION

// IMPORTAMOS MODEL Y SCHEMA DE MONGOOSE
import { Schema, model } from "mongoose";

// ESQUEMA DE LA COMPETICION
const CompeticionSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  pais: {
    type: String,
    required: true,
  },
  fecha_inicio: {
    type: Date,
    required: true,
  },
  fecha_fin: {
    type: Date,
    required: false,
  },
  imagen: {
    type: String,
    required: true,
  },
  resultados: [
    {
      atleta: {
        type: Schema.Types.ObjectId,
        ref: "Atleta",
      },
      squat: {
        type: Number,
        required: true,
      },
      benchPress: {
        type: Number,
        required: true,
      },
      deadlift: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
    },
  ],
});

// CREAMOS EL MODELO
export const Competicion = model("Competicion", CompeticionSchema);
