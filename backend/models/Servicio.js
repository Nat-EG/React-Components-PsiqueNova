import mongoose from 'mongoose';

const servicioSchema = new mongoose.Schema(
    {
        
        nombreServicio: {
            type: String,
            required: true
        },
        descripcionServicio: {
            type: String,
            required: true
        },
        precioServicio: {
            type: Number,
            required: true
        },
        imagenServicio: {
            type: String,
            default: ''
        },

        estadoServicio: {
            type: String,
            enum: ['Activo', 'Inactivo'],
            default: 'Activo'
        }
    },
    { 
        timestamps: true, 
        collection: 'serviciosPsicologicos'
    }
);
export default mongoose.model('Servicio', servicioSchema);