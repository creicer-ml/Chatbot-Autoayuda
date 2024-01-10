import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing(6),
    padding: theme.spacing(4),
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out',
    fontFamily: 'cursive',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
}));

const DetalleReservaPage = () => {
  const { idReserva } = useParams();
  const [reserva, setReserva] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`/api/obtener_detalle_reserva/${idReserva}/`);
        setReserva(response.data);
      } catch (error) {
        console.error('Error al obtener detalle de la reserva:', error);
      }
    };

    fetchReserva();
  }, [idReserva]);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>DETALLES DE LA HORA MÉDICA</h2>
      {reserva ? (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="div">
              Especialidad del Profesional: {reserva?.especialidad}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Nombre profesional: {`${reserva?.profesional_nombre} ${reserva?.profesional_apellido}`}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Fecha de atención: {reserva?.fecha_atencion}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Hora de atención: {reserva?.hora_atencion}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Fecha de solicitud de la hora: {reserva?.fecha_solicitud_hora}
            </Typography>
            <Typography variant="body1" >
              Grabación: {reserva?.grabacion ? 'Sí' : 'No'}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <p>Cargando detalles de la reserva...</p>
      )}
    </div>
  );
};

export default DetalleReservaPage;
