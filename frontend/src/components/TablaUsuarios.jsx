import { useState } from "react";
import stylesTablaUsuarios from "../styles/TablaUsuarios.module.css";
import BarraMenuAdministrador from "./BarraMenuAdministrador.jsx";
import Header from "./Header.jsx";


function TablaUsuarios() {

  const datos = JSON.parse(localStorage.getItem('usuarios'));

  
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 5; // cambia este número según lo que quieras mostrar

  const indexUltimo = paginaActual * usuariosPorPagina;
  const indexPrimero = indexUltimo - usuariosPorPagina;
  const usuariosPagina = datos.slice(indexPrimero, indexUltimo);

  const totalPaginas = Math.ceil(datos.length / usuariosPorPagina);

  
  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };


  return (
    <div className={stylesTablaUsuarios["contenedor"]}>
      <Header />
      <BarraMenuAdministrador />

      <div className={stylesTablaUsuarios["contenedor-tabla"]}>
        
        <div className={stylesTablaUsuarios["div-atras"]} >
             <img src="Atras.svg" alt="" />
            <a href="/inicio">Atras</a>
            </div>
        
        <h2>EDITAR USUARIOS Y ELIMINAR USUARIOS</h2>
         <hr className={stylesTablaUsuarios.hrPersonalizada} />
        <table className={stylesTablaUsuarios["tabla"]}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Estado</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>TipoUsuario</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Estado}</td>
                <td>{item.Usuario}</td>
                <td>{item.Email}</td>
                <td>{item.TipoUsuario}</td>
                
                <td>
                  <a className={stylesTablaUsuarios["links"]} href={`Editar/${item.id}`}>
                  <img className={stylesTablaUsuarios["IconoEditar"]} src="IconoEditar.png" alt="" />
                  </a>
                </td>

                <td>
                  <a href={`Eliminar/${item.id}`}> <img className={stylesTablaUsuarios["Eliminar"]} src="Eliminar.png" alt="" /></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      
        <div className={stylesTablaUsuarios["paginacion"]}>
          <button onClick={paginaAnterior} disabled={paginaActual === 1}>
            ⬅️ Anterior
          </button>
          <span>
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={siguientePagina}
            disabled={paginaActual === totalPaginas}
          >
            Siguiente ➡️
          </button>
        </div>
      </div>
    </div>
  );
}

export default TablaUsuarios;
