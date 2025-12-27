import express from "express";
import {
  obtenerMisCitas,
  cancelarCita,
} from "../controllers/CitaController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener citas de un paciente o psicólogo autenticado
router.get("/mis-citas", authMiddleware, obtenerMisCitas);

// Cancelar una cita
router.put("/:id/cancelar", authMiddleware, cancelarCita);


export default router;