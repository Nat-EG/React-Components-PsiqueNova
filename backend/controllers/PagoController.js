import Pago from "../models/Pago.js";
import Cita from "../models/Cita.js";
import Agenda from "../models/Agenda.js";
import Venta from "../models/Venta.js";
import mongoose from "mongoose";
import crypto from "crypto";

export const procesarPago = async (req, res) => {
  try {
    const { id: pacienteId } = req.usuario;
    const { psicologo, servicio, metodo, valor, fecha, horaInicio, horaFin } = req.body;

    // 1. Crear pago
    const pago = await Pago.create({
      paciente: pacienteId,
      psicologo,
      servicio,
      metodo,
      valor,
      estado: "pendiente",
      referenciaPasarela: crypto.randomUUID(),
    });

    // 2. Simular pago aprobado
    pago.estado = "aprobado";
    pago.fechaPago = new Date();
    await pago.save();

    // 3. Normalizar fecha 
    const fechaAgenda = new Date(fecha);
    fechaAgenda.setUTCHours(0, 0, 0, 0);

    // 4. Crear cita
    const cita = await Cita.create({
      paciente: pacienteId,
      psicologo,
      fecha: fechaAgenda,
      horaInicio,
      horaFin,
      estado: "programada",
    });

    // 5. Actualizar agenda
    const result = await Agenda.updateOne(
      {
        psicologo,
        fecha: fechaAgenda,
        bloques: {
          $elemMatch: {
            horaInicio,
            disponible: true,
          },
        },
      },
      {
        $set: {
          "bloques.$.disponible": false,
        },
      }
    );

    if (result.matchedCount === 0) {
      console.warn("No se encontró bloque de agenda para actualizar", {
        psicologo,
        fecha: fechaAgenda,
        horaInicio,
      });
    }

    // 6. Crear venta
    await Venta.create({
      idFactura: crypto.randomUUID(),
      cita: cita._id,
      pago: pago._id,
      paciente: pacienteId,
      psicologo,
      servicio,
      valor,
    });

    res.status(200).json({
      mensaje: "Pago procesado y cita creada con éxito",
      pago,
      cita,
    });

  } catch (error) {
    console.error("Error al procesar el pago:", error);
    res.status(500).json({
      mensaje: "Error al procesar el pago",
      error: error.message,
    });
  }
};
