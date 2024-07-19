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

  useEffect(() => {
    getProduccion().then((resp) => {
      setRegistros(resp)
      setIsLoading(false)
    })

    getProduccionModal().then((res) => {
      setFields({...fields, ResID: { label: 'Res', type: 'select', value: res}})
      })
  }, [])
  

  const ModalSubmit = (values) => {
    CreateProduccionIndividual(values).then((resp) => {
      console.log('Respuesta', resp)
    })
  }

  const HandleAdd = () => {
    setOpenModal(true);
  }
  return (
    <div>

      <h1>Produccion</h1>
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
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr key={registro.id}>
                <td>{registro.Fecha}</td>
                <td>{registro.Tipo}</td>
                <td>{registro.Cantidad}</td>
                <td>{registro.ResID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }

      {openModal && 
        <Modal Handlesubmit={ModalSubmit} fields={fields} setOpenModal={setOpenModal}>
          <h3>Registrar Produccion</h3>
        </Modal>
      }
    </div>
  )
}
