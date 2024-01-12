import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';


const TablaReservas = ({ reservas, classes }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, border: '1px solid #ddd', margin: '10px 0' }} size="small" className={classes.table} aria-label="Tabla Reservas">
        <TableHead>
          <TableRow style={{ backgroundColor: '#1b85b8'}}>
            <TableCell>Especialidad</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Profesional</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reservas.map((reserva, index) => (
            <TableRow key={reserva.id_reserva} className={index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd}>
              <TableCell>{reserva?.especialidad}</TableCell>
              <TableCell>{reserva?.fecha_atencion}</TableCell>
              <TableCell>{`${reserva?.profesional_nombre} ${reserva?.profesional_apellido}`}</TableCell>
              <TableCell>
                <IconButton component={Link} to={`/detalle_reserva/${reserva.id_reserva}`}>
                  <VisibilityIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaReservas;
