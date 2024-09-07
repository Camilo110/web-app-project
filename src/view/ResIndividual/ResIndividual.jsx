import '../../styles/ResIndividual.css'
import { useEffect } from "react"
import { getHijos, getResById, updateRes } from "../../services/res"
import { deleteImage, getImages, uploadImage } from '../../services/images'
import { useState } from "react"
import { TarjetaLinaje } from './Components/TarjetaLinaje'
//import PropTypes from 'prop-types'
import { TarjetaRegistros } from './Components/TarjetaRegistros'
import { useParams } from 'react-router-dom'
import { getServicioByIdRes, deleteServicio, getServicioWithInseminacionByIdRes, getSecadoByIdRes } from '../../services/servicio'
import { UploadFile } from '../../components/UploadFile'
import { Modal } from '../../components/Modal'
import { getResModal } from '../../services/forms'
import { createMuerte } from '../../services/muerte'
import { ModalServicios } from '../../components/ModalServicios'

//calcular edad
const calcularEdad = (fecha) => {
  const hoy = new Date()
  const FechaNacimiento = new Date(fecha)
  const edad = hoy.getFullYear() - FechaNacimiento.getFullYear()
  return edad
}


const camposRes = {
  Numero: { label: 'Número', type: 'number', value: 0 },
  Nombre: { label: 'Nombre', type: 'text', value: '' },
  Tipo: { label: 'Tipo', type: 'select', value: ['Leche', 'Carne', 'Doble Proposito'] },
  FechaNacimiento: { label: 'Fecha de Nacimiento', type: 'date', value: '' },
  Estado: { label: 'Estado', type: 'select', value: ['Activa', 'Vendida', 'Muerte']},
  Madre: { label: 'Madre', type: 'select', value: [''] },
  Padre: { label: 'Padre', type: 'select', value: [''] },
  PesoActual: { label: 'Peso Actual', type: 'number', value: 0 },
  PesoNacimiento: { label: 'Peso de Nacimiento', type: 'number', value: 0},
  Sexo: { label: 'Sexo', type: 'select', value: ['F','M'] },
  Raza: { label: 'Raza', type: 'text', value: '' },
  NumeroPartos: { label: 'Número de Partos', type: 'number', value: 0 },
  RegistroICA: { label: 'Registro ICA', type: 'text', value: '' },
  Observaciones: { label: 'Observaciones', type: 'text', value: '' },
  FincaID: { label: 'Finca ID', type: 'select', value: [''] }
};


const camposDelete = {
  Fecha: { label: 'Fecha de Muerte', type: 'date', value: '' },
  Causa: { label: 'Causa', type: 'select', value: ['Muerte']},
  Observaciones: { label: 'Observaciones', type: 'text', value: '' }
};


export function ResIndividual() {

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true)
  const [res, setRes] = useState({})
  const [numHijo, setNumHijo] = useState(0)

  const [images, setImages] = useState([])

  const [linaje, setLinaje] = useState({})
  const [servicios, setServicios] = useState([])
  const [secados, setSecados] = useState([])
  const [inseminaciones, setInseminaciones] = useState([])

  const [imageMain, setImageMain] = useState({})

  const [ModalUpload, setModalUpload] = useState(false)

  const [openModalCreateServicio, setOpenModalCreateServicio] = useState(false)


  const [DeleteModalRes, setDeleteModalRes] = useState(false);
  const [editModalRes, setEditModalRes] = useState(false);
  const [fields, setFields] = useState(camposRes)

  useEffect(() => {
    const fetchAll = async () => {
      await FetchRes()
      await fetchImages()
      await fetchServicios()
      setIsLoading(false)
    }
    fetchAll()
  }, [id])

  const fetchImages = async () => {
    const images = await getImages(id)
    setImages(images)
    setImageMain(images[0])
  }

  const fetchServicios = async () => {
    const servicios = await getServicioByIdRes(id)
    setServicios(servicios)

    const secado = await getSecadoByIdRes(id)
    setSecados(secado)

    const inseminacion = await getServicioWithInseminacionByIdRes(id)
    setInseminaciones(inseminacion)
  }

  const FetchRes = async () => {
    let listLinaje = []

    const resp = await getResById(id)
    setRes(resp)

    if (resp.Padre) {
      const padre = await getResById(resp.Padre)
      listLinaje.push({ id: padre.ID, nombre: padre.Nombre, Numero: padre.Numero, familiaridad: 'Padre' })
    }

    if (resp.Madre) {
      const madre = await getResById(resp.Madre)
      listLinaje.push({ id: madre.ID, nombre: madre.Nombre, Numero: madre.Numero, familiaridad: 'Madre' })
    }

    const hijos = await getHijos(id)
    setNumHijo(hijos.length)
    if (hijos) {
      hijos.forEach(hijo => {
        listLinaje.push({ id: hijo.ID, nombre: hijo.Nombre, Numero: hijo.Numero, familiaridad: 'Hijo' })
      })
    }
    setLinaje(listLinaje)
  }

  const onCreate = () => {
    setOpenModalCreateServicio(true)
  }

  const onDeleteImage = async () => {
    if (imageMain === undefined) return
    await deleteImage(imageMain.ID)
    await new Promise(resolve => setTimeout(resolve, 50));
    fetchImages()
  }

  const handleUpload = async (imageSelect) => {
    await uploadImage(res.ID, imageSelect, 'images')
    fetchImages()
    setModalUpload(false)
  }

  const HandleEdit = async () => {
    const { fincas, madres, padres } = await getResModal()
    setFields(
      {
        ...fields,
        FincaID: { label: 'Finca', type: 'select', value: fincas },
        Madre: { label: 'Madre', type: 'select', value: madres },
        Padre: { label: 'Padre', type: 'select', value: padres }
      }
    )
    setEditModalRes(true);
  }

  const HandleDelete = () => {
    setDeleteModalRes(true)
  }

  const ModalSubmitDelete = async (body, id) => {
    const resp = await createMuerte({ ResID: id, ...body })
    if (resp.status === 200) {
      console.log('Res eliminada', body)
    }
    console.log('Respuesta Delete', resp)

    FetchRes()
    setDeleteModalRes(false)
  }

  const ModalSubmitEdit = async (body, idRes) => {
    if (Object.keys(body).length > 0) {
      const resp = await updateRes(idRes, body)
      console.log('Respuesta Update', resp)
      FetchRes()
      setEditModalRes(false)
    } else {
      console.log('Error al editar')
    }
  }

  const HandleDeleteServicio = async (id) => {
    await deleteServicio(id)
    fetchServicios()
  }

  const BackPage = () => {
    window.location.href = '/res';
  }

  return (

    <>
      {
        isLoading ? <p>Cargando...</p> :
          <div className='res-individual'>

            <p onClick={BackPage}>volver a la lista</p>

            <div className='SectionOne'>
              <div className='LineOne'>
                <div>
                  <p>{res.Numero}</p>
                  <h2>{res.Nombre}</h2>
                </div>

                <p style={{ cursor: 'pointer' }} onClick={() => onDeleteImage()}>Eliminar Foto Seleccionada</p>
              </div>

              <div className='opciones'>
                <p onClick={HandleDelete}>borrar</p>
                <p onClick={HandleEdit}>editar</p>
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

            <main className='res-individual-main'>

              <div className='galeria'>
                <img className='imagenPrincipal'
                  src={`http://localhost:4000/imagen/img/${imageMain?.URL}`}
                  alt="Cow Image" />

                <div className='listImg'>
                  {images?.map((item) => (
                    <img
                      key={item.ID}
                      src={`http://localhost:4000/imagen/img/${item?.URL}`}
                      alt="Cow Image"
                      onClick={() => setImageMain(item)}
                    />
                  ))}
                </div>
              </div>

            <div className='info-res'>
              <h2>Información</h2>
              {res.Sexo === 'F' &&
                <>
                  <p>Promedio de leche diaria: NUM</p>
                  <p>Número de partos: {res.NumeroPartos} </p>
                </>
              }
              <p>Ubicación: {res.FincaID}</p>
              <p>Edad: {calcularEdad(res.FechaNacimiento)} años </p>
              <p>Estado: {res.Estado}</p>
              <p>Peso al Nacer: {res.PesoNacimiento} Kg</p>
              <p>Peso Actual: {res.PesoActual} Kg</p>
              <p>Cantidad de Hijos: {numHijo}</p>
              <p>Tipo: {res.Tipo}</p>
              <p>Sexo: {res.Sexo}</p>
              <p>Raza: {res.Raza}</p>
              <p>Registro ICA: {res.RegistroICA}</p>
              <p>Observaciones: {res.Observaciones}</p>
            </div>
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
                        numero={item.Numero}
                        nombre={item.nombre}
                        familiaridad={item.familiaridad} />
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
                {servicios &&
                  servicios.map((item) => (
                    <TarjetaRegistros key={item.ID} body={item} onDelete={HandleDeleteServicio} />
                  ))
                }
              </div>
            </div>

            {res.Sexo === 'F' &&
              <div>
                <h3>Registros de Secado</h3>
                <p>Agregar +</p>
                <div className='ListaRegistros'>
                  {secados &&
                    secados.map((item) => (
                      <TarjetaRegistros key={item.ID} body={item} onDelete={HandleDeleteServicio} />
                    ))
                  }
                </div>
              </div>
            }

            <div >
              <h3>Montas {res.Sexo === 'F' && 'o Inseminaciones'}</h3>
              <p>Agregar +</p>
              <div className='ListaRegistros'>
                {inseminaciones &&
                  inseminaciones.map((item) => (
                    <TarjetaRegistros key={item.ID} body={item} onDelete={HandleDeleteServicio} />
                  ))
                }
              </div>
            </div>
          </div>
      }

      {ModalUpload &&
        <UploadFile onUpload={handleUpload} setModal={setModalUpload} />
      }

      {
        openModalCreateServicio &&
        <ModalServicios 
          setOpenModal={setOpenModalCreateServicio} />
      }


      {editModalRes &&
        <Modal Handlesubmit={ModalSubmitEdit} fields={fields} data={res} setOpenModal={setEditModalRes}>
          <h3>Editar Res</h3>
        </Modal>}

      {DeleteModalRes &&
        <Modal Handlesubmit={ModalSubmitDelete} fields={camposDelete} data={{ ID: id }} setOpenModal={setDeleteModalRes}>
          <h3>Eliminar Res</h3>
        </Modal>}

    </>

  )
}

// ResIndividual.propTypes = {
//   id: PropTypes.number.isRequired,
// }

