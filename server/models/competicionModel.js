// MODELO COMPETICION

// IMPORTAMOS MODEL Y SCHEMA DE MONGOOSE
import { Schema, model } from "mongoose";

// ESQUEMA DE LA COMPETICION
const CompeticionSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    unique: true,
  },
  localizacion: {
    type: String,
    require: true,
  },
  fecha: {
    type: Date,
    require: true,
  },
  imagen: {
    type: String,
    require: false,
  },
  resultados: [
    {
      atleta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Atleta",
      },
      squat: {
        type: Number,
        require: true,
      },
      benchPress: {
        type: Number,
        require: true,
      },
      deadlift: {
        type: Number,
        require: true,
      },
      total: {
        type: Number,
        require: true,
      },
    },
  ],
});

// CREAMOS EL MODELO
export const Competicion = model("Competicion", CompeticionSchema);
