import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { usePaciente } from '../components/PacienteContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  orangeButton: {
    backgroundColor: '#FFAB40', // Color naranja
    '&:hover': {
      backgroundColor: '#FF8F00', // Color naranja más oscuro al pasar el ratón
    },
  },
}));

export default function EstadoInscripcionCard() {
  const { paciente } = usePaciente();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/menu');
  };

  const textoPrincipal = paciente && paciente.inscrito_hs
    ? `Estimado/a:
       De acuerdo a nuestros datos, usted no está registrado como paciente en HoraSalud.
       Puede firmar el consentimiento para inscribirse, o bien, puede hacerlo después por Call Center, App o Portal Web.
       Siga las instrucciones hasta el final, así quedará inscrito y podrá usar el servicio`
    : `Estimado/a:
       De acuerdo a nuestros datos, su rut es válido y se encuentra incorporado en HoraSalud.
       Le recordamos que debe terminar de escuchar todas las instrucciones de la operadora antes de ingresar su rut completo.`;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ maxWidth: 400, width: '90%', position: 'relative', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <CardContent>
          <Typography variant="h5" align="center" marginBottom={3} fontWeight="bold">
            Call Center no reconoce RUT
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