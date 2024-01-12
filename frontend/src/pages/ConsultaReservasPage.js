import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePaciente } from '../components/PacienteContext';
import { makeStyles } from '@material-ui/core/styles';
import TablaReservas from '../components/TablaReservas';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  select: {
    marginRight: 8,
    minWidth: 200,
  },
  addButton: {
    marginLeft: 8,
  },
  searchField: {
    marginLeft: 'auto',
  },
  tableRowEven: {
    backgroundColor: '#f2f2f2', 
  },
  tableRowOdd: {
    backgroundColor: '#ffffff', 
  },
});

const ConsultaReservasPage = () => {
  const { paciente } = usePaciente();
  const [reservas, setReservas] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`/api/obtener_reservas/?rut=${paciente.rut}`);
        setReservas(response.data);
      } catch (error) {
        console.error('Error al obtener reservas:', error);
      }
    };

    if (paciente && paciente.rut) {
      fetchReservas();
    }
  }, [paciente]);

  return (
    <div>
      <h2>Consultar horas reservadas de {paciente.username}</h2>
      <TablaReservas reservas={reservas} classes={classes} />
    </div>
  );
};

export default ConsultaReservasPage;
