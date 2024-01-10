import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePaciente } from '../components/PacienteContext';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableRow: {
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  select: {
    marginRight: 8,
    minWidth: 200,
  },
  addButton: {
    marginLeft: 8,
  },
  searchField: {
    marginLeft: 'auto',
  },
});

const ProfesionalesBloqueadosPage = () => {
  const { paciente } = usePaciente();
  const [profesionalesBloqueados, setProfesionalesBloqueados] = useState([]);
  const [profesionalesDisponibles, setProfesionalesDisponibles] = useState([]);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorAgregar, setErrorAgregar] = useState('');
  const classes = useStyles();

  const fetchProfesionalesBloqueados = async () => {
    try {
      if (!paciente || !paciente.rut) {
        return;
      }

      const response = await axios.get(`/api/mostrar_profesionales_bloqueados/${paciente.rut}/`);
      setProfesionalesBloqueados(response.data);
    } catch (error) {
      console.error('Error al obtener profesionales bloqueados:', error);
    }
  };

  useEffect(() => {
    const fetchProfesionalesDisponibles = async () => {
      try {
        const response = await axios.get('/api/obtener_profesionales/');
        setProfesionalesDisponibles(response.data);
      } catch (error) {
        console.error('Error al obtener profesionales disponibles:', error);
      }
    };

    if (paciente && paciente.rut) {
      fetchProfesionalesBloqueados();
      fetchProfesionalesDisponibles();
    }
  }, [paciente]);

  const handleProfesionalSeleccionadoChange = (event) => {
    setProfesionalSeleccionado(event.target.value);
  };

  const handleAgregarProfesional = async () => {
    try {
      if (!paciente || !paciente.rut || !profesionalSeleccionado) {
        throw new Error('Selecciona un paciente y un profesional antes de agregar.');
      }

      await axios.post(`/api/bloquear_profesional/${paciente.rut}/${profesionalSeleccionado}/`);
      setProfesionalSeleccionado(''); 
      setErrorAgregar(''); 
      fetchProfesionalesBloqueados();
    } catch (error) {
      console.error('Error al agregar profesional bloqueado:', error);
      setErrorAgregar(error.message || 'Error al agregar profesional bloqueado.');
    }
  };

  const handleEliminarProfesional = async (idProfesional) => {
    try {
      await axios.delete(`/api/eliminar_profesional_bloqueado/${paciente.rut}/${idProfesional}/`);
      fetchProfesionalesBloqueados();
    } catch (error) {
      console.error('Error al eliminar profesional bloqueado:', error);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProfesionales = profesionalesBloqueados
    .filter((profesional) =>
      `${profesional.nombre} ${profesional.apellido}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div>
      <div className={classes.formContainer}>
        <Select
          className={classes.select}
          value={profesionalSeleccionado}
          onChange={handleProfesionalSeleccionadoChange}
        >
          <MenuItem value="" disabled>
            Seleccione un profesional
          </MenuItem>
          {profesionalesDisponibles.map((profesional) => (
            <MenuItem key={profesional.id_profesional} value={profesional.id_profesional}>
              {`${profesional.nombre} ${profesional.apellido}`}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAgregarProfesional}
          className={classes.addButton}
        >
          Agregar
        </Button>
        <TextField
          className={classes.searchField}
          label="Buscar por nombre"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </div>
      {errorAgregar && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorAgregar}
        </div>
      )}
      <h2>Profesionales bloqueados de {paciente.username}</h2>
      <TableContainer>
        <Table className={classes.table} aria-label="Profesionales Bloqueados Table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProfesionales.map((profesional) => (
              <TableRow key={profesional.id_profesional} className={classes.tableRow}>
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
    </div>
  );
};

export default ProfesionalesBloqueadosPage;
