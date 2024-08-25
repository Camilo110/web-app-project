import '../../styles/ResIndividual.css'
import { useEffect } from "react"
import { getResById } from "../../services/res"
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

  const id = parseInt(useParams().id);

  const [isLoading, setIsLoading] = useState(true)

  const [upload, setUpload] = useState(false)

  const [res, setRes] = useState({})

  const [imageSelect, setImageSelect] = useState('')
  const [images, setImages] = useState([])

  useEffect(() => {
    getImages(res.ID).then((resp) => {
      setImages(resp[0])
      console.log(resp[0])
    })
    getResById(id).then((res) => {
      setRes(res)
    })
    setIsLoading(false)
  }, [])

  const uploadChange = (e) => {
    console.log(e.target.files)
    setImageSelect(e.target.files[0])
  }

  const handleUpload = async () => {
    
    const resp = await uploadImage(res.ID, imageSelect)
    console.log(resp + 'Imagen subida')
  }

  //TODO metodo para mostrar linaje
  console.log(res)

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
                  >tomar foto</p>
              </div>
            </div>

            <main>
              {upload &&
                <div>
                  <h3>Subir Imagen</h3>
                  <input type="file" onChange={uploadChange}/>
                  <button onClick={handleUpload}>Subir</button>
                </div>
              }
              <div>
                  <img src={`http://localhost:4000/imagen/img/${images.URL}`} alt="Cow Image" />
                

                <div className='listImg'>
                  <img src="https://fakeimg.pl/100x70" alt="Cow Image" />
                  <img src="https://fakeimg.pl/100x70" alt="Cow Image" />
                  <img src="https://fakeimg.pl/100x70" alt="Cow Image" />
                  <img src="https://fakeimg.pl/100x70" alt="Cow Image" />
                </div>
              </div>

              {res.Sexo === 'F' ?
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

