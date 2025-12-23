import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import usuarioRoutes from "./routes/usuarioRoutes.js";
import LoginRoutes from "./routes/LoginRoutes.js";
import servicioRoutes from "./routes/servicioRoutes.js";
import pagoRoutes from "./routes/pago.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import agendaRoutes from "./routes/agenda.routes.js";
import citaRoutes from "./routes/cita.routes.js";



const app = express();

dotenv.config();
connectDB();

app.use(cors());//habilitar cors para que el frontend pueda comunicarse con el backend
app.use(express.json()); //habilitar el parseo de JSON en las solicitudes

//rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", LoginRoutes);
app.use("/api/servicios", servicioRoutes);
app.use("/api/pagos", pagoRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/agendas", agendaRoutes);
app.use("/api/citas", citaRoutes);

//servir imagenes de la carpeta uploads
app.use('/uploads/servicios',
    express.static(path.join (process.cwd(), 'uploads/servicios'))
);

//puerto de escucha
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});