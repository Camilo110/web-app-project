import '../../styles/Produccion.css'
import { Modal } from "../../components/Modal";
import { getProduccionModal } from "../../services/forms";
import { CreateProduccionIndividual, getProduccion, EditProduccionIndividual, DeleteProduccionIndividual} from "../../services/produccion";
import { useEffect, useState } from "react";
import { ItemRegistro } from './Components/ItemRegistro';
import { Table } from '../../components/Table';
import { getProductos } from '../../services/producto';
import { ConfirmAlert } from '../../utils/ConfirmAlert';

const fields = {
  Fecha: { label: 'Fecha', type: 'date', value: '' },
  Tipo: { label: 'Tipo', type: 'select', value: ['Leche', 'Carne'] },
  Cantidad: { label: 'Cantidad', type: 'number', value: 0 },
  ResID: { label: 'Res', type: 'text', value: [] }
}


const Today = () => {
const date = new Date();
date.setHours(date.getHours() - 5);
return (date.toISOString().split('T')[0]);
}


export const Produccion = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dataModal, setDataModal] = useState({})

  const [isLoading1, setIsLoading1] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)

  const [values, setValues] = useState({ Fecha: Today(), ResID: [], Cantidad: 0, Tipo: 'Leche'})
  
  const [listRes, setListRes] = useState([])
  const [filterRes, setFilterRes] = useState([])
  const [inputValue, setInputValue] = useState('')
  
  const [registros, setRegistros] = useState([])

  const [productos, setProductos] = useState([])

  useEffect(() => {
    fetchProduccion()
    fetchDataModal()
    fetchProductos()
  }, [])

  const fetchProduccion = async () => {
    const response = await getProduccion()
    setRegistros(response)

    setIsLoading2(false)
  } 
  const fetchDataModal = async () => {
    const response = await getProduccionModal()
    setListRes(response)
    setFilterRes(filter(response, 'F', ['Sexo']))
    setIsLoading1(false)
  }
  const fetchProductos = async () => {
    const response = await getProductos()
    setProductos(response)
  }


  function filter(list, query, listOfKeys) {
    const listFilter = list.filter((item) => (
      listOfKeys.some((key) => item[key].toString().toLowerCase().includes(query.toLowerCase()))
    ));
    return listFilter
  }

  const handleInputChangeRes = ({ target: { value } }) => {
    setInputValue(value)
    value ? setFilterRes(filter(listRes, value, ['Numero', 'Nombre'])) : setFilterRes(listRes)
  }

  const HandleChange = (e, key) => {
    let value = e.target.value
    const type = e.target.type

    console.log(values)

    value === 'Leche' ? setFilterRes(filter(listRes, 'F', ['Sexo'])) : setFilterRes(listRes)
    
    if (type === 'number' && value) value = parseInt(value)
    setValues({ ...values, [key]: value })
  }

  const OnChangeSelectRes = (ID) => {
    let OldResID = values.ResID
    
    listRes.map((res) => {
      if (res.ID === ID) {
        res.selected = !res.selected
        if (res.selected) {
          OldResID.push(res.ID)
        } else {
          OldResID = OldResID.filter((id) => id !== res.ID)
        }
      }
    })

    setValues({ ...values, ResID: OldResID })
  }

  const Submit = async(values) => {
    ConfirmAlert(CreateProduccionIndividual, fetchProduccion, values)
  }

  const SubmitEdit = async (values, id) => {
    await ConfirmAlert(()=>EditProduccionIndividual(values, id),fetchProduccion)
    setOpenModal(false)
  }

  const HandleEdit = (id) => {
    registros.map((registro) => {
      if (registro.ID === id) {
        setDataModal({...registro})
      }
    })
    setOpenModal(true);
  }

  const HandleDelete = (id) => {
    DeleteProduccionIndividual(id).then((resp) => {
      console.log('Respuesta', resp)
    })
  }
  return (
    <div>

      <h1>Registros de Produccion</h1>

      <main className='produccion'>

        <section className='Seleccionar'>
          <h2>Seleccionar</h2>
          <input type="text" placeholder="Buscar" value={inputValue} onChange={handleInputChangeRes} />
          <div className='listScroll'>
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>Nombre</th>
                <th>N°</th>
              </tr>
            </thead>


            {isLoading1
              ?
              <tbody>
                <tr>
                  <td>
                    Cargando...
                  </td>
                </tr>
              </tbody>
              :
              
                <tbody >
                {filterRes.map((res) => (
                  <tr key={res.ID} onClick={() => { OnChangeSelectRes(res.ID) }}>
                    <td>
                      <input type="checkbox" checked={res.selected} readOnly />
                    </td>
                    <td>
                      <label>{res.Nombre}</label>
                    </td>
                    <td>
                      <label>{res.Numero}</label>
                    </td>
                  </tr>))
                }
              </tbody>              
            }
          </table>
          </div>
        </section>

        <section className='Formulario'>
          <h2>Registrar Producción</h2>


          <div className='field'>
            <label> Número o Nombre del Animal(es)</label>
            <input type="text" value={values.ResID} disabled onChange={(e) => HandleChange(e, 'ResID')} />
          </div>


          <div className='field'>
            <label>Tipo</label>
            <select value={values.Tipo || ''} onChange={(e) => HandleChange(e, 'Tipo')}>
              <option value='' disabled>Elegir</option>
              <option value={'Leche'}>Leche</option>
              <option value={'Carne'}>Carne</option>
            </select>
          </div>

          <div className='field'>
            <label>Fecha</label>
            <input type="date" value={values.Fecha} onChange={(e) => HandleChange(e, 'Fecha')} />
          </div>

          <div className='field'>
            <label>Cantidad</label>
            <input type="number" value={values.Cantidad} onChange={(e) => HandleChange(e, 'Cantidad')} />
          </div>

          <div className='submit'>
            <button onClick={() => Submit(values)}>Registrar</button>
          </div>
        </section>

        <section className='registroList'>
          <h2>Total Produccion</h2>
          <div>
            {
              productos.map((registro) => (
                <ItemRegistro 
                  key={registro.ID} 
                  Cantidad={registro.Cantidad} 
                  Tipo={registro.Nombre} />
              ))
            }
          </div>
          

        </section>
      </main>
  
      {isLoading2
        ?
        <h3>Cargando...</h3>
        :
        <Table HeaderList={['Fecha', 'Tipo', 'Cantidad', 'Res']} 
               keyList={['Fecha', 'Tipo', 'Cantidad', 'ResNombre']} 
               data={registros}
               onEdit={HandleEdit}
               onDelete={HandleDelete}
        />
      }

      {openModal &&
        <Modal Handlesubmit={SubmitEdit} fields={fields} data={dataModal} setOpenModal={setOpenModal}>
          <h3>Editar Produccion</h3>
        </Modal>
      }
    </div>
  )
}


