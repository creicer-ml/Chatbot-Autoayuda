import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ConsultaReservasPage from './pages/ConsultaReservasPage';
import DetalleReservaPage from './pages/DetalleReservaPage';
import LoginPage from './pages/LoginPage';
import FormularioRut from './pages/FormularioRutPage';
import ActualizarCesfamForm from './pages/FormularioActualizarCesfamPage';
import { PacienteProvider } from './components/PacienteContext';
import Menu from './pages/Menu';
import ProfesionalesFavoritosPage from './pages/ProfesionalesFavoritosPage';
import ProfesionalesBloqueadosPage from './pages/ProfesionalesBloqueadosPage';
import ModificarRutPage from './pages/RutDefinitivoPage';
import OtrasConsultasForm from './pages/FormularioConsulta';

function App() {
  return (
    <Router>
      <PacienteProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="" element={<LoginPage />} />
            <Route path="/form_rut" element={<FormularioRut />} />
            <Route path="/modificar_rut" element={<ModificarRutPage />} />
            <Route path="/otras_consultas" element={<OtrasConsultasForm />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/obtener_reservas/:rut" element={<ConsultaReservasPage />} />
            <Route path="/detalle_reserva/:idReserva" element={<DetalleReservaPage />} />
            <Route path="/form_cesfam" element={<ActualizarCesfamForm />} />
            <Route path="/profesionales_favoritos/:rut" element={<ProfesionalesFavoritosPage/>}/>
            <Route path="/profesionales_bloqueados/:rut" element={<ProfesionalesBloqueadosPage/>}/>
          </Routes>
        </div>
      </PacienteProvider>
    </Router>
  );
}

export default App;
