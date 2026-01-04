import stylesRegistroServicio from "../styles/RegistroServicio.module.css";
import { useState } from "react";
import LayoutAdmin from "./Layouts/LayoutAdmin.jsx";


function RegistroServicio() {
  const [datos, setDatos] = useState({
    nombreServicio: "",
    descripcionServicio: "",
    precioServicio: "",
    imagenServicio: null
  });

  function handleChange(e) {
    const { name, value, files, type } = e.target;
    setDatos({ ...datos, 
      [name]: type === "file" ? files[0] : value
    });
  }

  async function guardarServicio() {
    try {
      const formData = new FormData();

      formData.append("nombreServicio", datos.nombreServicio);
      formData.append("descripcionServicio", datos.descripcionServicio);
      formData.append("precioServicio", datos.precioServicio);

      if (datos.imagenServicio) {
        formData.append("imagenServicio", datos.imagenServicio);
      }
      const response = await fetch("http://localhost:4000/api/servicios", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Error al guardar el servicio");
      }
      const data = await response.json();
      console.log("Servicio creado:", data);
      alert("Servicio creado exitosamente");
    } catch (error) {
      console.error(error);
      alert("Error al crear el servicio");
    }
  }
  return ( 
      <LayoutAdmin>
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
          name="nombreServicio"
          placeholder="Nombre del servicio"
          onChange={handleChange}
        />

        <span>Precio del servicio</span>
        <input
          type="number"
          name="precioServicio"
          placeholder="Precio servicio"
          onChange={handleChange}
        />

        <input 
        id={stylesRegistroServicio["input-img"]}
        type="file" 
        name="imagenServicio"
        accept="image/*"
        onChange={handleChange} />
      </div>
      {/* ------------------------------------------------------------------- */}

      <div className={stylesRegistroServicio["div-hijo-2"]}>
        <span>Descripcion del servicio</span>
        <textarea
          name="descripcionServicio"
          placeholder="..."
          onChange={handleChange}
        />
      </div>

      <div className={stylesRegistroServicio["div-hijo-3"]}>
      <button type="button" onClick={guardarServicio}>
        Guardar cambios
      </button>
      <button id={stylesRegistroServicio["boton_2"]}>Cancelar</button>
      </div>
    </form>
    </div>
    </LayoutAdmin>
  
     
  );
}


export default RegistroServicio;
