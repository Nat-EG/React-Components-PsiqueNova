import { useState } from "react";
import { useNavigate } from "react-router-dom";
import stylesLogin from "../styles/Login.module.css";

function Login() {
  const navigate = useNavigate();

  // Estados para capturar inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // FUNCION PARA INICIAR SESION
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!email.trim() || !password.trim()) {
      alert("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.mensaje || "Error al iniciar sesión");
        return;
      }

      alert("Inicio de sesión exitoso");

      // Guardar usuario 
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Redirigir al inicio
      navigate("/Inicio");

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error en el servidor.");
    }
  };

  /* ------------------------------------------------------- */

  return (
    <div className={stylesLogin["contenedor"]}>
      <div className={stylesLogin["div-padre"]}>
        <form className={stylesLogin["div-1"]} onSubmit={handleLogin}>
          <div className={stylesLogin["logo-seguramente"]}>
            <img src="LogoLogin.png" alt="" />
          </div>

          <div className={stylesLogin["div-titulos"]}>
            <h1>¡Te damos la bienvenidad!</h1>
            <h3>
              Ingresa tus datos para acceder a{" "}
              <span className={stylesLogin.palabraVerde}>PsiqueNova</span>
            </h3>
          </div>

          <div className={stylesLogin["div-hijo-1"]}>
            <span>Correo Electrónico</span>
            <input
              type="email"
              placeholder="Escribe tu correo de registro aquí"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <span>Contraseña</span>
            <input
              type="password"
              placeholder="Escribe tu contraseña aquí"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={stylesLogin["div-hijo-2"]}>
            <div className={stylesLogin["div-check"]}>
              <input
                className={stylesLogin["input-recuerdame"]}
                type="checkbox"
              />
              <span>Recuérdame</span>
            </div>

            <div className={stylesLogin["div-enlaces"]}>
              <a href="/registro">¿Aún no estás registrado?</a>
              <a href="/recuperar">¿Olvidaste tu contraseña?</a>

              {/* Botón del formulario */}
              <button type="submit">Iniciar sesión</button>
            </div>
          </div>
        </form>

        <div className={stylesLogin["div-2"]}>
          <img src="fd.png" alt="" />
        </div>

        <div className={stylesLogin["div-3"]}></div>
      </div>
    </div>
  );
}

export default Login;
