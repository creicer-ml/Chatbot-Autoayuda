import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'left', // Alineado a la izquierda
    maxWidth: 300,
  },
}));

const DetalleReservaPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  let [reserva, setReserva] = useState(null);

  useEffect(() => {
    obtenerReserva();
  }, [id]);

  let obtenerReserva = async () => {
    let response = await fetch(`/api/listar_reservas/${id}/`);
    let data = await response.json();
    setReserva(data);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <h3>Detalle de la hora médica</h3>
          <p>Nombre Profesional: {reserva?.profesional_nombre} {reserva?.profesional_apellido} </p>
          <p>Especialidad Profesional: {reserva?.especialidad}</p>
          <p>Fecha de atención: {reserva?.fecha_solicitud_hora}</p>
          <p>Hora de atención: {reserva?.hora_atencion} hrs</p>
          <p>Fecha de solicitud de la hora: {reserva?.fecha_solicitud_hora} </p>
          <p>Grabación: {reserva?.grabacion ? 'Disponible' : 'No Disponible'}</p>
        </Paper>
      </div>
    </div>
  );
};

export default DetalleReservaPage;
