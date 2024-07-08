import { useEffect, useState } from "react"
import { ResItem } from "./Components/ResItem"
import { getRes } from "../../services/res"
import './ResList.css'
import { Modal } from "../../components/Modal"

const fields = {
  ID: { label: 'ID', type: 'text', value: '' },
  Numero: { label: 'Número', type: 'number', value: 0 },
  Nombre: { label: 'Nombre', type: 'text', value: '' },
  Tipo: { label: 'Tipo', type: 'text', value: '' },
  FechaNacimiento: { label: 'Fecha de Nacimiento', type: 'text', value: '' },
  Estado: { label: 'Estado', type: 'text', value: '' },
  Madre: { label: 'Madre', type: 'text', value: '' },
  Padre: { label: 'Padre', type: 'text', value: '' },
  PesoActual: { label: 'Peso Actual', type: 'number', value: 0 },
  PesoNacimiento: { label: 'Peso de Nacimiento', type: 'number', value: 0},
  Sexo: { label: 'Sexo', type: 'text', value: '' },
  Raza: { label: 'Raza', type: 'text', value: '' },
  NumeroPartos: { label: 'Número de Partos', type: 'number', value: 0 },
  RegistroICA: { label: 'Registro ICA', type: 'text', value: '' },
  Observaciones: { label: 'Observaciones', type: 'text', value: '' },
  FincaID: { label: 'Finca ID', type: 'text', value: '' }
};

const emptyValues = {
  ID: "",
  Numero: 0,
  Nombre: "",
  Tipo: "",
  FechaNacimiento: "",
  Estado: "",
  Madre: "",
  Padre: "",
  PesoActual: 0,
  PesoNacimiento: 0,
  Sexo: "",
  Raza: "",
  NumeroPartos: 0,
  RegistroICA: "",
  Observaciones: "",
  FincaID: ""
};


export function ResList(){
    const [inputValue, setInputValue] = useState('')
    const [resp, setResp] = useState([])
    const [listRes, setListRes] = useState([])
    const [createModal, setCreateModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [values, setValues] = useState(emptyValues);

    useEffect(() => {
      getRes().then((res) => { 
        setResp(res)
        setListRes(res)
       })
    }, [])

    
    const HandleAdd = () => {
      setOpenModal(true);
    }

    function filter(query) {
      return resp.filter((res) => (
        res.Numero.toString().includes(query) || res.Nombre.toLowerCase().includes(query.toLowerCase())
      )
      );
    }

    const handleInputChange = ({target:{value, }}) => {
      setInputValue(value)
      value ? setListRes(filter(value)) : setListRes(resp)
    }

    const ModalSubmit = () => {
      console.log('Submit', values)
    }

    
  
        
    return (
      <div className="resList">
        <h1> Listado de Animales </h1>
        
        <div>
          <h3>Buscar</h3>
          <input 
            type="text" 
            placeholder="Ingrese el Id o el Nombre"
            value={inputValue}
            onChange={handleInputChange} />
          <button onClick={HandleAdd}> Agregar </button>
          {createModal &&
          <Modal Handlesubmit={ModalSubmit} fields={fields} values={values} setValues={setValues} setOpenModal={setCreateModal}>
            <h3>Registrar Nacimiento o Nueva Res</h3>
          </Modal>}
        </div>

        {listRes.map((res) => ( <ResItem key={res.Numero} res={res} setOpenModal={setEditModal}/>))}

        {editModal &&
          <Modal Handlesubmit={ModalSubmit} fields={fields} values={listRes[0]} setValues={setValues} setOpenModal={setEditModal}>
            <h3>Registrar Nacimiento o Nueva Res</h3>
          </Modal>}
      </div>
    )
}