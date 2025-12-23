import express from "express";
import { obtenerAgendaPsicologo } from "../controllers/AgendaController.js";

const router = express.Router();


//Obtener agenda por fecha y psicólogo: GET /api/agendas/:idPsicologo/:fecha
router.get("/:idPsicologo/:fecha", obtenerAgendaPsicologo);


export default router;