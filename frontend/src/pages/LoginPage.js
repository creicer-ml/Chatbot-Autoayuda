import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
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
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        const response = await axios.get('api/get-csrf-token/');
        setCsrfToken(response.data.csrf_token);
      } catch (error) {
        console.error('Error al obtener el token CSRF:', error);
      }
    };

    getCsrfToken();
  }, []); 

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        '/api/login/',
        { username, password },
        { headers: { 'X-CSRFToken': csrfToken } }
      );

      console.log(response.data.message);
      navigate('/form_rut')
    } catch (error) {
      setError('Credenciales incorrectas');
    }
  };

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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              className={classes.inputField}
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
              Ingresar
            </Button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </Paper>
      </div>
    </div>
  );
};

export default LoginPage;
