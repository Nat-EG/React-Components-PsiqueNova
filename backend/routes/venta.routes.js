import express from 'express';
import { 
    crearVenta, 
    obtenerVentas
 } from '../controllers/VentaController.js';

 const router = express.Router();


// Crear venta (automatica tras el pago aprobado): POST /api/ventas
router.post('/', crearVenta);

//Listado de ventas (Admin): GET /api/ventas
router.get('/', obtenerVentas);