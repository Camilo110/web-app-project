import { useState } from "react"
import PropTypes from 'prop-types'
import '../styles/Table.css'

export const Table = ({ HeaderList, keyList, data : datos, onEdit, onDelete}) => {

  const [numRows, setNumRows] = useState(10)
  const [limit, setLimit] = useState({ inf: 0, sup: 10 })
  const [data, setData] = useState(datos)
  const [fieldFilter, setFieldFilter] = useState('')

  const onChangeRows = (e) => {
    const value = parseInt(e.target.value)
    setNumRows(value)
    setLimit({ inf: limit.inf, sup: limit.inf + value })
  }

  const onChangeLimit = (op) => {
    const addInf = (limit.inf + numRows >= data.length) ? limit.inf : limit.inf + numRows
    const addSup = Math.min((limit.sup + numRows), data.length)

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
      value ? setData(filterDate(value)) : setData(datos)
      console.log(data)
    }

    const filterDate = (value) => {
      const dataFilter = datos.filter((registro) => registro[fieldFilter].toString().toLowerCase().includes(value.toString().toLowerCase()))
      return dataFilter
    }

    const selectFieldFilter = (e) => {
      const value = e.target.innerText
      setFieldFilter(value)
      console.log('Campo', value)
    }


  return (
    <div>

      <h2> Filtrar por: <span>{fieldFilter ? fieldFilter : "Seleccion el Header de la columna por la que desea filtrar"}</span> </h2>
      <input type="text" placeholder="" onChange={onChangeFilter}/>

      {paginacion()}

      <table>

        <thead>
          <tr>
            {HeaderList.map((header) => (
              <th key={header} onClick={selectFieldFilter}>{header}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.slice(limit.inf, limit.sup).map((registro) => (
            <tr key={registro.ID}>
              {keyList.map((key) => (
                <td key={key}>{registro[key]}</td>
              ))}
              <td>
                <span onClick={() => onEdit(registro.ID)}>Editar </span>
                <span onClick={() => onDelete(registro.ID)}>Eliminar</span>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {paginacion()}

    </div>
  )
}

Table.propTypes = {
  HeaderList: PropTypes.array.isRequired,
  keyList: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}



