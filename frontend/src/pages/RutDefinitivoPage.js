import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { usePaciente } from '../components/PacienteContext';
import { useNavigate } from 'react-router-dom';

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
  inputField: {
    margin: theme.spacing(2, 0),
  },
  errorText: {
    color: 'red',
    margin: theme.spacing(1, 0),
  },
}));

const ModificarRutPage = () => {
  const classes = useStyles();
  const [nuevoRut, setNuevoRut] = useState('');
  const [errorRut, setErrorRut] = useState('');
  const { paciente, actualizarPaciente } = usePaciente();
  const navigate = useNavigate();

  const handleRutChange = (event) => {
    setNuevoRut(event.target.value);
    setErrorRut('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(`/api/verificar_existencia_rut/${nuevoRut}/`);
      if (response.data.existe) {
        setErrorRut('El RUT ingresado ya existe.');
      } else {
        await axios.put(`/api/modificar_rut/${paciente.rut}/`, { nuevoRut });
        actualizarPaciente({ ...paciente, rut: nuevoRut });
        console.log('RUT modificado exitosamente');
        navigate('/menu');
      }
    } catch (error) {
      console.error('Error al modificar el RUT:', error);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <h3>Ingresar RUT definitivo</h3>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.inputField}
              label="Nuevo RUT sin puntos ni guión"
              variant="outlined"
              fullWidth
              value={nuevoRut}
              onChange={handleRutChange}
              error={Boolean(errorRut)}
            />
            {errorRut && <p className={classes.errorText}>{errorRut}</p>}
            <Button variant="contained" color="primary" fullWidth type="submit">
              Modificar RUT
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default ModificarRutPage;

