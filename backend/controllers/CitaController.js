import Cita from "../models/Cita.js";


// Crear una nueva cita
export const crearCita = async (req, res) => {
  try {
    const { id: usuarioId, rol } = req.usuario;

    if (rol !== "paciente") {
      return res.status(403).json({ 
        mensaje: "Solo los pacientes pueden crear citas" 
      });
    }

    const { 
      psicologo, 
      fecha, 
      horaInicio, 
      horaFin 
    } = req.body;
  

    const cita = await Cita.create({
      paciente: usuarioId,
      psicologo,
      fecha,
      horaInicio,
      horaFin,
      estado: "pendiente",
    });

    res.status(201).json(cita);

  } catch (error) {
  console.error("❌ ERROR CREAR CITA:", error);

  return res.status(500).json({
    mensaje: "Error al crear cita",
    error: error.message,
    stack: error.stack
  });
}

  
};

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