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
}));

const ModificarRutPage = () => {
  const classes = useStyles();
  const [nuevoRut, setNuevoRut] = useState('');
  const { paciente, actualizarPaciente } = usePaciente();
  const navigate = useNavigate();

  const handleRutChange = (event) => {
    setNuevoRut(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.put(`/api/modificar_rut/${paciente.rut}/`, { nuevoRut });
      actualizarPaciente({ ...paciente, rut: nuevoRut });
      console.log('RUT modificado exitosamente');
      navigate('/menu');
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
            />
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
