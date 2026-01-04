import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import CatalogoServicios from "./components/CatalogoServicios.jsx";
import LugarSeguro from "./components/MiLugarSeguro.jsx";
import HistorialVentas from "./components/TablaHistorialVentas.jsx";
import TablaUsuarios from './components/TablaUsuarios.jsx';
import RegistroServicio from './components/RegistroServicio.jsx';
import InicioPaciente from './components/InicioPaciente.jsx';
import Login from  './components/Login.jsx';
import Editar from './components/Editar.jsx';
import Eliminar from './components/Eliminar.jsx';





function App() {
  return (
    <BrowserRouter>
      {/* Aqui  van las rutas de la aplicación */}
      <Routes>
        <Route path="/catalogo" element={<CatalogoServicios />} />
        <Route path="/lugarSeguro" element={<LugarSeguro />} />
        <Route path="/historial" element={<HistorialVentas />} />
        <Route path='/InicioPaciente' element={<InicioPaciente />} />
        <Route path='/RegistroServicio' element={<RegistroServicio />} />
        <Route path='/TablaUsuarios' element={<TablaUsuarios />} />
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
