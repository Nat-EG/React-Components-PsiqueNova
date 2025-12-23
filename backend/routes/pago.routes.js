import express from 'express';
import { procesarPago } from '../controllers/PagoController.js';

const router = express.Router();

// Ruta para procesar el pago: POST /api/pagos
router.post('/', procesarPago);

export default router;