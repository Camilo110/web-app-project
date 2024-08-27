import '../../styles/ResIndividual.css'
import { useEffect } from "react"
import { getHijos, getResById } from "../../services/res"
import { getImages, uploadImage } from '../../services/images'
import { useState } from "react"
import { TarjetaLinaje } from './Components/TarjetaLinaje'
//import PropTypes from 'prop-types'
import { TarjetaRegistros } from './Components/TarjetaRegistros'
import { useParams } from 'react-router-dom'
import { getServicio } from '../../services/servicio'


export function ResIndividual() {

  const {id} = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [upload, setUpload] = useState(false)
  const [res, setRes] = useState({})
  const [linaje, setLinaje] = useState({})
  const [images, setImages] = useState([])
  const [imageSelect, setImageSelect] = useState('')
  const [servicios, setServicios] = useState([])
  const [secados, setSecados] = useState([])
  const [inseminaciones, setInseminaciones] = useState([])

  useEffect(() => {      
    getAllData()
  }, [id])

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
      listLinaje.push({ id: padre.ID, nombre: padre.Nombre, Numero: padre.Numero, familiaridad: 'Padre'})
    }

    if(resp.Madre) {
      console.log('second')
      const madre = await getResById(resp.Madre)
      listLinaje.push({ id: madre.ID, nombre: madre.Nombre, Numero: madre.Numero, familiaridad: 'Madre'})
    }

    const hijos = await getHijos(id)
    if(hijos){
      hijos.forEach(hijo => {
        listLinaje.push({id: hijo.ID, nombre: hijo.Nombre, Numero: hijo.Numero,  familiaridad: 'Hijo'})
      })
    }
    setLinaje(listLinaje)

    const AllServicios = await getServicio()

    const servicios = AllServicios.filter(servicio => servicio.Tipo != 'Secado' && servicio.Tipo != 'Inseminacion')
    setServicios(servicios)

    const secado = AllServicios.filter(servicio => servicio.Tipo === 'Secado')
    setSecados(secado)

    const inseminacion = AllServicios.filter(servicio => servicio.Tipo === 'Inseminacion')
    setInseminaciones(inseminacion)

    setIsLoading(false)
  }

  const uploadChange = (e) => {
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
    <div className='res-individual'> 
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



            <div className='Linaje'>
              <h2>Linaje</h2>
              <div className='ListaRegistros'>
                {
                  linaje.length > 0
                  ?
                  linaje.map((item) => (
                    <TarjetaLinaje
                      key={item.id}
                      id={item.id}
                      numero = {item.Numero}
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
                <p>Coming Soon</p>
                <img src='https://fakeimg.pl/600x200' alt="Grafico" />
              </div>
            }

            <div>
              <h3>Servicios Medicos</h3>
              <p>Agregar +</p>
              <div className='ListaRegistros'>
                { servicios.length > 0 &&
                  servicios.map((item) => (
                    <TarjetaRegistros key={item.ID} body={item} onDelete={()=>(console.log('Delete'))} onEdit={()=>(console.log('Edit'))}/>
                  ))
                }
              </div>
            </div>
            <div>
              <h3>Registros de Secado</h3>
              <p>Agregar +</p>
              <div className='ListaRegistros'>
                { secados.length > 0 &&
                  secados.map((item) => (
                    <TarjetaRegistros key={item.ID} body={item} />
                  ))
                }
              </div>
            </div>
            <div >
              <h3>Montas o Inseminaciones</h3>
              <p>Agregar +</p>
              <div className='ListaRegistros'>
                { inseminaciones.length > 0 &&
                  inseminaciones.map((item) => (
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

