import { useState } from "react";
import stylesBarraMenuAdministrador from "../styles/BarraMenuAdministrador.module.css";
import CerrarSesion from "./CerrarSesion";


import IconoInicio from '../includes/IconoInicio.svg';
import IconoCatalogo from '../includes/IconoCatalogo.svg';
import IconoRegistrarServicio from '../includes/IconoRegistrarServicio.svg';
import IconoActualizarCatalogo from '../includes/IconoActualizarCatalogo.svg';
import IconoRegistroVentas from '../includes/IconoRegistroVentas.svg';
import IconoGestionarUs from '../includes/IconoGestionarUs.svg';
import IconoRegistrarUsuario from '../includes/IconoRegistrarUsuario.svg';
import IconoActualizarEliminarUsuario from '../includes/IconoActualizarEliminarUsuario.svg';
import IconoConfig from '../includes/IconoConfig.svg';



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
        <h1>¡Te damos la bienvenida!</h1>

        
        <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
          <img src={IconoInicio} alt="Icono Inicio" /><a href="/InicioAdmin">Inicio</a>
        </div>
        <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />



       


        <div>
          <button onClick={toggleSubmenuCatalogo} className={stylesBarraMenuAdministrador["submenu-button"]}>
            <img src={IconoCatalogo} alt="" /> Gestionar catálogo de servicios
          </button>
          {submenuCatalogo && (
            <div className={stylesBarraMenuAdministrador["submenu"]}>
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src={IconoRegistrarServicio} alt="" /> <a href="/RegistroServicio">Registrar nuevo servicio</a>
              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src={IconoActualizarCatalogo} alt="" /><a href="/actualizarCatalogo">Actualizar catálogo de servicios</a>
              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src={IconoRegistroVentas} alt="" /><a href="/historialVentas">Historial de ventas</a>

              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
            </div>
          )}
        </div>
        <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />

        <div>

          <button onClick={toggleSubmenuUsuarios} className={stylesBarraMenuAdministrador["submenu-button"]}>
            <img src={IconoGestionarUs} alt="" /> Gestionar Usuarios
          </button>
          {submenuUsuarios && (
            <div className={stylesBarraMenuAdministrador["submenu"]}>
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src={IconoRegistrarUsuario} alt="" /> <a href="/RegistroPsicologo">Registrar usuario psicólogo</a>
              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
              <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
                <img src={IconoActualizarEliminarUsuario} alt="" /><a href="/TablaUsuarios">Editar o eliminar usuarios</a>

              </div>
              <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
            </div>
          )}
        </div>
        <hr className={stylesBarraMenuAdministrador.hrPersonalizada} />
      </div>
      


      <div className={stylesBarraMenuAdministrador["div-barra"]}>
        <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
          <img src={IconoConfig} alt="" /> <a href="/Ajustes">Ajustes</a>

        </div>
        <div className={stylesBarraMenuAdministrador["opcion-menu"]}>
          <CerrarSesion />
        </div>
      </div>
        
    </div>
  );
}

export default BarraMenuAdministrador;
