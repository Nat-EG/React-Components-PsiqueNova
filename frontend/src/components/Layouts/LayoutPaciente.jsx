import Header from "../Header.jsx";
import BarraMenuPaciente from "../BarraMenuPaciente.jsx";
import styles from "../../styles/LayoutPrincipal.module.css";

export default function LayoutPaciente({ children }) {
    return (
        <div className={styles.layoutRoot}>
            {/* Header global */ }
            <Header />

            {/* Cuerpo: menu + contenido */}
            <div className={styles.layoutBody}>
                {/* Barra de menú paciente */ }
                <BarraMenuPaciente />

                {/* Contenido específico de la página */ }
                <main className={styles.layoutContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}






