import Venta from "../models/Venta.js";

export const obtenerVentasPaciente = async (req, res) => {
  const ventas = await Venta.find({ paciente: req.params.id })
    .populate("servicio")
    .populate("psicologo");

  res.json(ventas);
};