import stylesInicioPsicologo from "../styles/InicioPsicologo.module.css";
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