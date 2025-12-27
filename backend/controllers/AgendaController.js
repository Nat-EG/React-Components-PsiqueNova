import Agenda from "../models/Agenda.js";

export const obtenerAgendaPsicologo = async (req, res) => {
  try {
    const { psicologoId, fecha } = req.params;

    //inicio dia
    const inicioDia = new Date(fecha);
    inicioDia.setHours(0, 0, 0, 0);

    //fin dia
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
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener agenda" });
  }
};

//controlador para obtener días disponibles de un psicólogo
export const obtenerDiasDisponibles = async (req, res) => {
  try {
    const { psicologoId } = req.params;

    const agendas = await Agenda.find(
      { psicologo: psicologoId,
        "bloques.disponible": true
      },
      {fecha: 1}
    );
     
    res.json(agendas.map(a => a.fecha));
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener días disponibles" });
  }
};