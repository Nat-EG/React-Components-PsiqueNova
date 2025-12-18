import styles from './Modal.module.css';

const InfoModal = ({ isOpen, message, onClose }) => {
    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    // Renderizar el modal
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p className={styles.text}>{message}</p>

                <div className={styles.actions}>
                    <button className={styles.primary} onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};
export default InfoModal;