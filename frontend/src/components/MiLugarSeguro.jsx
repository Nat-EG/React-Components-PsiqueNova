import React, { useState } from "react";
import LugarSeguro from "./LugarSeguro";
import styles from "../styles/LugarSeguro.module.css";
import LayoutPaciente from "./Layouts/LayoutPaciente";


export default function MiLugarSeguro() {
    const [showLugarSeguro, setShowLugarSeguro] = useState(false);

    return (
        <LayoutPaciente>
            {/* Botón para abrir Mi Lugar Seguro */}
            <div className={styles.contentArea}>  
                <button className={styles.btnLugarSeguro} 
                onClick={() => setShowLugarSeguro(true)}>
                    <span className={styles.btnText}>Mi Lugar Seguro</span>
                    <span className={styles.btnIcon}> <img src="IconoMiLugarSeguro.svg" alt="Icono Mi Lugar Seguro" /></span>
                </button>
            
                {showLugarSeguro && (
                    <LugarSeguro onClose={() => setShowLugarSeguro(false)} />
                )}
            </div>
        </LayoutPaciente>
    );  
}