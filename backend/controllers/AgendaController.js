import Agenda from "../models/Agenda.js";

export const obtenerAgendaPsicologo = async (req, res) => {
  try {
    const { psicologoId, fecha } = req.params;

    const agenda = await Agenda.findOne({
      psicologo: psicologoId,
      fecha
    });

    if (!agenda) {
      return res.status(404).json({ mensaje: "Agenda no encontrada" });
    }

    res.json(agenda);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener agenda" });
  }
};