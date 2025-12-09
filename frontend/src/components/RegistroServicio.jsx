import stylesRegistroServicio from "../styles/RegistroServicio.module.css";
import { useState } from "react";
import BarraMenu from "./BarraMenu.jsx";
import Header from "./Header.jsx";


function RegistroServicio() {
  const [datos, setDatos] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  }

  function verData() {
    console.log(datos);
  }

  return ( 
     <div className={stylesRegistroServicio['contenedor']}> 
     <Header />
     <BarraMenu />

     <div className={stylesRegistroServicio["contenedor-2"]}>
     
     <div className={stylesRegistroServicio["div-atras"]} >
             <img src="Atras.svg" alt="" />
            <a href="/inicio">Atras</a>
            </div>
     
     <h2>REGISTRAR NUEVO SERVICIO</h2>
     
     <hr className={stylesRegistroServicio.hrPersonalizada} />
    <form className={stylesRegistroServicio["div-padre"]}>
        
      <h1>Añada la nueva informacion del servicio y guarde los cambios</h1>
       

      <div className={stylesRegistroServicio["div-hijo-1"]}>
        <span>Nombre del servicio</span>
        <input
          type="text"
          name="nombre_servicio"
          placeholder="Nombre del servicio"
          onChange={handleChange}
        />

        <span>Precio del servicio</span>
        <input
          type="text"
          name="precio_servicio"
          placeholder="Precio servicio"
          onChange={handleChange}
        />
        <input id={stylesRegistroServicio["input-img"]} type="file" name="añadir_imagen" onChange={handleChange} />
      </div>
      {/* ------------------------------------------------------------------- */}

      <div className={stylesRegistroServicio["div-hijo-2"]}>
        <span>Descripcion del servicio</span>
        <textarea
          type="text"
          name="descripcion_servicio"
          placeholder="..."
          onChange={handleChange}
        />
      </div>

      <div className={stylesRegistroServicio["div-hijo-3"]}>
      <button type="button" onClick={verData}>
        Guardar cambios
      </button>
      <button id={stylesRegistroServicio["boton_2"]}>Cancelar</button>
      </div>
    </form>
    </div>
    </div>
     
  );
}

export default RegistroServicio;
