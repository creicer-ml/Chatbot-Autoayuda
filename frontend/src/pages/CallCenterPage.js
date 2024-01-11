import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { usePaciente } from '../components/PacienteContext';

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
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Card sx={{ maxWidth: 345, position: 'relative' }}>
        <CardContent>
          <Typography variant="h6" color="text.primary" align="center" marginBottom={3}>
            Call Center no reconoce RUT
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: 'pre-line'}}>
            {textoPrincipal}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
