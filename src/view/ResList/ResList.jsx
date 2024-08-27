import { useEffect, useState } from "react"
import { ResItem } from "./Components/ResItem"
import { createRes, getRes } from "../../services/res"
import { getResModal } from "../../services/forms"
import '../../styles/ResList.css'
import { Modal } from "../../components/Modal"

const campos = {
  Numero: { label: 'Número', type: 'number', value: 0 },
  Nombre: { label: 'Nombre', type: 'text', value: '' },
  Tipo: { label: 'Tipo', type: 'select', value: ['Leche', 'Carne', 'Doble Proposito'] },
  FechaNacimiento: { label: 'Fecha de Nacimiento', type: 'date', value: '' },
  Estado: { label: 'Estado', type: 'select', value: ['Activa', 'Vendida', 'Muerte'] },
  Madre: { label: 'Madre', type: 'select', value: [''] },
  Padre: { label: 'Padre', type: 'select', value: [''] },
  PesoActual: { label: 'Peso Actual', type: 'number', value: 0 },
  PesoNacimiento: { label: 'Peso de Nacimiento', type: 'number', value: 0 },
  Sexo: { label: 'Sexo', type: 'select', value: ['F', 'M'] },
  Raza: { label: 'Raza', type: 'text', value: '' },
  NumeroPartos: { label: 'Número de Partos', type: 'number', value: 0 },
  RegistroICA: { label: 'Registro ICA', type: 'text', value: '' },
  Observaciones: { label: 'Observaciones', type: 'text', value: '' },
  FincaID: { label: 'Finca ID', type: 'select', value: [''] }
};



export function ResList() {
  const [inputValue, setInputValue] = useState('')
  const [response, setResponse] = useState([])
  const [listRes, setListRes] = useState([])
  const [createModal, setCreateModal] = useState(false);

  const [fields, setFields] = useState(campos)



  useEffect(() => {
    getRes().then((res) => {
      setResponse(res)
      setListRes(res)
    })
    getResModal().then(({ fincas, madres, padres }) => {
      setFields({
        ...fields,
        FincaID: { label: 'Finca', type: 'select', value: fincas },
        Madre: { label: 'Madre', type: 'select', value: madres },
        Padre: { label: 'Padre', type: 'select', value: padres }
      })
    })
  }, [])




  const HandleAdd = () => {
    setCreateModal(true);
  }


  function filter(query) {
    return response.filter((res) => (
      res.Numero.toString().includes(query) || res.Nombre.toLowerCase().includes(query.toLowerCase())
    )
    );
  }

  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value)
    value ? setListRes(filter(value)) : setListRes(response)
  }

  const ModalSubmitCreate = (values) => {
    console.log('Submit', values)
    createRes(values).then((resp) => {
      console.log('Respuesta', resp)
    })
  }

  return (
    <div className="resList">
      <h1> Listado de Animales </h1>

      <div className="resList-top">
        <h3>Buscar</h3>
        <input
          type="search"
          placeholder="Ingrese el Id o el Nombre"
          value={inputValue}
          onChange={handleInputChange} />
        <button onClick={HandleAdd}> Agregar </button>

        {createModal &&
          <Modal Handlesubmit={ModalSubmitCreate} fields={fields} setOpenModal={setCreateModal}>
            <h3>Registrar Nacimiento o Nueva Res</h3>
          </Modal>}
      </div>

      {listRes.map((res) => (<ResItem key={res.Numero} res={res} />))}


    </div>
  )
}