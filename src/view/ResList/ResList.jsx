import { useEffect, useState } from "react"
import { ResItem } from "./Components/ResItem"
import { getRes } from "../../services/res"
import './ResList.css'
export function ResList(){



    const [inputValue, setInputValue] = useState('')
    const [list, setList] = useState([])

    useEffect(() => {
      getRes().then((res) => { setList(res) })
    }, [])

    const handleInputChange = (e) => {
      setInputValue(e.target.value)
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
      <button> Agregar </button>
      </div>
      {list.map((res) => (
        <ResItem key={res.Numero} res={res}/> )
      )}
      </div>
    )
}