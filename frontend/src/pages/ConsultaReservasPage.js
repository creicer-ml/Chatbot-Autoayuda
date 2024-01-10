import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePaciente } from '../components/PacienteContext';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f5f5f5', // Cambia el color de fondo al pasar el ratón por encima
    },
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
      <TableContainer>
        <Table className={classes.table} aria-label="Reservas Table">
          <TableHead>
            <TableRow>
              <TableCell>Especialidad</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Profesional</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservas.map((reserva) => (
              <TableRow key={reserva.id_reserva} className={classes.tableRow}>
                <TableCell>{reserva?.especialidad}</TableCell>
                <TableCell>{reserva?.fecha_atencion}</TableCell>
                <TableCell>{`${reserva?.profesional_nombre} ${reserva?.profesional_apellido}`}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/detalle_reserva/${reserva.id_reserva}`}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ConsultaReservasPage;
