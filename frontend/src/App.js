import React from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

import Login from  './components/Login.jsx';
import RecuperarContraseña from './components/RecuperarContraseña.jsx';
import CambiarContraseña from './components/CambiarContraseña.jsx';
import RegistroPaciente from './components/RegistroPaciente.jsx';
import RegistroPsicologo from './components/RegistroPsicologo.jsx';
import InicioPaciente from './components/InicioPaciente.jsx';
import InicioPsicologo from './components/InicioPsicologo.jsx';
import InicioAdmin from './components/InicioAdmin.jsx';
import RegistroServicio from './components/RegistroServicio.jsx';
import ActualizarCatalogo from './components/GestionarCatalogo.jsx';
import HistorialVentas from './components/TablaHistorialVentas.jsx';
import TablaUsuarios from './components/TablaUsuarios.jsx';
import Ajustes from './components/EliminarCuenta.jsx';
import GestionarDisponibilidadPsicologo from './components/GestionarDisponibilidadPsicologo.jsx';
import CitasPendientesPsicologo from './components/VerCitasPendientesPsicologo.jsx';
import CatalogoServicios from './components/CatalogoServicios.jsx';
import DetallesServicio from './components/DetallesServicio.jsx';
import SeleccionarPsicologo from './components/SeleccionarPsicologo.jsx';
import DisponibilidadPsicologo from './components/DisponibilidadPsicologo.jsx';
import ResumenCita from './components/ResumenCita.jsx';
import Pago from './components/Pago.jsx';
import LugarSeguro from './components/MiLugarSeguro.jsx';










function App() {
  return (
    <BrowserRouter>
      {/* Aqui  van las rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/RecuperarContraseña" element={<RecuperarContraseña />} />
        <Route path="/CambiarContraseña" element={<CambiarContraseña />} />
        <Route path="/registroPaciente" element={<RegistroPaciente />} />

        <Route path="/InicioAdmin" element={<InicioAdmin />} />
        {/* Acciones del admin */}
        <Route path="/RegistroServicio" element={<RegistroServicio />} />
        <Route path="/actualizarCatalogo" element={<ActualizarCatalogo />} />
        <Route path="/historialVentas" element={<HistorialVentas />} />
        <Route path="/RegistroPsicologo" element={<RegistroPsicologo />} />
        <Route path="/TablaUsuarios" element={<TablaUsuarios />} />
        <Route path="/Ajustes" element={<Ajustes />} />

        <Route path="/InicioPsicologo" element={<InicioPsicologo />} />
        {/* Acciones del psicologo */}
        <Route path="/GestionarDisponibilidadPsicologo" element={<GestionarDisponibilidadPsicologo />} />
        <Route path="/CitasPendientesPsicologo" element={<CitasPendientesPsicologo />} />

        
        <Route path="/InicioPaciente" element={<InicioPaciente />} />
        {/* Acciones del psicologo */}
        <Route path="/catalogo" element={<CatalogoServicios />} />
        <Route path="/servicios/:id" element={<DetallesServicio />} />
        <Route path="/seleccionar-psicologo/:servicioId" element={<SeleccionarPsicologo />} />
        <Route path="/disponibilidad/:psicologoId" element={<DisponibilidadPsicologo />} />
        <Route path="/resumenCita" element={<ResumenCita />} />
        <Route path="/realizarPago" element={<Pago />} />

        <Route path="/lugarSeguro" element={<LugarSeguro />} />


        
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
