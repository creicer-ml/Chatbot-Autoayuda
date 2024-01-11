import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { usePaciente } from '../components/PacienteContext';
import Button from '@material-ui/core/Button';
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    maxWidth: 700,
    fontFamily: 'cursive',
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: '#1b85b8',
  },
  button: {
    fontFamily: 'cursive',
    color: 'white'
  },
}));

const Menu = () => {
  const classes = useStyles();
  const { paciente } = usePaciente();
  const navigate = useNavigate();

  const handleProfesionalesFavoritos = () => {
    if (paciente) {
      const url = `/profesionales_favoritos/${paciente.rut}/`;
      navigate(url);
    }
  };

  const handleProfesionalesBloqueados = () => {
    if (paciente) {
      const url = `/profesionales_bloqueados/${paciente.rut}/`;
      navigate(url);
    }
  };

  const handleReservas = () => {
    if (paciente) {
      const url = `/obtener_reservas/${paciente.rut}/`;
      navigate(url);
    }
  };

  const handleCallCenter = () => {
    navigate('/call_center')
  }

  const handleOtrasConsultas = () => {
    navigate('/otras_consultas')
  }

  const handleModificarRut = () => {
    navigate('/modificar_rut')
  }

  const handleBuscarOtroRut = () => {
    navigate('/form_rut')
  }

  const handleActualizarCesfam = () => {
    navigate('/form_cesfam')
  }

  const handleProblemas = () => {
    navigate('/problemas_app')
  }

  const formatearRut = (rut) => {
    if (!/^\d{7,8}[Kk0-9]$/.test(rut)) {
      return rut; 
    }
    
    const rutFormateado = rut.replace(/^(\d{1,2})(\d{3})(\d{3})([0-9Kk])$/, '$1.$2.$3-$4');
    return rutFormateado;
  };



  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={6}>
          {paciente ? (
            <div>
              <p>RUT {formatearRut(paciente.rut)}, {paciente.cesfam}</p>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleCallCenter}> CALL CENTER NO RECONOCE RUT</Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleActualizarCesfam}> ACTUALIZAR CESFAM </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleModificarRut}> INGRESAR RUT DEFINITIVO </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleProfesionalesFavoritos}> GESTIONAR PROFESIONALES FAVORITOS </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleProfesionalesBloqueados}> GESTIONAR PROFESIONALES BLOQUEADOS </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleReservas}> CONSULTAR HORAS RESERVADAS </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button}> SOLICITUD DE GRABACIONES</Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleProblemas} > PROBLEMAS CON APP </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleOtrasConsultas}> OTRAS CONSULTAS </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button} onClick={handleBuscarOtroRut}> BUSCAR OTRO RUT </Button>
              </div>
            </div>
          ) : (
            <p>No se ha seleccionado ningún paciente.</p>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Menu;
