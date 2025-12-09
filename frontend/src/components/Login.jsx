import stylesLogin from "../styles/Login.module.css";
import demo from "../includes/demo.png";

function Login() {
  return (
    <div className={stylesLogin["contenedor"]}>
      <div className={stylesLogin["div-padre"]}>
        <form className={stylesLogin["div-1"]}>
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
            <span>Correo Electronico</span>
            <input
              type="text"
              name="nombre_servicio"
              placeholder="Escribe tu correo de registro aqui"
            />

            <span>Contraseña</span>
            <input
              type="password"
              name="precio_servicio"
              placeholder="Escribe tu contraseña aca"
            />
          </div>

          <div className={stylesLogin["div-hijo-2"]}>

            <div className={stylesLogin["div-check"]} >
              <input
                className={stylesLogin["input-recuerdame"]}
                type="checkbox"
              />
              <span>Recuerdame</span>
            </div>

            <div className={stylesLogin["div-enlaces"]}>
            <a href="/¿Aun no estas registrado?">¿Aun no estas registrado?</a>
            <a href="/¿Olvidaste tu contraseña?">¿Olvidaste tu contraseña?</a>
            <button>Iniciar sesion</button>
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
