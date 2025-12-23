import Agenda from "../models/Agenda.js";
import Usuario from "../models/Usuario.js";

// Controlador para crear o actualizar agenda (disponibilidad)
export const crearAgenda = async (req, res) => {
    try {
        const { idUsuarioPsicologo, fecha, bloques } = req.body;

        //validaciones básicas
        if (!idUsuarioPsicologo || !fecha || !bloques || bloques.length === 0) {
            return res.status(400).json({ mensaje: "Datos incompletos" });
        }

        //validar que el usuario sea psicologo
        const psicologo = await Usuario.findById(idUsuarioPsicologo);
        if (!psicologo || psicologo.rol !== "psicologo") {
            return res.status(404).json({ mensaje: "Solo los psicologos pueden crear agenda" });
        }

        //Crear o actualizar la agenda
        const agenda = await Agenda.findOneAndUpdate(
            { idUsuarioPsicologo, fecha },
            { bloques },
            { new: true, upsert: true }
        );

        res.status(201).json ({ 
            mensaje: "Agenda creada o actualizada exitosamente",
             agenda 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};

// Controlador para obtener la agenda de un psicólogo por fecha
export const obtenerAgendaPsicologo = async (req, res) => {
    try {
        const { idPsicologo, fecha } = req.params;

        const agenda = await Agenda.findOne({ 
            idUsuarioPsicologo: idPsicologo, 
            fecha 
        });

        if (!agenda) {
            return res.status(404).json({ mensaje: "No se encontró agenda para la fecha especificada" });
        }

        res.json(agenda);

    } catch (error) {
        res.status(500).json({ mensaje: "Error del servidor" });
    }
};
