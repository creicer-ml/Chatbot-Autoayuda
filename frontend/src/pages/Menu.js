import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { usePaciente } from '../components/PacienteContext';
import Button from '@material-ui/core/Button';

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
    backgroundColor: '#616F71',
  },
  button: {
    fontFamily: 'cursive',
    color: 'white'
  },
}));

const Menu = () => {
  const classes = useStyles();
  const { paciente } = usePaciente();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={6}>
          {paciente ? (
            <div>
              <p>RUT: {paciente.rut}</p>
              <div className={classes.menuItem}>
                <Button className={classes.button}> Call CENTER NO RECONOCE RUT</Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button}> ACTUALIZAR CESFAM </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button}> GESTIONAR PROFESIONALES FAVORITOS </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button}> GESTIONAR PROFESIONALES BLOQUEADOS </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button}> CONSULTAR HORAS RESERVADAS </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button}> SOLICITUD DE GRABACIONES</Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button}> PROBLEMAS CON APP </Button>
              </div>
              <div className={classes.menuItem}>
                <Button className={classes.button}> OTRAS CONSULTAS </Button>
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
