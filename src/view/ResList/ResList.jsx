import { useEffect, useState } from "react"
import { ResItem } from "./Components/ResItem"
import { createRes, getRes } from "../../services/res"
import { getResModal } from "../../services/forms"
import '../../styles/ResList.css'
import { Modal } from "../../components/Modal"
import { ConfirmAlert } from "../../utils/ConfirmAlert"

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

  const [limit, setLimit] = useState({ inf: 0, sup: 15 })

  useEffect(() => {
    fetchRes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onChangeLimit = (op) => {
    const numRows = 15
    const addInf = (limit.inf + numRows >= response.length) ? limit.inf : limit.inf + numRows
    const addSup = Math.max(Math.min((limit.sup + numRows), response.length), numRows)
    
    const minusInf = Math.max((limit.inf - numRows), 0)
    const minusSup = minusInf + numRows
    
    if (op === '+') {
      setLimit({ inf: addInf, sup: addSup })
    } else {
      setLimit({ inf: minusInf, sup: minusSup })
    }
    window.scrollTo(0, 0)
  }



  const fetchRes = async() =>{
    const res = await getRes()
    setResponse(res)
    setListRes(res)
  }
  const  fetchDataForm = async () => {
    const { fincas, madres, padres } = await getResModal()
    setFields({
      ...fields,
      FincaID: { label: 'Finca', type: 'select', value: fincas },
      Madre: { label: 'Madre', type: 'select', value: madres },
      Padre: { label: 'Padre', type: 'select', value: padres }
    })
  }




  const HandleAdd =  async () => {
    await fetchDataForm()
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

  const ModalSubmitCreate = async (values) => {
    await ConfirmAlert(createRes, fetchRes, values )
    setLimit({ inf: 0, sup: 15 })
    setCreateModal(false)
  }

  return (
    <div className="resList">
      <h1> Listado de Animales </h1>

      <div className="resList-top">
        <h3>Buscar</h3>
        <input
          type="search"
          placeholder="Ingrese el número o el nombre"
          value={inputValue}
          onChange={handleInputChange} />
        <button onClick={HandleAdd}> Agregar </button>

        {createModal &&
          <Modal Handlesubmit={ModalSubmitCreate} fields={fields} setOpenModal={setCreateModal}>
            <h3>Registrar Nacimiento o Nueva Res</h3>
          </Modal>}
      </div>

      {listRes.slice(limit.inf, limit.sup).map((res) => (<ResItem key={res.Numero} res={res} fetchRes={fetchRes} />))}

      <div className="Paginacion">
        <span onClick={() => onChangeLimit('-')}>{'Anterior << '}</span>
        <span>{`Página: ${Math.ceil(limit.sup / 15)} de ${Math.ceil(response.length / 15)}`}</span>
        <span onClick={() => onChangeLimit('+')}>{' >> Siguiente'} </span>
      </div>


    </div>
  )
}