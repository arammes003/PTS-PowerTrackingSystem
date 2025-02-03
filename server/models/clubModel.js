// MODELO CLUB

// IMPORTAMOS MODEL Y SCHEMA DE MONGOOSE
import { Schema, model } from "mongoose";

// ESQUEMA DEL CLUB
const ClubSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  fundador: {
    type: String,
    required: true,
  },
  ciudad: {
    type: String,
    required: true,
  },
  comunidadAutonoma: {
    type: String,
    required: true,
  },
  fechaCreacion: {
    type: Date,
    required: true,
  },
  historia: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  atletas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Atleta",
    },
  ],
});

// CREAMOS EL MODELO
export const Club = model("Club", ClubSchema);
