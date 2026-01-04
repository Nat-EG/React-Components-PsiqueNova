import stylesInicioPsicologo from "../styles/InicioPsicologo.module.css";
import LayoutPsicologo from "./Layouts/LayoutPsicologo.jsx";

function InicioPsicologo () {

    return(
      <LayoutPsicologo> 
    <div className={stylesInicioPsicologo['contenedor']}>

    
      <div className={stylesInicioPsicologo['contenedor-imagen']}>

         <img src="ImagenInicioPsicologo.svg" alt="" />
    </div>
    
      </div>
      </LayoutPsicologo>
    ); }


export default InicioPsicologo;