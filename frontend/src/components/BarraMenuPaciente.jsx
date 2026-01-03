import stylesBarraMenuPaciente from "../styles/BarraMenuPaciente.module.css";
import CerrarSesion from "./CerrarSesion";
import iconoInicio from "../includes/IconoInicio.svg";
import iconoCatalogo from "../includes/IconoCatalogo.svg";

function BarraMenuPaciente() {

// Estructura del componente BarraMenuPaciente
  return (
    <div className={stylesBarraMenuPaciente["div-padre-barraMenu"]}>
      <div className={stylesBarraMenuPaciente["div-barra"]}>
        <h1>¡Te damos la bienvenidad!</h1>

        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src={iconoInicio} alt="Icono Inicio" /><a href="/inicioPaciente">Inicio</a>
        </div>
        <hr className={stylesBarraMenuPaciente.hrPersonalizada} />

        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src={iconoCatalogo} alt="Icono Catálogo" /> <a href="/catalogo">Catálogo de Servicios</a>
        </div>
        <hr className={stylesBarraMenuPaciente.hrPersonalizada} />

        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src="IconoMiLugarSeguro.svg" alt="" /> <a href="/lugarSeguro">Mi Lugar Seguro</a>
        </div>
        <hr className={stylesBarraMenuPaciente.hrPersonalizada} />
      </div>

      <div className={stylesBarraMenuPaciente["div-barra"]}>
        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src="IconoConfig.svg" alt="" /> <a href="/configuracion">Ajustes</a>
        </div>

        
        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <CerrarSesion />
        </div>
      </div>
        
    </div>
  );
}

export default BarraMenuPaciente;