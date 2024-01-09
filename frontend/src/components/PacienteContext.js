
// PacienteContext.js
import { createContext, useContext, useState } from 'react';

const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [paciente, setPaciente] = useState(null);

  const actualizarPaciente = (nuevoPaciente) => {
    setPaciente(nuevoPaciente);
  };

  return (
    <PacienteContext.Provider value={{ paciente, actualizarPaciente }}>
      {children}
    </PacienteContext.Provider>
  );
};

export const usePaciente = () => {
  const context = useContext(PacienteContext);
  if (!context) {
    throw new Error('usePaciente debe ser utilizado dentro de un PacienteProvider');
  }
  return context;
};
