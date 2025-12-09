import stylesBarraMenu from "../styles/BarraMenu.module.css";

function BarraMenu() {
  
  return (
    <div className={stylesBarraMenu["div-padre-barraMenu"]}>
      <div className={stylesBarraMenu["div-barra"]}>
        <h1>¡Te damos la bienvenidad!</h1>
        <a  href="/inicio">Inicio</a>
       <hr className={stylesBarraMenu.hrPersonalizada} />
        <a href="/RegistroServicio"> <img src="IconoCatalogo.svg" alt="" /> Gestionar catalogo de servicios</a>
        <hr className={stylesBarraMenu.hrPersonalizada} />
        <a href="/TablaUsuarios"> <img src="IconoGestionarUs.svg" alt="" /> Gestionar Usuarios</a>
        <hr className={stylesBarraMenu.hrPersonalizada} />

      </div>
    </div>
  );
}

export default BarraMenu;
