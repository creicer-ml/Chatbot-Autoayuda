import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

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
    textAlign: 'center',
    maxWidth: 300,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputField: {
    margin: theme.spacing(2, 0),
  },
  button: {
    margin: theme.spacing(2, 0),
  },
}));

const ActualizarCesfamForm = () => {
  const classes = useStyles();
  const [cesfams, setCesfams] = useState([]);
  const [selectedCesfam, setSelectedCesfam] = useState('');

  useEffect(() => {
    obtenerCesfams();
  }, []);

  const obtenerCesfams = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/obtener_cesfams/');
      setCesfams(response.data);
    } catch (error) {
      console.error('Error al obtener los CESFAMs', error);
    }
  };

  const handleCesfamChange = (event) => {
    setSelectedCesfam(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementa la lógica para enviar la actualización al servidor
    console.log('Cesfam seleccionado:', selectedCesfam);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <h3>Actualizar CESFAM del paciente</h3>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              select
              label="Seleccionar CESFAM"
              value={selectedCesfam}
              onChange={handleCesfamChange}
              variant="outlined"
              fullWidth
              className={classes.inputField}
            >
              {cesfams.map((cesfam) => (
                <MenuItem key={cesfam.id} value={cesfam.id}>
                  {cesfam.nombre}
                </MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.button}
            >
              Actualizar
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default ActualizarCesfamForm;
