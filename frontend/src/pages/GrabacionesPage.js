import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePaciente } from '../components/PacienteContext';
import { makeStyles } from '@material-ui/core/styles';
import TablaGrabaciones from '../components/TablaGrabaciones'; // Importa el nuevo componente

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
    backgroundColor: '#f2f2f2', // or any other color for even rows
  },
  tableRowOdd: {
    backgroundColor: '#ffffff', // or any other color for odd rows
  },
});

const GrabacionesPage = () => {
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

  const reservasConGrabacion = reservas.filter((reserva) => reserva.grabacion);

  return (
    <div>
      <h2>Grabaciones solicitud de hora de {paciente.username}</h2>
      <TablaGrabaciones reservas={reservasConGrabacion} classes={classes} />
    </div>
  );
};

export default GrabacionesPage;
