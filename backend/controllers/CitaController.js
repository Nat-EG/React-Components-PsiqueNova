import Cita from '../models/Cita.js';
import Agenda from '../models/Agenda.js';
import Usuario from '../models/Usuario.js';

// Crear una nueva cita (reservar)
export const crearCita = async (req, res) => {
    try {
        const { 
            idUsuarioPaciente,
            idUsuarioPsicologo,
            fecha,
            horaInicio,
            horaFin,
            idPago
         } = req.body;

         //Validar roles
        const paciente = await Usuario.findById(idUsuarioPaciente);
        const psicologo = await Usuario.findById(idUsuarioPsicologo);

        if (!paciente || paciente.rol !== 'paciente') {
            return res.status(400).json({ mensaje: 'El usuario paciente no es válido.' });
        }

        if (!psicologo || psicologo.rol !== 'psicologo') {
            return res.status(400).json({ mensaje: 'El usuario psicólogo no es válido.' });
        }

        //Buscar agenda
        const agenda = await Agenda.findOne({ 
            idUsuarioPsicologo, 
            fecha 
        });

        if (!agenda) {
            return res.status(404).json({ mensaje: 'No se encontró una agenda para el psicólogo en la fecha seleccionada.' });
        }

        //Verificar bloque de disponibilidad
        const bloque = agenda.bloques.find(
            b => b.horaInicio === horaInicio && b.disponible
        )
        if (!bloque) {
            return res.status(400).json({ mensaje: 'El bloque de tiempo no está disponible.' });
        }

        //marcar bloque como no disponible (reservado/ocupado)
        bloque.disponible = false;
        await agenda.save();

        //Crear la cita
        const cita = new Cita({
            idUsuarioPaciente,
            idUsuarioPsicologo,
            fecha,
            horaInicio,
            horaFin,
            estado: 'reservada',
            idPago
        });

        await cita.save();

        res.status(201).json({ mensaje: 'Cita creada exitosamente', cita });
    } catch (error) {
        console.error( error);
        res.status(500).json({ mensaje: 'Error al crear la cita' });
    }
};

//obtener citas de un usuario (paciente o psicólogo)
export const obtenerCitasusuario = async (req, res) => {
    try {
        const { idUsuario } = req.params;

        const citas = await Cita.find({
            $or: [
                { paciente: idUsuario },
                { psicologo: idUsuario }
            ]
        })
        .populate('paciente', 'nombresApellidos email')
        .populate('psicologo', 'nombresApellidos email')
        .sort({ fecha: -1 });

        res.json(citas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener las citas' });
    }
};

        //Cancelar una cita (paciente o psicólogo)
export const cancelarCita = async (req, res) => {
    try {
        const { id } = req.params;
        const { motivoCancelacion } = req.body;
        const usuario = req.usuario; // Usuario autenticado que realiza la cancelación

        const cita = await Cita.findById(id);
        if (!cita) {
            return res.status(404).json({ mensaje: 'Cita no encontrada' });
        }

        // Verificar si el usuario autenticado es el paciente o el psicólogo de la cita
        if (
            cita.paciente.toString() !== usuario._id &&
            cita.psicologo.toString() !== usuario._id
        ) {
            return res.status(403).json({ mensaje: 'No tienes permiso para cancelar esta cita' });
        }

        // Actualizar cita
        cita.estado = 'pendiente_reprogramacion';
        cita.motivoCancelacion = motivoCancelacion;
        cita.canceladaPor = usuario.rol;
        
        await cita.save();

        // Liberar el bloque en la agenda del psicólogo
        await liberarBloqueAgenda(cita);
        res.json({ mensaje: 'Cita cancelada correctamente', cita });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al cancelar la cita' });
    }
};

//Funcion reprogramar cita
export const reprogramarCita = async (req, res) => {
    try {
        const { idCitaOriginal } = req.params;
        const { fecha, horaInicio, horaFin } = req.body;

        const citaOriginal = await Cita.findById(idCitaOriginal);
        if (!citaOriginal) {
            return res.status(404).json({ mensaje: 'Cita original no encontrada' });
        }

        // Crear nueva cita
        const nuevaCita = new Cita({
            paciente: citaOriginal.paciente,
            psicologo: citaOriginal.psicologo,
            fecha,
            horaInicio,
            horaFin,
            estado: 'reprogramada',
            citaOriginal: citaOriginal._id
        });

        res.status(201).json({ mensaje: 'Cita reprogramada exitosamente', nuevaCita });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al reprogramar la cita' });
    }
};