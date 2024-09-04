import { useEffect, useState } from 'react'
import {Table} from './Table'
import '../styles/ModalServicios.css'
import { getInsumo } from '../services/Insumo'
import { getServiciosModal } from '../services/forms'
import PropTypes from 'prop-types'
import { createServicio } from '../services/servicio'


export const ModalServicios= ({setOpenModal}) => {
  const [insumos, setInsumos] = useState([])

  const [selectedInsumo, setSelectedInsumo] = useState([])
  const [insumotoAdd, setInsumoToAdd] = useState({Numero: '', Cantidad: 0})
  const [search, setSearch] = useState('')

  const [values, setValues] = useState({Tipo: '', Fecha: '', Veterinario: '', ResID: '', Observaciones: ''})
  const [resForm, setResForm] = useState([])

  useEffect(() => {
    getAll()
  }, [])

  const getAll = async () => {
    const data = await getInsumo()
    setInsumos(data)
    const reses = await getServiciosModal()
    setResForm(reses)
  }

  const onDelete = (id) => {
    const filterData = selectedInsumo.filter((insumo) => insumo.ID !== id)
    setSelectedInsumo(filterData)
  }

  const onSearchInsumo = (e) => {
    const {value} = e.target
    setSearch(value)
    // eslint-disable-next-line no-unused-vars
    const {ID, Numero, Nombre} = filter(value)
    value ? setInsumoToAdd({...insumotoAdd, ID, Numero: 23, UnidadMedida: 'kg', Nombre}) : setInsumoToAdd({...insumotoAdd, ID: '', Numero: '', Nombre: '', UnidadMedida:''})
    console.log("Sleccionado",insumotoAdd)
  }

  const onEditCantidad = (e) => { 
    const {value} = e.target
    setInsumoToAdd({...insumotoAdd, Cantidad: value})
  }

  const filter = (value) => {
    const dataFilter = insumos.filter((insumo) => insumo.Nombre.toString().toLowerCase().includes(value.toString().toLowerCase()))
    return  dataFilter.length > 0 ? dataFilter[0] : {ID: '', Numero: '', Nombre: ''}
  }

  const onAddInsumo = () => {
    if(!insumotoAdd.ID) {
      console.log("No hay elemento seleccionado")
      return
    }
    if(insumotoAdd.Cantidad <= 0) {
      console.log("Cantidad no valida")
      return}

    const index = selectedInsumo.findIndex((insumo) => insumo.ID === insumotoAdd.ID)    
    if(index >= 0){
      const insumo = selectedInsumo[index]
      const Cantidad = parseInt(insumo.Cantidad) + parseInt(insumotoAdd.Cantidad)
      const selectedInsumoFilter = selectedInsumo.filter((insumo) => insumo.ID !== insumotoAdd.ID)
      setSelectedInsumo([{...insumo, Cantidad}, ...selectedInsumoFilter])
    }else{
      setSelectedInsumo([insumotoAdd, ...selectedInsumo])
    }
    setInsumoToAdd({Cantidad: 0, ID: '', Numero: '', Nombre: ''})
    setSearch('')
    console.log(selectedInsumo, 'ADD INSUMO')
  }

  const handleChangeValues = (e, key) => {
    const {value} = e.target
    setValues({...values, [key]: value})
  }

  const onSubmit = async () => {
    let listInsumos = []
    selectedInsumo.map((insumo) => {
      listInsumos.push({InsumoID: insumo.ID, Cantidad: insumo.Cantidad})
    })

    const resp = await createServicio({...values, listInsumos})
    console.log(resp)

    setOpenModal(false)
  }
  
  return (
    <div className='Modal'>
      <div className='Modal-content'>

      <h3 className="title-modal">Agregar Servicios</h3>

      <button className="exit" onClick={()=> setOpenModal(false)}>X</button>

      <div className='Fields-modal'>

        <div className="field-modal">
          <label>Tipo</label>
          <select value={values.Tipo} onChange={(e) => handleChangeValues(e,'Tipo')} >
            <option value=''>Elegir</option>
            <option value='1'>Servicio Medico</option>
            <option value='2'>Registros de Secado</option>
            <option value='3'>Montas</option>
          </select>
        </div>

        <div className="field-modal">
          <label>Fecha</label>
          <input  value={values.Fecha} onChange={(e) => handleChangeValues(e,'Fecha')} type='date' />
        </div>

        <div className="field-modal">
          <label>Veterinario</label>
          <input  value={values.Veterinario} onChange={(e) => handleChangeValues(e,'Veterinario')} type='text' />
        </div>

        <div className="field-modal">
          <label>Nombre de Res</label>
          <select value={values.ResID} onChange={(e) => handleChangeValues(e,'ResID')}>
            {resForm.map(({ID, value}) => (
              <option key={ID} value={ID}>{value}</option>
            ))}
          </select>
        </div>

        <div className="field-modal">
          <label>Observaciones</label>
          <textarea  value={values.Observaciones || ''} onChange={(e) => handleChangeValues(e,'Observaciones')}></textarea>
        </div>

        <div className="submit-modal">
          <button onClick={onSubmit}>Guardar</button>
        </div>
      </div>

      <div >
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
          data={selectedInsumo}
          onDelete={onDelete}
          edit={false}
          paginar={false}
        />
        </div>
      </div>
    </div>
  )
}

ModalServicios.propTypes = {
  setOpenModal: PropTypes.func.isRequired
}
