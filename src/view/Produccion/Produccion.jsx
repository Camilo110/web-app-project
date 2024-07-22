import '../../styles/Produccion.css'
import { Modal } from "../../components/Modal";
import { getProduccionModal } from "../../services/forms";
import { CreateProduccionIndividual, getProduccion } from "../../services/produccion";
import { useEffect, useState } from "react";
import { ItemRegistro } from './Components/ItemRegistro';
import { Table } from '../../components/Table';

const fields = {
  Fecha: { label: 'Fecha', type: 'date', value: '' },
  Tipo: { label: 'Tipo', type: 'select', value: ['Leche', 'Carne'] },
  Cantidad: { label: 'Cantidad', type: 'number', value: 0 },
  ResID: { label: 'Res', type: 'text', value: [] }
}


export const Produccion = () => {
  const [openModal, setOpenModal] = useState(false);
  const [registros, setRegistros] = useState([])
  const [isLoading1, setIsLoading1] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [values, setValues] = useState({ ResID: [] })
  const [listRes, setListRes] = useState([])
  const [filterRes, setFilterRes] = useState([])
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    getProduccion().then((resp) => {
      setRegistros(resp)
      setIsLoading2(false)
    })
    getProduccionModal().then((res) => {
      setListRes(res)
      setFilterRes(res)
      setIsLoading1(false)
    })
  }, [])

  function filter(query) {
    return listRes.filter((res) => (
      res.Numero.toString().includes(query) || res.Nombre.toLowerCase().includes(query.toLowerCase())
    )
    );
  }

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value)
    value ? setFilterRes(filter(value)) : setFilterRes(listRes)
  }

  const HandleChange = (e, key) => {
    let value = e.target.value
    const type = e.target.type
    if (type === 'number' && value) value = parseInt(value)
    setValues({ ...values, [key]: value })
  }

  // TODO 
  // METODO PARA SELECCIONAR DESDE EL INPUT


  const OnChangeSelectRes = (ID) => {
    let OldResID = values.ResID
    let oldListRes = listRes
    oldListRes.map((res) => {
      if (res.ID === ID) {
        res.selected = !res.selected
        if (res.selected) {
          OldResID.push(res.Numero)
        } else {
          OldResID = OldResID.filter((num) => num !== res.Numero)
        }
      }
    })

    setListRes(oldListRes)
    setValues({ ...values, ResID: OldResID })
  }

  const getName = (ID) => {
    let name = ''
    listRes.map((res) => {
      if (res.ID === ID) {
        name = res.Nombre
      }
    })
    return name
  }


  const Submit = (values) => {
    CreateProduccionIndividual(values).then((resp) => {
      console.log('Respuesta', resp)
    })
  }

  const HandleAdd = () => {
    setOpenModal(true);
  }
  return (
    <div>

      <h1>Registros de Produccion</h1>

      <main className='produccion'>

        <section className='Seleccionar'>
          <h2>Seleccionar</h2>
          <input type="text" placeholder="Buscar" value={inputValue} onChange={handleInputChange} />
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
            <input type="date" value={values.Fecha || ''} onChange={(e) => HandleChange(e, 'Fecha')} />
          </div>

          <div className='field'>
            <label>Cantidad</label>
            <input type="number" value={values.Cantidad} onChange={(e) => HandleChange(e, 'Cantidad')} />
          </div>

          <div className='field'>
            <label> Observaciones</label>
            <textarea></textarea>
          </div>

          <div className='submit'>
            <button onClick={() => Submit(values)}>Registrar</button>
          </div>
        </section>

        <section className='registroList'>
          <h2>Registros</h2>
          <input type="text" placeholder="Buscar Registros" />
          <div className='listScroll'>
            {
              registros.map((registro) => (
                <ItemRegistro key={registro.ID} Cantidad={registro.Cantidad} Fecha={registro.Fecha} Tipo={registro.Tipo} Nombre={getName(registro.ResID)} />
              ))
            }
          </div>
          

        </section>
      </main>
          







      <button onClick={HandleAdd}> Agregar </button>

      {isLoading2
        ?
        <h3>Cargando...</h3>
        :
        <Table HeaderList={['Fecha', 'Tipo', 'Cantidad', 'Res']} keyList={['Fecha', 'Tipo', 'Cantidad', 'ResID']} data={registros} />
      }

      {openModal &&
        <Modal Handlesubmit={Submit} fields={fields} setOpenModal={setOpenModal}>
          <h3>Registrar Produccion</h3>
        </Modal>
      }
    </div>
  )
}


