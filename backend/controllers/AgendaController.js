import Agenda from "../models/Agenda.js";

/**
 * Obtener agenda de un psicólogo por fecha
 * GET /api/agendas/psicologo/:psicologoId/:fecha
 */
export const obtenerAgendaPsicologo = async (req, res) => {
  try {
    const { psicologoId, fecha } = req.params;

    const inicioDia = new Date(fecha);
    inicioDia.setHours(0, 0, 0, 0);

    const finDia = new Date(fecha);
    finDia.setHours(23, 59, 59, 999);

    const agenda = await Agenda.findOne({
      psicologo: psicologoId,
      fecha: {
        $gte: inicioDia,
        $lte: finDia
      }
    });

    if (!agenda) {
      return res.status(404).json({ mensaje: "Agenda no encontrada" });
    }

    res.json(agenda);
  } catch (error) {
    console.error("Error obtenerAgendaPsicologo:", error);
    res.status(500).json({ mensaje: "Error al obtener agenda" });
  }
};

/**
 * Obtener días disponibles de un psicólogo
 * GET /api/agendas/psicologo/:psicologoId
 */
export const obtenerDiasDisponibles = async (req, res) => {
  try {
    const { psicologoId } = req.params;

    const agendas = await Agenda.find(
      {
        psicologo: psicologoId,
        "bloques.disponible": true
      },
      { fecha: 1 }
    );

    res.json(agendas.map(a => a.fecha));
  } catch (error) {
    console.error("Error obtenerDiasDisponibles:", error);
    res.status(500).json({ mensaje: "Error al obtener días disponibles" });
  }
};

/**
 * Crear una agenda
 * POST /api/agendas
 */
export const crearAgenda = async (req, res) => {
  try {
    const { psicologo, fecha, bloques } = req.body;

    if (!psicologo || !fecha || !bloques) {
      return res.status(400).json({
        mensaje: "Faltan datos obligatorios"
      });
    }

    const nuevaAgenda = new Agenda({
      psicologo,
      fecha,
      bloques
    });

    await nuevaAgenda.save();

    res.status(201).json({
      mensaje: "Agenda creada correctamente",
      agenda: nuevaAgenda
    });
  } catch (error) {
    console.error("Error crearAgenda:", error);
    res.status(500).json({ mensaje: "Error al crear agenda" });
  }
};

/**
 * Ver disponibilidad de un psicólogo en una fecha
 * POST /api/agendas/disponible
 */
export const obtenerDisponibilidadPsicologo = async (req, res) => {
  try {
    const { psicologoId, fecha } = req.body;

    const inicioDia = new Date(fecha);
    inicioDia.setHours(0, 0, 0, 0);

    const finDia = new Date(fecha);
    finDia.setHours(23, 59, 59, 999);

    const agenda = await Agenda.findOne({
      psicologo: psicologoId,
      fecha: {
        $gte: inicioDia,
        $lte: finDia
      }
    });

    if (!agenda) {
      return res.json({ disponible: false });
    }

    const disponible = agenda.bloques.some(b => b.disponible === true);

    res.json({ disponible });
  } catch (error) {
    console.error("Error obtenerDisponibilidadPsicologo:", error);
    res.status(500).json({ mensaje: "Error al verificar disponibilidad" });
  }
};
