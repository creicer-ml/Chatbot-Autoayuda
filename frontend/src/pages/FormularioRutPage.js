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

const FormularioRut = () => {
  const classes = useStyles();
  const [rut, setRut] = useState('');
  const { paciente, actualizarPaciente } = usePaciente();
  const navigate = useNavigate();  // Mueve la declaración de useNavigate aquí

  const handleRutChange = (event) => {
    setRut(event.target.value);
  };

  const buscarPaciente = async () => {
    try {
      const response = await axios.get(`/api/filtrar_paciente/?rut=${rut}`);
      const pacienteEncontrado = response.data[0];

      // Actualizar el contexto con la información del paciente
      actualizarPaciente(pacienteEncontrado);
      console.log('Paciente actualizado:', pacienteEncontrado);
      navigate('/menu');

    } catch (error) {
      console.error('Error al buscar paciente por RUT', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    buscarPaciente();
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.inputField}
              label="Ingrese RUT sin puntos ni guión"
              variant="outlined"
              fullWidth
              value={rut}
              onChange={handleRutChange}
            />
            <Button variant="contained" color="primary" fullWidth type="submit">
              Buscar
            </Button>
          </form>

          {paciente && (
            <div>
              <h3>Datos del Paciente</h3>
              <p>Nombre de usuario: {paciente.username}</p>
              <p>RUT: {paciente.rut}</p>
              {/* Agrega más campos según sea necesario */}
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default FormularioRut;
