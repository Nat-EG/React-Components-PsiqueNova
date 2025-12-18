import { useState } from 'react';
import styles from './Modal.module.css';

const InputModal = ({ isOpen, title, label, onConfirm, onClose }) => {
    const [value, setValue] = useState('');

    // Si el modal no está abierto, no renderizar nada
    if (!isOpen) return null;

    
    const handleConfirm = () => {
        onConfirm(value);
        setValue('');
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h3 className={styles.dangerTitle}>{title}</h3>
                <p className={styles.text}>{label}</p>

                <textarea
                    className={styles.input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />

                <div className={styles.actions}>
                    <button className={styles.primary} onClick={handleConfirm}>Confirmar</button>
                    <button className={styles.secondary} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};
export default InputModal;

               
