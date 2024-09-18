import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types'
import '../styles/Table.css'

export const Table = ({ HeaderList, keyList, data, onEdit, onDelete, edit = true, paginar = true}) => {

  const [numRows, setNumRows] = useState(10)
  const [limit, setLimit] = useState({ inf: 0, sup: 10 })
  const [datos, setDatos] = useState([])
  const [fieldFilter, setFieldFilter] = useState({text: '', value: ''})

  useEffect (() => {
    setDatos(data)
  }, [data])
  
  const onChangeRows = (e) => {
    const value = parseInt(e.target.value)
    setNumRows(value)
    setLimit({ inf: limit.inf, sup: limit.inf + value })
  }

  const onChangeLimit = (op) => {
    const addInf = (limit.inf + numRows >= datos.length) ? limit.inf : limit.inf + numRows
    const addSup = Math.max(Math.min((limit.sup + numRows), datos.length), numRows)
    
    const minusInf = Math.max((limit.inf - numRows), 0)
    const minusSup = minusInf + numRows
    
    if (op === '+') {
      setLimit({ inf: addInf, sup: addSup })
    } else {
      setLimit({ inf: minusInf, sup: minusSup })
    }
  }
  
  const paginacion = () => {
    return (
      <div className="Paginacion">
        <span onClick={() => onChangeLimit('-')}>{'<<'}</span>

        <select value={numRows} onChange={onChangeRows}>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>

        <span onClick={() => onChangeLimit('+')}>{'>>'} </span>
      </div>
    )}

    const onChangeFilter = (e) => {
      const value = e.target.value
      value ? setDatos(filterDate(value)) : setDatos(data)
      setLimit({ inf: 0, sup: numRows }) 
    }
    
    const filterDate = (value) => {
      const dataFilter = data.filter((registro) => registro[fieldFilter.value].toString().toLowerCase().includes(value.toString().toLowerCase()))
      return dataFilter
    }

    const reference = useRef();

    const selectFieldFilter = (e) => {
      const value = e
      const {ariaLabel, innerText} = value.target
      setFieldFilter({text: `Buscando por ${innerText}`, value: ariaLabel})
      reference.current.select(); 
    }

     


  return (
    <div>

      <div className="table-search"> 
        <h3>Filtrar: </h3>
        <input 
          ref={reference}
          type="text" 
          placeholder="" 
          onChange={onChangeFilter}
        />
        <span style={{color: 'red'}}>{fieldFilter.text}</span>
      </div>

        {paginar && paginacion()}

      <table>

        <thead>
          <tr>
            {HeaderList.map((header, index) => (
              <th key={header} aria-label={keyList[index]} onClick={selectFieldFilter}>{header}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {datos.slice(limit.inf, limit.sup).map((registro, index) => (
            <tr key={`${registro.ID}${index}`}>
              {keyList.map((key) => (
                <td key={key}>{registro[key]}</td>
              ))}
              <td>
                {edit &&
                  <span onClick={() => onEdit(registro.ID)}>Editar </span>
                }
                <span onClick={() => onDelete(registro.ID)}>Eliminar</span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {paginar && paginacion()}

    </div>
  )
}

Table.propTypes = {
  HeaderList: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
  edit: PropTypes.bool,
  paginar : PropTypes.bool
}



