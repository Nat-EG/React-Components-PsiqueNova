import stylesBarraMenuPaciente from "../styles/BarraMenuAdministrador.module.css";
import CerrarSesion from "./CerrarSesion";

import IconoInicio from '../includes/IconoInicio.svg';
import IconoCatalogo from '../includes/IconoCatalogo.svg';
import IconoMiLugarSeguro from '../includes/IconoMiLugarSeguro.svg';
import IconoConfig from '../includes/IconoConfig.svg';

function BarraMenuPaciente() {

// Estructura del componente BarraMenuPaciente
  return (
    <div className={stylesBarraMenuPaciente["div-padre-barraMenu"]}>
      <div className={stylesBarraMenuPaciente["div-barra"]}>
        <h1>¡Te damos la bienvenida!</h1>

        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src={IconoInicio} alt="Icono Inicio" /><a href="/inicioPaciente">Inicio</a>
        </div>
        <hr className={stylesBarraMenuPaciente.hrPersonalizada} />

        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src={IconoCatalogo} alt="Icono Catálogo" /> <a href="/catalogo">Catálogo de Servicios</a>
        </div>
        <hr className={stylesBarraMenuPaciente.hrPersonalizada} />

        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src={IconoMiLugarSeguro} alt="" /> <a href="/lugarSeguro">Mi Lugar Seguro</a>
        </div>
        <hr className={stylesBarraMenuPaciente.hrPersonalizada} />
      </div>

      <div className={stylesBarraMenuPaciente["div-barra"]}>
        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src={IconoConfig} alt="" /> <a href="/configuracion">Ajustes</a>
        </div>

        
        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <CerrarSesion />
        </div>
      </div>
        
    </div>
  );
}

export default BarraMenuPaciente;