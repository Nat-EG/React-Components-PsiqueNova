import express from "express";
import {
  obtenerCitaPaciente,
  obtenerCitasPsicologo,
  cancelarCita,
  reprogramarCita
} from "../controllers/CitaController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener citas de un paciente
router.get(
  "/paciente/:paciente",
  authMiddleware,
  obtenerCitaPaciente
);

// Obtener citas de un psicólogo
router.get(
  "/psicologo/:psicologo",
  authMiddleware,
  obtenerCitasPsicologo
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