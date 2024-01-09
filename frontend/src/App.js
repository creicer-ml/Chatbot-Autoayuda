import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ConsultaReservasPage from './pages/ConsultaReservasPage';
import DetalleReservaPage from './pages/DetalleReservaPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/lista_reservas" element={<ConsultaReservasPage />} />
          <Route path="detalle_reserva/:id" element={<DetalleReservaPage/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
