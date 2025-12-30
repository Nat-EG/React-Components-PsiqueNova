import stylesInicioPsicologo from "../styles/InicioPsicologo.module.css";
import Header from "./Header.jsx";
import BarraMenuPsicologo from "./BarraMenuPsicologo.jsx";

function InicioPsicologo () {

    return(
    <div className={stylesInicioPsicologo['contenedor']}>

    <Header />
    <BarraMenuPsicologo />
      <div className={stylesInicioPsicologo['contenedor-imagen']}>

         <img src="ImagenInicioAdmin.png" alt="" />
    </div>
    
      </div>
    ); }


export default InicioPsicologo;