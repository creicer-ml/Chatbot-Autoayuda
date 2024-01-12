import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePaciente } from '../components/PacienteContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import TablaProfesionales from '../components/TablaProfesionales';

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
  tableRowEven: {
    backgroundColor: '#f2f2f2', // or any other color for even rows
  },
  tableRowOdd: {
    backgroundColor: '#ffffff', // or any other color for odd rows
  },
});

const ProfesionalesFavoritosPage = () => {
  const { paciente } = usePaciente();
  const [profesionalesFavoritos, setProfesionalesFavoritos] = useState([]);
  const [profesionalesDisponibles, setProfesionalesDisponibles] = useState([]);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorAgregar, setErrorAgregar] = useState('');
  const classes = useStyles();

  const fetchProfesionalesFavoritos = async () => {
    try {
      if (!paciente || !paciente.rut) {
        return;
      }

      const response = await axios.get(`/api/mostrar_profesionales_favoritos/${paciente.rut}/`);
      setProfesionalesFavoritos(response.data);
    } catch (error) {
      console.error('Error al obtener profesionales favoritos:', error);
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
      fetchProfesionalesFavoritos();
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

      await axios.post(`/api/agregar_profesional_favorito/${paciente.rut}/${profesionalSeleccionado}/`);
      setProfesionalSeleccionado('');
      setErrorAgregar('');
      fetchProfesionalesFavoritos();
    } catch (error) {
      console.error('Error al agregar profesional favorito:', error);
      setErrorAgregar(error.message || 'Error al agregar profesional favorito.');
    }
  };

  const handleEliminarProfesional = async (idProfesional) => {
    try {
      await axios.delete(`/api/eliminar_profesional_favorito/${paciente.rut}/${idProfesional}/`);
      fetchProfesionalesFavoritos();
    } catch (error) {
      console.error('Error al eliminar profesional favorito:', error);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProfesionales = profesionalesFavoritos
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
      <h1>Profesionales favoritos de {paciente.nombre_completo}</h1>
      <TablaProfesionales
        profesionales={filteredProfesionales}
        handleEliminarProfesional={handleEliminarProfesional}
        classes={classes}
      />
    </div>
  );
};

export default ProfesionalesFavoritosPage;
