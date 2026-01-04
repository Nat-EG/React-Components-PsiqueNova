import { useEffect, useState } from "react";
import stylesInicio from "../styles/InicioPaciente.module.css";
import LayoutPaciente from "./Layouts/LayoutPaciente.jsx";
import ImagenInicioPaci from "../includes/ImagenInicioPaci.png";
import CitaCard from "./CitaCard.jsx";
import InputModal from "./modals/InputModal.jsx";
import { obtenerCitaPaciente, cancelarCita } from "../services/citasService.js";
import { useNavigate } from "react-router-dom";

function InicioPaciente() {
  const [citas, setCitas] = useState([]);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario")); // donde se guarda la info del usuario logueado
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!usuario) return;

    obtenerCitaPaciente(usuario.id, token)
      .then(data => {
        if (Array.isArray(data)) {
          setCitas(data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const confirmarCancelacion = async (motivo) => {
    const citaCancelada = await cancelarCita(citaSeleccionada._id, motivo, token);
    setCitas(prev =>
      prev.map (c=> c._id === citaCancelada._id ? citaCancelada : c));
    setMostrarModal(false);
    setCitaSeleccionada(null);
  };

  const reprogramar = (cita) => {
    navigate(`/disponibilidad/${cita.psicologo._id}?reprogramar=true&citaId=${cita._id}`);
  };

  return (

    <LayoutPaciente>
    
      <div className={stylesInicio.cuerpo}>

      {/* CONTENIDO */}
      <div className={stylesInicio.contenido}>
        {citas.length > 0 && citas.map(cita => (
          <CitaCard
            key={cita._id}
            cita={cita}
            onCancelar={() => {
              setCitaSeleccionada(cita);
              setMostrarModal(true);
            }}
            onReprogramar={() => reprogramar(cita)}
          />
        ))}

        <div className={stylesInicio["contenedor-imagen"]}>
          <img src={ImagenInicioPaci} alt="Inicio paciente" />
        </div>
      </div>
    </div>

    <InputModal
      isOpen={mostrarModal}
      title="Cancelar cita"
      label="Indica el motivo de cancelación"
      onConfirm={confirmarCancelacion}
      onClose={() => setMostrarModal(false)}
    />
    </LayoutPaciente>

);
}

export default InicioPaciente;