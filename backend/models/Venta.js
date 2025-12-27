import mongoose from "mongoose";

const ventaSchema = new mongoose.Schema({
  idFactura: {
    type: String,
    required: true,
    unique: true
  },

  cita: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cita",
    required: true
  },

  pago: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pago",
    required: true
  },

  paciente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  psicologo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },

  servicio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servicio",
    required: true
  },

  valor: {
    type: Number,
    required: true
  }

}, { timestamps: true });

export default mongoose.model("Venta", ventaSchema);