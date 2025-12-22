import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import stylesReset from "../styles/CambiarContraseña.module.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!token) {
      alert("Token inválido");
      navigate("/login");
    }
  }, [token, navigate]);

  const validatePassword = (pass) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumber = /\d/.test(pass);
    return pass.length >= minLength && hasUpperCase && hasLowerCase && hasNumber;
  };

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Por favor completa todos los campos.");
      return;
    }

    if (!validatePassword(password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.mensaje || "Error al restablecer contraseña");
        return;
      }

      alert("Contraseña restablecida exitosamente.");
      navigate("/login");

    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      alert("Error en el servidor.");
    }
  };

  return (
   <div className={stylesReset.contenedor}>
    
  <div className={stylesReset["div-padre"]}>


    <form className={stylesReset["div-1"]} onSubmit={handleReset}>
                
      <div className={stylesReset["logo-seguramente"]}>
        <img src="LogoLogin.png" alt="Logo" />
      </div>

      <div className={stylesReset["div-titulos"]}>
        <h1>Crea tu nueva contraseña</h1>
        <h3>
          De mínimo 8 caracteres, una mayúscula, una minúscula y un número.
        </h3>
      </div>

      <div className={stylesReset["div-hijo-1"]}>
        
        {/* NUEVA CONTRASEÑA */}
        <label>Nueva contraseña</label>
        <div className={stylesReset["input-container"]}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Escribe tu nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className={stylesReset["eye-icon"]}
            onClick={() => setShowPassword(!showPassword)}
          >
            👁
          </span>
        </div>


        {/* CONFIRMAR CONTRASEÑA */}
        <label>Confirmar contraseña</label>
        <div className={stylesReset["input-container"]}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirma tu nueva contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span
            className={stylesReset["eye-icon"]}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            👁
          </span>
        </div>

      </div>

      <div className={stylesReset["div-hijo-2"]}>
        <button type="submit">Confirmar</button>
      </div>

    </form>


    <div className={stylesReset["div-2"]}>
      <img src="fd.png" alt="Imagen decorativa" />
    </div>
        </div>
      
    </div>
  );
}
 
  
export default ResetPassword; 