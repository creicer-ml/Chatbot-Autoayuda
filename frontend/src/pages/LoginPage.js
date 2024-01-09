import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
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
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <h3>Iniciar Sesión</h3>
          <form>
            <TextField
              className={classes.inputField}
              label="Usuario"
              variant="outlined"
              fullWidth
            />
            <TextField
              className={classes.inputField}
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
            />
            <Button variant="contained" color="primary" fullWidth>
              Ingresar
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default LoginPage;
