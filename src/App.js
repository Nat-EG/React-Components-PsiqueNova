import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Registrro from "./components/LayoutRegistro";
import CatalogoServicios from "./components/CatalogoServicios";
import LugarSeguro from "./components/MiLugarSeguro";
import HistorialVentas from "./components/TablaHistorialVentas";




function App() {
  return (
    <BrowserRouter>
      {/* Aqui  van las rutas de la aplicación */}
      <Routes>
        <Route path="/registro" element={<Registrro />} />
        <Route path="/catalogo" element={<CatalogoServicios />} />
        <Route path="/lugarSeguro" element={<LugarSeguro />} />
        <Route path="/historial" element={<HistorialVentas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
