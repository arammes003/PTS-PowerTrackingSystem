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
  localizacion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
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
