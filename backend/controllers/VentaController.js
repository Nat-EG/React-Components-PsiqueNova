import Venta from "../models/Venta.js";

export const obtenerVentas = async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("paciente", "nombresApellidos documentoIdentidad")
      .populate("psicologo", "nombresApellidos")
      .populate("servicio", "nombreServicio")
      .sort({ createdAt: -1 });

    res.status(200).json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ mensaje: "Error al obtener las ventas" });
  }
};