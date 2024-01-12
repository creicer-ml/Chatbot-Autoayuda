import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  orangeButton: {
    backgroundColor: '#FFAB40', // Color naranja
    '&:hover': {
      backgroundColor: '#FF8F00', // Color naranja más oscuro al pasar el ratón
    },
  },
}));

export default function AppNoFuncionaCard() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/menu');
  };

  const textoPrincipal = 
     `Estimado/a:
       Es posible que su aplicación no esté actualizada ya que le ingresamos mejoras constantemente.
       Le sugerimos actualizar su app, o bien, desinstalarla y volverla a instalar.`

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ maxWidth: 400, width: '90%', position: 'relative', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" align="center" marginBottom={3} fontWeight="bold">
            La APP no funciona o no abre
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line', marginBottom: 2, fontSize: '1.2rem' }}>
            {textoPrincipal}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoBack}
            fullWidth
            sx={{
              backgroundColor: '#FFAB40', // Color naranja
              '&:hover': {
                backgroundColor: '#FF8F00', // Color naranja más oscuro al pasar el ratón
              },
            }}
          >
            Aceptar y Volver al Menú
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}