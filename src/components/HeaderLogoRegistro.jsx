import React from "react";
import styles from "../styles/Registro.module.css";
import Logo from "../includes/LogoSinFondo.svg";

function HeaderLogoRegistro() {
    return (
        <>
            {/* Logo de la aplicación */}
            <div className={styles.logoContainer}>
                <img src={Logo} alt="Logo" className={styles.logo} />
            </div>
        </>
    );
}
export default HeaderLogoRegistro;
