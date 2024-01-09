// App.js
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

function App() {
  return (
    <Router>
      <PacienteProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="" element={<LoginPage />} />
            <Route path="/form_rut" element={<FormularioRut />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/lista_reservas" element={<ConsultaReservasPage />} />
            <Route path="/lista_reservas/:id" element={<DetalleReservaPage />} />
            <Route path="/form_cesfam" element={<ActualizarCesfamForm />} />
          </Routes>
        </div>
      </PacienteProvider>
    </Router>
  );
}

export default App;
