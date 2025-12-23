import mongoose from "mongoose";

const ventaScehema = new mongoose.Schema({
    idFactura: {
        type: String,
        unique: true,
        required: true
    },

    fechaHora: {
        type: Date,
        default: Date.now,
    },

    paciente: {
        idUsuario: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Usuario",
            required: true
        },

        nombre: {
            type: String,
            required: true,
        },
    },

    psicologo: {
        idUsuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        },
    },

    servicio: {
        idServicio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Servicio",
            required: true,
        },
        nombre: {
            type: String,
            required: true,
        }
    },

    valor: {
        type: Number,
        required: true,
    },

    pago: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pago",
        required: true,
    },

    cita: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cita",
        required: true,
    }
}, { timestamps: true, 

});

export default mongoose.model("Venta", ventaScehema);