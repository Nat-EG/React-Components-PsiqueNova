import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registro from "./components/LayoutRegistro.jsx";
import CatalogoServicios from "./components/CatalogoServicios.jsx";
import LugarSeguro from "./components/MiLugarSeguro.jsx";
import HistorialVentas from "./components/TablaHistorialVentas.jsx";
import BarraMenu from './components/BarraMenu.jsx';
import Header from './components/Header.jsx';
import TablaUsuarios from './components/TablaUsuarios.jsx';
import RegistroServicio from './components/RegistroServicio.jsx';
import Inicio from './components/Inicio.jsx';
import Login from  './components/Login.jsx';
import Editar from './components/Editar.jsx';
import Eliminar from './components/Eliminar.jsx';





function App() {
  return (
    <BrowserRouter>
      {/* Aqui  van las rutas de la aplicación */}
      <Routes>
        <Route path="/registro" element={<Registro />} />
        <Route path="/catalogo" element={<CatalogoServicios />} />
        <Route path="/lugarSeguro" element={<LugarSeguro />} />
        <Route path="/historial" element={<HistorialVentas />} />
        <Route path='/inicio' Component={Inicio} />
        <Route path='/RegistroServicio' Component={RegistroServicio} />
        <Route path='/TablaUsuarios' Component={TablaUsuarios} />
        <Route path='/Login' Component={Login} />
        <Route path='/Editar/:id' Component={Editar} />
         <Route path='/Eliminar/:id' Component={Eliminar} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
