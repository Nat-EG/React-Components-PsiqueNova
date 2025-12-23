import React, { useEffect, useState } from 'react';
import styles from '../styles/Pago.module.css';
import { obtenerAgendaPsicologo } from '../services/agendaService';
import { procesarPago } from '../services/PagoService';

const Pago = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const [agenda, setAgenda] = useState(null);
    const [bloqueSeleccionado, setBloqueSeleccionado] = useState(null);
    const [metodo, setMetodo] = useState("PSE");
    const [mensaje, setMensaje] = useState("");

    const psicologoId = "64a7f0c2e1b1f5a3c4d2e8b9";
    const fechaSeleccionada = "2024-07-10";

    const cargarAgenda = async () => {
        try {
            const data = await obtenerAgendaPsicologo(psicologoId, fechaSeleccionada);
            console.log("AGENDA RECIBIDA:", data);
            setAgenda(data);
        } catch (error) {
            console.error("Error al cargar la agenda:", error);
        }
    };

    useEffect(() => {
        cargarAgenda();
    }, [psicologoId, fechaSeleccionada]);

    const pagar = async () => {
        if (!bloqueSeleccionado) return;

        try {
            const datosPago = {
                paciente: usuario.id,
                psicologo: psicologoId,
                servicio: "64a7f1d3e1b1f5a3c4d2e8bb",
                fecha: fechaSeleccionada,
                horaInicio: bloqueSeleccionado.horaInicio,
                horaFin: bloqueSeleccionado.horaFin,
                valor: 70000,
                metodo
            };

            const response = await procesarPago(datosPago);
            setMensaje(response.mensaje);
        } catch (error) {
            console.error("Error al procesar el pago", error);
            setMensaje("Error al procesar el pago");
        }
    };

    return (
        <div className={styles.container}>
            <h2>Selecciona tu horario</h2>

            {agenda?.bloques?.map((bloque, index) => (
                bloque.disponible && (
                    <button
                        key={index}
                        className={`${styles.bloque} ${bloqueSeleccionado === bloque ? styles.activo : ""}`}
                        onClick={() => setBloqueSeleccionado(bloque)}
                    >
                        {bloque.horaInicio} - {bloque.horaFin}
                    </button>
                )
            ))}

            {bloqueSeleccionado && (
                <>
                    <h3>Método de pago</h3>

                    <select value={metodo} onChange={(e) => setMetodo(e.target.value)}>
                        <option value="PSE">PSE</option>
                        <option value="TARJETA">Tarjeta</option>
                    </select>

                    <button className={styles.pagarBtn} onClick={pagar}>
                        Confirmar pago
                    </button>
                </>
            )}

            {mensaje && <p className={styles.mensaje}>{mensaje}</p>}
        </div>
    );
};

export default Pago;
