import Header from "../Header.jsx";
import BarraMenuPsicologo from "../BarraMenuPsicologo.jsx";
import styles from "../../styles/LayoutPrincipal.module.css";

export default function LayoutPsicologo({ children }) {
    return (
        <div className={styles.layoutRoot}>
            {/* Header global */ }
            <Header />

            {/* Cuerpo: menu + contenido */}
            <div className={styles.layoutBody}>
                {/* Barra de menú psicologo */ }
                <BarraMenuPsicologo />

                {/* Contenido específico de la página */ }
                <main className={styles.layoutContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}
