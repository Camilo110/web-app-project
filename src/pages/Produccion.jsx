import '../styles/Produccion.css'
import { Modal } from "../components/Modal";
import { getProduccionModal } from "../services/forms";
import { CreateProduccionIndividual, getProduccion } from "../services/produccion";
import { useEffect, useState } from "react";

const campos = {
  Fecha: { label: 'Fecha', type: 'date', value: '' },
  Tipo: { label: 'Tipo', type: 'select', value: ['Leche', 'Carne'] },
  Cantidad: { label: 'Cantidad', type: 'number', value: 0 },
  ResID: { label: 'Res', type: 'select', value: [''] }
}


export const Produccion = () => {
  const [openModal, setOpenModal] = useState(false);  
  const [fields, setFields] = useState(campos);
  const [registros, setRegistros] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [values, setValues] = useState({})

  useEffect(() => {
    getProduccion().then((resp) => {
      setRegistros(resp)
    })
    getProduccionModal().then((res) => {
      setFields({...fields, ResID: { label: 'Res', type: 'select', value: res}})
      setIsLoading(false)
      })
  }, [])
  
  const HandleChange = (e, key) => {
    
    let value = e.target.value
    const type = e.target.type

    if (type === 'number' && value) value = parseInt(value)

    setValues({...values, [key]: value})
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

        <section>
          <h2>Seleccionar</h2>
          <input type="text" placeholder="Buscar" />
          <div>
            <input type="checkbox" />
            <label>Leche</label>
          </div>
        </section>

        <section className='Formulario'>
          <h2>Registrar Producción</h2>

        { isLoading 
          ? 
          <h3>Cargando...</h3>
          :
          <div className='field'>
            <label> Id o Nombre del Animal</label>
            <select  value={values.ResID || ''} onChange={(e) => HandleChange(e,'ResID')}>
              <option value='' disabled>Elegir</option>
              {fields.ResID.value.map((option) => (
                <option key={option.value} value={option.ID}>{option.value}</option>
              ))}
            </select>
          </div>
        }

          <div className='field'> 
            <label>Tipo</label>
            <select  value={values.Tipo || ''} onChange={(e) => HandleChange(e,'Tipo')}>
              <option value='' disabled>Elegir</option>
              <option value={'Leche'}>Leche</option>
              <option value={'Carne'}>Carne</option>
            </select>
          </div>

          <div className='field'>
            <label>Fecha</label>
            <input type="date" value={values.Fecha || ''} onChange={(e) => HandleChange(e,'Fecha')}/>
          </div>

          <div className='field'>
            <label>Cantidad</label>
            <input type="number" value={values.Cantida} onChange={(e) => HandleChange(e,'Cantidad')}/>
          </div>

          <div className='field'>
            <label> Observaciones</label>
            <textarea></textarea>
          </div>

          <div className='submit'>
            <button onClick={() => Submit(values)}>Registrar</button>
          </div>
        </section>

        <section>
          <h2>Registros</h2>
          <input type="text" placeholder="Buscar Registros" />

          <div className='registroItem'>
            <img src='https://fakeimg.pl/60x70/' alt='imagen' />
            <div className='infoRegistro'>
              <span className='resgistroP'>Cantidad</span>
              <span> Fecha</span>
              <span>Nombre de Res</span>
            </div>
          </div>
        </section>
      </main>








      <button onClick={HandleAdd}> Agregar </button>

      {isLoading
        ? 
        <h3>Cargando...</h3>
        :
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Cantidad</th>
              <th>Res</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.ID}>
                <td>{registro.Fecha}</td>
                <td>{registro.Tipo}</td>
                <td>{registro.Cantidad}</td>
                <td>{registro.ResID}</td>
                <td>
                  <span onClick={()=>console.log("first")}>Editar </span>
                  <span>Eliminar</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {openModal && 
        <Modal Handlesubmit={Submit} fields={fields} setOpenModal={setOpenModal}>
          <h3>Registrar Produccion</h3>
        </Modal>
      }
    </div>
  )
}
