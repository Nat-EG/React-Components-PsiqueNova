import React, { useState } from "react";
import LugarSeguro from "./LugarSeguro";
import styles from "../styles/LugarSeguro.module.css";

export default function MiLugarSeguro() {
    const [showLugarSeguro, setShowLugarSeguro] = useState(false);

    return (
        <div> 
            <button className={styles.btnLugarSeguro} onClick={() => setShowLugarSeguro(true)}>
                Mi Lugar Seguro
            </button>

            {showLugarSeguro && (
                <LugarSeguro onClose={() => setShowLugarSeguro(false)} />
            )}
        </div>
    );
}