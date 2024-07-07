import { useEffect, useState } from "react"
import { ResItem } from "./Components/ResItem"
import { getRes } from "../../services/res"
import './ResList.css'
import { Modal } from "../../components/Modal"
export function ResList(){



    const [inputValue, setInputValue] = useState('')
    const [resp, setResp] = useState([])
    const [listRes, setListRes] = useState([])

    const [values, setValues] = useState({nombre: '', numero: 0})

   // console.log(typeof values.Numero)
    
    const fields = {label: 'Nombre', type: 'text'}

    useEffect(() => {
      getRes().then((res) => { 
        console.log('PELIGROO')
        setResp(res)
        setListRes(res)
       })
    }, [])

    
    const HandleAdd = () => {
      console.log('add')
      //redireccionar a la vista de edición
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
      console.log('submit')
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
      {/* <Modal Handlesubmit={ModalSubmit} fields={fields} values={values} setValues={setValues}>
        <h3 className="text-black mb-3">Title</h3>
      </Modal> */}
      </div>
      {listRes.map((res) => (
        <ResItem key={res.Numero} res={res}/> )
      )}
      </div>
    )
}