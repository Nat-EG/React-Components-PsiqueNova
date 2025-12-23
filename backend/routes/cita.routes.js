import express from "express";
import {
  cancelarCita,
  obtenerCitasPaciente,
  obtenerCitasPsicologo
} from "../controllers/CitaController.js";

const router = express.Router();

router.get("/paciente/:id", obtenerCitasPaciente);
router.get("/psicologo/:id", obtenerCitasPsicologo);
router.put("/:id/cancelar", cancelarCita);

export default router;