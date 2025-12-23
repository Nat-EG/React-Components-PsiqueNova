import express from "express";
import { 
    crearAgenda, 
    obtenerAgendaPsicologo,
    actualizarBloqueAgenda } from "../controllers/AgendaController.js";

const router = express.Router();

//Crear agenda: POST /api/agendas
router.post("/", crearAgenda);

//Obtener agenda por fecha y psicólogo: GET /api/agendas/:idPsicologo/:fecha
router.get("/:idPsicologo/:fecha", obtenerAgendaPsicologo);

//Actualizar bloque de agenda (disponibilidad): PUT /api/agendas/:idAgenda/bloque
router.put("/:idAgenda/bloque", actualizarBloqueAgenda);

export default router;