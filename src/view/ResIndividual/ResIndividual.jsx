import '../../styles/ResIndividual.css'
import { useEffect } from "react"
import { getHijos, getResById } from "../../services/res"
import { deleteImage, getImages, uploadImage } from '../../services/images'
import { useState } from "react"
import { TarjetaLinaje } from './Components/TarjetaLinaje'
//import PropTypes from 'prop-types'
import { TarjetaRegistros } from './Components/TarjetaRegistros'
import { useParams } from 'react-router-dom'
import { createServicio, getServicioById, getServicioByIdRes, updateServicio, deleteServicio } from '../../services/servicio'
import { UploadFile } from '../../components/UploadFile'
import { Modal } from '../../components/Modal'


export function ResIndividual() {

  const {id} = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [res, setRes] = useState({})
  const [linaje, setLinaje] = useState({})
  const [images, setImages] = useState([])
  const [servicios, setServicios] = useState([])
  const [secados, setSecados] = useState([])
  const [inseminaciones, setInseminaciones] = useState([])
  const [imageMain, setImageMain] = useState({})

  const [ModalUpload, setModalUpload] = useState(false)

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalCreate, setOpenModalCreate] = useState(false)

  const [data, setData] = useState([])

  useEffect(() => {      
    getAllData()
  }, [id])

  const getAllData = async () => {
    let listLinaje = []

    const resp = await getResById(id)
    setRes(resp)

    const images = await getImages(id)
    setImages(images)

    setImageMain(images[0])

    if(resp.Padre) {
      const padre = await getResById(resp.Padre)
      listLinaje.push({ id: padre.ID, nombre: padre.Nombre, Numero: padre.Numero, familiaridad: 'Padre'})
    }

    if(resp.Madre) {
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

    const AllServicios = await getServicioByIdRes(id)

    const servicios = AllServicios.filter(servicio => servicio.Tipo != 'Secado' && servicio.Tipo != 'Inseminacion')
    setServicios(servicios)

    const secado = AllServicios.filter(servicio => servicio.Tipo === 'Secado')
    setSecados(secado)

    const inseminacion = AllServicios.filter(servicio => servicio.Tipo === 'Inseminacion')
    setInseminaciones(inseminacion)

    setIsLoading(false)
  }

  const onDeleteImage = async () => {
    const resp = await deleteImage(imageMain.ID)
    if (resp == 'OK') {
      const images = await getImages(id)
      setImages(images)
      setImageMain(images[0])
    }
    
  }

  const campos = {
    Tipo: { label: 'Tipo', type: 'text', value: '' },
    Fecha: { label: 'Fecha', type: 'date', value: '' },
    Veterinario: { label: 'Veterinario', type: 'text', value: '' },
    Observaciones: { label: 'Observaciones', type: 'textarea', value: '' }
  }


  const onEdit = async (id) => {
    const resp = await getServicioById(id)
    setData(resp)
    setOpenModalEdit(true)
  }

  const onCreate = async () => {
    setOpenModalCreate(true)
  }

  const SubmitUpdate = async (values, idservicio) => {
    const resp = await updateServicio(idservicio, {...values, ResID: res.ID})
    console.log(resp)
    setOpenModalEdit(false)
  }

  const SubmitCreate = async (valuesCreate) => {
    console.log(valuesCreate, 'values')
    const resp = await createServicio({...valuesCreate, ResID: res.ID})
    console.log(resp,'------')
    setOpenModalCreate(false)
  }


  const handleUpload = async (imageSelect) => {
    const resp = await uploadImage(res.ID, imageSelect, 'images')
    if (resp == 'OK') return 'OK'
    return 'Error'
    }

  return (
    
    <> 
    {
      isLoading ? <p>Cargando...</p> :
          <div className='res-individual'>

            <p>volver a la lista</p>

            <div className='SectionOne'>
              <div className='LineOne'>
                <div>
                  <p>{res.Numero}</p>
                  <h2>{res.Nombre}</h2>
                </div>
                
                <p style={{cursor: 'pointer'}} onClick={()=> onDeleteImage()}>Eliminar Foto Seleccionada</p>
              </div>

              <div className='opciones'>
                <p>borrar</p>
                <p>editar</p>
                <p 
                  onClick={() => setModalUpload(true)}
                  style={{ cursor: 'pointer' }}
                  >Subir foto
                </p>
                <p
                  style={{ cursor: 'pointer' }}
                  onClick={onCreate}
                >
                  Agregar Servicio
                </p>
              </div>

            </div>

            <main  className='res-individual-main'>            
                              
              <div className='galeria'>
                <img className='imagenPrincipal'
                  /* style={{width:'480px', height: '300px'}} */
                  src={`http://localhost:4000/imagen/img/${imageMain.URL}`} 
                  alt="Cow Image" /> 

                <div className='listImg'>
                  {images?.map((item) => (
                    <img 
                      /* style={{width:'180px', height: '100px', cursor: 'pointer'}}  */
                      key={item.ID} 
                      src={`http://localhost:4000/imagen/img/${item.URL}`} 
                      alt="Cow Image"
                      onClick={() => setImageMain(item)} 
                      />
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
                      key={`${item.familiaridad}-${item.id}`}
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
                <img src='https://fakeimg.pl/500x200' alt="Grafico" />
              </div>
            }

            <div>
              <h3>Servicios Medicos</h3>
              <p>Agregar +</p>
              <div className='ListaRegistros'>
                { servicios.length > 0 &&
                  servicios.map((item) => (
                    <TarjetaRegistros key={item.ID} body={item} onDelete={deleteServicio} onEdit={onEdit}/>
                  ))
                }
              </div>
            </div>

            {res.Sexo === 'F' &&
              <div>
                <h3>Registros de Secado</h3>
                <p>Agregar +</p>
                <div className='ListaRegistros'>
                  { secados.length > 0 &&
                    secados.map((item) => (
                      <TarjetaRegistros key={item.ID} body={item} onDelete={deleteServicio} onEdit={onEdit} />
                    ))
                  }
                </div>
            </div>
            }
            
            <div >
              <h3>Montas {res.Sexo === 'F' && 'o Inseminaciones'}</h3>
              <p>Agregar +</p>
              <div className='ListaRegistros'>
                { inseminaciones.length > 0 &&
                  inseminaciones.map((item) => (
                    <TarjetaRegistros key={item.ID} body={item} onDelete={deleteServicio} onEdit={onEdit}/>
                  ))
                }
              </div>
            </div>
          </div>
      }

      {ModalUpload &&
        <UploadFile onUpload={handleUpload} setModal={setModalUpload} />
      }

      {openModalEdit
        &&
        <Modal
          setOpenModal={setOpenModalEdit}
          data={data}
          fields={campos}
          Handlesubmit={SubmitUpdate}
          columns={2}
          >
          <h3>  Editar Servicio de {res.Nombre}</h3>
        </Modal>
      }

      {openModalCreate
       &&
       <Modal
        setOpenModal={setOpenModalCreate}
        fields={campos}
        Handlesubmit={SubmitCreate}
        columns={2}
        >
        <h3>  Crear Servicio para {res.Nombre}</h3>
      </Modal>

      }

    </>

  )
}

// ResIndividual.propTypes = {
//   id: PropTypes.number.isRequired,
// }

