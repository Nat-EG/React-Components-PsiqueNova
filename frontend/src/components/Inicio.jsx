import stylesInicio from "../styles/Inicio.module.css";
import BarraMenu from "./BarraMenu.jsx";
import Header from "./Header.jsx";


function Inicio () {
  let datosUsuarios = [
    { id: 1, Estado: "Activo", Usuario: "pgomez", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 2, Estado: "inactivo", Usuario: "agomez", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 3, Estado: "Activo", Usuario: "earias", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 4, Estado: "Activo", Usuario: "nechavarria", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 5, Estado: "inactivo", Usuario: "pgomez", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 6, Estado: "inactivo", Usuario: "rgomez", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 7, Estado: "Activo", Usuario: "Asaldarriags", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 8, Estado: "Activo", Usuario: "gomez", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 9, Estado: "inactivo", Usuario: "Jhon", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    { id: 10, Estado: "Activo", Usuario: "Anyi", Email: "paola@gmail.com", TipoUsuario:"Administrador" },
    
    

  ];
  
  const localS = JSON.stringify(datosUsuarios)
  localStorage.setItem('usuarios', localS);
  const datos = JSON.parse( localStorage.getItem('usuarios'));

  console.log(datos);

  
    return(
    <div className={stylesInicio['contenedor']}>
      <Header />
      <BarraMenu />


      <div className={stylesInicio['contenedor-imagen']}>

         <img src="ImagenInicioAdmin.png" alt="" />
    </div>
    
      </div>
    );
}

export default Inicio;