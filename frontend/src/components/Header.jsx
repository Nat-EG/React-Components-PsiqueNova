import stylesHeader from "../styles/Header.module.css";
import logo from '../includes/LogoSeguramente.png';
import vector from '../includes/barraImg.png';


function Header() {
  return (
    <div className={stylesHeader['contenedor-barra']}>
      <img src={vector} alt="Barra" className={stylesHeader['barra']} />
      <img src={logo} alt="Logo" className={stylesHeader['logo']} />
    </div>
  );
}

export default Header;
