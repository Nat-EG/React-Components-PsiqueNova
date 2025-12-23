import Cita from "../models/Cita.js";

// Cancelar una cita por su ID
export const cancelarCita = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findByIdAndUpdate(
      id,
      { estado: "cancelada" },
      { new: true }
    );

    res.json({ mensaje: "Cita cancelada", cita });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al cancelar cita" });
  }
};

// Obtener citas de un paciente por su ID
export const obtenerCitasPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const citas = await Cita.find({ paciente: id }).populate("psicologo").populate("servicio");
    res.json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener citas del paciente" });
  }
};
// Obtener citas de un psicólogo por su ID
export const obtenerCitasPsicologo = async (req, res) => {
  try {
    const { id } = req.params;
    const citas = await Cita.find({ psicologo: id }).populate("paciente").populate("servicio");
    res.json(citas);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener citas del psicólogo" });
  }
};
