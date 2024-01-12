import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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

}));

const ProblemasAppPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate('/call_center');
  };

  const handleAppNoFunciona = () => {
    navigate('/app_no_funciona');
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={6}>
          <div>
            <div className={classes.menuItem}>
              <Button className={classes.button} onClick={handleForgotPassword}>
                NO RECUERDA SU CONTRASEÑA
              </Button>
            </div>
            <div className={classes.menuItem}>
              <Button className={classes.button} onClick={handleAppNoFunciona}>
                LA APP NO FUNCIONA O NO ABRE
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default ProblemasAppPage;
