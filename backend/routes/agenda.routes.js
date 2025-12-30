import express from "express";
import { 
    obtenerAgendaPsicologo,
    obtenerDiasDisponibles
    ,crearAgenda,
    obtenerDisponibilidadPsicologo

 } from "../controllers/AgendaController.js";


const router = express.Router();



//Dias disponibles de un psicólogo: GET /api/agendas/psicologo/:idPsicologo
router.get("/psicologo/:psicologoId", obtenerDiasDisponibles);

//Obtener agenda por fecha y psicólogo: GET /api/agendas/:idPsicologo/:fecha
router.get("/psicologo/:psicologoId/:fecha", obtenerAgendaPsicologo);

//crear agenda: POST /api/agendas/
router.post("/", crearAgenda)

//Ver disponibilidad de un psicólogo en una fecha: POST /api/agendas/disponible
router.post("/disponible", obtenerDisponibilidadPsicologo);



export default router;