import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// POST - Inicio de sesión
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar que haya email y password
        if (!email || !password) {
            return res.status(400).json({ mensaje: "Debe ingresar email y contraseña." });
        }

        // Buscar usuario existente
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ mensaje: "El usuario no existe." });
        }

        // Comparar contraseñas
        const passwordValida = await bcrypt.compare(password, usuario.password);

        if (!passwordValida) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta." });
        }

        // Generar token JWT
        const token = jwt.sign(
            { 
                id: usuario._id, 
                rol: usuario.rol 
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // Respuesta de inicio de sesión exitoso
        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso.",
            token,
            usuario: {
                id: usuario._id,
                nombresApellidos: usuario.nombresApellidos,
                email: usuario.email,
                rol: usuario.rol,
                estado: usuario.estadoUsuario
            }
        });

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        return res.status(500).json({ mensaje: "Error del servidor." });
    }
};
