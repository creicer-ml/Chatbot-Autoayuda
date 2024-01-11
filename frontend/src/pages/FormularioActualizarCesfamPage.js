import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { usePaciente } from '../components/PacienteContext';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: 'center',
    maxWidth: 300,
  },
  inputField: {
    margin: theme.spacing(2, 0),
  },
  selectField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  inputError: {
    border: '1px solid red',
  },
}));

const ModificarCesfamPage = () => {
  const { paciente, actualizarPaciente } = usePaciente();
  const [cesfams, setCesfams] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [nuevoCesfam, setNuevoCesfam] = useState('');
  const [nuevoSector, setNuevoSector] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const fetchCesfams = async () => {
      try {
        const response = await axios.get('/api/obtener_cesfams/');
        setCesfams(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de CESFAM:', error);
      }
    };

    const fetchSectores = async () => {
      try {
        const response = await axios.get('/api/obtener_sectores/');
        setSectores(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de Sectores:', error);
      }
    };

    fetchCesfams();
    fetchSectores();
  }, []);  

  const handleCesfamChange = (event) => {
    setNuevoCesfam(event.target.value);
    setError('');
  };

  const handleSectorChange = (event) => {
    setNuevoSector(event.target.value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!nuevoCesfam || !nuevoSector) {
        throw new Error('Debe seleccionar Cesfam y Sector antes de guardar.');
      }

      await axios.put(`/api/actualizar_cesfam_paciente/${paciente.rut}/`, {
        cesfam_id: nuevoCesfam,
        sector_id: nuevoSector,
      });

      const nuevoCesfamNombre = cesfams.find(cesfam => cesfam.id_cesfam === nuevoCesfam).nombre;
      const nuevoSectorNombre = sectores.find(sector => sector.id_sector === nuevoSector).nombre;

      actualizarPaciente({ ...paciente, cesfam: nuevoCesfamNombre, sector: nuevoSectorNombre });

      console.log('CESFAM y Sector actualizados exitosamente');
      navigate('/menu');
    } catch (error) {
      console.error('Error al actualizar el CESFAM y Sector:', error);
      setError(error.message);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Paper className={classes.paper} elevation={3}>
          <h3>Actualizar Cesfam del Paciente</h3>
          <form onSubmit={handleSubmit}>
            <div className={classes.inputField}>
              <label htmlFor="nuevoCesfam">Seleccionar Cesfam</label>
              <Select
                id="nuevoCesfam"
                className={`${classes.selectField} ${error && !nuevoCesfam ? classes.inputError : ''}`}
                value={nuevoCesfam}
                onChange={handleCesfamChange}
              >
                {cesfams.map(cesfam => (
                  <MenuItem key={cesfam.id_cesfam} value={cesfam.id_cesfam}>
                    {cesfam.nombre}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div className={classes.inputField}>
              <label htmlFor="nuevoSector">Seleccionar Sector</label>
              <Select
                id="nuevoSector"
                className={`${classes.selectField} ${error && !nuevoSector ? classes.inputError : ''}`}
                value={nuevoSector}
                onChange={handleSectorChange}
              >
                {sectores.map(sector => (
                  <MenuItem key={sector.id_sector} value={sector.id_sector}>
                    {sector.nombre}
                  </MenuItem>
                ))}
              </Select>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="contained" color="primary" fullWidth type="submit">
              Guardar
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
};

export default ModificarCesfamPage;
