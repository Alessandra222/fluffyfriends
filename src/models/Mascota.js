import { Schema, model } from "mongoose";

const mascotaModelo = new Schema({
    idmascota: {
      type: Number,
      required: true,
      unique: true,
      trim: true
    },
    especie: {
      type: String,
      trim: true
    },
    nombre: {
      type: String,
      trim: true
    },
    raza: String,
    edad: {
      type: Number,
    },
    dueno: {
      type: String,
      trim: true
    },
    direccion: {
      type: String,
      trim: true
    },
    imagen:{
      type: Buffer,
    }
  },{
      versionKey: false
  });
  
  export default model("Mascota", mascotaModelo);
  
