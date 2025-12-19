import styles from './Modal.module.css';



// Componente de modal de confirmación
const ConfirmModal = ({ 
    isOpen, 
    title, 
    message,
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    onConfirm, 
    onClose,
 }) => {
    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    // Renderizar el modal
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                {title && <h3 className={styles.dangerTitle}>{title}</h3>}

                <p className={styles.text}>{message}</p>

                <div className={styles.actions}>
                    <button className={`${styles.primary} ${styles.danger}`} onClick={onConfirm}>{confirmText}</button>
                    <button className={styles.secondary} onClick={onClose}>{cancelText}</button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmModal;
