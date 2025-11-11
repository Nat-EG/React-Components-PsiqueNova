import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Eliminar() {

  const { id } = useParams();
  const [valor, setValor] = useState({});
  const  navigate = new useNavigate();

  /* ---------------------------------------- */

  let personas = JSON.parse(localStorage.getItem("usuarios"));

  const nuevoObjeto = personas.filter(item => item.id != id); 
  
/* -------------------------------------------------------- */
  useEffect(() => {
      setValor(nuevoObjeto); 
       localStorage.removeItem('usuarios')
       localStorage.setItem('usuarios', JSON.stringify(nuevoObjeto));
       navigate('/TablaUsuarios');
      
  }, []);
/* --------------------------------------------------------- */
 
}

export default Eliminar;
