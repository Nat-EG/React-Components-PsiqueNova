import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/ResumenCita.module.css";
import IconoAtras from "../includes/Back UpiconSvg.co.svg";
import LayoutPaciente from "./Layouts/LayoutPaciente";

const ResumenCita = () => {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [servicio , setServicio] = useState(null);
    const [psicologo, setPsicologo] = useState(null);
    const [fechaCita, setFechaCita] = useState("");
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");

    useEffect(() => {
        const usuarioLS = localStorage.getItem("usuario");
        const servicioLS = localStorage.getItem("servicioSeleccionado");
        const psicologoLS = localStorage.getItem("psicologoSeleccionado");

        const fechaLS = localStorage.getItem("fechaCita");
        const horaInicioLS = localStorage.getItem("horaInicio");
        const horaFinLS = localStorage.getItem("horaFin");

        // Validación general
        if (
            !usuarioLS ||
            !servicioLS ||
            !psicologoLS ||
            !fechaLS ||
            !horaInicioLS ||
            !horaFinLS
        ) {
            alert("Faltan datos para mostrar el resumen de la cita.");
            navigate("/seleccionarPsicologo");
            return;
        }

        setUsuario(JSON.parse(usuarioLS));
        setServicio(JSON.parse(servicioLS));
        setPsicologo(JSON.parse(psicologoLS));

        setFechaCita(fechaLS);
        setHoraInicio(horaInicioLS);
        setHoraFin(horaFinLS);
    }, [navigate]);

    const confirmarCita = async () => {
        navigate("/realizarPago");
    };

    if (!usuario || !servicio || !psicologo) {
        return <p className={styles.cargando}>Cargando resumen...</p>;
    }

    

    return (

        <LayoutPaciente>
        <div className={styles.contenedor}>
            <div className={styles.headerResumenCita}>
                <button
                    type='button'
                    className={styles.btnAtras}
                    onClick={() => window.history.back()}
                >
                
                    <img src={IconoAtras} alt="Atrás" className={styles.iconAtras} />
                    Atrás
                </button>
                <h1>RESUMEN DE LA CITA</h1>
            </div>
            <hr />

            <div className={styles.card}>
                <h2>Paciente</h2>
                <p><strong>Nombre:</strong> {usuario.nombresApellidos}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
            </div>

            <div className={styles.card}>
                <h2>Servicio</h2>
                <p><strong>Nombre del Servicio:</strong> {servicio.nombreServicio}</p>
                <p><strong>Descripción:</strong> {servicio.descripcionServicio}</p>
                <p><strong>Precio:</strong> ${servicio.precioServicio}</p>
            </div>

            <div className={styles.card}>
                <h2>Psicólogo</h2>
                <p><strong>Nombre:</strong> {psicologo.nombresApellidos}</p>
                <p><strong>Corriente Psicológica:</strong> {psicologo.corrientePsicologica}</p>
            </div>

            <div className={styles.card}>
                <h2>Detalles de la Cita</h2>
                <p><strong>Fecha:</strong> {fechaCita}</p>
                <p><strong>Hora:</strong> {horaInicio} - {horaFin}</p>
            </div>

            <button className={styles.botonConfirmar} onClick={confirmarCita}>
                Confirmar y pagar
            </button>
        </div>
        </LayoutPaciente>
    );
};

export default ResumenCita;
