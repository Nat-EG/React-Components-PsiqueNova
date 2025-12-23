import express from "express";
import { procesarPago } from "../controllers/PagoController.js";

const router = express.Router();

router.post("/pago", procesarPago);

export default router;