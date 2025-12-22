import mongoose from "mongoose";
const usarioSchema = new mongoose.Schema({
    nombresApellidos: { type: String, required: true},
    documentoIdentidad: { type: String, unique: true},
    tipoDocumento: { type: String, enum: ['CC', 'CE', 'TI', 'PP', 'TE', 'PEP']},

    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},

    direccion: { type: String, required: true},
    telefono: { type: String, required: true},

    fechaNacimiento: { type: Date, required: true},
    fechaRegistro: { type: Date, default: Date.now},

    rol: { type: String, enum: ['paciente', 'psicologo', 'admin'], default: 'paciente' },
    estadoUsuario: { type: String, enum: ['activo', 'inactivo'], default: 'activo' },

    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
}, {collection: 'usuarios', versionKey: false });

//exportar el modelo
const Usuario = mongoose.model('Usuario', usarioSchema);
export default Usuario;
   
