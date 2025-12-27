import mongoose from "mongoose";

//Subdocumento para los bloques de tiempo abiertos
const bloqueSchema = new mongoose.Schema({

    horaInicio: { 
        type: String, 
        required: true 
    },
    horaFin: { 
        type: String, 
        required: true 
    },
    disponible: { 
        type: Boolean, 
        default: true 
    }
},
{ _id: false }
);

const agendaSchema = new mongoose.Schema({

    //Relaciones
    psicologo: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuario", 
        required: true 
    },

    //Datos de la agenda abierta
    fecha : {
        type: Date, 
        required: true,
    },

    bloques: [bloqueSchema],
    creadoEn: { 
        type: Date, 
        default: Date.now 
    }
}, { versionKey: false });

//Evitar agendas duplicadas por dia
agendaSchema.index(
    { psicologo: 1, fecha: 1 },
    { unique: true }
);

export default mongoose.model('Agenda', agendaSchema);
