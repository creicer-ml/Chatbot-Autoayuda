import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'


const ConsultaReservasPage = () => {

  let [reservas, setReservas] = useState([])

  useEffect(()=> {
    obtenerReservas()
  }, [])

  let obtenerReservas = async () => {
    let response = await fetch("/api/listar_reservas/")
    let data = await response.json()
    console.log("DATA:", data)
    setReservas(data)
  }

  return (
    <div>
        <h3>Consultar hora reservada</h3>
        <div className='lista_reservas'>
          {reservas.map((reserva, index) => (
            <div key={index}>
            <p>Nombre Profesional: {reserva.profesional_nombre} {reserva.profesional_apellido} </p>
            <p>Especialidad Profesional: {reserva.especialidad}</p>
            <p>Fecha de atención: {reserva.fecha_solicitud_hora}</p>
            <p>Hora de atención: {reserva.hora_atencion} hrs</p>
            <p>Fecha de solicitud de la hora: {reserva.fecha_solicitud_hora} </p>
            <p>Grabación: {reserva.grabacion ? 'Disponible' : 'No Disponible'}</p>
          </div>
          ))}
        </div>
    </div>
  )
}

export default ConsultaReservasPage