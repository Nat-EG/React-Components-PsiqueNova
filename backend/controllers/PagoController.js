import Pago from "../models/Pago.js";
import Agenda from "../models/Agenda.js";
import Cita from "../models/Cita.js";
import Venta from "../models/Venta.js";

export const procesarPago = async (req, res) => {
  try {
    const {
      paciente,
      psicologo,
      servicio,
      fecha,
      horaInicio,
      horaFin,
      metodo,
      valor
    } = req.body;

    // 1️. Crear pago
    const pago = await Pago.create({
      paciente,
      psicologo,
      servicio,
      metodo,
      valor,
      estado: "aprobado", // simulación
      referenciaPasarela: `REF-${Date.now()}`,
      respuestaPasarela: { ok: true }
    });

    // 2️. Crear cita
    const cita = await Cita.create({
      paciente,
      psicologo,
      servicio,
      fecha,
      horaInicio,
      horaFin,
      pago: pago._id
    });

    // 3️. Actualizar agenda
    await Agenda.updateOne(
      { psicologo, fecha, "bloques.horaInicio": horaInicio },
      { $set: { "bloques.$.disponible": false } }
    );

    // 4️. Crear venta
    const venta = await Venta.create({
      paciente,
      psicologo,
      servicio,
      cita: cita._id,
      pago: pago._id,
      total: valor
    });

    res.status(201).json({
      mensaje: "Pago realizado con éxito",
      pago,
      cita,
      venta
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al procesar el pago" });
  }
};