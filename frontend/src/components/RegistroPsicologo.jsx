import React from "react";
import styles from "../styles/LayoutRegistro.module.css";

// Importación de imagenes desde src/includes
import ImagenL from "../includes/ImagenL.png";
import ImagenR from "../includes/ImagenR.png";

//importar componentes
import RegistroForm from "./RegistroForm";
import FranjaInferior from "./FranjaInferiorRegistro";
import HeaderLogoRegistro from "./HeaderLogoRegistro";

const RegistroPsicologo = () => {
    return (
        <div className={styles.mainContainer}>

        <HeaderLogoRegistro />
                
        <div className={styles.container}>
            {/* Imagen decorativa lateral izq */}
            <img src={ImagenL} alt="Imagen decorativa izquierda" className={styles.imagenL} />

            {/* Formulario de registro para psicólogo */}
            <RegistroForm
                endpoint="http://localhost:4000/api/usuarios/registro"
                rol="psicologo"
                mostrarCorrientePsicologica={true}
            />
            {/* Imágenes decorativa lateral der */}
            <img src={ImagenR} alt="Imagen decorativa derecha" className={styles.imagenR} />
        </div>

        <FranjaInferior />

    </div>
   
    );
}
export default RegistroPsicologo;