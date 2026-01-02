import { useState } from "react";
import stylesBarraMenu from "../styles/BarraMenu.module.css";
import CerrarSesion from "./CerrarSesion";

function BarraMenu() {
  /* Estado para controlar la visibilidad del submenú "Gestionar Catálogo de Servicios" */
  const [submenuCatalogo, setSubmenuCatalogo] = useState(false);
  
  /* Estado para controlar la visibilidad del submenú "Gestionar Usuarios" */
  const [submenuUsuarios, setSubmenuUsuarios] = useState(false);
  
  /* Función para alternar la visibilidad del submenú Catalogo */
  const toggleSubmenuCatalogo = () => {
    setSubmenuCatalogo(!submenuCatalogo);
  };

  /* Función para alternar la visibilidad del submenú Usuarios */
  const toggleSubmenuUsuarios = () => {
    setSubmenuUsuarios(!submenuUsuarios);
  };

  return (
    <div className={stylesBarraMenu["div-padre-barraMenu"]}>
      <div className={stylesBarraMenu["div-barra"]}>
        <h1>¡Te damos la bienvenidad!</h1>
        <a href="/InicioAdministrador">Inicio</a>
        <hr className={stylesBarraMenu.hrPersonalizada} />

        <div>
          <button onClick={toggleSubmenuCatalogo} className={stylesBarraMenu["submenu-button"]}>
            <img src="IconoCatalogo.svg" alt="" /> Gestionar catálogo de servicios
          </button>
          {submenuCatalogo && (
            <div className={stylesBarraMenu["submenu"]}>
              <div className={stylesBarraMenu["opcion-menu"]}>
                <img src="IconoRegistrarServicio.svg" alt="" /> <a href="/RegistroServicio">Registrar nuevo servicio</a>
              </div>
              <hr className={stylesBarraMenu.hrPersonalizada} />
              <div className={stylesBarraMenu["opcion-menu"]}>
                <img src="IconoActualizarCatalogo.svg" alt="" /><a href="/actualizar-catalogo">Actualizar catálogo de servicios</a>
              </div>
              <hr className={stylesBarraMenu.hrPersonalizada} />
              <div className={stylesBarraMenu["opcion-menu"]}>
                <img src="IconoRegistroVentas.svg" alt="" /><a href="/consultar-ventas">Consultar registro de ventas</a>
              </div>
              <hr className={stylesBarraMenu.hrPersonalizada} />
            </div>
          )}
        </div>
        <hr className={stylesBarraMenu.hrPersonalizada} />

        <div>
          <button onClick={toggleSubmenuUsuarios} className={stylesBarraMenu["submenu-button"]}>
            <img src="IconoGestionarUs.svg" alt="" /> Gestionar Usuarios
          </button>
          {submenuUsuarios && (
            <div className={stylesBarraMenu["submenu"]}>
              <div className={stylesBarraMenu["opcion-menu"]}>
                <img src="IconoRegistrarUsuario.svg" alt="" /> <a href="/RegistroPsicologo">Registrar usuario psicólogo</a>
              </div>
              <hr className={stylesBarraMenu.hrPersonalizada} />
              <div className={stylesBarraMenu["opcion-menu"]}>
                <img src="IconoActualizarEliminarUsuario.svg" alt="" /><a href="/TablaUsuarios">Editar o eliminar usuarios</a>
              </div>
              <hr className={stylesBarraMenu.hrPersonalizada} />
            </div>
          )}
        </div>
        <hr className={stylesBarraMenu.hrPersonalizada} />
      </div>
      

      <div className={stylesBarraMenu["div-barra"]}>
        <div className={stylesBarraMenu["opcion-menu"]}>
          <img src="IconoConfig.svg" alt="" /> <a href="/configuracion">Ajustes</a>
        </div>
        <div className={stylesBarraMenu["opcion-menu"]}>
          <CerrarSesion />
        </div>
      </div>
        
    </div>
  );
}

export default BarraMenu;
