import mongoose from "mongoose";

const citaSchema = new mongoose.Schema(
  {
    // Relaciones
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

    // Fecha y hora
    fecha: {
      type: Date,
      required: true
    },

    horaInicio: {
      type: String,
      required: true
    },

    horaFin: {
      type: String,
      required: true
    },

    // Estado de la cita
    estado: {
      type: String,
      enum: [
        "pendiente",
        "programada",
        "cancelada",
        "pendiente_reprogramacion",
        "reprogramada",
        "finalizada"
      ],
      default: "pendiente"
    },

    // Cancelación / reprogramación
    motivoCancelacion: {
      type: String,
      default: null
    },

    canceladaPor: {
      type: String,
      enum: ["paciente", "psicologo", null],
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Un psicólogo NO puede tener dos citas a la misma hora el mismo día
citaSchema.index(
  { psicologo: 1, fecha: 1, horaInicio: 1 },
  { unique: true }
);

export default mongoose.model("Cita", citaSchema);