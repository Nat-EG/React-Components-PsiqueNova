import express from "express";
import { registrarUsuario } from "../controllers/UsuarioController.js";
import { eliminarUsuario } from "../controllers/UsuarioController.js";

const router = express.Router();

//rutas

//Ruta para registrar un nuevo usuario
router.post("/registro", registrarUsuario);

//Ruta para eliminar un usuario por su ID
router.delete("/:id", eliminarUsuario);

export default router;