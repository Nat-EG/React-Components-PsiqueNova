import React, { useState } from "react";
import Header from "./Header";
import BarraMenuPaciente from "./BarraMenuPaciente";
import LugarSeguro from "./LugarSeguro";
import styles from "../styles/LugarSeguro.module.css";


export default function MiLugarSeguro() {
    const [showLugarSeguro, setShowLugarSeguro] = useState(false);

    return (
        <div className={styles.layout}>
            {/* Header */}
            <Header />

            <div className={styles.mainArea}>
            {/* Barra de menú paciente */}
            <BarraMenuPaciente />
            
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
                
            </div>
            
        </div>
    );
}