import mongoose from "mongoose";

const citaSchema = new mongoose.Schema(
    {

    //Relaciones
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

    estado: { 
        type: String, 
        enum: [
            "programada", 
            "cancelada", 
            "pendiente_reprogramacion",
            "reprogramada",
            "finalizada"], 
        default: "programada" 
    },

    motivoCancelacion: { 
        type: String, 
        default: null 
    },

    canceladaPor: { 
        type: String, 
        enum: ["paciente", "psicologo"],
        default: null          
    }

}, { timestamps: true, versionKey: false })

citaSchema.index(
    { psicologo: 1, fecha: 1, horaInicio: 1 }, 
    { unique: true }
);

export default mongoose.model("Cita", citaSchema);