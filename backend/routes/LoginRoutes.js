import express from "express";
import { login } from "../controllers/LoginController.js";

const router = express.Router();

// Endpoint POST para login
router.post("/login", login);

export default router;
