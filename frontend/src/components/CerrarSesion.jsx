import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './modals/ConfirmModal';

const CerrarSesion = () => {
    // Estado para controlar la visibilidad del modal de confirmación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

// Funciones para manejar la apertura y cierre del modal, así como la confirmación de cierre de sesión
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
// Cerrar el modal sin cerrar sesión
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

// Confirmar el cierre de sesión
  const handleConfirmLogout = () => {
    

    // Redirigir al login
    navigate('/login');
  };

  // Renderizar el botón de cerrar sesión y el modal de confirmación
  return (
    <>
      <button onClick={handleOpenModal} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: '#5E5951', padding: '2%', fontFamily: 'Open Sans', display: 'flex', alignItems: 'center' }}>
        <img src="IconoCerrarSesion.svg" alt="" style={{width: '8%', marginRight: '5px'}} /> Cerrar Sesión
      </button>

/* Modal de confirmación para el cierre de sesión */

      <ConfirmModal
        isOpen={isModalOpen}
        title="Confirmar Cierre de Sesión"
        message="¿Estás seguro de que quieres cerrar sesión?"
        confirmText="Cerrar Sesión"
        cancelText="Cancelar"
        onConfirm={handleConfirmLogout}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default CerrarSesion;