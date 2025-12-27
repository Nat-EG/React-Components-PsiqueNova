import Cita from "../models/Cita.js";
import mongoose from "mongoose";
import Agenda from "../models/Agenda.js";


// Obtener citas pendientes

export const obtenerCitaPaciente = async (req, res) => {
  try {
    const { pacienteId } = req.params;

    const cita = await Cita.findOne({
      paciente: pacienteId,
      estado: { $in: ["programada", "cancelada"] }
    })
      .sort({ updatedAt: -1 }) // la más reciente
      .populate("psicologo", "nombresApellidos");

    res.json(cita);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la cita" });
  }
};

// Cancelar una cita
export const cancelarCita = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id } = req.params;
    const { motivo } = req.body;

    const cita = await Cita.findById(id).session(session);

    if (!cita) {
      throw new Error("Cita no encontrada");
    }

    cita.estado = "cancelada";
    cita.motivoCancelacion = motivo;
    cita.canceladaPor = "paciente";

    await cita.save({ session });

    // liberar agenda
    await Agenda.updateOne(
    {
      psicologo: cita.psicologo,
      fecha: cita.fecha,
      "bloques.horaInicio": cita.horaInicio,
    },
    {
      $set: {
        "bloques.$.disponible": true,
      },
    },
    { session }
  );

    await session.commitTransaction();
    res.json(cita);

  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ mensaje: error.message });
  } finally {
    session.endSession();
  }
};
// Reprogramar una cita
export const reprogramarCita = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { id } = req.params;
    const { fecha, horaInicio, horaFin } = req.body;

    const cita = await Cita.findById(id).session(session);
    if (!cita) throw new Error("Cita no encontrada");

    // liberar bloque anterior
    await Agenda.updateOne(
      {
        psicologo: cita.psicologo,
        fecha: cita.fecha,
        "bloques.horaInicio": cita.horaInicio,
      },
      { $set: { "bloques.$.disponible": true } },
      { session }
    );

    // ocupar nuevo bloque
    await Agenda.updateOne(
      {
        psicologo: cita.psicologo,
        fecha,
        "bloques.horaInicio": horaInicio,
      },
      { $set: { "bloques.$.disponible": false } },
      { session }
    );

    cita.fecha = fecha;
    cita.horaInicio = horaInicio;
    cita.horaFin = horaFin;
    cita.estado = "programada";

    await cita.save({ session });

    await session.commitTransaction();
    res.json(cita);

  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ mensaje: error.message });
  } finally {
    session.endSession();
  }
};