import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const TablaProfesionales = ({ profesionales, handleEliminarProfesional, classes }) => {
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650, border: '1px solid #ddd', margin: '10px 0' }} size="small" className={classes.table} aria-label="Profesionales Table">
        <TableHead>
          <TableRow style={{ backgroundColor: '#1b85b8', color: 'white' }}>
            <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>ESPECIALIDAD</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {profesionales.map((profesional, index) => (
            <TableRow
              key={profesional.id_profesional}
              className={index % 2 === 0 ? classes.tableRowEven : classes.tableRowOdd}
            >
              <TableCell>{`${profesional.nombre} ${profesional.apellido}`}</TableCell>
              <TableCell>{profesional.especialidad_nombre}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEliminarProfesional(profesional.id_profesional)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaProfesionales;
