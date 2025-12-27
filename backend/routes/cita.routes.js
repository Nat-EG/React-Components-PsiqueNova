import express from "express";
import {
  obtenerCitaPaciente,
  cancelarCita,
  reprogramarCita
} from "../controllers/CitaController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener citas pacientes
router.get(
  "/paciente/:pacienteId",
  authMiddleware,
  obtenerCitaPaciente
);

//cancelar cita
router.put(
  "/:id/cancelar",
  authMiddleware,
  cancelarCita
);

router.put(
  "/:id/reprogramar", 
  authMiddleware, 
  reprogramarCita);

export default router;