import express from "express";
import { registrarUsuario, eliminarUsuario, obtenerPsicologos, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario } 
from "../controllers/UsuarioController.js";


const router = express.Router();

//rutas

//Ruta para registrar un nuevo usuario
router.post("/registro", registrarUsuario);

//Ruta para obtener todos los usuarios
router.get("/", obtenerUsuarios);

//Ruta para obtener solo psicologos
router.get("/psicologos", obtenerPsicologos);

//Ruta para obtener un usuario por ID
router.get("/:id", obtenerUsuarioPorId);

//Ruta para actualizar un usuario
router.put("/:id", actualizarUsuario);

//Ruta para eliminar un usuario por su ID
router.delete("/:id", eliminarUsuario);

export default router;