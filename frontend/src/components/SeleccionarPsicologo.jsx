import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SeleccionarPsicologo.module.css";
import IconoAtras from "../includes/Back UpiconSvg.co.svg";

const SeleccionarPsicologo = () => {
    const [psicologos, setPsicologos] = useState([]);
    const [psicologoSeleccionado, setPsicologoSeleccionado] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch psicologos desde el backend
        fetch("http://localhost:4000/api/usuarios/psicologos")
            .then((res) => res.json())
            .then (data => setPsicologos(data))
            .catch (err => console.error( err));
    }, []);

    const verDisponibilidad = () => {
        if (!psicologoSeleccionado) return;
        // Navegar a la página de disponibilidad del psicólogo seleccionado
        navigate(`/disponibilidad/${psicologoSeleccionado}`);
    };

    return (
        <div className={styles.CajaPadre}>
            {/* Botón de regresar atrás */ }
        
            <div className={styles.headerSeleccionarPsicologo}>
        
                <button type='button' className={styles.btnAtras} onClick={() => window.history.back()}>
                    <img src={IconoAtras} alt="Atrás" className={styles.iconAtras} />
                    Atrás
                </button>  
            
                {/* Titulo */ }
                <h1>SELECCIONAR PSICÓLOGO</h1>
            </div>
            <hr/>
            <div className={styles.selectorContainer}>
                <div className={styles.selectorWrapper}>
                    <select 
                        className={styles.selector}
                        value={psicologoSeleccionado}
                        onChange={(e) => setPsicologoSeleccionado(e.target.value)}
                    >
                        <option value="">Seleccionar un Psicólogo</option>
                        {psicologos.map(psico => (
                            <option key={psico._id} value={psico._id}>
                                {psico.nombresApellidos} ({psico.corrientePsicologica})
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className={styles.boton}
                    disabled={!psicologoSeleccionado}
                    onClick={verDisponibilidad}
                >
                    Ver disponibilidad
                </button>
            </div>
        </div>

    );
} 
export default SeleccionarPsicologo;