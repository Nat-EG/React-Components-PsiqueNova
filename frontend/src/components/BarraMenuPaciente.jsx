import stylesBarraMenuPaciente from "../styles/BarraMenuPaciente.module.css";
import CerrarSesion from "./CerrarSesion";

function BarraMenuPaciente() {

// Estructura del componente BarraMenuPaciente
  return (
    <div className={stylesBarraMenuPaciente["div-padre-barraMenu"]}>
      <div className={stylesBarraMenuPaciente["div-barra"]}>
        <h1>¡Te damos la bienvenidad!</h1>
        <a href="/inicio">Inicio</a>
        <hr className={stylesBarraMenuPaciente.hrPersonalizada} />

        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src="IconoCatalogoServicios.svg" alt="" /> <a href="/catalogo">Catálogo de Servicios</a>
        </div>
        <hr className={stylesBarraMenuPaciente.hrPersonalizada} />

        <div className={stylesBarraMenuPaciente["opcion-menu"]}>
          <img src="IconoMiLugarSeguro.svg" alt="" /> <a href="/mi-lugar-seguro">Mi Lugar Seguro</a>
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