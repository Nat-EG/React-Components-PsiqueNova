import express from "express";
import { registrarUsuario } from "../controllers/UsuarioController.js";

const router = express.Router();

//rutas
router.post("/registro", registrarUsuario);

export default router;