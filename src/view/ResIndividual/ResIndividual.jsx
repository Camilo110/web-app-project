import '../../styles/ResIndividual.css'
import { useEffect } from "react"
import { getHijos, getResById } from "../../services/res"
import { getImages, uploadImage } from '../../services/images'
import { useState } from "react"
import { TarjetaLinaje } from './Components/TarjetaLinaje'
//import PropTypes from 'prop-types'
import { TarjetaRegistros } from './Components/TarjetaRegistros'
import { useParams } from 'react-router-dom'
const temporalData = [
  { id: 1, nombre: 'juanito', familiaridad: 'Padre', urlImage: 'https://fakeimg.pl/180x120' },
  { id: 2, nombre: 'Juanita', familiaridad: 'Madre', urlImage: 'https://fakeimg.pl/180x120' },
]
const temporalServicios = [
  { ID: 1, Numero: 1, Tipo: 'Podologia', Fecha: '2021-10-12', Producto: 'Cuchilla', Veterinario: 'Juanito' },
  { ID: 2, Numero: 1, Tipo: 'Podologia', Fecha: '2021-10-12', Producto: 'Cuchilla', Veterinario: 'Juanito' },
  { ID: 3, Numero: 2, FechaInicio: '2021-10-12', FechaFin: '2021-10-12', Producto: 'Cuchilla' },
  { ID: 4, Numero: 2, FechaInicio: '2021-10-12', FechaFin: '2021-10-12', Producto: 'Cuchilla' },
  { ID: 5, Numero: 3, Fecha: '2021-10-12', TORO: 'Juanito', Inseminador: 'Albeiro' },
  { ID: 36, Numero: 3, Fecha: '2021-10-12', TORO: 'Juanito', Inseminador: 'Albeiro' },
]

export function ResIndividual() {

  const {id} = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [upload, setUpload] = useState(false)
  const [res, setRes] = useState({})
  const [linaje, setLinaje] = useState({})
  const [images, setImages] = useState([])
  const [imageSelect, setImageSelect] = useState('')

  useEffect(() => {      
    getAllData()
  }, [])

  const getAllData = async () => {
    let listLinaje = []

    const resp = await getResById(id)
    setRes(resp)

    const images = await getImages(id)
    setImages(images.slice(0, 3))

    console.log(resp)

    if(resp.Padre) {
      const padre = await getResById(resp.Padre)
      console.log('first')
      listLinaje.push({ id: padre.ID, nombre: padre.Nombre, familiaridad: 'Padre'})
    }

    if(resp.Madre) {
      console.log('second')
      const madre = await getResById(resp.Madre)
      listLinaje.push({ id: madre.ID, nombre: madre.Nombre, familiaridad: 'Madre'})
    }

    const hijos = await getHijos(id)
    if(hijos){
      hijos.forEach(hijo => {
        listLinaje.push({id: hijo.ID, nombre: hijo.Nombre, familiaridad: 'Hijo'})
      })
    }
    setLinaje(listLinaje)
    setIsLoading(false)
  }

  const uploadChange = (e) => {
    console.log(e.target.files)
    setImageSelect(e.target.files[0])
  }

  const handleUpload = async () => {
    if (imageSelect) {
      const resp = await uploadImage(res.ID, imageSelect)
      if (resp == 'OK') {
        setUpload(false)
        setImageSelect('')
      }
      return
    }
    console.log('VACIO')
  }

  return (
    <div> 
      {
        isLoading ? <p>Cargando...</p> :

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
                <p onClick={() => setUpload(true)}
                  style={{ cursor: 'pointer' }}
                  >Subir foto</p>
              </div>

            </div>

            <main  className='res-individual-main'>
              {upload &&
                <div>
                  <h3>Subir Imagen</h3>
                  <input type="file" onChange={uploadChange}/>
                  <button onClick={handleUpload}>Subir</button>
                </div>
              }
                              
              <div>
                <img 
                  style={{width:'480px', height: '300px'}}
                  src={`http://localhost:4000/imagen/id/${id}`} 
                  alt="Cow Image" /> 

                <div className='listImg'>
                  {images?.map((item) => (
                    <img 
                      style={{width:'180px', height: '100px'}} 
                      key={item.ID} 
                      src={`http://localhost:4000/imagen/img/${item.URL}`} 
                      alt="Cow Image" />
                  ))}
                </div>
              </div>
            

              {res.Sexo === 'F' ?
                <div>
                  <p>Promedio de leche diaria: NUM</p>
                  <p>Número de partos: {res.NumeroPartos} </p>
                  <p>Ubicación: {res.FincaID}</p>
                  <p>Estado: {res.Estado}</p>
                  <p>Peso al Nacer: {res.PesoNacimiento} Kg</p>
                  <p>Peso Actual: {res.PesoActual} Kg</p>
                </div>
                :
                <div>
                  <p>Cantidad de Hijos: NUM</p>
                  <p>Ubicación: {res.FincaID} </p>
                  <p>Edad: {res.FechaNacimiento} </p>
                  <p>Estado: {res.Estado}</p>
                  <p>Peso al Nacer: {res.PesoNacimiento} Kg</p>
                  <p>Peso Actual: {res.PesoActual} Kg</p>
                </div>
              }
            </main>



            <div>
              <h2>Linaje</h2>
              <div className='Linaje'>
                {
                  linaje.length > 0
                  ?
                  linaje.map((item) => (
                    <TarjetaLinaje
                      key={item.id}
                      id={item.id}
                      nombre={item.nombre}
                      familiaridad={item.familiaridad}/>
                  ))
                  : 
                  <h3>No hay  registros de linaje</h3>
                }
              </div>
            </div>

            {res.Sexo === 'F' &&
              <div>
                <h3> Registros de Produccion</h3>
                <p>CUADRO CON ESTADISTAS DE PRODUCCION</p>
                <img src='https://fakeimg.pl/600x200' alt="Grafico" />
              </div>}

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
      }

    </div>
  )
}

// ResIndividual.propTypes = {
//   id: PropTypes.number.isRequired,
// }

