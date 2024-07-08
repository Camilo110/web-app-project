import './ResIndividual.css'
import { useEffect } from "react"
import { getResById } from "../../services/res"
import { useState } from "react"
import { TarjetaLinaje } from './Components/TarjetaLinaje'
import PropTypes from 'prop-types'
import { TarjetaRegistros } from './Components/TarjetaRegistros'

const temporalData = [
  {id: 1, nombre: 'juanito', familiaridad: 'Padre', urlImage: 'https://fakeimg.pl/180x120'},
  {id: 2, nombre: 'Juanita', familiaridad: 'Madre', urlImage: 'https://fakeimg.pl/180x120'},
]
const temporalServicios = [
  {ID: 1, Numero: 1, Tipo: 'Podologia', Fecha: '2021-10-12', Producto: 'Cuchilla', Veterinario: 'Juanito'},
  {ID: 2, Numero: 1, Tipo: 'Podologia', Fecha: '2021-10-12', Producto: 'Cuchilla', Veterinario: 'Juanito'},
  {ID: 3, Numero: 2, FechaInicio: '2021-10-12', FechaFin: '2021-10-12', Producto: 'Cuchilla'},
  {ID: 4, Numero: 2, FechaInicio: '2021-10-12', FechaFin: '2021-10-12', Producto: 'Cuchilla'},
  {ID: 5, Numero: 3, Fecha: '2021-10-12', TORO: 'Juanito', Inseminador: 'Albeiro'},
  {ID: 36, Numero: 3, Fecha: '2021-10-12', TORO: 'Juanito', Inseminador: 'Albeiro'},
]

export function ResIndividual({id = 2}){

  const [res, setRes] = useState({})

  useEffect(() => {
    getResById(id).then((res) => {
      setRes(res)
    })
  }, [])  

    //TODO metodo para mostrar linaje

    return (
      <div>
      <p>volver a la lista</p>

      <div className='SectionOne'>
        <div>
          <p>{res.Numero}</p>
          <h2>{res.Nombre}</h2>
        </div>

        <div>
          <p>borrar</p>
          <p>editar</p>
          <p>tomar foto</p>
        </div>
      </div>

      <main>
      <div>
        <img src="https://fakeimg.pl/450x250" alt="Cow Image"/>

        <div className='listImg'>
          <img src="https://fakeimg.pl/100x70" alt="Cow Image"/>
          <img src="https://fakeimg.pl/100x70" alt="Cow Image"/>
          <img src="https://fakeimg.pl/100x70" alt="Cow Image"/>
          <img src="https://fakeimg.pl/100x70" alt="Cow Image"/>
        </div>
      </div>

        { res.Sexo === 'F' ?
          <div>
            <p>Promedio de leche diaria: NUM</p>
            <p>Número de partos: {res.NumeroPartos} </p>
            <p>Ubicación: LOTE 2</p>
            <p>Estado: {res.Estado}</p>
            <p>Peso al Nacer: {res.PesoNacimiento} Kg</p>
            <p>Peso Actual: {res.PesoActual} Kg</p>
          </div>
        :
        <div>
            <p>Cantidad de Hijos: NUM</p>
            <p>Ubicación: LOTE 2</p>
            <p>Edad: {res.FechaNacimiento} </p>
            <p>Estado: {res.Estado}</p>
            <p>Peso al Nacer: {res.PesoNacimiento} Kg</p>
            <p>Peso Actual: {res.PesoActual} Kg</p>
          </div>
        }
        </main>



      <div>
        <h3>Linaje</h3>
        <div className='Linaje'>
          {
            temporalData.map((item) => (
              <TarjetaLinaje 
                key={item.id} 
                id={item.id} 
                nombre={item.nombre} 
                familiaridad={item.familiaridad} 
                urlImage={item.urlImage} />
            ))
          }
        </div>
      </div>

      { res.Sexo === 'F' &&
      <div>
        <h3> Registros de Produccion</h3>
         <p>CUADRO CON ESTADISTAS DE PRODUCCION</p>
         <img src='https://fakeimg.pl/600x200' alt="Grafico" />
      </div> }

      <div>
        <h3>Servicios Medicos</h3>
        <p>Agregar +</p>
        <div className='ListaRegistros'>
          {
            temporalServicios.map((item) => (
              <TarjetaRegistros key={item.ID} body={item} />
            ))
          }
        </div>
      </div>
      <div> 
        <h3>Registros de Secado</h3>
        <p>Agregar +</p>
        <div className='ListaRegistros'>
          {
            temporalServicios.map((item) => (
              <TarjetaRegistros key={item.ID} body={item} />
            ))
          }
        </div>
      </div>
      <div >
        <h3>Montas o Inseminaciones</h3>
        <p>Agregar +</p>
        <div className='ListaRegistros'>
          {
            temporalServicios.map((item) => (
              <TarjetaRegistros key={item.ID} body={item} />
            ))
          }
        </div>
      </div>


      </div>
    )
}

ResIndividual.propTypes = {
  id: PropTypes.number.isRequired,
}

