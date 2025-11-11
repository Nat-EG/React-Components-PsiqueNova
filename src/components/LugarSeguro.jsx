import React, { useState} from "react";
import SidebarMenu from "./SidebarMenuLS";
import FondoGallery from "./FondoGalleryLS";
import VideoList from "./VideoListLS";
import styles from "../styles/LugarSeguro.module.css";

import playa from "../assets/images/fondosLugarSeguro/Playa.jpg";

const LugarSeguro = ( {onClose} ) => {
    // Estado para el fondo seleccionado
    const [selectedBackground, setSelectedBackground] = useState(playa);
    // Estado para la sección activa (opción del menú)
    const [activeSection, setActiveSection] = useState(null);
    // Estado del menú lateral (abierto/cerrado)
    const [menuOpen, setMenuOpen] = useState(false);

    // Cerrar sección al cerrar el menú
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        if (menuOpen) setActiveSection(null); 
    };

    const handleMenuSelection = (section) => {
        setActiveSection(section);
        setMenuOpen(true); // Abrir el menú al seleccionar una opción
    };

    return (
        <div  key={selectedBackground} className={styles.overlayContainer} style={{ backgroundImage: `url(${selectedBackground})` }}>

            {/*Boton para cerrar*/}
            <button className={styles.closeButton} onClick={onClose}>✖</button>

            {/* Boton hamburguesa para el menú lateral */}
            <button className={styles.menuButton} onClick={() => {
                setMenuOpen(!menuOpen);
                setActiveSection(null); 
                }}>
                    ☰
            </button>

            {/* Menú lateral */}
            {menuOpen && (
                <SidebarMenu 
                    activeSection={activeSection}
                    onSelect={handleMenuSelection}
                />
            )}

            {/* Contenido principal dinámico */}
            <div className={styles.dynamicContent}>
                {activeSection === "fondos" && (
                    <FondoGallery onSelectBackground={setSelectedBackground} selectedBackground={selectedBackground} />
                )}
                {activeSection === "videos" && <VideoList />}
            </div>
        </div>
    );
};

export default LugarSeguro;
