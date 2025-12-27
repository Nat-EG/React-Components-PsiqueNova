import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema({

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

    servicio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Servicio", 
        required: true
    },

    //Datos del pago
    metodo: {
        type: String,
        enum: ["PSE", "TARJETA"],
        required: true
    },

     valor: {
        type: Number,
        required: true
    },

    estado: {
        type: String,
        enum: ["pendiente", "aprobado", "rechazado"],
        default: "pendiente"
    },

    referenciaPasarela: {
        type: String,
        unique: true,
        required: true
        },
        
    fechaPago: {
        type: Date
        }
    
}, { timestamps: true, versionKey: false }
);
export default mongoose.model("Pago", pagoSchema);
