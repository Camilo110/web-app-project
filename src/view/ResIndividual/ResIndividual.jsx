import '../../styles/ResIndividual.css'
import { useEffect } from "react"
import { getHijos, getResById, updateRes } from "../../services/res"
import { deleteImage, getImages, uploadImage } from '../../services/images'
import { useState } from "react"
import { TarjetaLinaje } from './Components/TarjetaLinaje'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
//import PropTypes from 'prop-types'
import { TarjetaRegistros } from './Components/TarjetaRegistros'
import { useParams } from 'react-router-dom'
import { getServicioByIdRes, deleteServicio, getServicioWithInseminacionByIdRes, getSecadoByIdRes } from '../../services/servicio'
import { getProduccionPorResFechas } from '../../services/res'
import { UploadFile } from '../../components/UploadFile'
import { Modal } from '../../components/Modal'
import { getResModal } from '../../services/forms'
import { createMuerte } from '../../services/muerte'
import { ModalServicios } from '../../components/ModalServicios'
import { NumeroRes } from '../../components/NumeroRes'
import { daysToYearsandMonths } from '../../utils/DaysToYearsandMonths'
import { DeleteAlert } from '../../utils/DeleteAlert'
import { ConfirmAlert } from '../../utils/ConfirmAlert'

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
  const [previewDataModal, setPreviewDataModal] = useState({})
  const [isInseminacionOSecado, setIsInseminacionOSecado] = useState({inseminacion: false, secado: false})

  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [idServicioOnEdit, setIdServicioOnEdit] = useState('')


  const [DeleteModalRes, setDeleteModalRes] = useState(false);
  const [editModalRes, setEditModalRes] = useState(false);
  const [fields, setFields] = useState(camposRes)

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [productionData, setProductionData] = useState([]);

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

    if (hijos) {
      setNumHijo(hijos.length)
      hijos.forEach(hijo => {
        listLinaje.push({ id: hijo.ID, nombre: hijo.Nombre, Numero: hijo.Numero, familiaridad: 'Hijo' })
      })
    }
    setLinaje(listLinaje)
  }

  const onCreateServicio = (isInseminacion, isSecado) => {
    const Tipo = isInseminacion ? 'Inseminacion' : isSecado ? 'Secado' : ''
    if (res.Sexo == 'M' && isInseminacion){
      setPreviewDataModal({Tipo: 'Monta', ToroID: id, Fecha: new Date().toISOString().split('T')[0]}) }
    else {
      setPreviewDataModal({Tipo, ResID: id, Fecha: new Date().toISOString().split('T')[0]})
    }

    setIsInseminacionOSecado({inseminacion: isInseminacion, secado: isSecado})
    setOpenModalCreateServicio(true)
  }

  const onDeleteImage = async () => {
    if (imageMain === undefined) return
    DeleteAlert(deleteImage, fetchImages, imageMain.ID)

  }

  const handleUpload = async (imageSelect) => {
    await ConfirmAlert((id)=>uploadImage(id, imageSelect, 'images'), fetchImages, res.ID)
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
    if (res.Estado === 'Muerte') return
    setDeleteModalRes(true)
  }

  const ModalSubmitDelete = async (body, id) => {
    DeleteAlert(createMuerte, FetchRes, { ResID: id, ...body })
    setDeleteModalRes(false)
  }

  const ModalSubmitEdit = async (body, idRes) => {
    await ConfirmAlert(({id,body})=>updateRes(id,body), FetchRes, { id: idRes, body })
    setEditModalRes(false)
  }

  const HandleDeleteServicio = async (id) => {
    await DeleteAlert(deleteServicio, fetchServicios, id)
  }

  const BackPage = () => {
    window.location.href = '/res';
  }

  const onEditServicio = (id) => {
    setIdServicioOnEdit(id)
    setOpenModalEdit(true)
  }

  // logica para el gráfico de produccion
  useEffect(() => {
    const today = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    setEndDate(today.toISOString().split('T')[0]);
    setStartDate(oneMonthAgo.toISOString().split('T')[0]);
  }, []);
  
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  useEffect(() => {
    const fetchProductionData = async () => {
      if (startDate && endDate) {
        try {
          console.log('startDate:', startDate);
          const response = await getProduccionPorResFechas(id, startDate, endDate);
          if(response.ok) {
            const data = await response.json();
            setProductionData(data.body);
          } else {
            setProductionData([]);
          }
        } catch (error) {
          console.error('Error fetching production data:', error);
        }
      }
    };

    fetchProductionData();
  }, [startDate, endDate]);

  const data = {
    labels: productionData.map((d) => d.Fecha),
    datasets: [
      {
        label: 'Producción de Leche',
        data: productionData.map((d) => d.Cantidad),
        fill: false,
        backgroundColor: 'rgba(105, 148, 197, 1)'

      },
    ],
  };

  return (

    <>
      {
        isLoading ? <p>Cargando...</p> :
          <div className='res-individual'>

            <p onClick={BackPage} style={{cursor: 'pointer'}}> 🔙 volver a la lista</p>

            <div className='SectionOne'>
              <div className='LineOne'>
                <div>
                  <NumeroRes id={res.ID} numero={res.Numero} tipo={res.Tipo} />
                  <h2>{res.Nombre}</h2>
                </div>
              </div>

              <div className='opciones'>
                <button onClick={HandleDelete}>Eliminar</button>
                <button onClick={HandleEdit}>Editar</button>
                <button
                  onClick={() => setModalUpload(true)}
                  style={{ cursor: 'pointer' }}
                >Subir foto
                </button>
              </div>

            </div>

            <main className='res-individual-main'>

              <div className='galeria'>
                <div className='imagenPrincipalMain'>
                  <img className='imagenPrincipal'
                    src={`http://localhost:4000/imagen/img/${imageMain?.URL}`}
                    alt="Cow Image" />
                  <p style={{ cursor: 'pointer' }} onClick={onDeleteImage}>
                    Eliminar 
                    <span className="tooltip">Eliminar fotografía</span>
                  </p>
                </div>
                <div className='listImg'>
                  {images?.map((item) => (
                    <img
                      key={item.ID}
                      src={`http://localhost:4000/imagen/img/${item?.URL}`}
                      alt="Cow Image"
                      onClick={() => setImageMain(item)}
                    />
                  ))}
                  <div className='subirImagen'>
                  <a onClick={() => setModalUpload(true)} style={{ cursor: 'pointer' }}>
                      <div className="texto-container">
                        <div className="texto-mas">+</div>
                        <div className="texto">Subir imagen</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

            <div className='info-res'>
              <h2>Información</h2>
              <p> <b>Número de partos:</b> {res.NumeroCrias} </p>
              <p> <b>Ubicación:</b> {res.FincaNombre}</p>
              <p> <b>Edad:</b> {daysToYearsandMonths(res.Edad)} </p>
              <p> <b>Estado:</b> {res.Estado}</p>
              <p> <b>Peso al Nacer:</b> {res.PesoNacimiento} Kg</p>
              <p> <b>Peso Actual:</b> {res.PesoActual} Kg</p>
              <p> <b>Cantidad de Hijos:</b> {numHijo}</p>
              <p> <b>Tipo:</b> {res.Tipo}</p>
              <p> <b>Sexo:</b> {res.Sexo}</p>
              <p> <b>Raza:</b> {res.Raza}</p>
              <p> <b>Registro ICA:</b> {res.RegistroICA}</p>
              <p> <b>Observaciones:</b> {res.Observaciones}</p>
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

            { (res.Tipo === 'Leche' || res.Tipo === 'Doble Proposito') && (
        <div className='registrosReproduccion'>
          <h2>Registros de Producción</h2>
          <div className='fechas'>
            <label className='labelFechas'>
              Fecha de inicio:
              <input type="date" value={startDate} onChange={handleStartDateChange} />
            </label>
            <label className='labelFechas'>
              Fecha de fin:
              <input type="date" value={endDate} onChange={handleEndDateChange} />
            </label>
          </div>
          <Line data={data} />
        </div>
      )}

            <div className='serviciosMedicosMain'>
              <div className='tituloClase'>
                <h2>Servicios Medicos</h2>
                <button onClick={() => onCreateServicio(false, false)}>
                  Agregar Servicio
                </button>
              </div>
              <div className='ListaRegistros'>
                {servicios &&
                  servicios.map((item) => (
                    <TarjetaRegistros key={item.ID} body={item} onDelete={HandleDeleteServicio} onEdit={onEditServicio} />
                  ))
                }
              </div>
            </div>

            {res.Sexo === 'F' &&
              <div className='MontasInseminacionesMain'>
                <div className='tituloClase'>
                  <h2>Registros de Secado</h2>
                  <button onClick={() => onCreateServicio(false, true)}>
                    Agregar Secado
                  </button>
                </div>
                <div className='ListaRegistros'>
                  {secados &&
                    secados.map((item) => (
                      <TarjetaRegistros key={item.ID} body={item} onDelete={HandleDeleteServicio} onEdit={onEditServicio} />
                    ))
                  }
                </div>
              </div>
            }

            <div className='MontasInseminacionesMain' >
              <div className='tituloClase'>
                <h2>Montas {res.Sexo === 'F' && 'o Inseminaciones'}</h2>
                <button onClick={() => onCreateServicio(true, false)}>
                  Agregar Registro
                </button>
              </div>
              <div className='ListaRegistros'>
                {inseminaciones &&
                  inseminaciones.map((item) => (
                    <TarjetaRegistros key={item.ID} body={item} onDelete={HandleDeleteServicio} onEdit={onEditServicio} />
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
          previewData={previewDataModal}
          isInseminacion={isInseminacionOSecado.inseminacion}
          isSecado={isInseminacionOSecado.secado}
          setOpenModal={setOpenModalCreateServicio} 
          fetch={fetchServicios}
          />
      }


      {editModalRes &&
        <Modal Handlesubmit={ModalSubmitEdit} fields={fields} data={res} setOpenModal={setEditModalRes}>
          <h2>Editar Res</h2>
        </Modal>}

      {DeleteModalRes &&
        <Modal Handlesubmit={ModalSubmitDelete} fields={camposDelete} data={{ ID: id }} setOpenModal={setDeleteModalRes}>
          <h2>Eliminar Res</h2>
        </Modal>}
      
            
        {
        openModalEdit &&
        <ModalServicios 
          isEdit={true}
          setOpenModal={setOpenModalEdit}
          idServicio={idServicioOnEdit} 
          fetch={fetchServicios}
          />
        }

    </>

  )
}

// ResIndividual.propTypes = {
//   id: PropTypes.number.isRequired,
// }

