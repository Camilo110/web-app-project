import { useEffect, useState } from 'react'
import { Table } from './Table'
import '../styles/ModalServicios.css'
import { getInsumo } from '../services/Insumo'
import { getServiciosModal } from '../services/forms'
import PropTypes from 'prop-types'
import { createServicio, getServicioById, getServicioWithInseminacionById, updateServicio } from '../services/servicio'
import { deleteInsumoServicio, getInsumoServicio, updateInsumoServicio } from '../services/insumoServicio'


// eslint-disable-next-line no-unused-vars
export const ModalServicios = ({ isEdit = false, isInseminacion = false, idServicio, setOpenModal }) => {

  const [insumos, setInsumos] = useState([])

  const [listInsumos, setListInsumos] = useState([])
  const [insumotoAdd, setInsumoToAdd] = useState({ Numero: '', Cantidad: 0 })
  const [listInsumosToSend, setListInsumosToSend] = useState([])
  const [listInsumosToDelete, setListInsumosToDelete] = useState([])

  const [search, setSearch] = useState('')

  const [valuesToSend, setValuesToSend] = useState({})

  const [values, setValues] = useState({ Fecha: '', Tipo: '', Veterinario: '', ResID: '', Observaciones: '' })

  const [resForm, setResForm] = useState([])

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    const insumos = await getInsumo()
    setInsumos(insumos)
    const reses = await getServiciosModal()
    setResForm(reses)

    if (isEdit) {
      let Servicio = {}
      
      if (isInseminacion) {
        Servicio = await getServicioWithInseminacionById(idServicio)
      } else {
        Servicio = await getServicioById(idServicio)
      }
      setValues(Servicio)
      
      // hacer fetch de la lista de insumos al endpoint de insumoServicio
      const listInsumosFetch = await getInsumoServicio(idServicio)
      setListInsumos(listInsumosFetch)


    }
    setIsLoading(false)
  }


  const onDelete = (id) => {
    //fetch de delete insumoServicio
    if (isEdit) {
      setListInsumosToDelete([...listInsumosToDelete, id])
    }
    const filterData = listInsumos.filter((insumo) => insumo.ID !== id)
    setListInsumos(filterData)
  }

  const onSearchInsumo = (e) => {
    const { value } = e.target
    setSearch(value)
    const { ID, Numero, UnidadMedida, Nombre } = filter(value)
    value ? setInsumoToAdd({ ...insumotoAdd, ID, Numero, UnidadMedida, Nombre }) : setInsumoToAdd({ ...insumotoAdd, ID: '', Numero: '', Nombre: '', UnidadMedida: '' })
  }

  const onEditCantidad = (e) => {
    const { value } = e.target
    setInsumoToAdd({ ...insumotoAdd, Cantidad: parseInt(value) })
  }

  const filter = (value) => {
    const dataFilter = insumos.filter((insumo) => insumo.Nombre.toString().toLowerCase().includes(value.toString().toLowerCase()))
    return dataFilter.length > 0 ? dataFilter[0] : { ID: '', Numero: '', UnidadMedida: '', Nombre: '' }
  }

  const onAddInsumo = () => {
    if (!insumotoAdd.ID) {
      console.log("No hay elemento seleccionado")
      return
    }
    if (insumotoAdd.Cantidad <= 0) {
      console.log("Cantidad no valida")
      return
    }

    const index = listInsumos.findIndex((insumo) => insumo.ID === insumotoAdd.ID)
    if (index >= 0) {
      // selleccionar el insumo y añadir la cantidad
      const insumo = listInsumos[index]
      const Cantidad = parseInt(insumo.Cantidad) + parseInt(insumotoAdd.Cantidad)

      // eliminar el insumo de las listas
      const listInsumosFilter = listInsumos.filter((insumo) => insumo.ID !== insumotoAdd.ID)
      const listInsumosToSendFilter = listInsumosToSend.filter((insumo) => insumo.ID !== insumotoAdd.ID)

      // añadir el insumo con la cantidad actualizada
      setListInsumos([{ ...insumo, Cantidad }, ...listInsumosFilter])
      setListInsumosToSend([{ ...insumo, Cantidad }, ...listInsumosToSendFilter])
    } else {
      setListInsumos([insumotoAdd, ...listInsumos])
      setListInsumosToSend([insumotoAdd, ...listInsumosToSend])
    }
    setInsumoToAdd({ Cantidad: 0, ID: '', Numero: '', UnidadMedida: '', Nombre: '' })
    setSearch('')
    console.log(listInsumos, 'ADD INSUMO')
  }

  const handleChangeValues = (e, key) => {
    const { value } = e.target
    setValues({ ...values, [key]: value })
    setValuesToSend({ ...valuesToSend, [key]: value })
  }

  const onSubmit = async () => {
    let listInsumosFinal = []
    listInsumosToSend.map((insumo) => {
      listInsumosFinal.push({ InsumoID: insumo.ID, Cantidad: insumo.Cantidad, ServicioID: idServicio })
    })

    if (isEdit) {
      const listInsumosToDeleteFinal = listInsumosToDelete.filter((id) => !listInsumosFinal.map((insumo) => insumo.InsumoID).includes(id))
      console.log(listInsumosToDeleteFinal, 'Delete') 

      for (const id of listInsumosToDeleteFinal) {
        await deleteInsumoServicio({ InsumoID: id, ServicioID: idServicio })
      }


      if (Object.keys(valuesToSend).length > 0) await updateServicio(values.ID, { ...valuesToSend })

      if (listInsumosFinal.length > 0) await updateInsumoServicio(listInsumosFinal) 

      console.log(idServicio, { ...valuesToSend, listInsumosFinal }, 'Edit')
    } else {
      await createServicio({ ...valuesToSend, listInsumos: listInsumosFinal })
      console.log({ ...valuesToSend, listInsumosFinal }, 'Create')
    }

    //setOpenModal(false)
  }

  return (
    <div className='Modal'>
      <div className='Modal-content'>

        <h3 className="title-modal">{isEdit ? 'Editar' : 'Agregar'} Servicios</h3>

        <button className="exit" onClick={() => setOpenModal(false)}>X</button>


        {
          isLoading
            ?
            <p>Cargando...</p>
            :
            <>
              <div className='Fields-modal'>

                <div className="field-modal">
                  <label>Tipo</label>
                  <select value={values.Tipo} onChange={(e) => handleChangeValues(e, 'Tipo')} >
                    <option value=''>Elegir</option>
                    <option value='Monta'>Monta</option>
                    <option value='Inseminacion'>Inseminación</option>
                    <option value='Podologia'>Podología</option>
                    <option value='Vacunacion'>Vacunación</option>
                    <option value='Desparasitacion'>Desparasitación</option>
                    <option value='Control'>Control</option>
                    <option value='Castracion'>Castración</option>
                    <option value='Topizado'>Topizado</option>
                    <option value='Curacion'>Curación</option>
                    <option value='Secado'>Secado</option>
                    <option value='Aborto'>Secado</option>
                    <option value='Otro'>Otro</option>
                  </select>
                </div>

                <div className="field-modal">
                  <label>Fecha</label>
                  <input value={values.Fecha} onChange={(e) => handleChangeValues(e, 'Fecha')} type='date' />
                </div>

                <div className="field-modal">
                  <label>Veterinario</label>
                  <input value={values.Veterinario} onChange={(e) => handleChangeValues(e, 'Veterinario')} type='text' />
                </div>

                <div className="field-modal">
                  <label>Nombre de Res</label>
                  <select value={values.ResID || ''} onChange={(e) => handleChangeValues(e, 'ResID')}>
                    <option value='' disabled>Seleccionar</option>
                    {resForm.map(({ ID, value }) => (
                      <option key={ID} value={ID}>{value}</option>
                    ))}
                  </select>
                </div>

                <div className="field-modal">
                  <label>Observaciones</label>
                  <textarea value={values.Observaciones || ''} onChange={(e) => handleChangeValues(e, 'Observaciones')}></textarea>
                </div>

                {
                  isInseminacion &&
                  <>
                    <div className="field-modal">
                      <label>Fecha Parto</label>
                      <input value={values.FechaParto} onChange={(e) => handleChangeValues(e, 'FechaParto')} type='date' />
                    </div>
                    <div className="field-modal">
                      <label>Toro</label>
                      <select value={values.ToroID} onChange={(e) => handleChangeValues(e, 'ToroID')}>
                        <option value='' disabled>Seleccionar</option>
                        {resForm.map(({ ID, value }) => (
                          <option key={ID} value={ID}>{value}</option>
                        ))}
                      </select>
                    </div>
                  </>
                }

                <div className="submit-modal">
                  <button onClick={onSubmit}>Guardar</button>
                </div>
              </div>

              <div className='Fields-modal-dos'>
                <h3>Agregar Insumos</h3>

                <div className="add-insumos">
                  <div className='fields'>
                    <label>Codigo</label>
                    <input type="text" value={search} onChange={onSearchInsumo} />
                    {
                      // TO DO: <button>search</button>
                    }
                  </div>

                  <div className='fields'>
                    <label>Cantidad</label>
                    <input type="number" value={insumotoAdd.Cantidad || ''} onChange={onEditCantidad} />
                  </div>

                  <button onClick={onAddInsumo}>Agregar</button>
                </div>

                <input className='input' type="text" disabled value={insumotoAdd.Nombre || ''} />

                <Table
                  HeaderList={['Codigo', 'Nombre', 'Cantidad', 'U. Medida']}
                  keyList={['Numero', 'Nombre', 'Cantidad', 'UnidadMedida']}
                  data={listInsumos}
                  onDelete={onDelete}
                  edit={false}
                  paginar={false}
                />
              </div>
            </>
        }
      </div>
    </div>
  )
}

ModalServicios.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  idServicio: PropTypes.string,
  isInseminacion: PropTypes.bool
}
