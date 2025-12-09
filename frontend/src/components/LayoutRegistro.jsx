import React from "react";
import styles from "../styles/LayoutRegistro.module.css";

// Importación de imagenes desde src/includes
import ImagenL from "../includes/ImagenL.png";
import ImagenR from "../includes/ImagenR.png";
import Registro from "./Registro";
import FranjaInferior from "./FranjaInferiorRegistro";

//importar componente HeaderLogoRegistro
import HeaderLogoRegistro from "./HeaderLogoRegistro";

function LayoutRegistro() {
    return (

    <div className={styles.mainContainer}>
        <HeaderLogoRegistro />
    

                
        <div className={styles.container}>
            {/* Imagen decorativa lateral izq */}
            <img src={ImagenL} alt="Imagen decorativa izquierda" className={styles.imagenL} />
            <Registro />
            {/* Imágenes decorativa lateral der */}
            <img src={ImagenR} alt="Imagen decorativa derecha" className={styles.imagenR} />
        </div>

        <FranjaInferior />

    </div>
   

    );
}
export default LayoutRegistro;