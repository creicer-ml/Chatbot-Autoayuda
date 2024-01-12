import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const TablaGrabaciones = ({ reservas, classes }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, border: '1px solid #ddd', margin: '10px 0' }} size="small" aria-label="Grabaciones Table">
        <TableHead>
          <TableRow style={{ backgroundColor: '#1b85b8' }}>
            <TableCell style={{ fontWeight: 'bold' }}>Especialidad</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Fecha</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Grabación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservas.map((reserva, index) => (
            <TableRow
              key={reserva.id_reserva}
              className={index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd}
            >
              <TableCell>{reserva?.especialidad}</TableCell>
              <TableCell>{reserva?.fecha_atencion}</TableCell>
              <TableCell>
                {reserva.grabacion && (
                  <audio controls>
                    <source src={reserva.archivo_audio} type="audio/mpeg" />
                    Tu navegador no soporta el elemento de audio.
                  </audio>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaGrabaciones;
