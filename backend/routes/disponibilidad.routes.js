import { Router } from "express";
import {
  listarAgendasPorPsicologo,
  crearAgenda,
  actualizarBloque,
  eliminarBloque, 
} from "../controllers/disponibilidad.controller.js";


const router = Router();

router.get("/", listarAgendasPorPsicologo);
router.post("/", crearAgenda);
router.patch("/:agendaId/bloques/:bloqueIndex", actualizarBloque);
router.delete("/:agendaId/bloques/:bloqueIndex", eliminarBloque); 

export default router;