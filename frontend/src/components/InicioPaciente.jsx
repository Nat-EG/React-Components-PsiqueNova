import { useEffect, useState } from "react";
import stylesInicio from "../styles/Inicio.module.css";
import Header from "./Header.jsx";
import BarraMenuPaciente from "./BarraMenuPaciente.jsx";
import ImagenInicioPaci from "../includes/ImagenInicioPaci.png";
import CitaCard from "./CitaCard.jsx";
import InputModal from "./modals/InputModal.jsx";
import { obtenerCitaPaciente, cancelarCita } from "../services/citasService.js";
import { useNavigate } from "react-router-dom";

function InicioPaciente() {
  const [cita, setCita] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario")); // donde guardas el login
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!usuario) return;

    obtenerCitaPaciente(usuario.id, token)
      .then(data => {
        if (data) setCita(data);
      })
      .catch(err => console.error(err));
  }, []);

  const confirmarCancelacion = async (motivo) => {
    const citaCancelada = await cancelarCita(cita._id, motivo, token);
    setCita(citaCancelada);
    setMostrarModal(false);
  };

  const reprogramar = () => {
    navigate(`/disponibilidad/${cita.psicologo._id}?reprogramar=true&citaId=${cita._id}`);
  };

  return (
    <div className={stylesInicio.contenedor}>
      <Header />
      <BarraMenuPaciente />

      {cita && (
        <CitaCard
          cita={cita}
          onCancelar={() => setMostrarModal(true)}
          onReprogramar={reprogramar}
        />
      )}

      <div className={stylesInicio["contenedor-imagen"]}>
        <img src={ImagenInicioPaci} alt="Inicio paciente" />
      </div>

      <InputModal
        isOpen={mostrarModal}
        title="Cancelar cita"
        label="Indica el motivo de cancelación"
        onConfirm={confirmarCancelacion}
        onClose={() => setMostrarModal(false)}
      />
    </div>
  );
}

export default InicioPaciente;