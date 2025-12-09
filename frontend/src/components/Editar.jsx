import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editar() {

  const { id } = useParams();
  const [valor, setValor] = useState({});
  const  navigate = new useNavigate();

  /* ---------------------------------------- */

  let personas = JSON.parse(localStorage.getItem("usuarios"));
  const encontrado = Object.values(personas).find((item) => item.id == id);
  const nuevoObjeto = personas.filter(item => item.id != id);

/* --------------------------------------------------- */
  function editando(e) {
    e.preventDefault();

    const { name, value } = e.target;

    setValor({ ...valor, [name]: value });
  }
/* ------------------------------------------------ */
  function actualizado(e) {
    e.preventDefault();
    nuevoObjeto.push(valor)
    localStorage.removeItem('usuarios')
    console.log(nuevoObjeto)
    localStorage.setItem('usuarios', JSON.stringify(nuevoObjeto));
    navigate('/TablaUsuarios');
    
  }
/* -------------------------------------------------------- */
  useEffect(() => {
      setValor(encontrado); 
    
  }, []);
/* --------------------------------------------------------- */
  return (
    <div>
      <h1>Actualiza los datos del usuario seleccionado</h1>
      <form action="">
        <input
          type="text"
          name="Estado"
          value={valor.Estado || ''}
          onChange={editando}
        />
        <input
          type="text"
          name="Usuario"
          value={valor.Usuario || ''}
          onChange={editando}
        />
        <input
          type="text"
          name="Email"
          value={valor.Email || ''}
          onChange={editando}
        />
        <input
          type="text"
          name="TipoUsuario"
          value={valor.TipoUsuario || ''}
          onChange={editando}
        />
        <button onClick={actualizado}>Actualizar</button>
      </form>
    </div>
  );
}

export default Editar;
