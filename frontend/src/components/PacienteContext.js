import { createContext, useContext, useState, useEffect } from 'react';

const PacienteContext = createContext();

export const PacienteProvider = ({ children }) => {
  const [paciente, setPaciente] = useState(null);

  const actualizarPaciente = (nuevoPaciente) => {
    setPaciente(nuevoPaciente);
    localStorage.setItem('paciente', JSON.stringify(nuevoPaciente));
  };

  useEffect(() => {
    try {
      const pacienteGuardado = localStorage.getItem('paciente');
      if (pacienteGuardado) {
        setPaciente(JSON.parse(pacienteGuardado));
      }
    } catch (error) {
      console.error('Error al analizar JSON en PacienteContext:', error);
    }
  }, []);

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
