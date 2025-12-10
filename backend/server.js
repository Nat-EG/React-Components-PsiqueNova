import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import LoginRoutes from "./routes/LoginRoutes.js";


const app = express();

dotenv.config();
connectDB();

app.use(cors());//habilitar cors para que el frontend pueda comunicarse con el backend
app.use(express.json()); //habilitar el parseo de JSON en las solicitudes

//rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", LoginRoutes);

//puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});