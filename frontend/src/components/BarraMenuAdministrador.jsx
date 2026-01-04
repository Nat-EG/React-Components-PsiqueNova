import { useState } from "react";
import stylesBarraMenuAdministrador from "../styles/BarraMenuAdministrador.module.css";
import CerrarSesion from "./CerrarSesion";
import IconoInicio from '../includes/IconoInicio.svg';

function BarraMenuAdministrador() {
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
    <div className={stylesBarraMenuAdministrador["div-padre-barraMenu"]}>
      <div className={stylesBarraMenuAdministrador["div-barra"]}>
        <h1>¡Te damos la bienvenidad!</h1>
        
        <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
          <img src={IconoInicio} alt="Icono Inicio" /><a href="/InicioAdministrador">Inicio</a>
        </div>
        <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
        <div>
          <button onClick={toggleSubmenuCatalogo} className={stylesBarraMenuAdministrador["submenu-button"]}>
            <img src="IconoCatalogo.svg" alt="" /> Gestionar catálogo de servicios
          </button>
          {submenuCatalogo && (
            <div className={stylesBarraMenuAdministrador["submenu"]}>
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src="IconoRegistrarServicio.svg" alt="" /> <a href="/RegistroServicio">Registrar nuevo servicio</a>
              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src="IconoActualizarCatalogo.svg" alt="" /><a href="/GestionarCatalogo">Actualizar catálogo de servicios</a>
              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src="IconoRegistroVentas.svg" alt="" /><a href="/TablaHistorialVentas">Consultar registro de ventas</a>
              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
            </div>
          )}
        </div>
        <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />

        <div>
          <button onClick={toggleSubmenuUsuarios} className={stylesBarraMenuAdministrador["submenu-button"]}>
            <img src="IconoGestionarUs.svg" alt="" /> Gestionar Usuarios
          </button>
          {submenuUsuarios && (
            <div className={stylesBarraMenuAdministrador["submenu"]}>
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src="IconoRegistrarUsuario.svg" alt="" /> <a href="/RegistroPsicologo">Registrar usuario psicólogo</a>
              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src="IconoActualizarEliminarUsuario.svg" alt="" /><a href="/TablaUsuarios">Editar o eliminar usuarios</a>
              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
            </div>
          )}
        </div>
        <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
      </div>
      

      <div className={stylesBarraMenuAdministrador["div-barra"]}>
        <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
          <img src="IconoConfig.svg" alt="" /> <a href="/configuracion">Ajustes</a>
        </div>
        <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
          <CerrarSesion />
        </div>
      </div>
        
    </div>
  );
}

export default BarraMenuAdministrador;
