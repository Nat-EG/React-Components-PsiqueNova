import { useState } from "react";
import stylesBarraMenuPsicologo from "../styles/BarraMenuPsicologo.module.css";

function BarraMenuPsicologo() {
  /* Estado para controlar la visibilidad del submenú "Gestionar Agenda" */

  const [submenuGestionarAgenda, setSubmenuGestionarAgenda] = useState(false);
  
 /* Función para alternar la visibilidad del submenú */
  const toggleSubmenuGestionarAgenda = () => {
    setSubmenuGestionarAgenda(!submenuGestionarAgenda);
  };

// Estructura del componente BarraMenuPsicologo
  return (
    <div className={stylesBarraMenuPsicologo["div-padre-barraMenu"]}>
      <div className={stylesBarraMenuPsicologo["div-barra"]}>
        <h1>¡Te damos la bienvenidad!</h1>
        <a href="/inicio">Inicio</a>
        <hr className={stylesBarraMenuPsicologo.hrPersonalizada} />

        <div>
          <button onClick={toggleSubmenuGestionarAgenda} className={stylesBarraMenuPsicologo["submenu-button"]}>
            <img src="IconoGestionarAgenda.svg" alt="" /> Gestionar Agenda
          </button>
          {submenuGestionarAgenda && (
            <div className={stylesBarraMenuPsicologo["submenu"]}>
              <img src="IconoGestionarDisponibilidad.svg" alt="" /> <a href="/Gestionar-disponibilidad">Gestionar disponibilidad</a>  
              <hr className={stylesBarraMenuPsicologo.hrPersonalizada} />
              <img src="IconoVerCitas.svg" alt="" /><a href="/Ver-citas-pendientes">Ver citas pendientes</a>
              <hr className={stylesBarraMenuPsicologo.hrPersonalizada} />
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}

export default BarraMenuPsicologo;