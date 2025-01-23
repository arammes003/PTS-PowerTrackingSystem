// MODELO CLUB

// IMPORTAMOS MODEL Y SCHEMA DE MONGOOSE
import { Schema, model } from "mongoose";

// ESQUEMA DEL CLUB
const ClubSchema = new Schema({
  nombre: {
    type: String,
    require: true,
    unique: true,
  },
  fundador: {
    type: String,
    require: true,
  },
  ciudad: {
    type: String,
    require: true,
  },
  comunidadAutonoma: {
    type: String,
    require: true,
  },
  fechaCreacion: {
    type: Date,
    require: true,
  },
  historia: {
    type: String,
    require: true,
  },
  victorias: {
    type: Number,
    require: false,
  },
  podios: {
    type: Number,
    require: false,
  },
  partNacionales: {
    type: Number,
    require: false,
  },
  partInternacionales: {
    type: Number,
    require: false,
  },
  records: {
    type: Number,
    require: false,
  },
  avatar: {
    type: String,
    require: false,
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
