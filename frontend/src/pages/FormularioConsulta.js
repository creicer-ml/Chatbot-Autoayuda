import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Button, MenuItem, Select, TextField } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { usePaciente } from '../components/PacienteContext';
import { makeStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

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
    border: '1px solid #ccc', // Añade un borde al Paper
    borderRadius: '8px', // Agrega esquinas redondeadas
  },
  selectField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  inputField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
}));

const OtrasConsultasForm = () => {
  const [tipoConsulta, setTipoConsulta] = useState('');
  const [descripcionConsulta, setDescripcionConsulta] = useState('');
  const [isEnviando, setIsEnviando] = useState(false); // Nuevo estado
  const navigate = useNavigate();
  const { paciente } = usePaciente();
  const classes = useStyles();

  const handleTipoConsultaChange = (event) => {
    setTipoConsulta(event.target.value);
  };

  const handleDescripcionConsultaChange = (event) => {
    setDescripcionConsulta(event.target.value);
  };

  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();

    if (isEnviando) {
      return;
    }

    setIsEnviando(true);

    try {
      await emailjs.sendForm('service_dyy37mu', 'template_lomvtel', form.current, 'GVJtnvZaQCi4DTgrG');
      console.log("Mensaje enviado exitosamente");

      Swal.fire({
        icon: 'success',
        title: 'Consulta enviada',
        text: 'Tu consulta se ha enviado exitosamente.',
      });

      navigate('/menu');
    } catch (error) {
      console.error("Error al enviar el mensaje");

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al enviar tu consulta. Por favor, inténtalo de nuevo más tarde.',
      });
    } finally {
      setIsEnviando(false);
    }
  };


  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.paper}>
          <h3>Consulta Adicional</h3>
          <form ref={form} onSubmit={sendEmail}>
            <Select
              name="user_consulta"
              id="tipoConsulta"
              className={classes.selectField}
              value={tipoConsulta}
              onChange={handleTipoConsultaChange}
            >
              <MenuItem value="Funcionamiento">Funcionamiento</MenuItem>
              <MenuItem value="Reclamo">Reclamo</MenuItem>
              <MenuItem value="Tecnico">Técnico</MenuItem>
            </Select>
            <TextField
              name="user_mensaje"
              id="descripcionConsulta"
              className={classes.inputField}
              label="Descripción de la consulta"
              variant="outlined"
              multiline
              rows={4}
              value={descripcionConsulta}
              onChange={handleDescripcionConsultaChange}
            />
            <Button
              type="submit" 
              variant="contained"
              color="primary"
              fullWidth
              disabled={isEnviando} 
            >
              {isEnviando ? 'Enviando...' : 'Enviar Consulta'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OtrasConsultasForm;