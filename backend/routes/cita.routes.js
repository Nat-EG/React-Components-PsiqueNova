import express from 'express';
import {
    createCita,
    cancelarCita,
    reprogramarCita,
    obtenerCitasusuario  
} from '../controllers/CitaController.js';

const router = express.Router();

//Crear una nueva cita: POST /api/citas
router.post('/', createCita);

//Cancelar una cita : PUT /api/citas/:id/cancelar
router.put('/:id/cancelar', cancelarCita);

//Reprogramar una cita : POST /api/citas/:idCitaOriginal/reprogramar
router.post('/:idCitaOriginal/reprogramar', reprogramarCita);

//Obtener citas de un usuario (paciente o psicologo) : GET /api/citas/usuario/:idUsuario
router.get('/usuario/:idUsuario', obtenerCitasusuario);

export default router;