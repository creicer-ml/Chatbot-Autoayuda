import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { usePaciente } from '../components/PacienteContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import TablaProfesionales from '../components/TablaProfesionales';  // Import the TablaProfesionales component
import Swal from 'sweetalert2';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
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

      const isProfesionalAlreadyAdded = profesionalesBloqueados.some(
        (profesional) => profesional.id_profesional === profesionalSeleccionado
      );
  
      if (isProfesionalAlreadyAdded) {
        throw new Error('El profesional ya está agregado.');
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
      const confirmacion = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
  
      if (confirmacion.isConfirmed) {
        await axios.delete(`/api/eliminar_profesional_bloqueado/${paciente.rut}/${idProfesional}/`);
        fetchProfesionalesBloqueados();
        await Swal.fire({
          title: 'Eliminado',
          text: 'El profesional ha sido eliminado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error('Error al eliminar profesional bloqueado:', error);
      await Swal.fire({
        title: 'Error',
        text: 'Hubo un problema durante la eliminación.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
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
      <TablaProfesionales
        profesionales={filteredProfesionales}
        handleEliminarProfesional={handleEliminarProfesional}
        classes={classes}
      />
    </div>
  );
};

export default ProfesionalesBloqueadosPage;
