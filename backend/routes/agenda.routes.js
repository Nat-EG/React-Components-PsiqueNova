import express from "express";
import { 
    obtenerAgendaPsicologo,
    obtenerDiasDisponibles

 } from "../controllers/AgendaController.js";

const router = express.Router();



//Dias disponibles de un psicólogo: GET /api/agendas/psicologo/:idPsicologo
router.get("/psicologo/:psicologoId", obtenerDiasDisponibles);

//Obtener agenda por fecha y psicólogo: GET /api/agendas/:idPsicologo/:fecha
router.get("/psicologo/:psicologoId/:fecha", obtenerAgendaPsicologo);


export default router;