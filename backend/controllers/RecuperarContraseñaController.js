import Usuario from "../models/Usuario.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";

// POST - Recuperar contraseña
export const recuperar = async (req, res) => {
    try {
        const { email } = req.body;

        // Validar que haya email
        if (!email) {
            return res.status(400).json({ mensaje: "Debe ingresar un email." });
        }

        // Buscar usuario
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ mensaje: "El usuario no existe." });
        }

        // Generar token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hora

        // Guardar en BD
        usuario.resetToken = resetToken;
        usuario.resetTokenExpiry = resetTokenExpiry;
        await usuario.save();

        // Enviar email
      const transporter = nodemailer.createTransport({
       service: "gmail",
       auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
  }
});

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Recuperación de contraseña - PsiqueNova',
            html: `<p>Haz clic en el siguiente enlace para recuperar tu contraseña:</p>
                   <a href="http://localhost:3000/CambiarContraseña?token=${resetToken}">Recuperar Contraseña</a>
                   <p>Este enlace expira en 1 hora.</p>`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ mensaje: "Enlace de recuperación enviado al correo." });

    } catch (error) {
        console.error("Error al recuperar contraseña:", error);
        return res.status(500).json({ mensaje: "Error del servidor." });
    }
};

// POST - Reset contraseña
export const reset = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({ mensaje: "Token y contraseña son requeridos." });
        }

        // Buscar usuario por token
        const usuario = await Usuario.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!usuario) {
            return res.status(400).json({ mensaje: "Token inválido o expirado." });
        }

        // Hash nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Actualizar contraseña y limpiar token
        usuario.password = hashedPassword;
        usuario.resetToken = undefined;
        usuario.resetTokenExpiry = undefined;
        await usuario.save();

        return res.status(200).json({ mensaje: "Contraseña restablecida exitosamente." });

    } catch (error) {
        console.error("Error al restablecer contraseña:", error);
        return res.status(500).json({ mensaje: "Error del servidor." });
    }
};