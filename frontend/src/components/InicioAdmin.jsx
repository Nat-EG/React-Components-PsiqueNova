import stylesInicioPsicologo from "../styles/InicioPsicologo.module.css";
import Header from "./Header.jsx";
import BarraMenuAdmin from "./BarraMenu.jsx";
import LayoutAdmin from "./Layouts/LayoutAdmin.jsx";

function InicioAdmin () {

    return(
      <LayoutAdmin>
    <div className={stylesInicioPsicologo['contenedor']}>

    
      <div className={stylesInicioPsicologo['contenedor-imagen']}>

         <img src="ImagenInicioAdmin.png" alt="" />
    </div>
    
      </div>
      </LayoutAdmin>
    ); 
}


export default InicioAdmin;