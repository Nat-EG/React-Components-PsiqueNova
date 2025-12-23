import Pago from "../models/Pago.js";
import Cita from "../models/Cita.js";
import Agenda from "../models/Agenda.js";

export const procesarPago = async (req, res) => {
    try {
        const { 
            metodo,
            paciente,
            psicologo,
            servicio,
            fecha,
            horainicio,
            horafin,
            valor
        } = req.body;

        // Crear pago en estado pendiente
        const pago = await Pago.create({
            paciente,
            psicologo,
            servicio,
            metodo,
            valor,
        });

        // Simular integración con pasarela de pagos 
        const pagoAprobado = true; // Aquí se simula la aprobación del pago

        if (!pagoAprobado) {
            pago.estado = "Pago rechazado",
            await pago.save();

            return res.status(400).json({ message: "El pago fue rechazado.", pago });
        }

        // Actualizar estado del pago a aprobado
        pago.estado = "aprobado";
        pago.referenciaPasarela = "REF-" + Date.now(); // Simulación de referencia
        pago.respuestaPasarela = { mensaje: "Pago aprobado (simulado)." };
        await pago.save();

        // Crear la cita asociada al pago
        const cita = await Cita.create({
            paciente,
            psicologo,
            servicio,
            fecha,
            horainicio,
            horafin,
            estado: "programada",
            pago: pago._id
        });

        //Asociar la cita al pago
        pago.cita = cita._id;
        await pago.save();

        //Bloquear agenda
        await Agenda.updateOne(
            {
                idPsicologo: psicologo,
                fecha,
                "bloques.horaInicio": horainicio
            },
            {
                $set: { "bloques.$.disponible": false }
            }
        );

        res.status(201).json({ message: "Pago aprobado y cita creada exitosamente.", pago, cita });

    } catch (error) {
        console.error("Error procesando el pago:", error);
        res.status(500).json({ message: "Error procesando el pago." });
    }
};