import Cita from "../models/Cita.js";


// Obtener citas

export const obtenerMisCitas = async (req, res) => {
  try {
    const { id, rol } = req.usuario;

    let filtro = {};

    if (rol === "paciente") {
      filtro.paciente = id;
    }

    if (rol === "psicologo") {
      filtro.psicologo = id;
    }

    const citas = await Cita.find(filtro)
      .populate("paciente", "nombre email")
      .populate("psicologo", "nombre email")
      .sort({ fecha: 1, horaInicio: 1 });

    res.json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener citas" 
    });
  }
};

// Cancelar una cita por su ID
export const cancelarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo, canceladaPor } = req.body;

    const cita = await Cita.findByIdAndUpdate(
      id,
      { estado: "cancelada",
        motivoCancelacion: motivo,
        canceladaPor
       },

      { new: true }
    );

    res.json({ mensaje: "Cita cancelada", cita });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cancelar cita" });
  }
};